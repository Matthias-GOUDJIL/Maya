# Maya - MMO Sandbox Fantastique

MMO sandbox dans un univers féérique style AION où les joueurs évoluent librement sans quêtes linéaires forcées.

## Vision

Jeu sandbox permettant aux joueurs de :
- Posséder et étendre leur territoire (achat/combat)
- Pratiquer le jardinage, minage, construction
- Système d'artisanat complet
- Pas de quêtes "chiantes" - liberté totale

## Architecture

```
Maya/
├── server/          # Backend Node.js/TypeScript
├── client/          # Client (moteur de jeu)
├── shared/          # Code partagé (types, protocole)
├── docs/            # Documentation et diagrammes
└── tools/           # Outils de développement
```

## Technologies

### Serveur
- Node.js + TypeScript
- WebSocket (ws)
- PostgreSQL + Redis
- ECS (Entity Component System)

### Client - Unreal Engine 5.3+
- **Nanite** - Géométrie virtuelle pour détails infinis
- **Lumen** - Illumination globale dynamique temps réel
- **Ray Tracing** natif
- **MetaHuman** support pour personnages
- C++ et Blueprints
- WebSockets pour communication serveur

## Démarrage

### Serveur
```bash
cd server
npm install
npm run dev
```

### Client (Unreal Engine 5)
1. Ouvrir `client/MayaGame/MayaGame.uproject` avec Unreal Engine 5.3+
2. Compiler les modules C++ si nécessaire
3. Lancer avec Play
