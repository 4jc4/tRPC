import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { EventSchema, IdSchema } from "~/lib/schemas/event-schema";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany();
  }),

  getOne: publicProcedure.input(IdSchema).query(async ({ ctx, input }) => {
    return await ctx.db.event.findFirst({
      where: {
        id: input.id,
      },
    });
  }),

  createEvent: publicProcedure
    .input(EventSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.event.create({
        data: {
          name: input.name,
          code: input.code,
        },
      });
    }),

  deleteEvent: publicProcedure
    .input(IdSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.event.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
