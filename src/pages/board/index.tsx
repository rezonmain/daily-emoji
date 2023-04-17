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
  return (
    <>
      <p className="text-white">Currently showing: </p>
      <p className=" text-center text-2xl">{data?.content}</p>
    </>
  );
};

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daily Emoji | Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LatestPost />
    </>
  );
};

export default Page;
