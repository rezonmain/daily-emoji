import { type NextPage } from "next";
import Head from "next/head";
import { Spinner } from "~/components/Spinner";
import { api } from "~/utils/api";

const LatestPost = () => {
  const { data, isLoading, error } = api.posts.getLatest.useQuery();
  if (isLoading) return <Spinner size={22} />;
  if (error) return <p className="text-red-400">Something went wrong</p>;
  return (
    <p className="text-white">
      Currently showing:{" "}
      <pre className=" text-center text-2xl">{data?.content}</pre>
    </p>
  );
};

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daily Emoji | Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl font-bold text-white">Post</h1>
        <LatestPost />
      </main>
    </>
  );
};

export default Page;
