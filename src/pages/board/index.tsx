import { type NextPage } from "next";
import Head from "next/head";
import { Spinner } from "~/components/Spinner";
import { api } from "~/utils/api";

export const LatestPost = () => {
  const { data, isLoading, error } = api.posts.getLatest.useQuery(undefined, {
    refetchInterval: 1000 * 5,
    refetchIntervalInBackground: true,
  });
  if (isLoading) return <Spinner size={22} />;
  if (error) return <p className="text-red-400">Something went wrong</p>;
  return <p className="text-[10rem]">{data?.content}</p>;
};

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daily Emoji | Board</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌯</text></svg>"
        />
      </Head>
      <LatestPost />
    </>
  );
};

export default Page;
