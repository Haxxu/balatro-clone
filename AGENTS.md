# Balatro Clone Agent Guide

## Purpose

This repository is building a browser-based Balatro-inspired game with Angular.

## Working Files

- `agents/tokens.local.json`: local-only storage for API tokens or private keys. This file is ignored by git.
- `agents/tokens.example.json`: template for the token file structure.
- `agents/project-context.md`: shared notes for gameplay rules, implementation priorities, and system boundaries.
- `docs/balatro-systems-overview.md`: high-level game systems overview.
- `docs/angular-architecture.md`: recommended Angular structure using signals, RxJS, and feature-first organization.

## Agent Rules

- Never commit real tokens.
- Keep rule notes and architecture decisions in `agents/project-context.md`.
- When adding new gameplay systems, update the docs before or alongside code.
- Prefer Angular signals for local UI state and derived values.
- Use RxJS for persistence, effects, timers, and external event streams.
- Keep scoring and rule evaluation in pure TypeScript modules so they stay testable.
