import { JobsService } from "@/services/jobs";
import {useQuery} from 'react-query'



const jobService = new JobsService();

const useGetJobs = () =>
    useQuery(
      ['Jobs'],
      () => jobService.fetchJobs(),
      { retry: false, refetchOnWindowFocus: false, keepPreviousData: true }
    );

export {
    useGetJobs
};