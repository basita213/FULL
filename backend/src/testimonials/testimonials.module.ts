import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { FileStorageService } from '../common/file-storage.service';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsService, FileStorageService],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}
