import { z } from "zod";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDateString } from "../../lib/utils";

const EventSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string().min(3, { message: "Name too short." }),
  createdAt: z.date(),
});
export type EventSchema = z.infer<typeof EventSchema>;

export const columns: ColumnDef<EventSchema>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const formatted = formatDateString(row.getValue("createdAt"));
      return <div className="font-medium">{formatted}</div>;
    },
  },
];
