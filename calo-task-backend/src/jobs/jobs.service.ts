import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { CreateJobDto } from './dto/create-job.dto';
import axios from 'axios';
import {ConfigService} from '@nestjs/config'
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

// Update the path to the db.json file
const JOBS_FILE = path.resolve(process.cwd(), 'src/database/db.json');
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random';

@Injectable()
export class JobsService {

  constructor(
    @InjectQueue('jobs') private readonly jobsQueue: Queue,
  ) { }
  
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

  async getJobById(jobId: string): Promise<any> {
    const jobs = await this.getJobs();
    const findJob = jobs.find(job => job.id === jobId);
    return findJob;
  }

  async fetchRandomImage(category: string): Promise<{ blurhash: string, imageUrl: string }> {
    try {
      const response = await axios.get(UNSPLASH_API_URL, {
        params: {
          query: category
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
        },
      });
      const imageUrl = response.data.urls.regular;
      const blurhash = response.data.blur_hash;
      return { blurhash, imageUrl };
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
      throw new Error('Failed to fetch image');
    }
  }

  private getRandomDelay(): number {
    const minDelay = 5000; // 5 seconds
    const maxDelay = 30000; // 5 minutes
    const delay = Math.floor(Math.random() * ((maxDelay - minDelay) / 5000 + 1)) * 5000 + minDelay;
    
    console.log(`Calculated delay: ${delay / 1000} seconds`);
    
    return delay;
  }
  

  async createJob(jobData: CreateJobDto) {
    try {
      const jobs = await this.getJobs();
      const newJobObj = {
        id: (jobs.length + 1).toString(),
        ...jobData,
        imageData: null,
      };
      jobs.push(newJobObj);
      await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2));
      
      await this.jobsQueue.add('processJob', newJobObj, { delay: this.getRandomDelay() });

      return newJobObj;
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }

  async updateJobWithImage(jobId: string, imageData: { blurhash: string, imageUrl: string }) {
    const jobs = await this.getJobs();
    const jobIndex = jobs.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
      jobs[jobIndex].imageData = imageData;
      await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2));
    }
  }
}
