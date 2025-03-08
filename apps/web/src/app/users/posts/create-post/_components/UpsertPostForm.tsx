"use client";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { useEffect, useState } from "react";
import Image from "next/image";
import SubmitButton from "../../../../../components/SubmitButton";
import { CreatePostFormState } from "../../../../../types/form-state";
import { toast } from "sonner";
type Props = {
  formState: CreatePostFormState;
  formAction: (formData: FormData) => void;
};
const UpsertPostForm = ({ formState, formAction }: Props) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  useEffect(() => {
    if (formState?.ok) {
      toast.success(formState.message);
    }
  }, [formState]);
  return (
    <div>
      <form
        action={formAction}
        className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition [&>div>input]:focus-visible:ring-0 [&>div>textarea]:focus-visible:ring-0 [&>div>input]:focus-visible:ring-offset-0 [&>div>textarea]:focus-visible:ring-offset-0"
      >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={formState?.data?.title}
          />
          {formState?.errors?.title && (
            <p className="text-red-500">{formState.errors.title}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="content"
            className="text-sm font-medium text-slate-700"
          >
            Content
          </Label>
          <Textarea
            id="content"
            name="content"
            rows={6}
            className="resize-none"
            defaultValue={formState?.data?.content}
          />
          {formState?.errors?.content && (
            <p className="text-red-500">{formState.errors.content}</p>
          )}
        </div>
        <div>
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            className="file:cursor-pointer file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setThumbnail(URL.createObjectURL(file));
              }
            }}
          />
          {!!thumbnail && (
            <Image
              src={thumbnail}
              alt="Thumbnail"
              width={200}
              height={200}
              className="mt-2 rounded-md"
            />
          )}
          {formState?.errors?.thumbnail && (
            <p className="text-red-500">{formState.errors.thumbnail}</p>
          )}
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            type="text"
            id="tags"
            name="tags"
            placeholder="Tag1, Tag2, Tag3"
            defaultValue={formState?.data?.tags}
          />
          {formState?.errors?.tags && (
            <p className="text-red-500">{formState.errors.tags}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="mx-2 w-4 h-4"
            defaultChecked={formState?.data?.published}
          />
          <Label htmlFor="published">Publish Now</Label>
          {formState?.errors?.published && (
            <p className="text-red-500">{formState.errors.published}</p>
          )}
        </div>
        <SubmitButton>Create Post</SubmitButton>
      </form>
    </div>
  );
};

export default UpsertPostForm;
