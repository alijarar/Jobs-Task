import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { APP_PIPE } from '@nestjs/core';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule {}
