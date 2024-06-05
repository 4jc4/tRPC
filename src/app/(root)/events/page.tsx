"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import EventForm from "./EventForm";
import { api } from "~/trpc/react";
import { type Event } from "~/types/event-types";
import DataTable from "~/components/DataTable/DataTable";

import { getEventsColumns } from "./eventColumns";
import { useCallback, useMemo } from "react";
import { useToast } from "~/components/ui/use-toast";

export default function EventPage() {
  const fetchAllEvents = api.event.getAll.useQuery();
  const data = fetchAllEvents.data ?? [];
  const { toast } = useToast();

  const deleteMutation = api.event.deleteEvent.useMutation();

  const onDelete = useCallback(
    (event: Event) => {
      deleteMutation.mutate(
        { id: event.id },
        {
          onSuccess: () => {
            toast({ description: "event was deleted successfuly" });
          },
          onError: () => {
            toast({
              variant: "destructive",
              title: "Uh Oh! Something went wrong!",
              description: "There was a problem with your request.",
            });
          },
        },
      );
    },
    [deleteMutation, toast],
  );

  const onEdit = useCallback(
    (event: Event) => {
      deleteMutation.mutate({ id: event.id });
    },
    [deleteMutation],
  );

  const columns = useMemo(
    () => getEventsColumns({ onEdit, onDelete }),
    [onDelete, onEdit],
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <EventForm />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={columns} />
      </CardContent>
    </Card>
  );
}
