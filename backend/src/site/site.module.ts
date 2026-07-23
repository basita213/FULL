import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { FileStorageService } from '../common/file-storage.service';

@Module({
  controllers: [SiteController],
  providers: [SiteService, FileStorageService],
  exports: [SiteService],
})
export class SiteModule {}
