<!-- BEGIN:graphify -->
## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
<!-- END:graphify -->

<!-- BEGIN:agentmemory -->
# agentmemory Governance & Execution Policy

> **MANDATORY GOVERNANCE FOR ALL AI AGENTS & ASSISTANTS** (Antigravity 2.0, Antigravity IDE, Claude Code, Codex, OpenCode, Gemini CLI/agy, and subagents). Reconciles `mem_mso8332m` (MCP-First) + `mem_msnlgaig` (Project Exception).

## 1. Execution Protocol (MCP-First Policy across ALL Operations)
1. **PRIMARY Protocol**: Use MCP tools (`memory_save`, `memory_recall`, `memory_lesson_save`, `memory_export`, `memory_consolidate`, etc.) for ALL `agentmemory` interactions, usage, and operations.
2. **REST / HTTP API FALLBACK**: REST endpoints (e.g., `POST /agentmemory/remember`, `POST /agentmemory/recall`, `POST /agentmemory/export`, etc.) are FALLBACK ONLY if:
   a. The MCP server fails, crashes, times out, or is unavailable, OR
   b. Project field scoping is strictly required for a write (MCP `memory_save` silently drops the `project` parameter at runtime — verified live, `mem_mso88wlk`).
3. **No Raw REST Scripts as Default**: Never write raw `Invoke-RestMethod` / `curl` scripts as the default path for routine operations — it defeats the unified MCP architecture.

## 2. Post-Upgrade Maintenance & Re-verification (All Agents & Skills)
Whenever `@agentmemory/agentmemory` or host agent packages are updated (`npm update -g @agentmemory/agentmemory`, system updates, or skill updates):
1. **Re-Verify Absolute Hook & Config Paths**: Global package upgrades change NPM installation paths. Instantly re-verify absolute `.mjs` script paths across ALL agent configuration surfaces to prevent `ENOENT` crashes:
   - **Antigravity 2.0 (Electron / Primary)**: `~/.gemini/antigravity/mcp_config.json`
   - **Antigravity IDE (VS Code Fork)**: `AppData/Roaming/Antigravity/User/mcp.json`
   - **Claude Code**: `~/.claude/settings.json` & `~/.claude.json`
   - **Codex**: `~/.codex/hooks.json` & `~/.codex/config.toml`
   - **OpenCode**: `~/.config/opencode/opencode.json` & `~/.config/opencode/plugins/agentmemory-capture.ts`
   - **Gemini CLI / agy**: `~/.gemini/config/hooks.json` & `~/.gemini/config/mcp_config.json`
2. **Re-Verify Skills & Plugin Bundles**: Ensure official skill manifests and reference files in (e.g., `~/.gemini/config/skills/`, `~/.agents/skills/`, etc.) (`agentmemory-agents`, `agentmemory-architecture`, `agentmemory-config`, `agentmemory-hooks`, `agentmemory-mcp-tools`, `agentmemory-rest-api`, etc.) and `plugins/` remain intact and registered.

## 3. Surface & Verification Protocol (Official-Source Rule)
1. **Routine Operations**: Known routine ops (`memory_save`, `memory_recall`, `lesson_save`) -> execute via MCP tools directly. No pre-loading of skills required.
2. **Surface / Officialness Inquiries**: When asking if a feature, tool parameter, config variable, or endpoint is official -> load the RELEVANT official SKILL first (`agentmemory-agents`, `agentmemory-architecture`, `agentmemory-config`, `agentmemory-hooks`, `agentmemory-mcp-tools`, `agentmemory-rest-api` + their `REFERENCE.md`). Never reason about the surface from memory, guesswork, or raw MCP runtime output alone.
3. **Realtime Facts & Documentation**: Use `ctx7` ONLY (`npx ctx7@latest library <name>` then `docs <libraryId>`). NEVER raw-fetch GitHub files as the primary source of truth.
4. **MCP Failures / Missing Features**: If an endpoint or feature is missing from the MCP runtime surface -> STOP and load official skills + `ctx7` before proceeding.
5. **Zero Workarounds**: Only official or official+manual mechanisms are permitted. If unsure whether a mechanism is official, state "not verified" instead of inventing a workaround.
<!-- END:agentmemory -->

<!-- context7 -->
Use the `ctx7` CLI to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service — even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer — your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Resolve library: `npx ctx7@latest library <name> "<what to look up>"` — use the official library name with proper punctuation (e.g., "Next.js" not "nextjs", "Customer.io" not "customerio", "Three.js" not "threejs")
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question)
3. Fetch docs: `npx ctx7@latest docs <libraryId> "<what to look up>"` — run a separate `docs` command per distinct concept if the question spans multiple topics, unless it's about how they interact
4. Answer using the fetched documentation

You MUST call `library` first to get a valid ID unless the user provides one directly in `/org/project` format. Be specific about what to look up in the library's documentation — specific and detailed queries return better results than vague single words, but keep each query to a single concept unless the question is about how concepts interact; combined multi-topic queries dilute ranking and return shallow results for each topic. Do not run more than 3 commands per question. Do not include sensitive information (API keys, passwords, credentials) in queries.

For version-specific docs, use `/org/project/version` from the `library` output (e.g., `/vercel/next.js/v14.3.0`).

If a command fails with a quota error, inform the user and suggest `npx ctx7@latest login` or setting `CONTEXT7_API_KEY` env var for higher limits. Do not silently fall back to training data.
<!-- context7 -->

<!-- caveman-begin -->
Respond terse like smart caveman. All technical substance stay. Only fluff die.

Rules:
- Drop: articles (a/an/the), filler (just/really/basically), pleasantries, hedging
- Fragments OK. Short synonyms. Technical terms exact. Code unchanged.
- Pattern: [thing] [action] [reason]. [next step].
- Not: "Sure! I'd be happy to help you with that."
- Yes: "Bug in auth middleware. Fix:"

Switch level: /caveman lite|full|ultra|wenyan
Stop: "stop caveman" or "normal mode"

Auto-Clarity: drop caveman for security warnings, irreversible actions, user confused. Resume after.

Boundaries: code/commits/PRs written normal.
<!-- caveman-end -->
