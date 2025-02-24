"use server";

import { print } from "graphql";
import { GET_POSTS } from "../graphql/queries.graphql";
import { fetchGraphQL } from "../lib/fetchGraphQL";
import { Post } from "../types/modelTypes";
import transformTakeAndSkip from "../lib/transformTakeAndSkip";
import { DEFAULT_PAGE_SIZE } from "../constants/app";

export const fetchPosts = async (
  { page, pageSize } = { page: 1, pageSize: DEFAULT_PAGE_SIZE }
) => {
  const { take, skip } = transformTakeAndSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });
  console.log({ data });
  return { data: data.posts as Post[], count: data.postCount };
};
