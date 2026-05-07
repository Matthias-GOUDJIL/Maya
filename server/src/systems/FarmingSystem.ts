import { Vector3 } from "../../shared/types/GameTypes";

export interface Crop {
  id: string;
  type: CropType;
  position: Vector3;
  plantedAt: number;
  growthStage: number;
  maxGrowthStage: number;
  growthTime: number;
  isMagical: boolean;
}

export enum CropType {
  Wheat = "wheat",
  Carrot = "carrot",
  Moonflower = "moonflower",
  Sunberry = "sunberry",
  CrystalMushroom = "crystal_mushroom"
}

export class FarmingSystem {
  private crops: Map<string, Crop> = new Map();
  
  plantCrop(type: CropType, position: Vector3, isMagical: boolean = false): Crop {
    const crop: Crop = {
      id: `crop_${Date.now()}`,
      type,
      position,
      plantedAt: Date.now(),
      growthStage: 0,
      maxGrowthStage: 4,
      growthTime: this.getGrowthTime(type),
      isMagical
    };
    
    this.crops.set(crop.id, crop);
    return crop;
  }
  
  update(deltaTime: number): Crop[] {
    const readyToHarvest: Crop[] = [];
    
    this.crops.forEach((crop, id) => {
      const elapsed = Date.now() - crop.plantedAt;
      const newStage = Math.floor((elapsed / crop.growthTime) * crop.maxGrowthStage);
      
      if (newStage !== crop.growthStage) {
        crop.growthStage = Math.min(newStage, crop.maxGrowthStage);
      }
      
      if (crop.growthStage >= crop.maxGrowthStage) {
        readyToHarvest.push(crop);
      }
    });
    
    return readyToHarvest;
  }
  
  harvestCrop(cropId: string): Crop | null {
    const crop = this.crops.get(cropId);
    if (!crop || crop.growthStage < crop.maxGrowthStage) return null;
    
    this.crops.delete(cropId);
    return crop;
  }
  
  private getGrowthTime(type: CropType): number {
    const times: Record<CropType, number> = {
      [CropType.Wheat]: 300000,
      [CropType.Carrot]: 240000,
      [CropType.Moonflower]: 600000,
      [CropType.Sunberry]: 450000,
      [CropType.CrystalMushroom]: 900000
    };
    return times[type] || 300000;
  }
  
  getCropsInTerritory(center: Vector3, radius: number): Crop[] {
    return Array.from(this.crops.values()).filter(crop => {
      const dx = crop.position.x - center.x;
      const dz = crop.position.z - center.z;
      return Math.sqrt(dx * dx + dz * dz) <= radius;
    });
  }
}
