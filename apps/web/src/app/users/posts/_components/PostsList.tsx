import Pagination from "../../../../components/Pagination";
import { Post } from "../../../../types/model-types";
import PostListItem from "./PostListItem";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  //   onPageChange: (page: number) => void;
};
const PostsList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 gap-4 rounded-md shadow m-3 p-3 text-center">
        <div className="col-span-3"></div>
        {/* <div className="w-full h-48 bg-gray-200 rounded-md"></div> */}
        <div>Date</div>
        <div>Published</div>
        {/* <div>Likes</div>
        <div>Comments</div> */}
        <div>Actions</div>
        <div></div>
      </div>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostsList;
