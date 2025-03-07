import Image from "next/image";
import { fetchPostById } from "../../../actions/post.action";
import SanitizedContent from "./_components/SanitizedContent";
import Comments from "./_components/Comments";
import { getSession } from "../../../lib/session";
import Like from "./_components/Like";
type Props = {
  params: {
    id: string;
  };
};
const PostPage = async ({ params }: Props) => {
  const postId = Number((await params).id);
  const { data: post } = await fetchPostById(postId);
  const session = await getSession();
  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-4 ">
        By {post?.author?.name} |{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="relative w-80 h-60">
        <Image
          alt={post.title}
          src={post.thumbnail ?? "/no-image.png"}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="mt-8">
        <SanitizedContent content={post.content} />
      </div>
      <Like postId={postId} user={session?.user} />
      <Comments postId={postId} user={session?.user} />
    </main>
  );
};

export default PostPage;
