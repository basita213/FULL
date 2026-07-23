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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published products' })
  findAll() {
    const data = this.productsService.findAll();
    return { data, error: null };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products (admin)' })
  findAllAdmin() {
    const data = this.productsService.findAllAdmin();
    return { data, error: null };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id') id: string) {
    const data = this.productsService.findOne(id);
    if (!data) {
      return { data: null, error: { code: 'NOT_FOUND', message: 'Product not found' } };
    }
    return { data, error: null };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a product' })
  create(@Body() dto: CreateProductDto) {
    const data = this.productsService.create(dto);
    return { data, error: null };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const success = this.productsService.update(id, dto);
    if (!success) {
      return { data: null, error: { code: 'NOT_FOUND', message: 'Product not found' } };
    }
    return { data: { id, ...dto }, error: null };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  delete(@Param('id') id: string) {
    this.productsService.delete(id);
  }
}
