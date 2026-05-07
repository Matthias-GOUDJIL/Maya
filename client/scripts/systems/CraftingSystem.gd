extends Node
class_name CraftingSystem

signal craft_started(recipe_id: String)
signal craft_finished(recipe_id: String, item_id: String)

var recipes: Dictionary = {}
var active_crafts: Dictionary = {}

func _ready():
	_initialize_recipes()

func _initialize_recipes():
	recipes["iron_sword"] = {
		"name": "Épée de fer",
		"inputs": {"iron_ore": 3, "wood": 1},
		"output": {"type": "weapon", "quantity": 1},
		"skill": "crafting",
		"level_req": 5,
		"time": 30.0
	}
	recipes["wooden_house"] = {
		"name": "Maison en bois",
		"inputs": {"wood": 10, "stone": 5},
		"output": {"type": "building_material", "quantity": 1},
		"skill": "building",
		"level_req": 3,
		"time": 60.0
	}

func can_craft(recipe_id: String, inventory: Dictionary, skills: Dictionary) -> bool:
	if not recipes.has(recipe_id):
		return false
	var recipe = recipes[recipe_id]
	if not skills.has(recipe.skill) or skills[recipe.skill] < recipe.level_req:
		return false
	for item in recipe.inputs:
		if not inventory.has(item) or inventory[item] < recipe.inputs[item]:
			return false
	return true

func start_craft(recipe_id: String, player_id: String) -> bool:
	if not recipes.has(recipe_id):
		return false
	var craft_id = "craft_%s_%s" % [recipe_id, player_id]
	active_crafts[craft_id] = {
		"recipe_id": recipe_id,
		"time_left": recipes[recipe_id].time
	}
	craft_started.emit(recipe_id)
	return true

func _process(delta):
	for craft_id in active_crafts.keys():
		active_crafts[craft_id].time_left -= delta
		if active_crafts[craft_id].time_left <= 0:
			var recipe = recipes[active_crafts[craft_id].recipe_id]
			craft_finished.emit(active_crafts[craft_id].recipe_id, recipe.output.type)
			active_crafts.erase(craft_id)
