---
title: 'Agent Platform Blueprint'
description: 'A reference architecture for running coding, user-facing and operations agents on one AWS platform without any agent holding permissions a person does not.'
tags: ['AI Agents', 'Reference Architecture', 'EKS', 'GitOps', 'Security']
date: '2026-10-29'
flow: ['Ticket', 'Sandbox', 'Pull request', 'Merge queue', 'Test environment', 'Argo CD']
---

## Overview

A reference architecture for running three kinds of AI agent on one Amazon EKS platform. It is a design, not yet a build: it sets out who each agent acts as, where its access is checked, and how its work reaches production.

## Technical Highlights

- Coding agents for GitHub, GitLab and Azure DevOps work in per-task sandboxes (gVisor by default, Kata Containers on Firecracker for higher risk) and land changes only through pull requests and a merge queue
- Bot identities with short-lived tokens, scoped to one repository where the provider allows it; no agent pushes to main
- User-facing agents act as the signed-in user: the user's Entra token is passed through and checked again on every tool call, so a cost agent answers only for people allowed to see billing
- Scheduled operations agents run under their own workload identity with read-only cloud and Kubernetes access, and report rather than change
- Fixes an agent proposes go through the same pull request path, reviewed by code owners and applied by Argo CD
- A pipeline-owned test environment per pull request, so agents build and the pipeline proves
- Deny-by-default egress through a domain-aware proxy
