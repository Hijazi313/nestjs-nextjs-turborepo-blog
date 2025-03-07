import SubmitButton from "../../../../components/SubmitButton";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { SessionUser } from "../../../../lib/session";
import { cn } from "../../../../lib/utils";
import { createComment } from "../../../../actions/comment.action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: () => void;
};
const AddComment = ({ postId, className, user, refetch }: Props) => {
  const [state, formAction] = useActionState(createComment, undefined);

  useEffect(() => {
    if (state?.errors) {
      toast.error(Object.values(state?.errors).join(", "));
    }
    if (state?.message) {
      toast.success(state?.message);
    }
    if (state?.ok) {
      refetch();
    }
  }, [state]);
  console.log({ state });
  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button>Add Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <form className={cn(className)} action={formAction}>
            <input type="hidden" name="postId" defaultValue={postId} />
            <Label htmlFor="content" className="sr-only">
              Comment
            </Label>
            <div className="border-t  border-x rounded-t-md">
              <Textarea
                id="content"
                name="content"
                placeholder="Add a comment"
                className="resize-none border-none active:outline-none focus-visible:ring-0 shadow-none "
              />
              {!!state?.errors?.content && (
                <p className="text-red-500 text-sm">{state?.errors?.content}</p>
              )}
            </div>
            <p className=" border rounded-b-md p-2 text-gray-500">
              <span className="text-slate-400">Write as </span>
              <span className="text-slate-700 font-bold">{user?.name}</span>
            </p>
            <SubmitButton className="mt-2">Submit</SubmitButton>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
