import { z } from "zod";

export const IdSchema = z.object({ id: z.number() });
export const EventSchema = z.object({
  code: z.string(),
  name: z.string().min(3, { message: "Name too short." }),
});
export type IdSchema = z.infer<typeof IdSchema>;
export type EventSchema = z.infer<typeof EventSchema>;
