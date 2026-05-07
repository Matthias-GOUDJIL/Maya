import { Item, ItemType, Recipe, Inventory } from "../../shared/types/GameTypes";

export class CraftingSystem {
  private recipes: Map<string, Recipe> = new Map();
  private activeCrafts: Map<string, { recipeId: string; finishTime: number; playerId: string }> = new Map();
  
  constructor() {
    this.initRecipes();
  }
  
  private initRecipes() {
    const recipes: Recipe[] = [
      {
        id: "iron_sword",
        name: "Épée de fer",
        inputs: [
          { itemType: ItemType.Resource, quantity: 3 },
          { itemType: ItemType.BuildingMaterial, quantity: 1 }
        ],
        output: { itemType: ItemType.Weapon, quantity: 1 },
        requiredSkill: "crafting",
        requiredLevel: 5,
        craftingTime: 30000
      },
      {
        id: "wooden_house",
        name: "Maison en bois",
        inputs: [
          { itemType: ItemType.BuildingMaterial, quantity: 10 },
          { itemType: ItemType.Resource, quantity: 5 }
        ],
        output: { itemType: ItemType.BuildingMaterial, quantity: 1 },
        requiredSkill: "building",
        requiredLevel: 3,
        craftingTime: 60000
      }
    ];
    
    recipes.forEach(r => this.recipes.set(r.id, r));
  }
  
  canCraft(playerId: string, recipeId: string, inventory: Inventory, skills: any): boolean {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) return false;
    
    if (skills[recipe.requiredSkill] < recipe.requiredLevel) return false;
    
    return this.hasMaterials(inventory, recipe.inputs);
  }
  
  startCraft(playerId: string, recipeId: string): boolean {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) return false;
    
    const craftId = `craft_${Date.now()}_${playerId}`;
    this.activeCrafts.set(craftId, {
      recipeId,
      finishTime: Date.now() + recipe.craftingTime,
      playerId
    });
    
    return true;
  }
  
  update(deltaTime: number): { playerId: string; item: Item }[] {
    const completed: { playerId: string; item: Item }[] = [];
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
  
  private hasMaterials(inventory: Inventory, inputs: Recipe["inputs"]): boolean {
    for (const input of inputs) {
      const hasEnough = inventory.slots.some(slot => 
        slot && slot.type === input.itemType && slot.quantity >= input.quantity
      );
      if (!hasEnough) return false;
    }
    return true;
  }
}
