import { graphql } from "gatsby";
import PostPage from "../components/post-page";

export default PostPage;

export const query = graphql`
  query PostQuery($id: String) {
    post(id: { eq: $id }) {
      slug
      title
      date(formatString: "YYYY年M月D日")
      draft
      description
      banner {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, aspectRatio: 3)
        }
      }
      tags {
        name
        slug
      }
      body
    }
  }
`;
