"use server";
import { print } from "graphql";
import {
  LIKE_POST_MUTATION,
  UNLIKE_POST_MUTATION,
} from "../graphql/mutations.graphql";
import { authFetchGraphQL } from "../lib/fetchGraphQL";
import { POST_LIKES } from "../graphql/queries.graphql";

export const likePost = async (postId: number) => {
  return authFetchGraphQL(print(LIKE_POST_MUTATION), {
    postId,
  });
};

export const unlikePost = async (postId: number) => {
  return authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
    postId,
  });
};

export const getPostLikes = async (postId: number) => {
  const likes = await authFetchGraphQL(print(POST_LIKES), {
    postId,
  });
  return {
    likesCount: likes.postLikesCount as number,
    userLikedPost: likes.userLikedPost as boolean,
  };
};
