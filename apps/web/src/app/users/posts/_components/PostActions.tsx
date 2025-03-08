import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Link from "next/link";

type Props = {
  postId: number;
};
const PostActions = ({ postId }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/users/posts/${postId}/edit`}
              className="border p-2 border-yellow-300 rounded-md  text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-300"
            >
              <PencilIcon className="w-4 " />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-yellow-500  text-white  px-3 rounded-md">
            Edit This Post
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/users/posts/${postId}/delete`}
              className="border p-2 border-red-300 rounded-md  text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <TrashIcon className="w-4 " />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-red-500  text-white  px-3 rounded-md">
            Delete This Post
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostActions;
