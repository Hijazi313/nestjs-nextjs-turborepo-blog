"use client";
import { updatePost } from "../../../../../../actions/post.action";
import { Post } from "../../../../../../types/model-types";
import UpsertPostForm from "../../../create-post/_components/UpsertPostForm";
import { useState } from "react";
import { CreatePostFormState } from "../../../../../../types/form-state";

type Props = {
  post: Post;
};

const UpdatePostContainer = ({ post }: Props) => {
  // Create initial form state
  const [formState, setFormState] = useState<CreatePostFormState>({
    data: {
      title: post.title,
      content: post.content,
      published: post.published,
      tags: post.tags.map((tag) => tag.name).join(","),
    },
    errors: {},
  });

  // Create a wrapper for the updatePost action that includes the post ID
  const handleFormAction = async (formData: FormData) => {
    // Add the post ID to the form data
    formData.append("postId", post.id.toString());

    // Call the updatePost action
    const result = await updatePost(formState, formData);

    // Update the form state with the result
    setFormState(result);

    return result;
  };

  return <UpsertPostForm formState={formState} formAction={handleFormAction} />;
};

export default UpdatePostContainer;
