# Configuration Unreal Engine 5 - Maya MMO

## Prérequis

- Unreal Engine 5.3+ installé via Epic Games Launcher
- Visual Studio 2022 (Community Edition suffit) avec :
  - Développement Desktop en C++
  - Windows 10/11 SDK

## Structure du projet Unreal

```
client/MayaGame/
├── MayaGame.uproject          # Fichier projet Unreal
├── Source/
│   └── MayaGame/             # Module principal C++
│       ├── MayaGame.Build.cs  # Dépendances du module
│       ├── Public/           # Headers (.h)
│       │   ├── Network/      # NetworkManager
│       │   ├── Player/       # PlayerController
│       │   └── Game/         # GameInstance
│       └── Private/          # Implémentations (.cpp)
├── Content/                   # Assets du jeu
│   ├── Blueprints/           # Blueprints
│   ├── Materials/            # Matériaux (PBR, Nanite)
│   ├── Meshes/               # Modèles 3D (support Nanite)
│   ├── Textures/             # Textures (support Virtual Texture)
│   ├── Levels/               # Cartes du monde féérique
│   └── UI/                   # Interface (UMG)
└── Config/                    # Configuration
    ├── DefaultEngine.ini     # Moteur et réseau
    └── DefaultInput.ini      # Contrôles
```

## Fonctionnalités Unreal utilisées

### Rendu graphique (Monde féérique)
- **Nanite** - Maillages virtuels pour forêts denses et détails extrêmes
- **Lumen** - Éclairage global dynamique (lumières féériques, magie)
- **Virtual Shadow Maps** - Ombres haute résolution
- **Temporal Super Resolution** - Upscaling pour performance

### Gameplay
- **C++** pour la logique réseau et systèmes critiques
- **Blueprints** pour prototypage rapide et gameplay
- **Gameplay Ability System** (optionnel) pour compétences/artisanat

### Réseau
- **WebSockets** natifs (module WebSockets d'Unreal)
- Communication avec serveur Node.js via JSON
- Interpolation côté client pour fluidité

## Compilation

1. Ouvrir `MayaGame.uproject`
2. Si demandé, reconstruire les modules : "Yes"
3. Dans Unreal : Tools → Compile

Ou en ligne de commande :
```bash
cd client/MayaGame
"C:\Program Files\Epic Games\UE_5.3\Engine\Build\BatchFiles\Build.bat" MayaGame Win64 Development
```

## Prochaines étapes

1. Créer le monde féérique avec Landscape et Foliage
2. Importer/Migrer des assets (Megascans, Marketplace)
3. Implémenter le système de territoire visuel
4. Créer l'UI d'artisanat et de jardinage
5. Intégrer les effets magiques (Niagara)
