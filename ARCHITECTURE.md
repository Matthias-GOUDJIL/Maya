# Architecture Technique - Maya MMO

## Vue d'ensemble

Architecture client-serveur avec simulation serveur authoritative et interpolation côté client.

## Structure du Serveur (ECS)

```
server/src/
├── systems/           # Systèmes ECS
│   ├── TerritorySystem.ts    # Gestion territoires
│   ├── CraftingSystem.ts    # Artisanat
│   ├── FarmingSystem.ts     # Jardinage
│   ├── MiningSystem.ts      # Minage
│   ├── BuildingSystem.ts    # Construction
│   ├── CombatSystem.ts      # Combat PvP/PvE
│   └── EconomySystem.ts    # Économie
├── entities/         # Composants d'entités
│   ├── Player.ts
│   ├── Territory.ts
│   ├── Building.ts
│   └── Item.ts
├── networking/       # Gestion réseau
│   ├── WebSocketServer.ts
│   ├── Protocol.ts
│   └── GameLoop.ts
├── database/         # Accès données
│   ├── PostgreSQL.ts
│   ├── Redis.ts
│   └── Repositories/
└── utils/           # Utilitaires
```

## Systèmes de Gameplay

### 1. Système de Territoire
- Claim de territoire via achat ou conquête
- Expansion progressive
- Taxes et maintenance
- Bâtiments autorisés selon niveau

### 2. Système d'Artisanat
- Gathering (minage, récolte, forestry)
- Processing (fonderie, travail du bois, tissage)
- Crafting (armes, armures, bâtiments, outils)

### 3. Système de Jardinage
- Cultures avec cycles de croissance réels
- Saisonnalité
- Croisements génétiques
- Effets magiques sur les plantes

### 4. Système de Construction
- Placement libre dans son territoire
- Bâtiments fonctionnels (ateliers, entrepôts, défenses)
- Décorations
- Mécaniques de siège

### 5. Système de Combat
- PvP territorial
- PvE (créatures féériques)
- Pas de leveling traditionnel
- Progression par compétences et équipement

## Protocole Réseau

### Messages Client -> Serveur
```
- PlayerMove { x, y, z, rotation }
- Interact { entityId, action }
- Build { buildingType, position, rotation }
- Craft { recipeId, materials }
- Attack { targetId, abilityId }
- ClaimTerritory { position, size }
```

### Messages Serveur -> Client
```
- EntityUpdate { id, position, state }
- TerritoryUpdate { territoryId, changes }
- InventoryUpdate { items }
- ChatMessage { sender, message }
```

## Base de Données

### PostgreSQL (Données persistantes)
- players
- territories
- buildings
- items
- factions

### Redis (Données temps réel)
- Positions entités actives
- États des cultures
- Files d'attente de craft
- Cache des sessions

## Loop de Simulation

```
1. Input Handling (60Hz)
2. Physics Update
3. Systems Update (Territory, Crafting, Farming)
4. Collision Detection
5. State Broadcast (20Hz)
```

## Scaling

- Sharding par zones géographiques
- Instance separation pour donjons/raids
- Load balancing WebSocket
