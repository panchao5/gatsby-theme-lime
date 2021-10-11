const withDefaults = require("./utils/default-options");

/**
 * @type {import("gatsby").GatsbyConfig}
 */
module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions);

  return {
    plugins: [
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.postsPath,
          path: options.postsPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.pagesPath,
          path: options.pagesPath,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: options.resourcesPath,
          path: options.resourcesPath,
        },
      },
      "gatsby-plugin-image",
      "gatsby-transformer-sharp",
      "gatsby-plugin-sharp",
      "gatsby-remark-images",
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: "gatsby-remark-images",
            },
          ],
        },
      },
    ],
  };
};
