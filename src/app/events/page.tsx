"use client";

import { api } from "~/trpc/react";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

export default function Page() {
  const data = api.event.getAll.useQuery().data ?? [];

  return (
    <section className="py-2">
      <div className="container">
        <h1 className=" text-2xl font-bold">Eventos</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
