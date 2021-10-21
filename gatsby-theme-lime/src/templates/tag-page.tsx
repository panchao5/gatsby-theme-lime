import { graphql } from "gatsby";
import TagPage from "../components/tag-page";

export default TagPage;

export const query = graphql`
  query PostPageQuery($tag_: String!, $limit: Int!, $skip: Int!) {
    posts: allPost(
      sort: { fields: [date] }
      filter: { tags: { elemMatch: { slug: { eq: $tag_ } } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...PostPreview
      }
    }
  }
`;
