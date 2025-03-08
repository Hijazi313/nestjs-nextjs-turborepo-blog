import { fetchUserPosts } from "@/actions/post.action";
import { DEFAULT_PAGE_SIZE } from "../../../constants/app";
import NoPost from "./_components/NoPost";
import PostsList from "./_components/PostsList";

type Props = {
  searchParams: Promise<{ page: number; pageSize: number }>;
};
const UserPosts = async ({ searchParams }: Props) => {
  const { page, pageSize } = await searchParams;
  const { data, count } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: pageSize || DEFAULT_PAGE_SIZE,
  });
  return (
    <div>
      {data?.length === 0 ? (
        <NoPost />
      ) : (
        <PostsList
          posts={data}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(count / (pageSize || DEFAULT_PAGE_SIZE))}
        />
      )}
    </div>
  );
};

export default UserPosts;
