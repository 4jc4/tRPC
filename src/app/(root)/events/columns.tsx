import { z } from "zod";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import DataTableRowActions from "../../../components/DataTable/DataTableRowActions";

const EventSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string().min(3, { message: "Name too short." }),
  createdAt: z.date(),
});
export type EventSchema = z.infer<typeof EventSchema>;

interface ColumnsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const getEventsColumns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<EventSchema>[] => [
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
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
