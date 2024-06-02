import { z } from "zod";

export const IdSchema = z.object({ id: z.number() });
export const EventSchema = z.object({
  code: z.string().min(1, { message: "Código é obrigatório." }),
  name: z.string().min(3, { message: "Nome muito curto." }),
});
export type IdSchema = z.infer<typeof IdSchema>;
export type EventSchema = z.infer<typeof EventSchema>;
