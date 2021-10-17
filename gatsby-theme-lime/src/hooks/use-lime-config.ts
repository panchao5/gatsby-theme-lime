import { graphql, useStaticQuery } from "gatsby";

export const useLimeConfig = () => {
  const { limeConfig } = useStaticQuery<{ limeConfig: LimeConfig }>(graphql`
    query LimeConfigQuery {
      limeConfig {
        basePath
        blogPath
        postsPath
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
