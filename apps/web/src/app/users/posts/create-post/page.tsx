import CreatePostContainer from "./_components/CreatePostContainer";

const CreatePostPage = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
      <h2 className="text-lg font-bold text-slate-700 text-center ">
        Create new post
      </h2>
      <CreatePostContainer />
    </div>
  );
};

export default CreatePostPage;
