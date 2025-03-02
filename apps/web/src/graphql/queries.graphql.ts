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

export const GET_POST_BY_ID = gql`
  query post($id: Int!) {
    post(id: $id) {
      id
      title
      content
      thumbnail
      slug
      author {
        name
      }
      tags {
        id
        name
      }
      createdAt
    }
  }
`;
