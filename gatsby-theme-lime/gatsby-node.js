const path = require("path");
const _ = require("lodash");
const normalize = require("normalize-path");
const slugify = require("./utils/slugify");
const withDefaults = require("./utils/default-options");

const mdxResolverPassthrough =
  (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    });
    return result;
  };

/**
 * @type {import("gatsby").GatsbyNode["createSchemaCustomization"]}
 */
exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { createTypes, createFieldExtension } = actions;

  const slugResolver = async (source, args, context, info) => {
    if (source.slug) {
      return source.slug;
    }

    const nodeWithContext = context.nodeModel.findRootNodeAncestor(
      source,
      (node) => node.internal?.type === `File`
    );

    if (!nodeWithContext) {
      return null;
    }

    const fileRelativePath = nodeWithContext.relativePath;

    const parsedPath = path.parse(fileRelativePath);

    const relevantPath = path.posix.join(
      ..._.map(
        [
          ..._.split(parsedPath.dir, path.sep),
          parsedPath.name !== "index" && parsedPath.name,
        ].filter(Boolean),
        slugify
      )
    );

    return relevantPath;
  };

  createFieldExtension({
    name: `mdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      };
    },
  });

  createTypes([
    `
    interface Post implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      draft: Boolean
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }

    type PostTag {
      name: String
      slug: String
    }

    interface Page implements Node {
      id: ID!
      slug: String!
      title: String!
      excerpt(pruneLength: Int = 160): String!
      body: String!
    }

    type LimeConfig implements Node {
      basePath: String
      blogPath: String
      postsPath: String
      pagesPath: String
      resourcesPath: String
      tagsPath: String
      navigation: [NavigationEntry]
    }
    
    type NavigationEntry {
      title: String
      slug: String
    }
  `,
    schema.buildObjectType({
      name: "MdxPost",
      interfaces: ["Node", "Post"],
      fields: {
        slug: {
          type: "String!",
          resolve: slugResolver,
        },
        title: "String!",
        date: {
          type: "Date!",
          extensions: {
            dateformat: {},
          },
        },
        draft: {
          type: "Boolean",
          resolve: (source) => {
            return source.draft ?? false;
          },
        },
        excerpt: {
          type: "String!",
          args: {
            pruneLength: {
              type: "Int",
              defaultValue: 140,
            },
          },
          extensions: {
            mdxpassthrough: {
              fieldName: "excerpt",
            },
          },
        },
        body: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "body",
            },
          },
        },
        html: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "html",
            },
          },
        },
        timeToRead: {
          type: "Int",
          extensions: {
            mdxpassthrough: {
              fieldName: "timeToRead",
            },
          },
        },
        tags: "[PostTag]",
        banner: {
          type: "File",
          extensions: {
            fileByRelativePath: {},
          },
        },
        description: "String",
        canonicalUrl: "String",
      },
    }),
    schema.buildObjectType({
      name: "MdxPage",
      interfaces: ["Node", "Page"],
      fields: {
        slug: {
          type: "String!",
          resolve: slugResolver,
        },
        title: "String!",
        excerpt: {
          type: "String!",
          args: {
            pruneLength: {
              type: "Int",
              defaultValue: 140,
            },
          },
          extensions: {
            mdxpassthrough: {
              fieldName: "excerpt",
            },
          },
        },
        body: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "body",
            },
          },
        },
      },
    }),
  ]);
};

/**
 * @type {import("gatsby").GatsbyNode["sourceNodes"]}
 */
exports.sourceNodes = ({ actions, createContentDigest }, themeOptions) => {
  const { createNode } = actions;
  const {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    resourcesPath,
    tagsPath,
    navigation,
  } = withDefaults(themeOptions);

  const limeConfig = {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    resourcesPath,
    tagsPath,
    navigation,
  };

  createNode({
    ...limeConfig,
    id: `gatsby-theme-lime-config`,
    parent: null,
    children: [],
    internal: {
      type: `LimeConfig`,
      contentDigest: createContentDigest(limeConfig),
      content: JSON.stringify(limeConfig),
      description: `Options for gatsby-theme-lime`,
    },
  });
};

/**
 * @type {import("gatsby").GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, createContentDigest },
  themeOptions
) => {
  const { createNode, createParentChildLink } = actions;

  const { postsPath, pagesPath } = withDefaults(themeOptions);

  if (node.internal.type !== "Mdx") {
    return;
  }

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type === "Mdx" && source === postsPath) {
    let modifiedTags;

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: slugify(tag),
      }));
    } else {
      modifiedTags = null;
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      draft: node.frontmatter.draft,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
      canonicalUrl: node.frontmatter.canonicalUrl,
    };

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`);

    createNode({
      ...fieldData,
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post Interface`,
      },
    });

    createParentChildLink({
      parent: node,
      child: getNode(mdxPostId),
    });
  }

  if (node.internal.type === `Mdx` && source === pagesPath) {
    const fieldData = {
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
    };

    const mdxPageId = createNodeId(`${node.id} >>> MdxPage`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPage`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Page interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPageId) });
  }
};

const homepageTemplate = require.resolve(`./src/templates/homepage.tsx`);
const postPageTemplate = require.resolve(`./src/templates/post-page.tsx`);

/**
 * @type {import("gatsby").GatsbyNode["createPages"]}
 */
exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions;

  const { basePath, blogPath, tagsPath, postsPrefix } =
    withDefaults(themeOptions);

  createPage({
    path: basePath,
    component: homepageTemplate,
  });

  const result = await graphql(`
    query {
      allPost(sort: { fields: [date], order: DESC }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running Graphql query.`, result.errors);
    return;
  }

  const posts = result.data.allPost.nodes;

  posts.forEach((post) => {
    createPage({
      path: normalize(`/${blogPath}/${post.slug}`),
      component: postPageTemplate,
      context: {
        id: post.id,
      },
    });
  });
};

/**
 * @type {import("gatsby".GatsbyNode["createResolvers"])}
 */
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SiteSiteMetadata: {
      authorAvatar: {
        type: "File",
        async resolve(source, args, context, info) {
          if (!source.authorAvatarPath) {
            return null;
          }
          const fileNodes = await context.nodeModel.runQuery({
            query: {
              filter: {
                absolutePath: {
                  eq: source.authorAvatarPath,
                },
              },
            },
            type: "File",
            firstOnly: false,
          });

          if (!fileNodes) {
            return null;
          }

          return fileNodes[0];
        },
      },
    },
  });
};
