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
}

