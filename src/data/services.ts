// Shared by the contents page (Hero) and the standards list (Services).
// proof: project ids (src/content/projects) that demonstrate the service; omit when none does.
export const services = [
  {
    title: 'CI/CD pipeline design',
    proof: ['bdo-crm-pipeline', 'java-maven-pipeline'],
    summary: 'GitHub Actions, GitLab CI or Jenkins. Monorepos to multi-environment deploys.',
    correct: 'One reusable pipeline, called by every repository, versioned and pinned.',
    incorrect: 'A copy of the workflow in every repository, drifting apart.',
  },
  {
    title: 'Cloud infrastructure',
    proof: ['aws-landing-zone'],
    summary: 'AWS and Azure landing zones, networking, security, cost.',
    correct: 'An account per environment under one organisation, guardrails on from day one.',
    incorrect: 'Production and development in one account, kept apart by naming.',
  },
  {
    title: 'Release management',
    proof: ['bdo-crm-pipeline'],
    summary: 'Release planning, CAB, environment promotion, rollback.',
    correct: 'Every release promoted through the same environments, with its rollback written before it ships.',
    incorrect: 'A rollback plan written during the incident.',
  },
  {
    title: 'AI agent platforms',
    proof: ['governed-ai-agent-platform', 'agent-platform-blueprint'],
    summary: 'Agents, tools and models behind gateways that check identity.',
    correct: 'Every tool call checked against the caller’s identity at the gateway.',
    incorrect: 'An agent holding a token that can do whatever its prompt asks.',
    isNew: true,
  },
  {
    title: 'Platform engineering',
    proof: ['terraform-blueprint', 'bdo-crm-pipeline'],
    summary: 'Internal platforms, golden paths, self-service.',
    correct: 'A golden path teams pick because it is the fastest way.',
    incorrect: 'A mandate with a ticket queue in front of it.',
  },
  {
    title: 'Infrastructure as code',
    proof: ['terraform-blueprint', 'aws-landing-zone'],
    summary: 'Terraform modules, state, drift detection.',
    correct: 'State in a locked remote backend, drift checked on a schedule.',
    incorrect: 'terraform apply from a laptop.',
  },
  {
    title: 'DevOps transformation',
    summary: 'Find the bottleneck, automate it, measure, repeat.',
    correct: 'Fix the slowest step first, measure it, then the next.',
    incorrect: 'A new tool rollout called a transformation.',
  },
];
