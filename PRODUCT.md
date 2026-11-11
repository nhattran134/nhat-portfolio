# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: companies that need CI/CD, cloud infrastructure or release management work done, typically an engineering lead or CTO weighing whether to bring in an outside platform engineer. They arrive with a concrete problem (slow or fragile pipelines, a messy multi-account cloud, manual releases) and want evidence that Nathan has solved it before.

Secondary: hiring managers and recruiters evaluating him for senior platform engineering or release management roles.

## Product Purpose
Personal portfolio and blog for Nathan Tran, Senior Platform Engineer and Release Manager. Success is a qualified consulting inquiry through the contact form; a job conversation is the secondary success.

## Positioning
A platform engineer who also owns the release process: pipeline architecture, cloud landing zones and release coordination (CAB, environment promotion, rollback) from one person, proven on enterprise work at Datum Consulting and FPT Software.

## Operating Context
- Visitors usually arrive from LinkedIn (linkedin.com/in/nathantr), GitHub (github.com/nhattran134) or a direct link to nathantr.com.
- Content is edited through Decap CMS at `/admin` (Netlify Identity + git-gateway, branch `main`): blog posts, projects and testimonials are Markdown collections.
- The contact form is a Netlify Form with a honeypot field; subjects are Job Opportunity, Consulting, Collaboration and Other.

## Capabilities and Constraints
- Astro static site (`output: 'static'`), deployed on Netlify, sitemap via `@astrojs/sitemap`.
- Content collections and their schemas in `src/content.config.ts` must keep working with the CMS config in `public/admin/config.yml`.
- Routes: `/`, `/blog`, `/blog/[id]`, `/projects/[id]`.

## Brand Commitments
- Public name: **Nathan Tran**. Domain nathantr.com.
- Title: Senior Platform Engineer & Release Manager.

## Evidence on Hand
- Four project write-ups in `src/content/projects/`: monorepo .NET CI/CD pipeline, multi-cloud Terraform pipeline, AWS landing zone and FinOps, Java Maven microservice pipeline.
- Experience: Datum Consulting (Oct 2024 to present), FPT Software (2020 to 2024), in `src/components/Experience.astro`.
- Stats on the current site, sourced from his CV per the April spec: 5+ years, 7 cloud certifications, 35+ CI/CD pipelines, 3 cloud platforms. Certifications listed in the spec: AWS SA Pro, AWS DevOps Pro, AWS Developer Associate, GCP Cloud Developer, GCP SA, MongoDB, PSM II.
- One blog post (`hello-world`).
- **No real testimonials.** The two files in `src/content/testimonials/` are unattributed placeholders: keep the collection, but don't show the section until real, attributed quotes exist. Never invent clients, quotes, logos or metrics.

## Product Principles
1. Consulting buyers first: every section should help an engineering lead decide to get in touch.
2. Proof over claims: show the actual pipeline and infrastructure work, not adjectives.
3. Only real evidence: nothing fabricated, nothing placeholder shown as genuine.
4. Content stays CMS-editable: design around the collections rather than hard-coding content into layouts.
