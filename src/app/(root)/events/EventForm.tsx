"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useState } from "react";
import { type CreateEventDto } from "~/types/event-types";
import { useToast } from "~/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  code: z.string().min(1, { message: "code is empty" }),
  name: z.string().min(5, { message: "name is to short" }),
});

const EventForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
    },
    mode: "onChange",
  });

  const createMutation = api.event.createEvent.useMutation({
    // mutationFn: createEvent,
    onSuccess: () => {
      toast({
        description: "Event was added successfully",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (
    values: z.infer<typeof formSchema>,
  ) => {
    const createDto: CreateEventDto = {
      code: values.code,
      name: values.name,
    };
    createMutation.mutate(createDto);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button size="sm">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="1234" {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name here..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            disabled={!form.formState.isValid || createMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {createMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
