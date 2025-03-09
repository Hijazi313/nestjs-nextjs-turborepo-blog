import { gql } from "graphql-tag";

export const GET_POSTS = gql`
  query posts($options: QueryOptionsInput) {
    posts(options: $options) {
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
  query post($id: Int!, $options: QueryOptionsInput) {
    post(id: $id, options: $options) {
      id
      title
      content
      thumbnail
      slug
      published
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
export const GET_POSTS_BY_CURRENT_USER = gql`
  query GetCurrentUserPosts($options: QueryOptionsInput) {
    myPosts(options: $options) {
      id
      title
      content
      thumbnail
      slug
      published
      author {
        name
      }
      createdAt
    }
    myPostsCount(options: $options)
  }
`;

export const GET_POST_COMMENTS = gql`
  query commentsByPost($postId: Int!, $skip: Int, $take: Int) {
    commentsByPost(postId: $postId, skip: $skip, take: $take) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }
    commentsCount(postId: $postId)
  }
`;

export const POST_LIKES = gql`
  query postLikes($postId: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $postId)
  }
`;
