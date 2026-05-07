"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    // Client -> Server
    MessageType["PlayerMove"] = "player_move";
    MessageType["PlayerInteract"] = "player_interact";
    MessageType["BuildStructure"] = "build_structure";
    MessageType["CraftItem"] = "craft_item";
    MessageType["AttackTarget"] = "attack_target";
    MessageType["ClaimTerritory"] = "claim_territory";
    MessageType["ChatSend"] = "chat_send";
    // Server -> Client
    MessageType["EntityUpdate"] = "entity_update";
    MessageType["TerritoryUpdate"] = "territory_update";
    MessageType["InventoryUpdate"] = "inventory_update";
    MessageType["ChatMessage"] = "chat_message";
    MessageType["PlayerConnected"] = "player_connected";
    MessageType["PlayerDisconnected"] = "player_disconnected";
})(MessageType || (exports.MessageType = MessageType = {}));
