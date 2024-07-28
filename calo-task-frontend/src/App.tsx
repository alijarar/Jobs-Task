import { useEffect, useState } from "react";
import "./App.css";
import { useGetJobById, useGetJobs } from "./hooks/useJobs";
import { Input } from "./components/ui/input";
import useDebounce from "./hooks/useDebounce";
import { CreateJobDialog } from "./components/dialog";
import JobCard from "./components/jobCard";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

function App() {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const { toast } = useToast();

  const {
    isLoading: isJobsLoading,
    isSuccess: isJobsSuccess,
    data: jobsData,
    refetch,
  } = useGetJobs();

  const {
    data: jobById,
    isError: isErrorGetJobById,
    error: errorResponse,
  } = useGetJobById(debouncedValue);

  useEffect(() => {
    if (isErrorGetJobById && errorResponse) {
      const axiosError = errorResponse;
      const errorMessage = axiosError.response?.data?.message || 'No Job Found';
      toast({
        variant: "destructive",
        description: errorMessage,
        duration: 5000,
      });
    }
  }, [isErrorGetJobById, errorResponse, toast]);

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
          <JobCard key={job.id} job={{ ...job }} />
        ))}
      </div>
      <Toaster />
    </div>
  );
}

export default App;
