import { z } from "zod";

// Create comment schema
export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment is required"),
  postId: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Post ID must be a number",
    }),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
