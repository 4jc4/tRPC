import { type ColumnDef } from "@tanstack/react-table";
import { type Event } from "~/types/event-types";
import DataTableColumnHeader from "~/components/DataTable/DataTableColumnHeader";
import DataTableRowActions from "~/components/DataTable/DataTableRowActions";

interface EventsColumnsProps {
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export const getEventsColumns = ({
  onEdit,
  onDelete,
}: EventsColumnsProps): ColumnDef<Event>[] => [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="text-left"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
    size: 50,
  },
];
