import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FileStorageService } from '../common/file-storage.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, FileStorageService],
  exports: [ProductsService],
})
export class ProductsModule {}
