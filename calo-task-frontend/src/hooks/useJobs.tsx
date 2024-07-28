import { Job } from "@/@types/types";
import { JobsService } from "@/services/jobs";
import {useQuery, useMutation} from 'react-query'



const jobService = new JobsService();

const useGetJobs = () =>
    useQuery(
      ['Jobs'],
      () => jobService.fetchJobs(),
      { retry: false, refetchOnWindowFocus: false, keepPreviousData: true }
  );
    
  const useCreateJob = () => {
    return useMutation(
      (newJob: Partial<Job>) => jobService.createJob(newJob),
      {
        onSuccess: () => {
          // You might want to invalidate or refetch queries here
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
        { retry: false, refetchOnWindowFocus: false }
      );

export {
  useGetJobs,
  useGetJobById,
  useCreateJob
};