"use server";

import { print } from "graphql";
import { GET_POST_COMMENTS } from "../graphql/queries.graphql";
import { authFetchGraphQL, fetchGraphQL } from "../lib/fetchGraphQL";
import { Comment } from "../types/model-types";
import { CommentFormState } from "../types/form-state";
import { createCommentSchema } from "../schemas/comment.schema";
import { CREATE_COMMENT_MUTATION } from "../graphql/mutations.graphql";
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

export const createComment = async (
  state: CommentFormState,
  formData: FormData
): Promise<CommentFormState> => {
  const validatedFields = createCommentSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    createCommentInput: { ...validatedFields.data },
  });
  // if (data.errors) return { message: "Something went wrong" };
  console.log({ data });
  if (data) {
    return {
      data: Object.fromEntries(formData.entries()),
      // errors: validatedFields.error.flatten().fieldErrors,
      message: "Comment created successfully",
      ok: true,
      open: false,
    };
  }
  return {
    data: Object.fromEntries(formData.entries()),
    // errors: validatedFields?.error?.flatten().fieldErrors,
    message: "Something went wrong",
    ok: false,
    open: false,
  };
  // redirect(`/posts/${validatedFields.data.postId}`);
};
