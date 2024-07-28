import { Controller, Get, Post, Param, Body, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Get()
  async getJobs() {
    try {
      return await this.jobsService.getJobs();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch jobs');
    }
  }

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    try {
      const jobResult = await this.jobsService.createJob(createJobDto);
      return jobResult;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create job');
    }
  }

  @Get(':jobId')
  async getJobById(@Param('jobId') jobId: string) {
      const job = await this.jobsService.getJobById(jobId);
      if (!job) {
        throw new NotFoundException(`Job with id ${jobId} not found`);
      }
      return job
  }
}
