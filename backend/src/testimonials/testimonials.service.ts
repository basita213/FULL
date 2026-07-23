import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';

export interface Testimonial {
  id?: string;
  author: string;
  text: string;
  rating?: number;
  order?: number;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable()
export class TestimonialsService {
  private readonly collection = 'testimonials';

  constructor(private storage: FileStorageService) {}

  findAll(): Testimonial[] {
    return this.storage.readAll<Testimonial>(this.collection).filter(
      (t) => t.visible !== false,
    );
  }

  findAllAdmin(): Testimonial[] {
    return this.storage.readAll<Testimonial>(this.collection);
  }

  findOne(id: string): Testimonial | null {
    return this.storage.readOne<Testimonial>(this.collection, id);
  }

  create(data: Partial<Testimonial>): { id: string } {
    return this.storage.create(this.collection, {
      ...data,
      rating: data.rating || 5,
      visible: data.visible !== false,
      createdAt: new Date().toISOString(),
    });
  }

  update(id: string, data: Partial<Testimonial>): boolean {
    return this.storage.update(this.collection, id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }

  delete(id: string): boolean {
    return this.storage.delete(this.collection, id);
  }
}
