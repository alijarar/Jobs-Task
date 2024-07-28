import { useEffect, useState } from "react";
import "./App.css";
import { useGetJobById, useGetJobs } from "./hooks/useJobs";
import { Input } from "./components/ui/input";
import useDebounce from "./hooks/useDebounce";
import { CreateJobDialog } from "./components/dialog";
import JobCard from "./components/jobCard";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const {
    isLoading: isJobsLoading,
    isSuccess: isJobsSuccess,
    data: jobsData,
    refetch,
  } = useGetJobs();

  const {
    data: jobById,
  } = useGetJobById(debouncedValue);

  useEffect(() => {
    // Fetch images only if jobsData is defined and not empty
    const fetchImages = async () => {
      if (!jobsData || jobsData.length === 0) {
        return;
      }

      try {
        const imageUrls = await Promise.all(
          Array.from(
            { length: jobsData.length },
            (_, i) =>
              fetch(`https://picsum.photos/200/300?random=${i + 1}`).then(
                (response) => response.url
              ) // Get the image URL
          )
        );
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [jobsData]);

  const getImageUrl = (jobId: string) => {
    const index = parseInt(jobId, 10) % images.length;
    return images[index] || "";
  };

  if (isJobsLoading) {
    return <div>Loading...</div>;
  }

  if (!isJobsSuccess || !jobsData) {
    return <div>Error loading jobs</div>;
  }

  const displayedJobs = debouncedValue && jobById ? [jobById] : jobsData;

  return (
    <div>
      <div className="flex m-auto w-[300px]">
        <div>
          <div className="mb-2 mt-2 w-[300px]">
            <h4>Search</h4>
          </div>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Search Job"
          />
        </div>
        <div className="m-10">
          <CreateJobDialog refetch={refetch}></CreateJobDialog>
        </div>
      </div>
      <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {displayedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={{ ...job, imageUrl: getImageUrl(job?.id) }}
          />
        ))}
      </div>
      <Toaster />
    </div>
  );
}

export default App;
