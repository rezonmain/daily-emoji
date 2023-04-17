import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PostSchema } from "~/validators/post";

export const postRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: publicProcedure.input(PostSchema).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.post.create({
      data: {
        content: input.content,
      },
    });
  }),
});
