import { graphql } from "gatsby";
import TagPage from "../components/tag-page";

export default TagPage;

export const query = graphql`
  query PostPageQuery($tagSlug: String!) {
    posts: allPost(
      sort: { fields: [date] }
      filter: { tags: { elemMatch: { slug: { eq: $tagSlug } } } }
    ) {
      nodes {
        ...PostPreview
      }
    }
  }
`;
