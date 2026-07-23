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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto';

@ApiTags('testimonials')
@Controller('api/v1/testimonials')
export class TestimonialsController {
  constructor(private testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published testimonials' })
  findAll() {
    const data = this.testimonialsService.findAll();
    return { data, error: null };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all testimonials (admin)' })
  findAllAdmin() {
    const data = this.testimonialsService.findAllAdmin();
    return { data, error: null };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  findOne(@Param('id') id: string) {
    const data = this.testimonialsService.findOne(id);
    if (!data) {
      return { data: null, error: { code: 'NOT_FOUND', message: 'Not found' } };
    }
    return { data, error: null };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a testimonial' })
  create(@Body() dto: CreateTestimonialDto) {
    const data = this.testimonialsService.create(dto);
    return { data, error: null };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a testimonial' })
  update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    const success = this.testimonialsService.update(id, dto);
    if (!success) {
      return { data: null, error: { code: 'NOT_FOUND', message: 'Not found' } };
    }
    return { data: { id, ...dto }, error: null };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a testimonial' })
  delete(@Param('id') id: string) {
    this.testimonialsService.delete(id);
  }
}
