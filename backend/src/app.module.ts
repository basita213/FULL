import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { GalleryModule } from './gallery/gallery.module';
import { ContactModule } from './contact/contact.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProductsModule,
    TestimonialsModule,
    GalleryModule,
    ContactModule,
    SiteModule,
  ],
})
export class AppModule {}
