import { Territory, Player, Building, BuildingType } from "../../shared/types/GameTypes";

export class TerritorySystem {
  private territories: Map<string, Territory> = new Map();
  
  createTerritory(ownerId: string, center: { x: number; y: number; z: number }): Territory {
    const territory: Territory = {
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
  
  expandTerritory(territoryId: string, cost: number): boolean {
    const territory = this.territories.get(territoryId);
    if (!territory) return false;
    
    territory.radius += 25;
    territory.level += 1;
    return true;
  }
  
  addBuilding(territoryId: string, building: Building): boolean {
    const territory = this.territories.get(territoryId);
    if (!territory) return false;
    
    if (this.isWithinTerritory(territory, building.position)) {
      territory.buildings.push(building);
      return true;
    }
    return false;
  }
  
  private isWithinTerritory(territory: Territory, pos: { x: number; y: number; z: number }): boolean {
    const dx = pos.x - territory.center.x;
    const dz = pos.z - territory.center.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    return distance <= territory.radius;
  }
  
  getTerritory(id: string): Territory | undefined {
    return this.territories.get(id);
  }
  
  getPlayerTerritory(playerId: string): Territory | undefined {
    return Array.from(this.territories.values()).find(t => t.ownerId === playerId);
  }

  update(): void {
    // Placeholder for territory updates (tax collection, decay, etc.)
    // This runs at the game loop tick rate
  }
}
