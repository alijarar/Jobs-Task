import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateJobDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;
}