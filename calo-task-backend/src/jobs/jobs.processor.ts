import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { JobsService } from './jobs.service';

@Processor('jobs')
export class JobsProcessor {
  constructor(private readonly jobsService: JobsService) {}

  @Process('processJob') // Corrected job type
  async handleJob(job: Job) {
    console.log(`Processing job ${job.id} with data:`, job.data);
    try {
      const { blurhash, imageUrl } = await this.jobsService.fetchRandomImage(job.data.category);
      await this.jobsService.updateJobWithImage(job.data.id, { blurhash, imageUrl });
      console.log(`Job ${job.id} completed successfully`);
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
    }
  }
}
