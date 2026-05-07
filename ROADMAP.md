# Maya MMO - Roadmap

## Project Board
Visit: https://github.com/Matthias-GOUDJIL/Maya/projects (create manually in GitHub UI)

## Phases Overview

| Phase | Focus | Duration | Milestone | Issues |
|-------|--------|----------|-----------|-------|
| **1: Infrastructure** | Database + Game Loop | Weeks 1-4 | Phase 1 | #1, #2, #3, #4, #5, #6, #7 |
| **2: Gameplay** | Missing Systems | Weeks 5-8 | Phase 2 | #8, #9, #10, #11 |
| **3: Content** | Assets + Polish | Weeks 9-12 | Phase 3 | #12, #13, #14, #15 |
| **4: Scale** | Multiplayer | Weeks 13-16 | Phase 4 | #16, #17, #18, #19 |

---

## Phase 1: Infrastructure (Weeks 1-4)
**Goal**: Complete server infrastructure and core entities

### Deliverables
- [ ] **#1** - Set up PostgreSQL database schema and integration
- [ ] **#2** - Set up Redis for real-time data caching  
- [ ] **#3** - Implement complete game loop (60Hz input, 20Hz broadcast)
- [ ] **#4** - Create Player entity class with persistence
- [ ] **#5** - Create Territory entity class
- [ ] **#6** - Create Building entity class
- [ ] **#7** - Create Item entity class

### Success Criteria
- PostgreSQL and Redis connected and working
- Game loop running at correct frequencies
- All ECS entities implemented with persistence
- Unit tests passing >80% coverage

---

## Phase 2: Gameplay Systems (Weeks 5-8)
**Goal**: Implement all missing gameplay systems from ARCHITECTURE.md

### Deliverables
- [ ] **#8** - Implement MiningSystem with ore types and respawn
- [ ] **#9** - Implement BuildingSystem with placement validation
- [ ] **#10** - Implement CombatSystem (PvP territories + PvE creatures)
- [ ] **#11** - Implement EconomySystem with supply/demand

### Success Criteria
- All 4 systems implemented with ECS pattern
- Integration with existing Farming/Crafting systems
- Territory expansion requires combat victories
- Dynamic economy affects item prices

---

## Phase 3: Content & Polish (Weeks 9-12)
**Goal**: Improve client visuals and user experience

### Deliverables
- [ ] **#12** - Import 3D character models from Mixamo
- [ ] **#13** - Add health/mana bars to HUD
- [ ] **#14** - Create mini-map for territory visualization
- [ ] **#15** - Implement sound effects and background music

### Success Criteria
- Character models replace placeholder box meshes
- All UI elements functional and polished
- Mini-map shows territory boundaries
- Immersive audio experience with 3D positional audio

---

## Phase 4: Tools & Scaling (Weeks 13-16)
**Goal**: DevOps, testing, and multiplayer optimization

### Deliverables
- [ ] **#16** - Fix asset_importer.py to target Godot instead of Unreal
- [ ] **#17** - Set up CI/CD pipeline (GitHub Actions)
- [ ] **#18** - Add unit tests for server ECS systems
- [ ] **#19** - Add integration tests for client-server WebSocket protocol

### Success Criteria
- Asset importer works with Godot pipeline
- CI/CD blocks PRs with failing tests
- >80% test coverage for all systems
- WebSocket protocol fully tested end-to-end

---

## Labels Reference

| Label | Color | Description |
|-------|-------|-------------|
| `infrastructure` | #0052CC | Server infrastructure, database, DevOps |
| `gameplay` | #7B42BC | Gameplay systems, mechanics, ECS |
| `client` | #5319E7 | Godot client, GDScript, scenes, shaders |
| `server` | #008672 | Node.js server, TypeScript, ECS systems |
| `tools` | #FBBA04 | Dev tools, scripts, CI/CD |
| `documentation` | #0E8A16 | Docs, README, AGENTS.md |
| `enhancement` | #84B6EB | New feature or improvement |
| `bug` | #D73A4A | Something isn't working |

---

## Current Status (as of 2026-05-07)

### ✅ Implemented
- Godot client with 9 GDScript files, 8 scenes, 4 shaders
- 3 ECS systems (Farming, Crafting, Territory) on server
- NetworkManager with WebSocket communication
- Shared protocol and types definitions
- Full documentation (README, ARCHITECTURE, AGENTS)

### ⚠️ Partially Implemented
- Game loop (placeholder only in server/src/index.ts)
- Docker setup (configured but no init.sql)

### ❌ Not Implemented (19 issues created)
- 4 missing ECS systems (Mining, Building, Combat, Economy)
- 4 entity classes (Player, Territory, Building, Item)
- Database integration (PostgreSQL, Redis)
- Testing framework and CI/CD

---

## Quick Links

- **Issues**: https://github.com/Matthias-GOUDJIL/Maya/issues
- **Labels**: https://github.com/Matthias-GOUDJIL/Maya/labels
- **Project Board**: Create manually at https://github.com/Matthias-GOUDJIL/Maya/projects/new
- **Milestones**: Create manually at https://github.com/Matthias-GOUDJIL/Maya/milestones
