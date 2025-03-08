import Image from "next/image";
import { Post } from "../../../../types/model-types";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/16/solid";
import PostActions from "./PostActions";

type Props = {
  post: Post;
};
const PostListItem = ({ post }: Props) => {
  return (
    <div className="grid grid-cols-8 gap-4 rounded-md shadow m-3 p-3 overflow-hidden border border-gray-200 shadow bg-white hover:scale-[1.02] transition-all duration-300">
      <div className="relative w-48 h-32">
        <Image
          src={post.thumbnail ?? "/no-image.png"}
          alt={post.title}
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <p className=" text-lg line-clamp-1 px-2  text-slate-700 ">
          {post.title}
        </p>
        <p className=" text-sm line-clamp-3 px-1 text-slate-500 ">
          {post.content}
        </p>
      </div>
      <p className="flex justify-center items-center">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="flex justify-center items-center">
        {post.published ? (
          <CheckBadgeIcon className="w-4 h-4" />
        ) : (
          <XMarkIcon className="w-4 h-4" />
        )}
      </p>
      <PostActions postId={post.id} />
    </div>
  );
};

export default PostListItem;
