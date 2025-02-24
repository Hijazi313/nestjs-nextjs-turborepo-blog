import { gql } from "graphql-tag";
export const GET_POSTS = gql`
  query posts($skip: Int, $take: Int) {
    posts(skip: $skip, take: $take) {
      id
      title
      content
      createdAt
      thumbnail
      slug
    }
    postCount
  }
`;
