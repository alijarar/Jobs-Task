import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Job } from "@/@types/types";

type JobCardProps = React.ComponentProps<typeof Card> & {
  job: Job;
};

export function JobCard({ className, job, ...props }: JobCardProps) {
  return (
    <Card className={cn("w-full sm:w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <h3 className="text-lg font-semibold">Category</h3>
          <p className="text-sm text-muted-foreground">{job.category}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-sm text-muted-foreground">{job.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
