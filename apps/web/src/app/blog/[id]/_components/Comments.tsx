"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostComments } from "../../../../actions/comment.action";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../../../../constants/app";
import CommentCard from "./CommentCard";
import CommentPagination from "./CommentPagination";
import CommentsCardsSkelton from "./CommentsCardsSkeleton";
import { SessionUser } from "../../../../lib/session";
import AddComment from "./AddComment";
// Import with alias to avoid conflict with DOM Comment interface
import { Comment as CommentType } from "../../../../types/model-types";

type Props = {
  postId: number;
  user?: SessionUser;
};

type CommentResponse = {
  data: CommentType[];
  count: number;
};

const Comments = ({ postId, user }: Props) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<CommentResponse, Error>({
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

  // Create a type-safe wrapper for the refetch function
  const handleRefetch = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["GET_POST_COMMENTS", postId, page],
    });
  };

  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg  mb-4 text-slate-700">Comments</h6>
      {!!user && (
        <AddComment postId={postId} user={user} refetch={handleRefetch} />
      )}
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
