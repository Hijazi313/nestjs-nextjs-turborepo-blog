"use client";
import { useActionState } from "react";
import { createPost } from "../../../../../actions/post.action";
import UpsertPostForm from "./UpsertPostForm";
const CreatePostContainer = () => {
  const [formState, formAction] = useActionState(createPost, {
    data: {},
    errors: {},
    message: "",
    ok: false,
  });
  return <UpsertPostForm formState={formState} formAction={formAction} />;
};

export default CreatePostContainer;
