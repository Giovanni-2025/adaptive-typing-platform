# 0001 — Organise project and agent documentation

- Status: Accepted for the current documentation task
- Date: 2026-10-13
- Decision authority: project owner's request in this chat
- Scope: documentation organisation only; no new product/API/design approval

## Decision

Keep documentation within `adaptive-typing-platform`. Put concise agent instructions and the unapproved design template at the repository root. Use `docs/README.md` as the guide index, `docs/context/` for current status and long-form handoff, and `docs/decisions/` for dated decisions. Rename the detailed project-structure guide to architecture.md and preserve the SRS requirements.

## Why

Teammates and agents need a shared entry point and task-specific reading paths. Separating requirements, draft contracts, context and design placeholders reduces duplicated rules and prevents proposals being mistaken for implemented features.

## Consequences

Update local links after moving documents. Do not inspect or modify application code during this work: the owner explicitly said it does not match the documentation and should be ignored for now. Setup/API examples remain unverified and DESIGN.md remains a template. Future explicit implementation tasks can inspect and change relevant code within their authorised scope.
