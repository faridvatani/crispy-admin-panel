import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { count, ilike, or } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
  get: publicProcedure
    .input(
      z.object({
        page: z.number(),
        totalItems: z.number(),
        search: z.string().nullable(),
      }),
    )
    .query(async (opts) => {
      try {
        const { input } = opts;

        const offset = (input.page - 1) * input.totalItems;
        const limit = input.totalItems;

        const [totalCount] = await db
          .select({ count: count() })
          .from(users)
          .where(
            or(
              input.search
                ? ilike(users.email, `%${input.search}%`)
                : undefined,
              input.search ? ilike(users.name, `%${input.search}%`) : undefined,
            ),
          );

        const totalPages = Math.ceil(totalCount.count / limit);
        const items = await db
          .select()
          .from(users)
          .offset(offset)
          .limit(limit)
          .where(
            or(
              input.search
                ? ilike(users.email, `%${input.search}%`)
                : undefined,
              input.search ? ilike(users.name, `%${input.search}%`) : undefined,
            ),
          );

        return {
          items,
          totalPages,
        };
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
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
