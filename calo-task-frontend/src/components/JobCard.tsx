import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/@types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type JobCardProps = React.ComponentProps<typeof Card> & {
  job: Job & { imageUrl?: string }; // Add imageUrl to Job type
};
function JobCard({ className, job, ...props }: JobCardProps) {
  return (
    <Card className={cn("w-full sm:w-[380px]", className)} {...props}>
      <CardHeader>
      {job.imageUrl && (
          <div>
            <LazyLoadImage
            key={job.id}
            src={job.imageUrl}
            effect="blur"
            placeholderSrc={job.imageUrl}
            alt={job.title}
            className="w-[333px] h-[333px] object-cover"
          />
          </div>
        )}
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

export default JobCard;
