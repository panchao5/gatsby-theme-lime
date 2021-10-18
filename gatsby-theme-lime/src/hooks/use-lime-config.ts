import { graphql, useStaticQuery } from "gatsby";

export const useLimeConfig = () => {
  const { limeConfig } = useStaticQuery<{ limeConfig: LimeConfig }>(graphql`
    query LimeConfigQuery {
      limeConfig {
        basePath
        blogPath
        postsPath
        postsPrefix
        pagesPath
        resourcesPath
        tagsPath
        navigation {
          title
          slug
        }
      }
    }
  `);

  return limeConfig;
};

export default useLimeConfig;
