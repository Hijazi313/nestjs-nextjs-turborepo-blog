import { Skeleton } from "../../../../components/ui/skeleton";

const CommentsCardsSkelton = () => {
  return (
    <div className="p-2 flex flex-col gap-3 rounded-md shadow-md">
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-48 h-4" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-96 h-8" />
        </div>
      </div>
    </div>
  );
};

export default CommentsCardsSkelton;
