# Cameron Basham - Software Engineer Portfolio

Personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS.
Deployed on Vercel at [https://cameron-basham.com](https://cameron-basham.com).

The site highlights backend and cloud projects (Java/Spring Boot, AWS, ML), detailed case studies, an About page, a Contact page, and a downloadable resume.

## Features

- Modern stack: Next.js (App Router) + TypeScript + Tailwind CSS
- Responsive layout for desktop and mobile
- Project grid with dynamic case-study pages
- "Currently Building" section for active capstone work
- Downloadable resume from `/public/resume.pdf`
- SEO routes: `/sitemap.xml` and `/robots.txt`
- GitHub + Vercel deployment workflow

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | Next.js 15, React 19 |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Hosting | Vercel |
| Version Control | Git + GitHub |
| Fonts | Geist / Geist Mono |
| Assets | Static files in `public/` |

## Local Development

```bash
git clone https://github.com/Dumpy250/portfolio-site.git
cd portfolio-site
npm install
npm run dev
```

Open: `http://localhost:3000`

## Production Build

```bash
npm run build
npm run start
```

Verification for static metadata routes (to avoid Turbopack production build 404s):

```bash
# 1) Build + start production server
npm run build && npm run start

# 2) In another terminal, confirm each route returns 200
curl -I http://localhost:3000/robots.txt
curl -I http://localhost:3000/sitemap.xml
curl -I http://localhost:3000/favicon.ico
```

Expected: each response includes `HTTP/1.1 200 OK` (or equivalent `200` status).

## Project Structure

```text
portfolio-site/
|- public/
|  |- favicon.ico
|  |- resume.pdf
|  `- projects/              # project images and sprint plan
|- src/
|  |- app/                   # routes: /, /about, /contact, /projects
|  |  |- projects/[slug]/    # case-study pages
|  |  |- robots.ts
|  |  `- sitemap.ts
|  |- components/
|  |- data/
|  `- types/
|- package.json
|- next.config.ts
|- tsconfig.json
`- README.md
```

## Deployment

Deploys automatically to Vercel from GitHub.

- Production URL: `https://cameron-basham.com`
- Preview builds: generated for pull requests

## Contact

- Name: Cameron Basham
- Email: Cameron250Taylor@outlook.com
- GitHub: [https://github.com/Dumpy250](https://github.com/Dumpy250)
- Portfolio: [https://cameron-basham.com](https://cameron-basham.com)
