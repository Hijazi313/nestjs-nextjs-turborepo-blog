import { Post } from "../types/modelTypes";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};
const Posts = (props: Props) => {
  return (
    <section className="py-16 container mx-auto m-8 max-w-5xl">
      <h2 className="text-5xl font-bold text-center text-gray-600 leading-tight mb-8">
        Latest posts are here
      </h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 rounded-t-md  mb-9 w-96"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {props.posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};

export default Posts;
