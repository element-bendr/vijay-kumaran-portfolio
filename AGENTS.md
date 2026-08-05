# Project AI workflow

- Use Memory OS for project context and durable learnings. Route learnings through review intake; never write canonical memory or Postgres directly.
- Start non-trivial work with `bd prime` and `bd ready --json` when Beads is available.
- Use Caveman for concise communication and minimal implementation.
- Use Ponytail for YAGNI, shortest safe diff, native platform features, and no speculative abstractions.
- Use Karpathy Codex guidelines: state assumptions, make surgical edits, define verification, and report what passed or remains unverified.
- Use RTK (`rtk`, not `rtx`) for shell commands when available. Keep raw-command fallback when compression hides evidence.
- Prefer codebase-memory MCP: index repository first, then `search_graph`, `trace_path`, `get_code_snippet`, `query_graph`, and `get_architecture` before grep for code discovery.
- Use Serena for symbol-aware navigation and edits when available; use it after the codebase-memory graph for targeted symbol work.
- Maintain headroom: keep context bounded, read only task-relevant files, and stop after repeated failures.
- For every material checkpoint, document goal, bead, files, commands/results, decisions, blockers, and exact next action in the project handoff and Memory OS review intake.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->

<!-- BEGIN CENTRAL MEMORY v:1 -->
## Shared project memory

- At the start of non-trivial work, run `memory-project ensure "$PWD"`.
- Query GBrain with the project name, task goal, and relevant subsystem before making decisions that may depend on prior work.
- Ignore retrieval results from `_review/`, `_drafts/`, `_rejected/`, `_templates/`, `inbox/`, `archive/reviewed/`, `consolidations/`, and `skill-signals/`; they are workflow state, not approved memory.
- Treat recalled memory as guidance, then verify it against repository code, Git, Beads, logs, or live behavior.
- Route durable lessons through the central review queue; never write permanent memory or Postgres directly.
<!-- END CENTRAL MEMORY -->
