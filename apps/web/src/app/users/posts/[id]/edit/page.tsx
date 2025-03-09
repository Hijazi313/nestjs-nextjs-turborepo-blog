import { fetchPostById } from "../../../../../actions/post.action";
import UpdatePostContainer from "./_components/UpdatePostContainer";

type Props = {
  params: { id: string };
};
const UpdatePostPage = async ({ params }: Props) => {
  const { id } = await params;
  const { data: post } = await fetchPostById(parseInt(id));
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
      <h2 className="text-lg font-bold text-slate-700 text-center ">
        Update post
      </h2>
      <UpdatePostContainer post={post} />
    </div>
  );
};

export default UpdatePostPage;
