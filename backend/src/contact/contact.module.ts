import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { FileStorageService } from '../common/file-storage.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, FileStorageService],
  exports: [ContactService],
})
export class ContactModule {}
