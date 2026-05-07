"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmingSystem = exports.CropType = void 0;
var CropType;
(function (CropType) {
    CropType["Wheat"] = "wheat";
    CropType["Carrot"] = "carrot";
    CropType["Moonflower"] = "moonflower";
    CropType["Sunberry"] = "sunberry";
    CropType["CrystalMushroom"] = "crystal_mushroom";
})(CropType || (exports.CropType = CropType = {}));
class FarmingSystem {
    constructor() {
        this.crops = new Map();
    }
    plantCrop(type, position, isMagical = false) {
        const crop = {
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
    update(deltaTime) {
        const readyToHarvest = [];
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
    harvestCrop(cropId) {
        const crop = this.crops.get(cropId);
        if (!crop || crop.growthStage < crop.maxGrowthStage)
            return null;
        this.crops.delete(cropId);
        return crop;
    }
    getGrowthTime(type) {
        const times = {
            [CropType.Wheat]: 300000,
            [CropType.Carrot]: 240000,
            [CropType.Moonflower]: 600000,
            [CropType.Sunberry]: 450000,
            [CropType.CrystalMushroom]: 900000
        };
        return times[type] || 300000;
    }
    getCropsInTerritory(center, radius) {
        return Array.from(this.crops.values()).filter(crop => {
            const dx = crop.position.x - center.x;
            const dz = crop.position.z - center.z;
            return Math.sqrt(dx * dx + dz * dz) <= radius;
        });
    }
}
exports.FarmingSystem = FarmingSystem;
