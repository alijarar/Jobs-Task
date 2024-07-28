import { Job } from "@/@types/types";
import { HttpService } from "../http";
import { JOBS_BACKEND_URL } from "@/constants/common";
const baseUrl = JOBS_BACKEND_URL

export class JobsService extends HttpService {
  fetchJobs = async (): Promise<Job[]> => {
    try {
      const apiResponse = await this.get(
        `${baseUrl}/jobs`
      );

      return apiResponse?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  createJob = async (createJobDto: Partial<Job>): Promise<Job> => { // Change the type here
    try {
      const apiResponse = await this.post(`${baseUrl}/jobs`, createJobDto);
      return apiResponse as any;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  fetchJobById = async (jobId: string): Promise<Job> => {
    try {
      const apiResponse = await this.get(`${baseUrl}/jobs/${jobId}`);
      return apiResponse?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

