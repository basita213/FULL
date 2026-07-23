import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Bouquet de Bonbons' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Des arrangements uniques avec vos bonbons préférés.' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: '2000 DA' })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image: string;

  @ApiPropertyOptional({ example: 'Populaire' })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiProperty({ example: 'bouquets' })
  @IsString()
  category: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
