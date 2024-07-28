import { Job } from "@/@types/types";
import { JobsService } from "@/services/jobs";
import { useQuery, useMutation } from "react-query";

const jobService = new JobsService();

const useGetJobs = () =>
  useQuery(
    ['Jobs'],
    () => jobService.fetchJobs(),
    {
      retry: 2,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30 // 30 minutes
    }
  );

const useCreateJob = () => {
  return useMutation(
    (newJob: Partial<Job>) => jobService.createJob(newJob),
    {
      onSuccess: () => {
      },
      onError: (error) => {
        console.error(error);
      }
    }
  );
};

const useGetJobById = (jobId: string) =>
  useQuery<Job, any>(
    ['JobById', jobId],
    () => jobService.fetchJobById(jobId),
    {
      retry: 2,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30 // 30 minutes
    }
  );

export {
  useGetJobs,
  useGetJobById,
  useCreateJob
};
