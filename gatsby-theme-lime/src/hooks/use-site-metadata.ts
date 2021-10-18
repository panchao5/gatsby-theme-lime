import { graphql, useStaticQuery } from "gatsby";

type QueryResult = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

export function useSiteMetadata() {
  const {
    site: { siteMetadata },
  } = useStaticQuery<QueryResult>(graphql`
    query SiteMetadtaQuery {
      site {
        siteMetadata {
          siteUrl
          siteTitle
          author
          authorBio
          authorAvatar {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 1
                width: 120
                quality: 90
                placeholder: BLURRED
              )
            }
          }
          socialLinks {
            name
            link
          }
        }
      }
    }
  `);

  return siteMetadata;
}

export default useSiteMetadata;
