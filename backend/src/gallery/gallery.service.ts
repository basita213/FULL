import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';

export interface GalleryItem {
  id?: string;
  image: string;
  alt: string;
  category?: string;
  order?: number;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable()
export class GalleryService {
  private readonly collection = 'gallery';

  constructor(private storage: FileStorageService) {}

  findAll(): GalleryItem[] {
    return this.storage.readAll(this.collection).filter(
      (g) => g.visible !== false,
    ) as GalleryItem[];
  }

  findAllAdmin(): GalleryItem[] {
    return this.storage.readAll(this.collection) as GalleryItem[];
  }

  findOne(id: string): GalleryItem | null {
    return this.storage.readOne(this.collection, id) as GalleryItem | null;
  }

  create(data: Partial<GalleryItem>): { id: string } {
    return this.storage.create(this.collection, {
      ...data,
      visible: data.visible !== false,
      createdAt: new Date().toISOString(),
    });
  }

  update(id: string, data: Partial<GalleryItem>): boolean {
    return this.storage.update(this.collection, id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }

  delete(id: string): boolean {
    return this.storage.delete(this.collection, id);
  }
}
