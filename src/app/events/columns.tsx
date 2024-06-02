import { z } from "zod";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDateString } from "~/lib/utils";
import { Button } from "~/components/ui/button";

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
