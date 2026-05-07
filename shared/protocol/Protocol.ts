export enum MessageType {
  // Client -> Server
  PlayerMove = "player_move",
  PlayerInteract = "player_interact",
  BuildStructure = "build_structure",
  CraftItem = "craft_item",
  AttackTarget = "attack_target",
  ClaimTerritory = "claim_territory",
  ChatSend = "chat_send",
  
  // Server -> Client
  EntityUpdate = "entity_update",
  TerritoryUpdate = "territory_update",
  InventoryUpdate = "inventory_update",
  ChatMessage = "chat_message",
  PlayerConnected = "player_connected",
  PlayerDisconnected = "player_disconnected"
}

export interface Message {
  type: MessageType;
  payload: any;
  timestamp: number;
}

export interface PlayerMovePayload {
  position: { x: number; y: number; z: number };
  rotation: number;
}

export interface BuildStructurePayload {
  buildingType: string;
  position: { x: number; y: number; z: number };
  rotation: number;
}

export interface CraftItemPayload {
  recipeId: string;
  materials: { itemId: string; quantity: number }[];
}

export interface TerritoryUpdatePayload {
  territoryId: string;
  changes: {
    buildings?: any[];
    farms?: any[];
    level?: number;
  };
}
