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
