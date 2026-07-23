import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';

@Injectable()
export class SiteService {
  constructor(private storage: FileStorageService) {}

  getConfig() {
    return this.storage.readSiteConfig();
  }

  updateConfig(data: Record<string, any>) {
    const current = this.storage.readSiteConfig();
    const merged = { ...current, ...data };
    this.storage.writeSiteConfig(merged);
    return merged;
  }
}
