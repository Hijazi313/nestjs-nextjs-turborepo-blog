import { fetchPosts } from "../actions/post.action";
import Hero from "../components/hero";
import Posts from "../components/Posts";
import { DEFAULT_PAGE_SIZE } from "../constants/app";
import { getSession } from "../lib/session";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { data, count } = await fetchPosts({ page: Number(page ?? 1) });
  const session = await getSession();
  console.log(session);
  return (
    <main>
      {/* Hero Section of the page */}
      <Hero />
      <Posts
        posts={data}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(count / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}
