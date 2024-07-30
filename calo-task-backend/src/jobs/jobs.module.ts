import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { BullModule } from '@nestjs/bull';
import { JobsProcessor } from './jobs.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  providers: [JobsService,JobsProcessor],
  controllers: [JobsController],
})
export class JobsModule {}
