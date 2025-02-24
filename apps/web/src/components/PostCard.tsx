import Image from "next/image";
import { Post } from "../types/modelTypes";
import Link from "next/link";
type Props = Partial<Post>;
const PostCard = ({ title, createdAt, id, thumbnail, content }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col ">
      <div className="relative h-60 ">
        <Image src={thumbnail ?? "/no-image.png"} alt={title ?? ""} fill />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-bold break-words text-center text-gray-600">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-center p-2 ">
          {createdAt
            ? new Date(createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Date not available"}
        </p>
        <p className="mt-4 text-gray-700 break-words">
          {content?.slice(0, 100)}...
        </p>
        <Link
          className="text-indigo-600 hover:underline mt-auto text-right block"
          href={`/blog/${id}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
