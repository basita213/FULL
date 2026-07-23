import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  ipHash?: string;
  submittedAt?: string;
}

@Injectable()
export class ContactService {
  private readonly collection = 'contact_submissions';

  constructor(private storage: FileStorageService) {}

  findAll(): ContactSubmission[] {
    return this.storage.readAll(this.collection) as ContactSubmission[];
  }

  create(data: Partial<ContactSubmission>, ip?: string): { id: string } {
    const crypto = require('crypto');
    const ipHash = ip
      ? crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16)
      : undefined;

    return this.storage.create(this.collection, {
      ...data,
      ipHash,
      submittedAt: new Date().toISOString(),
    });
  }
}
