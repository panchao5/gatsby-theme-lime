import { graphql } from "gatsby";
import HomepageComponent from "../components/homepage";

export default HomepageComponent;

export const query = graphql`
  query {
    allPost(sort: { fields: date, order: DESC }, limit: 5) {
      nodes {
        ...PostPreview
      }
    }
  }
`;
