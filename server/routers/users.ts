import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { asc } from "drizzle-orm";
import { publicProcedure, router } from "../trpc";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { z } from "zod";

export const usersRouter = router({
  get: publicProcedure.query(async () => {
    return await db.select().from(users).orderBy(asc(users.id));
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const salt = genSaltSync(10);
      const hash = hashSync(input.password, salt);

      await db.insert(users).values({
        name: input.name,
        username: input.username,
        email: input.email,
        password: hash,
      });
    }),
});
