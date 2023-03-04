import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      return ctx.prisma.shoppingItem.create({
        data: {
          name,
        },
      });
    }),
  queryItems: publicProcedure.input(z.object({})).query(async ({ ctx }) => {
    return ctx.prisma.shoppingItem.findMany();
  }),
  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.prisma.shoppingItem.delete({
        where: {
          id,
        },
      });
    }),
});
