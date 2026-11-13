---
title: 'Credential Issuer for Agent Tools'
description: 'One service that gives an AI agent’s tool a short-lived credential for one user only, AWS role credentials or a read-only GitLab token, checked outside the model.'
tags: ['AI Agents', 'Security', 'AWS', 'GitLab', 'Kubernetes']
date: '2026-11-13'
flow: ['Teams user', 'Agent gateway', 'Agent actor', 'Tool', 'Credential issuer', 'AWS or GitLab']
---

## Overview

When an agent's tool acts for a user, it needs that user's access to the system it reads, not a shared key. The credential issuer gives the tool a short-lived credential for that one user: AWS role credentials, or a read-only GitLab token. The credential never travels through the model, the agent-to-agent call, the model gateway or the agent gateway. Only the user's Entra token does, and the issuer checks it itself.

## A tool call, end to end

1. The user asks an agent in a one-to-one Teams chat.
2. The Teams bot swaps the Teams token for an Entra on-behalf-of token and sends the agent call through LiteLLM.
3. agentgateway checks the Entra signature, audience and app role; kagent starts the agent.
4. The agent calls its tool directly and forwards the user's token, never a credential and never in the prompt.
5. The tool's shared issuer client asks the issuer for a credential, presenting the user's token and its own service-account token, and keeps the answer for a minute.
6. The issuer runs its checks and opens the user's sealed grant with AWS KMS. For AWS it mints role credentials from IAM Identity Center; for GitLab it renews the access token when it is close to expiry. Either way it re-checks who owns the account every few minutes.
7. The tool reads as the user, read-only AWS CLI or GET-only GitLab API, and returns only the result.

## What the issuer checks

- **The user's token:** signature, issuer, audience and expiry against Entra's keys. The agent runtime trusts its proxy and does not check signatures, so the issuer cannot rely on it.
- **The caller:** the tool's Kubernetes service-account token, allowed for this action and this system. A stolen user token presented from another pod gets nothing.
- **The app role:** one role for AWS, another for read-only GitLab, so only users cleared for a system reach it through an agent.
- **A real user:** group-chat turns carry the bot's own token and never get a personal credential.
- **Use rules:** the grant must be active, unexpired and newer than the user's last sign-out.
- **The seal:** each grant is encrypted with a KMS context of tenant, user and system, so a ciphertext copied into another user's row will not open.
- **The owner:** for AWS, the role session name must be the user's sign-in name; for GitLab, the GitLab account's linked Microsoft identity must be the user's. Someone completing a sign-in on another person's link is refused.
- **GitLab sign-in:** a one-time state and PKCE on the callback, and token refresh under a row lock so two replicas never spend the same refresh token.

## Sign-in

The user sends `/sso aws` or `/sso gitlab` in a one-to-one chat. AWS signs in with a device code; GitLab with a browser sign-in whose callback is the only path of the issuer reachable from outside. When the next poll confirms the owner, the grant becomes active and the bot confirms in Teams.

## Adding a system

When the system's sign-in type already exists, onboarding is three steps: register a public OAuth application with the smallest scopes, add a provider block to the issuer's configuration, and check `/sso` in Teams. A new kind of system adds an adapter with tests for owner mismatch, an owner-check outage, refresh and bad settings. A system that already accepts the user's Entra token needs no issuer at all.
