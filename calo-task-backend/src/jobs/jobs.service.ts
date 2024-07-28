import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { CreateJobDto } from './dto/create-job.dto';
import axios from 'axios';
import {ConfigService} from '@nestjs/config'

// Update the path to the db.json file
const JOBS_FILE = path.resolve(process.cwd(), 'src/database/db.json');
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/random';

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


  async getJobById(jobId: string): Promise<any> {
    const jobs = await this.getJobs();
    const findJob = jobs.find(job => job.id === jobId);

    return findJob;
  }

  private async fetchRandomImage(catergory:string): Promise<{ blurhash: string, imageUrl: string }> {
    try {
      const response = await axios.get(UNSPLASH_API_URL, {
        params: {
          query: catergory
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

  async createJob (jobData: CreateJobDto){
    try {
      const { blurhash, imageUrl } = await this.fetchRandomImage(jobData.category);
      const jobs = await this.getJobs();
      const newJobObj = {
        id: (jobs.length + 1).toString(),
        ...jobData,
        imageData: { blurhash, imageUrl },
      }
      jobs.push(newJobObj);
      await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2));
      return newJobObj
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }
}
