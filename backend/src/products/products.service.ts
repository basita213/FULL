import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price?: string;
  image: string;
  tag?: string;
  category: string;
  order?: number;
  featured?: boolean;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable()
export class ProductsService {
  private readonly collection = 'products';

  constructor(private storage: FileStorageService) {}

  findAll(): Product[] {
    return this.storage.readAll(this.collection).filter(
      (p) => p.visible !== false,
    ) as Product[];
  }

  findAllAdmin(): Product[] {
    return this.storage.readAll(this.collection) as Product[];
  }

  findOne(id: string): Product | null {
    return this.storage.readOne(this.collection, id) as Product | null;
  }

  create(data: Partial<Product>): { id: string } {
    return this.storage.create(this.collection, {
      ...data,
      visible: data.visible !== false,
      createdAt: new Date().toISOString(),
    });
  }

  update(id: string, data: Partial<Product>): boolean {
    return this.storage.update(this.collection, id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }

  delete(id: string): boolean {
    return this.storage.delete(this.collection, id);
  }
}
