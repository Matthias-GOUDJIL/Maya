# Maya - Fantasy Sandbox MMO

A sandbox MMO set in a fairy-tale universe inspired by AION, where players evolve freely without forced linear quests.

## Vision

A sandbox game allowing players to:
- Own and expand their territory (purchase/combat)
- Practice gardening, mining, construction
- Complete crafting system
- No "boring" quests - total freedom

## Architecture

```
Maya/
├── server/          # Backend Node.js/TypeScript
├── client/          # Client (game engine)
├── shared/          # Shared code (types, protocol)
├── docs/            # Documentation and diagrams
└── tools/           # Development tools
```

## Technologies

### Server
- Node.js + TypeScript
- WebSocket (ws)
- PostgreSQL + Redis
- ECS (Entity Component System)

### Client - Godot 4.6+
- Scene-based architecture
- GDScript for game logic
- Custom shaders for magical effects
- WebSockets for server communication

## Getting Started

### Server
```bash
cd server
npm install
npm run dev
```

### Client (Godot 4.6+)
1. Open `client/project.godot` with Godot 4.6+
2. The main scene is `scenes/world/FeyWild.tscn`
3. Press Play to run
