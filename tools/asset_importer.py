#!/usr/bin/env python3
"""
Maya MMO - Asset Importer
Script d'importation automatique d'assets 3D gratuits pour Unreal Engine 5
"""

import os
import json
import urllib.request
import urllib.parse
from pathlib import Path
import shutil

# Configuration
PROJECT_ROOT = Path(__file__).parent.parent
CLIENT_CONTENT = PROJECT_ROOT / "client" / "MayaGame" / "Content"
ASSETS_DIR = CLIENT_CONTENT / "Assets"

# Structure des dossiers d'assets
ASSET_STRUCTURE = {
    "Meshes": ["Meshes", "Props", "Environment", "Characters", "Vegetation"],
    "Textures": ["Textures", "Materials", "Terrain"],
    "Materials": ["MaterialInstances", "MaterialFunctions"],
    "Blueprints": ["BP_Props", "BP_Characters", "BP_Systems"],
    "Effects": ["Niagara", "Particles"],
    "Audio": ["SFX", "Music", "Ambient"]
}

# Assets Poly Haven (API publique)
POLYHAVEN_CATEGORIES = {
    "terrain": ["rock", "boulder", "cliff"],
    "vegetation": ["tree", "grass", "bush", "fern"],
    "fantasy": ["statue", "rune", "crystal", "magic"]
}

# URLs des sources gratuites
ASSET_SOURCES = {
    "polyhaven": "https://api.polyhaven.com/assets",
    "mixamo": "https://www.mixamo.com/api/v1/characters",
    "kenney": "https://kenney.nl/content/3-assets"
}


def create_asset_structure():
    """Crée la structure de dossiers pour les assets"""
    print("📁 Création de la structure des dossiers...")

    for category, subdirs in ASSET_STRUCTURE.items():
        category_path = ASSETS_DIR / category
        category_path.mkdir(parents=True, exist_ok=True)

        for subdir in subdirs:
            (category_path / subdir).mkdir(exist_ok=True)

    print("✅ Structure créée avec succès!")


def download_file(url, destination, max_retries=3):
    """Télécharge un fichier avec gestion d'erreurs et vérification"""
    try:
        print(f"  ⬇️  Téléchargement: {destination.name}")
        headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        }
        req = urllib.request.Request(url, headers=headers)

        for attempt in range(max_retries):
            try:
                with urllib.request.urlopen(req, timeout=30) as response:
                    if response.status == 200:
                        with open(destination, 'wb') as f:
                            f.write(response.read())
                        # Vérifier que le fichier n'est pas vide
                        if destination.stat().st_size > 0:
                            print(f"  ✅ {destination.name} téléchargé ({destination.stat().st_size} octets)")
                            return True
                        else:
                            print(f"  ❌ Fichier vide: {destination.name}")
                            return False
            except Exception as e:
                print(f"  ⚠️ Tentative {attempt+1} échouée: {e}")
                if attempt == max_retries - 1:
                    raise
        return False
    except Exception as e:
        print(f"  ❌ Erreur téléchargement: {e}")
        return False


def fetch_polyhaven_assets(asset_type="vegetation", limit=10):
    """Récupère la liste des assets Poly Haven (API v2)"""
    print(f"\n🌿 Recherche d'assets Poly Haven ({asset_type})...")

    try:
        # API v2 Poly Haven
        url = f"https://api.polyhaven.com/v2/assets?type={asset_type}&limit={limit}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
        }
        req = urllib.request.Request(url, headers=headers)

        for attempt in range(3):
            try:
                with urllib.request.urlopen(req, timeout=15) as response:
                    if response.status == 200:
                        data = json.loads(response.read().decode())
                        break
            except Exception as e:
                if attempt == 2:
                    raise
        else:
            return []

        assets = []
        for asset in data.get("results", [])[:limit]:
            asset_id = asset.get("id")
            assets.append({
                "id": asset_id,
                "name": asset.get("name", asset_id),
                "type": asset_type,
                "author": asset.get("author", "Unknown"),
                "download_url": f"https://api.polyhaven.com/v2/download/{asset_id}/fbx/1",
                "preview_url": f"https://polyhaven.com/a/{asset_id}"
            })

        print(f"  ✅ {len(assets)} assets trouvés")
        return assets

    except Exception as e:
        print(f"  ❌ Erreur API Poly Haven: {e}")
        print("  ℹ️  Téléchargement manuel via https://polyhaven.com")
        return []


def create_asset_manifest():
    """Crée un manifeste des assets importés"""
    manifest = {
        "project": "Maya MMO",
        "version": "0.1.0",
        "assets": []
    }

    for category_dir in ASSETS_DIR.iterdir():
        if category_dir.is_dir():
            for asset_file in category_dir.rglob("*.*"):
                manifest["assets"].append({
                    "name": asset_file.stem,
                    "path": str(asset_file.relative_to(CLIENT_CONTENT)),
                    "type": category_dir.name,
                    "size": asset_file.stat().st_size
                })

    manifest_path = ASSETS_DIR / "manifest.json"
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"\n📋 Manifeste créé: {manifest_path}")


def generate_import_script():
    """Génère un script Python pour l'importation dans Unreal"""
    script_path = CLIENT_CONTENT / "ImportAssets.py"

    script_content = '''#!/usr/bin/env python
# Script d'importation automatique pour Unreal Engine 5
# À exécuter dans l'éditeur Unreal (Tools > Python)

import unreal

def import_assets():
    """Importe tous les assets du dossier Assets/"""
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    asset_paths = []

    import_path = "/Game/Assets"

    # TODO: Implémenter l'import automatique
    unreal.log("Début de l'importation des assets...")

if __name__ == "__main__":
    import_assets()
'''

    with open(script_path, "w") as f:
        f.write(script_content)

    print(f"🐍 Script Unreal Python généré: {script_path}")


def create_readme():
    """Crée un README pour les assets"""
    readme_path = ASSETS_DIR / "README.md"

    readme_content = """# Assets - Maya MMO

## Sources d'assets gratuits

### Poly Haven (https://polyhaven.com)
- Modèles 3D, textures, HDRIs
- Libre de droits (CC0)
- Support Nanite natif

### Mixamo (https://mixamo.com)
- Personnages et animations
- Gratuit (compte Adobe requis)
- Format FBX

### Kenney Assets (https://kenney.nl)
- Packs d'assets low-poly
- Licence CC0

### Quixel Megascans
- Inclus dans Unreal Engine 5
- Scans 3D photoréalistes
- Support Nanite/Lumen

## Structure

```
Assets/
├── Meshes/          # Modèles 3D (.fbx, .obj)
├── Textures/        # Textures (.png, .jpg, .tga)
├── Materials/       # Matériaux Unreal (.uasset)
├── Blueprints/      # Blueprints Unreal (.uasset)
├── Effects/         # Effets Niagara
└── Audio/           # Sons et musiques
```

## Importation

1. Placer les fichiers dans les dossiers appropriés
2. Ouvrir Unreal Editor
3. Lancer `ImportAssets.py` via Tools > Python
"""

    with open(readme_path, "w") as f:
        f.write(readme_content)

    print(f"📖 README créé: {readme_path}")


def main():
    """Fonction principale"""
    print("=" * 60)
    print("🎮 Maya MMO - Asset Importer")
    print("=" * 60)

    # Créer la structure
    create_asset_structure()

    # Télécharger quelques assets d'exemple (commenté par défaut)
    print("\n💡 Pour télécharger des assets, décommentez les lignes dans main()")

    # Exemple de récupération d'assets
    vegetation_assets = fetch_polyhaven_assets("vegetation", 5)
    for asset in vegetation_assets:
        print(f"  - {asset['name']}")

    # Créer les fichiers de support
    create_asset_manifest()
    generate_import_script()
    create_readme()

    print("\n" + "=" * 60)
    print("✅ Configuration terminée!")
    print(f"📂 Dossier des assets: {ASSETS_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
