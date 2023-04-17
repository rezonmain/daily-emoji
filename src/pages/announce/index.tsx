import { type NextPage } from "next";
import Head from "next/head";

export const Announcement = () => {
  return (
    <div className=" bg-white text-[10rem]">
      <span>Go to </span>
      <code className="rounded-md bg-slate-100 text-blue-700">
        https://6416.love
      </code>
      <span> to update the emojis:</span>
    </div>
  );
};

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daily Emoji | Announce</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌯</text></svg>"
        />
      </Head>
      <Announcement />
    </>
  );
};

export default Page;
