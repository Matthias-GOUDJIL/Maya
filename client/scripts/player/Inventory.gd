extends Resource
class_name Inventory

@export var max_slots: int = 40
var items: Dictionary = {}
var skills: Dictionary = {
	"mining": 1.0,
	"woodcutting": 1.0,
	"crafting": 1.0,
	"farming": 1.0,
	"building": 1.0,
	"combat": 1.0
}

func add_item(item_id: String, quantity: int) -> bool:
	if items.has(item_id):
		items[item_id] += quantity
	else:
		if items.size() >= max_slots:
			return false
		items[item_id] = quantity
	return true

func remove_item(item_id: String, quantity: int) -> bool:
	if not items.has(item_id) or items[item_id] < quantity:
		return false
	items[item_id] -= quantity
	if items[item_id] <= 0:
		items.erase(item_id)
	return true

func get_quantity(item_id: String) -> int:
	return items.get(item_id, 0)

func add_skill_xp(skill: String, xp: float):
	if skills.has(skill):
		skills[skill] += xp

func get_skill_level(skill: String) -> float:
	return skills.get(skill, 0.0)
