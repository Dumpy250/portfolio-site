# Cameron Basham — Software Engineer Portfolio

This is my personal software engineering portfolio, built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, and hosted on **Vercel** at [https://cameron-basham.com](https://cameron-basham.com).

It showcases my backend and cloud development work — including Java/Spring Boot microservices, AWS integration, and machine learning experiments — along with an About section, Contact page, and downloadable resume.

---

## 🚀 Features

- ⚙️ **Modern Stack:** Next.js (App Router) + TypeScript + Tailwind CSS  
- 📱 **Responsive Design:** Works perfectly on mobile and desktop  
- 🧠 **Projects Grid:** Showcases multiple projects with detailed case studies  
- 📄 **Downloadable Resume:** Served directly from `/public/resume.pdf`  
- 🔍 **SEO Ready:** Automatic `/sitemap.xml` and `/robots.txt`  
- 🌐 **Deployed with CI/CD:** Automatic deploys via Vercel connected to GitHub  
- 🔒 **Custom Domain + SSL:** [cameron-basham.com](https://cameron-basham.com)

---

## 🧩 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 15, React 18 |
| **Styling** | Tailwind CSS |
| **Language** | TypeScript |
| **Hosting** | Vercel |
| **Version Control** | Git + GitHub |
| **Fonts** | Geist / Geist Mono |
| **Images & Assets** | Served from `public/` |

---

## 🧠 Getting Started (Local Development)

Clone the repository and run it locally:

```bash
git clone https://github.com/Dumpy250/portfolio-site.git
cd portfolio-site
npm install
npm run dev
```

Then open your browser to http://localhost:3000

To create a production build:

```bash
npm run build
npm start
```

## 🗂️ Project Structure

```text
portfolio-site/
│
├── public/                 # Static assets served at root
│   ├── favicon.ico
│   ├── resume.pdf
│   └── projects/           # Project screenshots or images
│
├── src/
│   ├── app/                # Next.js routes (/, /about, /contact, /projects)
│   │   ├── layout.tsx      # Root layout with Navbar and footer
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── projects/       # Projects grid and [slug] case studies
│   │   └── not-found.tsx   # 404 page
│   │
│   ├── components/         # Reusable UI components (Navbar, ProjectCard, etc.)
│   ├── data/               # Project metadata / content
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global CSS (if used)
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```


Deployment

This site deploys automatically to Vercel from the master branch.
All development work happens on the dev branch before merging to production.

Production URL: https://cameron-basham.com

Preview Builds: Generated automatically for each pull request.

📫 Contact

Name: Cameron Basham
Email: cameron250taylor@outlook.com
GitHub: @Dumpy250
Portfolio: https://cameron-basham.com
