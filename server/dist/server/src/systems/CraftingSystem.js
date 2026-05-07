"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CraftingSystem = void 0;
const GameTypes_1 = require("@shared/types/GameTypes");
class CraftingSystem {
    constructor() {
        this.recipes = new Map();
        this.activeCrafts = new Map();
        this.initRecipes();
    }
    initRecipes() {
        const recipes = [
            {
                id: "iron_sword",
                name: "Épée de fer",
                inputs: [
                    { itemType: GameTypes_1.ItemType.Resource, quantity: 3 },
                    { itemType: GameTypes_1.ItemType.BuildingMaterial, quantity: 1 }
                ],
                output: { itemType: GameTypes_1.ItemType.Weapon, quantity: 1 },
                requiredSkill: "crafting",
                requiredLevel: 5,
                craftingTime: 30000
            },
            {
                id: "wooden_house",
                name: "Maison en bois",
                inputs: [
                    { itemType: GameTypes_1.ItemType.BuildingMaterial, quantity: 10 },
                    { itemType: GameTypes_1.ItemType.Resource, quantity: 5 }
                ],
                output: { itemType: GameTypes_1.ItemType.BuildingMaterial, quantity: 1 },
                requiredSkill: "building",
                requiredLevel: 3,
                craftingTime: 60000
            }
        ];
        recipes.forEach(r => this.recipes.set(r.id, r));
    }
    canCraft(playerId, recipeId, inventory, skills) {
        const recipe = this.recipes.get(recipeId);
        if (!recipe)
            return false;
        if (skills[recipe.requiredSkill] < recipe.requiredLevel)
            return false;
        return this.hasMaterials(inventory, recipe.inputs);
    }
    startCraft(playerId, recipeId) {
        const recipe = this.recipes.get(recipeId);
        if (!recipe)
            return false;
        const craftId = `craft_${Date.now()}_${playerId}`;
        this.activeCrafts.set(craftId, {
            recipeId,
            finishTime: Date.now() + recipe.craftingTime,
            playerId
        });
        return true;
    }
    update(deltaTime) {
        const completed = [];
        const now = Date.now();
        this.activeCrafts.forEach((craft, craftId) => {
            if (now >= craft.finishTime) {
                const recipe = this.recipes.get(craft.recipeId);
                if (recipe) {
                    completed.push({
                        playerId: craft.playerId,
                        item: {
                            id: `item_${Date.now()}`,
                            type: recipe.output.itemType,
                            quantity: recipe.output.quantity,
                            quality: 1,
                            properties: {}
                        }
                    });
                }
                this.activeCrafts.delete(craftId);
            }
        });
        return completed;
    }
    hasMaterials(inventory, inputs) {
        for (const input of inputs) {
            const hasEnough = inventory.slots.some(slot => slot && slot.type === input.itemType && slot.quantity >= input.quantity);
            if (!hasEnough)
                return false;
        }
        return true;
    }
}
exports.CraftingSystem = CraftingSystem;
