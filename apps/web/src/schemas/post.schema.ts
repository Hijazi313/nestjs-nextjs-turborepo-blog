import { z } from "zod";

export const createPostFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: z.string().min(20, "Content is required"),
  thumbnail: z.instanceof(File).optional(),
  //comma separated
  tags: z
    .string()
    .min(1, "Tags are required")
    .max(100, "Tags must be less than 100 characters")
    .refine((value) => {
      const tags = value.split(",");
      return tags.every((tag) => tag.trim() !== "");
    }, "Tags must be comma separated")
    .transform((value) => value.split(",")),
  published: z.string().transform((val) => val === "on"),
});

export type CreatePostFormState = z.infer<typeof createPostFormSchema>;
