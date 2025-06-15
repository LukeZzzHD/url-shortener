import { z } from "zod";
import { nanoid } from "nanoid";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const urlRouter = createTRPCRouter({
  // Test route
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({
      greeting: `Hello ${input.text}`,
    })),

  // Create a shortened URL
  create: publicProcedure
    .input(z.object({ originalUrl: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      console.log(`ctx: ${JSON.stringify(await ctx.db.url.findMany())}`);

      const existing = await ctx.db.url.findFirst({
        where: { originalUrl: input.originalUrl },
      });

      if (existing) return existing;

      const shortUrl = nanoid(6);

      const newEntry = await ctx.db.url.create({
        data: {
          originalUrl: input.originalUrl,
          shortUrl,
        },
      });

      return newEntry;
    }),

  // Retrieve original URL by short ID
  get: publicProcedure
    .input(z.object({ shortId: z.string() }))
    .query(async ({ input, ctx }) => {
      const urlEntry = await ctx.db.url.findFirst({
        where: { shortUrl: input.shortId },
      });

      if (!urlEntry) {
        throw new Error("URL not found");
      }

      return {
        originalUrl: urlEntry.originalUrl,
        createdAt: urlEntry.createdAt,
      };
    }),
  getByShortUrl: publicProcedure
    .input(z.object({ shortUrl: z.string() }))
    .query(async ({ input, ctx }) => {
      const urlEntry = await ctx.db.url.findFirst({
        where: { shortUrl: input.shortUrl },
      });

      if (!urlEntry) {
        throw new Error("URL not found");
      }

      return urlEntry;
    }),
});
