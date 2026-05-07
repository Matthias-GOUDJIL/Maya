"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = exports.BuildingType = void 0;
var BuildingType;
(function (BuildingType) {
    BuildingType["House"] = "house";
    BuildingType["Workshop"] = "workshop";
    BuildingType["Storage"] = "storage";
    BuildingType["Farm"] = "farm";
    BuildingType["Mine"] = "mine";
    BuildingType["Wall"] = "wall";
    BuildingType["Tower"] = "tower";
    BuildingType["Gate"] = "gate";
})(BuildingType || (exports.BuildingType = BuildingType = {}));
var ItemType;
(function (ItemType) {
    ItemType["Resource"] = "resource";
    ItemType["Tool"] = "tool";
    ItemType["Weapon"] = "weapon";
    ItemType["Armor"] = "armor";
    ItemType["Consumable"] = "consumable";
    ItemType["BuildingMaterial"] = "building_material";
    ItemType["Seed"] = "seed";
})(ItemType || (exports.ItemType = ItemType = {}));
