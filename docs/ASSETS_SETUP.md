# Configuration des Assets - Maya MMO

## Après importation des assets

### 1. Préparer les assets pour Unreal Engine 5

#### Placez les fichiers téléchargés dans :
```
client/MayaGame/Content/Assets/
├── Meshes/Props/        # Bâtiments, objets
├── Meshes/Vegetation/   # Arbres, plantes, fleurs
├── Meshes/Characters/   # Personnages
├── Textures/Terrain/    # Textures de sol, herbe
└── Materials/           # Matériaux PBR
```

### 2. Dans Unreal Editor

1. **Ouvrir le projet** `client/MayaGame/MayaGame.uproject`
2. **Voir les assets** dans Content Browser
3. **Activer Nanite** (clic droit sur mesh > Enable Nanite)
4. **Configurer Lumen** :
   - Project Settings > Rendering > Lumen
   - Activer "Use Lumen Global Illumination"

### 3. Créer le niveau féérique

#### Landscape
- Mode Landscape > Create
- Import heightmap ou sculptez à la main
- Appliquer textures de sol (grass, dirt, stone)

#### Foliage (Forer féérique dense)
- Mode Foliage > Paint
- Ajouter arbres, buissons, fleurs
- Activer "Affect Dynamic Indirect Lighting" pour Lumen

#### Éclairage magique
- Ajouter Point Lights avec couleurs irisées
- Exponential Height Fog (brouillard féérique)
- Sky Light avec HDRI de Poly Haven

### 4. Importer les personnages (Mixamo)

1. Télécharger sur mixamo.com
2. Format : FBX avec "Skin" et "Animation"
3. Importer dans UE5
4. Créer Animation Blueprint

### 5. Script automatique d'import (optionnel)

```python
# Dans Unreal Python console
import unreal

def batch_import():
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    # Configuration import FBX
    import_options = unreal.FbxImportUI()
    import_options.set_editor_property('import_mesh', True)
    import_options.set_editor_property('import_textures', True)
```

## Assets recommandés pour Maya MMO

### Environnement féérique
- **Arbres** : European Beech (Quixel), Weeping Willow
- **Rochers** : Poly Haven rocks (Nanite)
- **Plantes magiques** : Glowing mushrooms, Crystal formations
- **Eau** : Lake/river avec plan reflectant

### Bâtiments/P&L
- Ruines antiques
- Tentes/Pavillons (style féérique)
- Autels magiques
- Portails

### Effets (Niagara)
- Poussière féérique
- Étincelles magiques
- Brouillard lumineux
