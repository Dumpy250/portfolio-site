# Cameron Basham — Software Engineer Portfolio

Personal software-engineering portfolio built with Next.js, React and TypeScript.

**Live site:** [www.cameron-basham.com](https://www.cameron-basham.com)

## What the site includes

- A curated homepage featuring CARLA Observability Toolkit and Warehouse Item Recognition.
- A Work catalog with five case studies: CARLA Observability Toolkit, Warehouse Item Recognition, Car Rental Backend & AWS Infrastructure, Equipment Rental Software, and Job Posting MVC.
- Case studies that separate personal contributions from team capabilities and explain the evidence and its limits.
- Recorded application views, fictional-data demonstrations, API records and explanatory diagrams. These portfolio viewers do not run the original applications, contact their databases or deploy cloud infrastructure.
- About and Contact pages, an email-copy button with a manual-copy fallback, and a downloadable résumé.
- Responsive layouts, keyboard navigation, screenshot inspection, and sitemap/robots metadata routes.

## Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 App Router |
| UI | React 19 and TypeScript |
| Styling | Custom CSS and Tailwind CSS 4 |
| Fonts | Geist and Geist Mono through `next/font` |
| Hosting | Vercel; configured Node.js 22.x runtime |
| Source and deployment | GitHub with Git-triggered Vercel deployments |

The lockfile pins the installed dependency tree. `package.json` also contains a Next-scoped PostCSS override; review that override when updating Next.js rather than removing or broadening it automatically.

## Run locally

Use Node.js 22.x to match the production runtime, and npm.

```bash
git clone https://github.com/Dumpy250/portfolio-site.git
cd portfolio-site
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No original-project backend services, database connections or application credentials are needed to run the portfolio. The initial production build may download fonts through `next/font`.

For a production-mode preview:

```bash
npm run build
npm run start
```

## Checks

Lint the application source and check TypeScript:

```bash
npm run lint -- src
node node_modules/typescript/bin/tsc --noEmit --incremental false
```

The automated source and HTTP checks are kept locally in the ignored `tests/` folder; they are not included in this repository or a fresh clone. Local maintainers can still run their existing checks, while fresh clones can use lint, TypeScript and the production build commands above.

Automated checks do not replace browser checks for clipboard permissions, navigation, screenshot dialogs or actual downloads. Email copy requires a supported browser in a secure context such as HTTPS or localhost; if copying is unavailable, the address remains selectable.

## Content and files

```text
public/
  icon.svg                  Brand icon
  resume.pdf                Public résumé
  projects/                 Images, diagrams and recorded demo exports
src/
  app/                      Home, Work, About, Contact and metadata routes
    projects/[slug]/        Case-study route
  components/               Shared UI and case-study viewers
  data/                     Project catalog and homepage selection
  lib/                      Recorded-view data and presentation helpers
  types/                    Project types
next.config.ts              Next.js configuration and résumé response header
```

Project descriptions live in `src/data/projects.ts`; homepage curation lives in `src/data/selected-projects.ts`. Keep screenshots and exported records consistent with their captions, attribution and fictional-data labels.

The public résumé is served at [`/resume.pdf`](https://www.cameron-basham.com/resume.pdf). Its response header supplies `Cameron-Basham-General-Software-Resume.pdf` as the filename while allowing inline viewing. The Contact download link uses the same descriptive filename. Verify the actual downloaded name and bytes after deployment, not just the link's HTML attributes.

## Deployment

The production branch is **`master`**. Pull requests receive Vercel preview builds; merging to `master` triggers production deployment and automatic assignment of the production domains.

Before merging, check the changed files and assets, run the relevant tests and production build, and verify the Vercel checks. After deployment, check the live project links, email-copy action and actual résumé download at [www.cameron-basham.com](https://www.cameron-basham.com).

## Contact

- **Cameron Basham**
- Email: [Cameron250taylor@outlook.com](mailto:Cameron250taylor@outlook.com)
- GitHub: [Dumpy250](https://github.com/Dumpy250)
- LinkedIn: [cameron-basham](https://www.linkedin.com/in/cameron-basham)
