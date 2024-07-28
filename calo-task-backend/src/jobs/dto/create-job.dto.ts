import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';


class ImageData {
  @IsString()
  blurhash: string;

  @IsString()
  @IsUrl()
  imageUrl: string;
}
export class CreateJobDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImageData)
  readonly imageData?: ImageData;

  
}

