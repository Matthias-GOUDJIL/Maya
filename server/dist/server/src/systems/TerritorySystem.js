"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerritorySystem = void 0;
class TerritorySystem {
    constructor() {
        this.territories = new Map();
    }
    createTerritory(ownerId, center) {
        const territory = {
            id: `territory_${Date.now()}_${ownerId}`,
            ownerId,
            center,
            radius: 50,
            buildings: [],
            farms: [],
            mines: [],
            level: 1,
            taxRate: 0.05
        };
        this.territories.set(territory.id, territory);
        return territory;
    }
    expandTerritory(territoryId, cost) {
        const territory = this.territories.get(territoryId);
        if (!territory)
            return false;
        territory.radius += 25;
        territory.level += 1;
        return true;
    }
    addBuilding(territoryId, building) {
        const territory = this.territories.get(territoryId);
        if (!territory)
            return false;
        if (this.isWithinTerritory(territory, building.position)) {
            territory.buildings.push(building);
            return true;
        }
        return false;
    }
    isWithinTerritory(territory, pos) {
        const dx = pos.x - territory.center.x;
        const dz = pos.z - territory.center.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        return distance <= territory.radius;
    }
    getTerritory(id) {
        return this.territories.get(id);
    }
    getPlayerTerritory(playerId) {
        return Array.from(this.territories.values()).find(t => t.ownerId === playerId);
    }
    update() {
        // Placeholder for territory updates (tax collection, decay, etc.)
        // This runs at the game loop tick rate
    }
}
exports.TerritorySystem = TerritorySystem;
