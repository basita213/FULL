import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileStorageService implements OnModuleInit {
  private contentPath: string;

  onModuleInit() {
    this.contentPath = path.resolve(
      process.env.CONTENT_PATH || '../content',
    );
    this.ensureDirectories();
  }

  private ensureDirectories() {
    const dirs = ['products', 'testimonials', 'gallery'];
    dirs.forEach((dir) => {
      const fullPath = path.join(this.contentPath, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });
  }

  private getCollectionPath(collection: string): string {
    return path.join(this.contentPath, collection);
  }

  private getFilePath(collection: string, id: string): string {
    return path.join(this.getCollectionPath(collection), `${id}.md`);
  }

  readAll(collection: string): Record<string, any>[] {
    const dir = this.getCollectionPath(collection);
    if (!fs.existsSync(dir)) return [];

    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((file) => {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        const { data, content: body } = matter(content);
        return { id: file.replace('.md', ''), ...data, body };
      })
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  }

  readOne(collection: string, id: string): Record<string, any> | null {
    const filePath = this.getFilePath(collection, id);
    if (!fs.existsSync(filePath)) return null;

    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    return { id, ...data, body };
  }

  create(
    collection: string,
    data: Record<string, any>,
    body: string = '',
  ): { id: string } {
    const id = data.id || uuid();
    const filePath = this.getFilePath(collection, id);
    const fileContent = matter.stringify(body, { ...data, id });
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    return { id };
  }

  update(
    collection: string,
    id: string,
    data: Record<string, any>,
    body?: string,
  ): boolean {
    const existing = this.readOne(collection, id);
    if (!existing) return false;

    const filePath = this.getFilePath(collection, id);
    const newBody = body !== undefined ? body : (existing.body as string) || '';
    const fileContent = matter.stringify(newBody, {
      ...existing,
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    });
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    return true;
  }

  delete(collection: string, id: string): boolean {
    const filePath = this.getFilePath(collection, id);
    if (!fs.existsSync(filePath)) return false;
    fs.unlinkSync(filePath);
    return true;
  }

  readSiteConfig(): Record<string, any> {
    const configPath = path.join(this.contentPath, 'site.json');
    if (!fs.existsSync(configPath)) {
      const defaultConfig = {
        brand: { name: 'Candy Days', location: 'Draria, Alger' },
        contact: { whatsapp: '+213555877636', hours: 'Tous les jours, 10h — 22h' },
        socials: { instagram: 'https://www.instagram.com/candy_days_draria/' },
      };
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      return defaultConfig;
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }

  writeSiteConfig(config: Record<string, any>): void {
    const configPath = path.join(this.contentPath, 'site.json');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
}
