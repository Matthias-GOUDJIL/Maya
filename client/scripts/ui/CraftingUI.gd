extends CanvasLayer
class_name CraftingUI

@onready var recipe_list = $Panel/RecipeList
@onready var progress_bar = $Panel/ProgressBar
@onready var craft_button = $Panel/CraftButton

var crafting_system: CraftingSystem
var inventory: Inventory
var selected_recipe: String = ""

func _ready():
	visible = false
	craft_button.pressed.connect(_on_craft_pressed)
	$Panel/CloseButton.pressed.connect(hide)

func show_crafting(craft_sys: CraftingSystem, inv: Inventory):
	crafting_system = craft_sys
	inventory = inv
	_populate_recipes()
	visible = true

func _populate_recipes():
	recipe_list.clear()
	for recipe_id in crafting_system.recipes.keys():
		var recipe = crafting_system.recipes[recipe_id]
		var can_craft = crafting_system.can_craft(recipe_id, inventory.items, inventory.skills)
		var text = "%s (Niv. %d)" % [recipe.name, recipe.level_req]
		if not can_craft:
			text += " - Verrouillé"
		recipe_list.add_item(text)

	recipe_list.item_selected.connect(func(idx):
		selected_recipe = crafting_system.recipes.keys()[idx]
	)

func _on_craft_pressed():
	if selected_recipe.is_empty() or not crafting_system:
		return
	if crafting_system.can_craft(selected_recipe, inventory.items, inventory.skills):
		crafting_system.start_craft(selected_recipe, "player_1")
		progress_bar.visible = true
		progress_bar.value = 0
		print("Crafting started: ", selected_recipe)

func _input(event):
	if event.is_action_pressed("craft"):
		if visible:
			hide()
		elif crafting_system and inventory:
			show_crafting(crafting_system, inventory)

func _process(_delta):
	if progress_bar.visible and crafting_system:
		for craft_id in crafting_system.active_crafts.keys():
			var craft = crafting_system.active_crafts[craft_id]
			var recipe = crafting_system.recipes[craft.recipe_id]
			progress_bar.value = (recipe.time - craft.time_left) / recipe.time * 100
