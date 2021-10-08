import { graphql, useStaticQuery } from "gatsby";

export const useLimeConfig = () => {
  const { limeConfig } = useStaticQuery<{ limeConfig: LimeConfig }>(graphql`
    query LimeConfigQuery {
      limeConfig {
        basePath
        blogPath
        postsPath
        pagesPath
        tagsPath
      }
    }
  `);

  return limeConfig;
};

export default useLimeConfig;
