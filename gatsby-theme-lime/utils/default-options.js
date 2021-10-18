module.exports = (themeOptions) => {
  const basePath = themeOptions.basePath || `/`;
  const blogPath = themeOptions.blogPath || `/blog`;
  const postsPath = themeOptions.postsPath || `content/posts`;
  const postsPrefix = themeOptions.postsPrefix || `/post-`;
  const pagesPath = themeOptions.pagesPath || `content/pages`;
  const resourcesPath = themeOptions.resourcesPath || `content/resources`;
  const tagsPath = themeOptions.tagsPath || `/tags`;
  const navigation = themeOptions.navigation || [];

  return {
    basePath,
    blogPath,
    postsPath,
    postsPrefix,
    pagesPath,
    resourcesPath,
    tagsPath,
    navigation,
  };
};
