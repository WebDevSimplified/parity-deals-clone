# Graph Report - parity-deals-clone  (2026-06-24)

## Corpus Check
- 85 files · ~19,894 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 107 nodes · 34 edges · 80 communities (4 shown, 76 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b85169bd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]

## God Nodes (most connected - your core abstractions)
1. `Parity Deals Clone` - 7 edges
2. `Runbook` - 7 edges
3. `Contributing Guide` - 6 edges
4. `allowBuilds` - 4 edges
5. `ESLint Import Validation` - 4 edges
6. `Architecture` - 3 edges
7. `Environment Variables Configuration` - 3 edges
8. `Clerk Webhook Integration` - 3 edges
9. `Stripe Webhook Integration` - 3 edges
10. `Local Development Setup` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Contributing Guide` --references--> `ESLint Import Validation`  [EXTRACTED]
  docs/CONTRIBUTING.md → README.md
- `Local Development Setup` --conceptually_related_to--> `Database Migration Procedure`  [INFERRED]
  docs/CONTRIBUTING.md → docs/RUNBOOK.md
- `Environment Variables Configuration` --conceptually_related_to--> `Clerk Webhook Integration`  [INFERRED]
  docs/CONTRIBUTING.md → docs/RUNBOOK.md
- `Environment Variables Configuration` --conceptually_related_to--> `Stripe Webhook Integration`  [INFERRED]
  docs/CONTRIBUTING.md → docs/RUNBOOK.md

## Import Cycles
- None detected.

## Communities (80 total, 76 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (7): Available Commands, Contributing Guide, PR Submission Checklist, ESLint Import Validation, eslint-plugin-boundaries, eslint-plugin-project-structure, Feature Folder System

### Community 1 - "Community 1"
Cohesion: 0.20
Nodes (9): Architecture, Commands, Feature directory pattern (`src/features/*/`), graphify, Import boundaries (enforced by ESLint), Key quirks, Local setup, Parity Deals Clone (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.38
Nodes (7): Environment Variables Configuration, Clerk Webhook Integration, Health Checks & Monitoring, Troubleshooting & Rollback Procedures, Runbook, Stripe Webhook Integration, Vercel Deployment

### Community 3 - "Community 3"
Cohesion: 0.40
Nodes (4): allowBuilds, @clerk/shared, esbuild, unrs-resolver

## Knowledge Gaps
- **91 isolated node(s):** `Stack`, `Commands`, `Import boundaries (enforced by ESLint)`, `Feature directory pattern (`src/features/*/`)`, `Key quirks` (+86 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **76 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Runbook` connect `Community 2` to `Community 0`, `Community 4`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Contributing Guide` connect `Community 0` to `Community 2`, `Community 4`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `Stack`, `Commands`, `Import boundaries (enforced by ESLint)` to the rest of the system?**
  _93 weakly-connected nodes found - possible documentation gaps or missing edges._