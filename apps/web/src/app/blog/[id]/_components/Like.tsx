"use client";

import { SessionUser } from "../../../../lib/session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "lucide-react";
import {
  getPostLikes,
  likePost,
  unlikePost,
} from "../../../../actions/like.action";

type Props = {
  postId: number;
  user?: SessionUser;
};
const Like = ({ postId, user }: Props) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["post-likes", postId],
    queryFn: () => getPostLikes(postId),
  });
  const { mutate: likePostMutate } = useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-likes", postId] });
    },
  });
  const { mutate: unlikePostMutate } = useMutation({
    mutationFn: () => unlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-likes", postId] });
    },
  });
  return (
    <div className="flex mt-3 items-center justify-start gap-2">
      {data?.userLikedPost ? (
        <button
          disabled={!user}
          className="flex items-center gap-2"
          onClick={() => unlikePostMutate()}
        >
          <SolidHeartIcon className="w-6 h-6 text-rose-600 " />
        </button>
      ) : (
        <button
          disabled={!user}
          className="flex items-center gap-2"
          onClick={() => likePostMutate()}
        >
          <HeartIcon className="w-6 h-6" />
        </button>
      )}
      <p className="text-sm text-gray-500">{data?.likesCount}</p>
    </div>
  );
};

export default Like;
