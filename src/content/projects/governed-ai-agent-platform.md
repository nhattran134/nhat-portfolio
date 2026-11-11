---
title: 'Governed AI Agent Platform'
description: 'An AI agent platform on Amazon EKS where every agent, tool and model call passes through a gateway that checks identity outside the model.'
tags: ['AI Agents', 'Kubernetes', 'MCP', 'LiteLLM', 'AWS']
date: '2026-11-01'
flow: ['Caller', 'Edge gateway', 'Identity check', 'Agent sandbox', 'Tool check', 'MCP tool']
---

## Overview

I designed an AI agent platform for an enterprise team on Amazon EKS; the team built it and rolled it out. One rule runs through it: the model never decides what an agent may do. Every request is checked against a person or a named workload identity at a gateway, before the agent or the tool sees it.

## Technical Highlights

- Agents run on kagent inside Agent Substrate sandboxes, one isolated actor per session, snapshotted when idle
- agentgateway is the only way in to agents and to 18 MCP tool servers: it validates a signed actor token on every tool call, then authorizes it by where the agent runs
- LiteLLM is the only way out to models, with virtual keys, budgets, fallbacks and a Presidio guardrail that masks or blocks personal data before a prompt leaves the cluster
- Models on Amazon Bedrock over AWS PrivateLink, so prompts never cross the public internet
- Sign-in through Microsoft Entra ID, with app roles deciding who can reach which agents and tools; a Teams bot calls agents over A2A
- Every model call traced in Langfuse

## Role

Platform design, gateway and identity model, and the documentation the team built from. The build and rollout were a team effort.
