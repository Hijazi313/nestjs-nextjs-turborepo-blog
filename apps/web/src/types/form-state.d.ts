export type SignUpFormState =
  | {
      data: {
        name?: string;
        email?: string;
        password?: string;
      };
      errors: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CommentFormState =
  | {
      data?: {
        content?: string;
        postId?: number;
      };
      errors?: {
        content?: string[];
      };
      message?: string;
      ok?: boolean;
      open?: boolean;
    }
  | undefined;

export type CreatePostFormState =
  | {
      data?: {
        title?: string;
        content?: string;
        thumbnail?: File | null;
        tags?: string;
        published?: boolean;
      };
      errors?: {
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        tags?: string[];
        published?: string[];
      };
      message?: string;
      ok?: boolean;
    }
  | undefined;
