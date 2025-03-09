"use server";

import { print } from "graphql";
import {
  GET_POST_BY_ID,
  GET_POSTS,
  GET_POSTS_BY_CURRENT_USER,
} from "../graphql/queries.graphql";
import { authFetchGraphQL, fetchGraphQL } from "../lib/fetchGraphQL";
import { Post } from "../types/model-types";
import transformTakeAndSkip from "../lib/transformTakeAndSkip";
import { DEFAULT_PAGE_SIZE } from "../constants/app";
import { CreatePostFormState } from "../types/form-state";
import { createPostFormSchema } from "../schemas/post.schema";
import { CREATE_POST_MUTATION } from "../graphql/mutations.graphql";
import { uploadThumbnail } from "../lib/upload";

export const fetchPosts = async (
  { page, pageSize } = { page: 1, pageSize: DEFAULT_PAGE_SIZE }
) => {
  const { take, skip } = transformTakeAndSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), {
    options: { pagination: { take, skip } },
  });
  return { data: data.posts as Post[], count: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), {
    id,
    options: { include: ["author", "tags"] },
  });
  return { data: data.post as Post };
};

export const fetchUserPosts = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const { take, skip } = transformTakeAndSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_POSTS_BY_CURRENT_USER), {
    options: {
      pagination: { take, skip },
      include: ["author", "tags"],
    },
  });
  return { data: data.myPosts as Post[], count: data.myPostsCount as number };
};

export const createPost = async (
  state: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const validatedFields = createPostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  let thumbnailUrl = "";
  // Upload thumbnail to supabase
  if (validatedFields.data.thumbnail) {
    thumbnailUrl = await uploadThumbnail(
      validatedFields.data.thumbnail as File
    );
  }
  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    createPostInput: { ...validatedFields.data, thumbnail: thumbnailUrl },
  });
  if (data) return { message: "Post created successfully", ok: true };
  return {
    message: "Failed to create post",
    ok: false,
    data: Object.fromEntries(formData.entries()),
  };
};
