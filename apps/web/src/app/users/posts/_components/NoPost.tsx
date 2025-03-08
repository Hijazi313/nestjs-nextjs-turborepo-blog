import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { AppNavigation } from "../../../../constants/app";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
const NoPost = () => {
  return (
    <div className="mt-32 flex-col items-center gap-5  ">
      <p className="text-center p-4 text-5xl  text-slate-400">No Post Yet!</p>
      <Button variant="outline" asChild>
        <Link href={AppNavigation.createPost}>
          <span>
            <PencilSquareIcon className="w-6 h-6" />
          </span>
          <span>Write a post</span>
          Create Post
        </Link>
      </Button>
    </div>
  );
};

export default NoPost;
