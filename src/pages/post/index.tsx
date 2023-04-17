import { type NextPage } from "next";
import Head from "next/head";
import { Spinner } from "~/components/Spinner";
import { api } from "~/utils/api";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Post, PostSchema } from "~/validators/post";
import toast from "react-hot-toast";

const LatestPost = () => {
  const { data, isLoading, error } = api.posts.getLatest.useQuery();
  if (isLoading) return <Spinner size={22} />;
  if (error) return <p className="text-red-400">Something went wrong</p>;
  return (
    <div>
      <p>Currently showing: </p>
      <p className=" text-center text-2xl">{data?.content}</p>
    </div>
  );
};

const NewPost = () => {
  const ctx = api.useContext();
  const { mutateAsync, isLoading } = api.posts.create.useMutation({
    onSuccess: () => {
      void ctx.posts.getLatest.invalidate();
      reset();
      toast.success("Posted!");
    },
    onError: (e) => {
      const validationError = e.data?.zodError?.fieldErrors.content;
      validationError && validationError[0]
        ? toast.error(validationError[0])
        : toast.error(e.message);
    },
  });

  const { register, handleSubmit, watch, reset } = useForm<Post>({
    resolver: zodResolver(PostSchema),
  });
  const content = watch("content");

  const onSubmit: SubmitHandler<Post> = async (data) => await mutateAsync(data);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit, (e) =>
          toast.error(e.content?.message ?? "An error ocurred please try again")
        )();
      }}
      className="flex flex-row justify-between gap-4"
    >
      <div>
        <input
          autoFocus
          className="h-12 w-full grow appearance-none border-slate-100 bg-transparent p-2 text-center outline-none focus:border-b-2"
          placeholder="Post something..."
          {...register("content")}
          type="text"
          disabled={isLoading}
        />
      </div>

      <button
        data-hidden={!content}
        disabled={!content || isLoading}
        className="transition-opacity data-[hidden='true']:opacity-0"
      >
        Post
      </button>
    </form>
  );
};

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daily Emoji | Post</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌯</text></svg>"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-purple-900 to-purple-950 text-slate-100">
        <NewPost />
        <LatestPost />
      </main>
    </>
  );
};

export default Page;
