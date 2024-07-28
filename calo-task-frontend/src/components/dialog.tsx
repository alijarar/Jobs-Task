import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useCreateJob } from "@/hooks/useJobs";
import { useEffect, useState } from "react";
import { DialogProps } from "@/@types/types";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string().min(3, {
    message: "Category must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function CreateJobDialog({ refetch }: DialogProps) {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const {
    isSuccess,
    isError,
    mutateAsync: createJobMutation,
  } = useCreateJob();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createJobMutation(values);
      refetch();
      setOpen(false);
    } catch (error) {
      
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Success", description: "Job created successfully!" });
    } else if (isError) {
      toast({
        variant: "destructive",
        description: "Failed to create job. Please try again.",
      });
    }
  }, [isSuccess,isError])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Job</DialogTitle>
          <DialogDescription>
            Fill the fields to add job. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col items-start gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Title"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Category"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your description here."
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
