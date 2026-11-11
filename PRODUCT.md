# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: companies that need CI/CD, cloud infrastructure or release management work done, typically an engineering lead or CTO weighing whether to bring in an outside platform engineer. They arrive with a concrete problem (slow or fragile pipelines, a messy multi-account cloud, manual releases) and want evidence that Nathan has solved it before.

Secondary: hiring managers and recruiters evaluating him for senior platform engineering or release management roles.

## Product Purpose
Personal portfolio and blog for Nathan Tran, Senior Platform Engineer and Release Manager, who also designs governed AI agent platforms. Success is a qualified consulting inquiry through the contact form; a job conversation is the secondary success.

## Positioning
A platform engineer who also owns the release process: pipeline architecture, cloud landing zones and release coordination (CAB, environment promotion, rollback) from one person, proven on enterprise work at Datum Consulting and FPT Software. Since late 2026 this extends to AI agent platforms: agents, tools and model calls run behind gateways that check identity outside the model, the same gate-and-approval discipline he applies to releases.

## Operating Context
- Visitors usually arrive from LinkedIn (linkedin.com/in/nathantr), GitHub (github.com/nhattran134) or a direct link to nathantr.com.
- Content is edited through Decap CMS at `/admin` (Netlify Identity + git-gateway, branch `main`): blog posts, projects and testimonials are Markdown collections.
- The contact form is a Netlify Form with a honeypot field; subjects are Consulting, Job opportunity, Collaboration and Other.
- Contact facts shown beside both forms: based in Ho Chi Minh City (UTC+7), replies within 2 days. No email address is published, on purpose, to avoid spam; contact goes through the forms, LinkedIn and GitHub.

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
- AI agent platform work (Oct to Nov 2026, client unnamed on the site), from his own design artifacts:
  - Governed AI agent platform on Amazon EKS: kagent agents in Agent Substrate sandboxes, agentgateway in front of 18 MCP tool servers with JWT checks and per-namespace authorization, LiteLLM as the single model gateway with a Presidio PII guardrail, Bedrock over PrivateLink, Entra ID sign-in, Langfuse tracing. **Role: he designed it; the team built and rolled it out.**
  - Agent platform blueprint (reference architecture, not yet built): coding agents across GitHub, GitLab and Azure DevOps in per-task gVisor/Kata sandboxes that land changes only through pull requests and a merge queue; user-facing agents acting with the signed-in user's permissions; read-only scheduled DevOps agents; per-pull-request test environments with Argo CD.
  - Sandbox decision: Agent Substrate vs NVIDIA OpenShell for a client's knowledge-base agent (to become a blog post).
  - Never publish client names, cluster names or internal identifiers from these artifacts.
- New service: AI agent platform engineering. Title stays Senior Platform Engineer & Release Manager.
- One blog post (`hello-world`).
- **No real testimonials.** The two files in `src/content/testimonials/` are unattributed placeholders: keep the collection, but don't show the section until real, attributed quotes exist. Never invent clients, quotes, logos or metrics.

## Product Principles
1. Consulting buyers first: every section should help an engineering lead decide to get in touch.
2. Proof over claims: show the actual pipeline and infrastructure work, not adjectives.
3. Only real evidence: nothing fabricated, nothing placeholder shown as genuine.
4. Content stays CMS-editable: design around the collections rather than hard-coding content into layouts.
