import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto, UpdateGalleryDto } from './dto';

@ApiTags('gallery')
@Controller('api/v1/gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all gallery items' })
  findAll() {
    const data = this.galleryService.findAll();
    return { data, error: null };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all gallery items (admin)' })
  findAllAdmin() {
    const data = this.galleryService.findAllAdmin();
    return { data, error: null };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gallery item by ID' })
  findOne(@Param('id') id: string) {
    const data = this.galleryService.findOne(id);
    if (!data) {
      return { data: null, error: { code: 'NOT_FOUND', message: 'Not found' } };
    }
    return { data, error: null };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a gallery item' })
  create(@Body() dto: CreateGalleryDto) {
    const data = this.galleryService.create(dto);
    return { data, error: null };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a gallery item' })
  update(@Param('id') id: string, @Body() dto: UpdateGalleryDto) {
    const success = this.galleryService.update(id, dto);
    if (!success) {
      return { data: null, error: { code: 'NOT_FOUND', message: 'Not found' } };
    }
    return { data: { id, ...dto }, error: null };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a gallery item' })
  delete(@Param('id') id: string) {
    this.galleryService.delete(id);
  }
}
