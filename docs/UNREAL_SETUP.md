# Unreal Engine 5 Setup - Maya MMO (DEPRECATED)

**Note**: This project has migrated from Unreal Engine 5 to Godot 4.6+.
This document is kept for historical reference only.

## Prerequisites

- Unreal Engine 5.3+ installed via Epic Games Launcher
- Visual Studio 2022 (Community Edition sufficient) with:
  - Desktop development with C++
  - Windows 10/11 SDK

## Unreal Project Structure (Legacy)

```
client/MayaGame/
├── MayaGame.uproject          # Unreal project file
├── Source/
│   └── MayaGame/             # Main C++ module
│       ├── MayaGame.Build.cs  # Module dependencies
│       ├── Public/           # Headers (.h)
│       │   ├── Network/      # NetworkManager
│       │   ├── Player/       # PlayerController
│       │   └── Game/         # GameInstance
│       └── Private/          # Implementations (.cpp)
├── Content/                   # Game assets
│   ├── Blueprints/           # Blueprints
│   ├── Materials/            # Materials (PBR, Nanite)
│   ├── Meshes/               # 3D models (Nanite support)
│   ├── Textures/             # Textures (Virtual Texture support)
│   ├── Levels/               # Fey world maps
│   └── UI/                   # Interface (UMG)
└── Config/                    # Configuration
    ├── DefaultEngine.ini     # Engine and network
    └── DefaultInput.ini      # Controls
```

## Unreal Features Used (Legacy)

### Rendering (Fey World)
- **Nanite** - Virtual geometry for dense forests and extreme details
- **Lumen** - Dynamic global illumination (fey lights, magic)
- **Virtual Shadow Maps** - High resolution shadows
- **Temporal Super Resolution** - Upscaling for performance

### Gameplay
- **C++** for network logic and critical systems
- **Blueprints** for rapid prototyping and gameplay
- **Gameplay Ability System** (optional) for skills/crafting

### Network
- **WebSockets** native (Unreal WebSockets module)
- Communication with Node.js server via JSON
- Client-side interpolation for smoothness

## Current Setup (Godot 4.6+)

The project now uses Godot 4.6+ instead of Unreal Engine.
See `README.md` for current setup instructions.
