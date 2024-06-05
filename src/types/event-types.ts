import { z } from "zod";
import { type Prisma } from "../server/db";

export const CreateEventSchema = z.object({
  code: z.string().min(1, { message: "Código é obrigatório." }),
  name: z.string().min(3, { message: "Nome muito curto." }),
});

export type CreateEventDto = z.infer<typeof CreateEventSchema>;
export type Event = Prisma.EventGetPayload<Prisma.EventDefaultArgs>;
