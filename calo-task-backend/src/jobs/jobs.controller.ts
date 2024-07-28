import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Get()
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    const jobResult = await this.jobsService.createJob(createJobDto);
    return jobResult;
  }

  @Get(':jobId')
  async getJobById(@Param('jobId') jobId: string) {
    return this.jobsService.getJobById(jobId);
  }
}
