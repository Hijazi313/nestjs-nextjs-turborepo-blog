"use server";

import { print } from "graphql";
import { GET_POST_COMMENTS } from "../graphql/queries.graphql";
import { fetchGraphQL } from "../lib/fetchGraphQL";
import { Comment } from "../types/model-types";

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}): Promise<{ data: Comment[]; count: number }> {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    skip,
    take,
  });
  return {
    data: data.commentsByPost as Comment[],
    count: data.commentsCount as number,
  };
}
