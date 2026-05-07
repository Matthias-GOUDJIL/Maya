# Technical Architecture - Maya MMO

## Overview

Client-server architecture with authoritative server simulation and client-side interpolation.

## Server Structure (ECS)

```
server/src/
├── systems/           # ECS Systems
│   ├── TerritorySystem.ts    # Territory management
│   ├── CraftingSystem.ts    # Crafting
│   ├── FarmingSystem.ts     # Gardening
│   ├── MiningSystem.ts      # Mining
│   ├── BuildingSystem.ts    # Construction
│   ├── CombatSystem.ts      # PvP/PvE combat
│   └── EconomySystem.ts    # Economy
├── entities/         # Entity components
│   ├── Player.ts
│   ├── Territory.ts
│   ├── Building.ts
│   └── Item.ts
├── networking/       # Network management
│   ├── WebSocketServer.ts
│   ├── Protocol.ts
│   └── GameLoop.ts
├── database/         # Data access
│   ├── PostgreSQL.ts
│   ├── Redis.ts
│   └── Repositories/
└── utils/           # Utilities
```

## Gameplay Systems

### 1. Territory System
- Territory claim via purchase or conquest
- Progressive expansion
- Taxes and maintenance
- Buildings authorized by level

### 2. Crafting System
- Gathering (mining, harvesting, forestry)
- Processing (smelting, woodworking, weaving)
- Crafting (weapons, armor, buildings, tools)

### 3. Gardening System
- Crops with real growth cycles
- Seasonality
- Genetic crossbreeding
- Magical effects on plants

### 4. Construction System
- Free placement within territory
- Functional buildings (workshops, warehouses, defenses)
- Decorations
- Siege mechanics

### 5. Combat System
- Territorial PvP
- PvE (fairy creatures)
- No traditional leveling
- Progression through skills and equipment

## Network Protocol

### Client -> Server Messages
```
- PlayerMove { x, y, z, rotation }
- Interact { entityId, action }
- Build { buildingType, position, rotation }
- Craft { recipeId, materials }
- Attack { targetId, abilityId }
- ClaimTerritory { position, size }
```

### Server -> Client Messages
```
- EntityUpdate { id, position, state }
- TerritoryUpdate { territoryId, changes }
- InventoryUpdate { items }
- ChatMessage { sender, message }
```

## Database

### PostgreSQL (Persistent Data)
- players
- territories
- buildings
- items
- factions

### Redis (Real-time Data)
- Active entity positions
- Crop states
- Craft queues
- Session cache

## Simulation Loop

```
1. Input Handling (60Hz)
2. Physics Update
3. Systems Update (Territory, Crafting, Farming)
4. Collision Detection
5. State Broadcast (20Hz)
```

## Scaling

- Sharding by geographic zones
- Instance separation for dungeons/raids
- WebSocket load balancing
