"use client";
import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "../../../../actions/comment.action";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../../../../constants/app";
import CommentCard from "./CommentCard";
import CommentPagination from "./CommentPagination";
import CommentsCardsSkelton from "./CommentsCardsSkeleton";
type Props = {
  postId: number;
};
const Comments = ({ postId }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () => {
      const res = await getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      });
      return res;
    },
  });
  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg  mb-4 text-slate-700">Comments</h6>
      <div className="flex flex-col gap-2">
        {isLoading
          ? Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
              <CommentsCardsSkelton key={index} />
            ))
          : data?.data?.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
      </div>
      <CommentPagination
        totalPages={Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE)}
        currentPage={page}
        setCurrentPage={(page) => setPage(page)}
        className="p-2"
      />
    </div>
  );
};

export default Comments;
