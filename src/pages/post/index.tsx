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
    <>
      <p className="text-white">Currently showing: </p>
      <p className=" text-center text-2xl">{data?.content}</p>
    </>
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(PostSchema),
  });
  const content = watch("content");

  const onSubmit: SubmitHandler<Post> = async (data) => await mutateAsync(data);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)();
      }}
      className="flex flex-row justify-between gap-4 border-none text-white outline-none"
    >
      <div>
        <input
          autoFocus
          className=" h-10 w-48 grow bg-transparent p-2"
          placeholder="Post something..."
          {...register("content")}
          type="text"
          disabled={isLoading}
        />
        {!!errors.content && (
          <p className=" max-w-prose pt-2 text-red-400">
            {errors.content.message}
          </p>
        )}
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <NewPost />
        <LatestPost />
      </main>
    </>
  );
};

export default Page;
