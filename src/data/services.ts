// Shared by the contents page (Hero) and the standards list (Services).
export const services = [
  {
    title: 'CI/CD pipeline design',
    summary: 'GitHub Actions, GitLab CI or Jenkins. Monorepos to multi-environment deploys.',
    desc: 'End-to-end pipeline architecture, from monorepo strategies to multi-environment deployments, with security gates built in.',
    correct: 'One reusable pipeline, called by every repository, versioned and pinned.',
    incorrect: 'A copy of the workflow in every repository, drifting apart.',
  },
  {
    title: 'Cloud infrastructure',
    summary: 'AWS and Azure landing zones, networking, security, cost.',
    desc: 'AWS and Azure infrastructure design, implementation and optimisation: landing zones, networking, security and cost management.',
    correct: 'An account per environment under one organisation, guardrails on from day one.',
    incorrect: 'Production and development in one account, kept apart by naming.',
  },
  {
    title: 'Release management',
    summary: 'Release planning, CAB, environment promotion, rollback.',
    desc: 'Release planning, CAB coordination, environment promotion strategies and rollback procedures for enterprise applications.',
    correct: 'Every release promoted through the same environments, with its rollback written before it ships.',
    incorrect: 'A rollback plan written during the incident.',
  },
  {
    title: 'AI agent platforms',
    summary: 'Agents, tools and models behind gateways that check identity.',
    desc: 'Platforms where AI agents, their tools and their model calls run behind gateways that check identity outside the model.',
    correct: 'Every tool call checked against the caller’s identity at the gateway.',
    incorrect: 'An agent holding a token that can do whatever its prompt asks.',
    isNew: true,
  },
  {
    title: 'Platform engineering',
    summary: 'Internal platforms, golden paths, self-service.',
    desc: 'Internal developer platforms, golden paths, reusable pipeline blueprints and self-service infrastructure.',
    correct: 'A golden path teams pick because it is the fastest way.',
    incorrect: 'A mandate with a ticket queue in front of it.',
  },
  {
    title: 'Infrastructure as code',
    summary: 'Terraform modules, state, drift detection.',
    desc: 'Terraform modules, state management, multi-account strategies and drift detection for AWS, Azure and GCP.',
    correct: 'State in a locked remote backend, drift checked on a schedule.',
    incorrect: 'terraform apply from a laptop.',
  },
  {
    title: 'DevOps transformation',
    summary: 'Find the bottleneck, automate it, measure, repeat.',
    desc: 'Assess current practices, find the bottlenecks, and bring in DevOps culture, tooling and automation one step at a time.',
    correct: 'Fix the slowest step first, measure it, then the next.',
    incorrect: 'A new tool rollout called a transformation.',
  },
];
