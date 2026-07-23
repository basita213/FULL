import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'Bouquet coloré' })
  @IsString()
  alt: string;

  @ApiPropertyOptional({ example: 'bouquets' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class UpdateGalleryDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
