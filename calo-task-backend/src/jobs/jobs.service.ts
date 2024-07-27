import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { CreateJobDto } from './dto/create-job.dto';

// Update the path to the db.json file
const JOBS_FILE = path.resolve(process.cwd(), 'src/database/db.json');

@Injectable()
export class JobsService {
  async getJobs(): Promise<any> {
    try {
      const data = await fs.readFile(JOBS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error:any) {
      return {
        message: "No Jobs found",
        data:[]
      };
    }
  }

  async createJob(jobData: CreateJobDto): Promise<void> {
    const jobs = await this.getJobs();
    jobs.push(jobData);
    await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2));
  }

  async getJobById(jobId: string): Promise<any> {
    const jobs = await this.getJobs();
    return jobs.find(job => job.id === jobId);
  }

  async saveJobResult(jobData: any): Promise<void> {
    try {
      const jobs = await this.getJobs();
      jobs.push({
        id:(jobs.length + 1).toString(),
        ...jobData,
      });
      await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2));
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }
}
