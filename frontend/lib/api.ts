const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: string;
  image: string;
  tag?: string;
  category: string;
  order?: number;
  featured?: boolean;
  visible?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  order?: number;
  visible?: boolean;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  category?: string;
  order?: number;
  visible?: boolean;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    location: string;
    description: string;
    descriptionShort: string;
  };
  contact: {
    whatsapp: string;
    whatsappLink: string;
    address: string;
    hours: string;
  };
  socials: {
    instagram: string;
  };
  stats: {
    posts: string;
    followers: string;
    passion: string;
  };
  hero: {
    tag: string;
    title: string;
    titleAccent: string;
    subtitle: string;
  };
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.data;
}

export async function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>('/api/v1/products');
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchApi<Testimonial[]>('/api/v1/testimonials');
}

export async function getGallery(): Promise<GalleryItem[]> {
  return fetchApi<GalleryItem[]>('/api/v1/gallery');
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return fetchApi<SiteConfig>('/api/v1/site/config');
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ id: string; message: string }> {
  return fetchApi<{ id: string; message: string }>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
