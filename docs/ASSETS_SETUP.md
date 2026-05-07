# Assets Setup - Maya MMO

## After Asset Import

### 1. Prepare Assets for Godot 4

#### Place downloaded files in:
```
client/
├── scenes/              # Godot scenes
├── shaders/            # Custom shaders (.gdshader)
├── scripts/            # GDScript files
├── styles/             # UI styles (.tres)
└── icons/              # UI icons and images
```

### 2. In Godot Editor

1. **Open the project** - Launch `client/project.godot` with Godot 4.6+
2. **View assets** in FileSystem dock
3. **Import settings** - Select asset > Import tab > Configure
4. **Configure 3D settings**:
   - Enable shadow casting for meshes
   - Set up collision shapes for interactive objects

### 3. Create Fey Wild Scene

#### Terrain
- Use `World3D` node as root
- Add `MeshInstance3D` for ground with `PlaneMesh`
- Apply terrain textures (grass, dirt, stone)

#### Foliage (Dense Fey Vegetation)
- Create `MeshInstance3D` nodes for trees, bushes, flowers
- Use `GPUParticles3D` for magical dust effects
- Enable proper materials with emission for magical glow

#### Magical Lighting
- Add `DirectionalLight3D` for main light
- Add `PointLight3D` with iridescent colors
- Configure `WorldEnvironment` with fog and glow effects

### 4. Import Characters

1. Download from Mixamo or create custom
2. Format: GLTF/GLB (Godot native support)
3. Import into `client/scenes/player/`
4. Create character scene with `CharacterBody3D`

### 5. Automated Import Script (Optional)

```python
# tools/asset_importer.py
import os
import json

def batch_import_assets(source_dir, target_dir):
    """Batch import assets and generate .import files"""
    for file in os.listdir(source_dir):
        if file.endswith(('.glb', '.gltf')):
            # Godot auto-imports GLTF files
            print(f"Importing: {file}")
```

## Recommended Assets for Maya MMO

### Fey Environment
- **Trees**: Stylized trees with magical variations
- **Rocks**: Low-poly rocks with moss
- **Magical Plants**: Glowing mushrooms, crystal formations
- **Water**: Reflective lakes/rivers with shader effects

### Buildings/Props
- Ancient ruins
- Fairy tents/pavilions
- Magical altars
- Portals

### Effects (GPUParticles3D)
- Fairy dust
- Magical sparks
- Glowing fog
