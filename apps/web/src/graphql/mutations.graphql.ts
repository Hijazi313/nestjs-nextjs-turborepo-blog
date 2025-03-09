import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation login($signInInput: SignInInput!) {
    login(signInInput: $signInInput) {
      access_token
      id
      name
      avatar
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation unlikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`;

export const GET_LIKES_COUNT_QUERY = gql`
  query postLikesCount($postId: Int!) {
    postLikesCount(postId: $postId)
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput) {
      id
    }
  }
`;
