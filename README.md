# Candy Days Draria — Full Stack Website

## Project Structure

```
candy/
├── frontend/          # Next.js + React + TypeScript + Tailwind CSS
│   ├── app/           # Pages & layouts
│   ├── components/    # React components
│   ├── lib/           # API client & utilities
│   └── public/        # Static assets (logo.jpg)
├── backend/           # NestJS + TypeScript API
│   └── src/           # Modules: auth, products, testimonials, gallery, contact, site
├── content/           # Flat-file CMS content (Markdown + JSON)
│   ├── products/      # Product Markdown files
│   ├── testimonials/  # Testimonial Markdown files
│   └── gallery.json   # Gallery items
├── admin/             # Decap CMS admin panel
└── docker-compose.yml # Docker orchestration
```

## Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env    # Edit with your secrets
npm run start:dev       # Runs on http://localhost:3001
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev             # Runs on http://localhost:3000
```

### 3. Docker (both)
```bash
docker-compose up --build
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/products` | No | List published products |
| GET | `/api/v1/products/admin` | JWT | List all products |
| POST | `/api/v1/products` | JWT | Create product |
| PUT | `/api/v1/products/:id` | JWT | Update product |
| DELETE | `/api/v1/products/:id` | JWT | Delete product |
| GET | `/api/v1/testimonials` | No | List published testimonials |
| POST | `/api/v1/testimonials` | JWT | Create testimonial |
| PUT | `/api/v1/testimonials/:id` | JWT | Update testimonial |
| DELETE | `/api/v1/testimonials/:id` | JWT | Delete testimonial |
| GET | `/api/v1/gallery` | No | List gallery items |
| POST | `/api/v1/gallery` | JWT | Create gallery item |
| PUT | `/api/v1/gallery/:id` | JWT | Update gallery item |
| DELETE | `/api/v1/gallery/:id` | JWT | Delete gallery item |
| GET | `/api/v1/site/config` | No | Get site config |
| PUT | `/api/v1/site/config` | JWT | Update site config |
| POST | `/api/v1/contact` | No | Submit contact form |
| GET | `/api/v1/contact` | JWT | List contact submissions |
| POST | `/api/v1/auth/register` | No | Register admin user |
| POST | `/api/v1/auth/login` | No | Login |
| POST | `/api/v1/auth/refresh` | No | Refresh access token |

## Admin Panel

Access Decap CMS at `/admin/index.html` after configuring Git Gateway.

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** NestJS 10, TypeScript, Passport JWT
- **Content:** Flat-file Markdown (gray-matter) + JSON
- **CMS:** Decap CMS (Git-backed)
- **Storage:** Cloudflare R2 (images)
- **Email:** Resend (contact form)
- **Deployment:** Docker, Vercel (frontend), Render (backend)
