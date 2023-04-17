import { z } from "zod";

export const PostSchema = z.object({
  content: z
    .string()
    .nonempty()
    .emoji({ message: "Only emojis are allowed" })
    .min(1)
    .max(10),
});

export type Post = z.infer<typeof PostSchema>;
