"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "~/lib/schemas/event-schema";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { api } from "~/trpc/react";

export default function EventForm() {
  const form = useForm<EventSchema>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });
  const eventMutation = api.event.createEvent.useMutation();

  const handleSubmit = (values: EventSchema) => {
    eventMutation.mutate(values, {
      onSuccess: () => {
        console.log("Evento cadastrado com sucesso!");
      },
    });
    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder="Código" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="bg-blue-500">
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
}
