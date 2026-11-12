---
title: 'Sandboxing an AI Agent on Kubernetes: Two Ways to Wrap It'
date: '2026-10-26'
excerpt: 'Agent Substrate and NVIDIA OpenShell both sandbox an agent on EKS, at different layers. What each one wraps, what it costs to run, and how I chose for a knowledge-base agent.'
tags: ['AI Agents', 'Kubernetes', 'Security']
---

A client's knowledge-base agent needed a proper sandbox on Amazon EKS. Two candidates were on the table: Agent Substrate, which the platform already ran, and NVIDIA OpenShell. Both isolate the agent. They do it at different layers, and that decides most of the trade.

## Agent Substrate: a separate kernel

Substrate runs the agent as an actor inside a gVisor sandbox, with its own user-space kernel, on dedicated nodes. Idle actors are snapshotted to object storage and resumed on the next request, which could replace the persistent volume the agent used for state. Tool traffic leaves through Substrate's egress, which adds a signed actor token so the gateway in front of the tools can check it.

- Strong isolation: a separate kernel, not just a filtered one
- Native support for the agent's runtime, no repackaging
- Already deployed, so the work is hardening rather than installing
- Tool tokens still reach the sandbox as secrets or environment variables

## NVIDIA OpenShell: a policy proxy around a normal container

OpenShell runs the agent as an ordinary container in a sandbox pod, behind a supervisor that enforces a YAML policy with Landlock, seccomp and network policy. Its gateway keeps the real tool credentials and refreshes OAuth tokens; the agent only ever sees placeholders, which the proxy swaps on the way out.

- Real tokens never enter the pod, and refresh is built in
- Isolation relies on the host kernel
- New controller, gateway, a node pool on a recent kernel, and its own database to run
- Young project, releasing often

## What decided it

Model access was solved outside either option: the agent gets a budgeted virtual key on the model gateway, which removed an OAuth token that kept expiring overnight.

With that settled, Substrate won on the agent's needs today: stronger isolation, no new infrastructure, and snapshots worth testing in place of the state volume. OpenShell's credential handling is better, and it becomes the right answer when many users each need their own tool OAuth. Until then, a refresh job beside long-lived tokens in a secrets manager is the smaller change.

## The general rule

Pick the layer by what you cannot afford to lose. If it is the host, take the separate kernel. If it is the credentials, take the proxy that keeps them out of the agent.
