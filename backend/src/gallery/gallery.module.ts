import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { FileStorageService } from '../common/file-storage.service';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService, FileStorageService],
  exports: [GalleryService],
})
export class GalleryModule {}
