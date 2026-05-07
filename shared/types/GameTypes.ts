export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Player {
  id: string;
  name: string;
  position: Vector3;
  rotation: number;
  inventory: Inventory;
  territoryId?: string;
  skills: Skills;
}

export interface Farm {
  id: string;
  cropType: string;
  position: Vector3;
  growthStage: number;
}

export interface Mine {
  id: string;
  resourceType: string;
  position: Vector3;
  depletion: number;
}

export interface Territory {
  id: string;
  ownerId: string;
  center: Vector3;
  radius: number;
  buildings: Building[];
  farms: Farm[];
  mines: Mine[];
  level: number;
  taxRate: number;
}

export interface Building {
  id: string;
  type: BuildingType;
  position: Vector3;
  rotation: number;
  health: number;
  level: number;
}

export enum BuildingType {
  House = "house",
  Workshop = "workshop",
  Storage = "storage",
  Farm = "farm",
  Mine = "mine",
  Wall = "wall",
  Tower = "tower",
  Gate = "gate"
}

export interface Item {
  id: string;
  type: ItemType;
  quantity: number;
  quality: number;
  properties: Record<string, any>;
}

export enum ItemType {
  Resource = "resource",
  Tool = "tool",
  Weapon = "weapon",
  Armor = "armor",
  Consumable = "consumable",
  BuildingMaterial = "building_material",
  Seed = "seed"
}

export interface Inventory {
  slots: (Item | null)[];
  maxSlots: number;
}

export interface Skills {
  mining: number;
  woodcutting: number;
  crafting: number;
  farming: number;
  building: number;
  combat: number;
}

export interface Recipe {
  id: string;
  name: string;
  inputs: { itemType: ItemType; quantity: number }[];
  output: { itemType: ItemType; quantity: number };
  requiredSkill: keyof Skills;
  requiredLevel: number;
  craftingTime: number;
}
