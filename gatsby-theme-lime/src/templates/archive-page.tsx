import { graphql } from "gatsby";
import ArchivePage from "../components/archive-page";

export default ArchivePage;

export const query = graphql`
  query ($limit: Int!, $skip: Int!) {
    allPost(sort: { fields: [date], order: DESC }, limit: $limit, skip: $skip) {
      nodes {
        ...PostPreview
      }
    }
  }
`;
