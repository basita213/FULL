import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Sarah K.' })
  @IsString()
  author: string;

  @ApiProperty({ example: 'Le bouquet était magnifique !' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class UpdateTestimonialDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
