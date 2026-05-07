extends CanvasLayer
class_name InventoryUI

@onready var grid = $Panel/GridContainer
@onready var inventory_ui = $InventoryUI

var inventory: Inventory

func _ready():
	inventory_ui.visible = false
	$Panel/CloseButton.pressed.connect(hide)

func show_inventory(inv: Inventory):
	inventory = inv
	_update_display()
	inventory_ui.visible = true

func _update_display():
	for child in grid.get_children():
		child.queue_free()

	if not inventory:
		return

	for item_id in inventory.items.keys():
		var quantity = inventory.items[item_id]
		var slot = _create_slot(item_id, quantity)
		grid.add_child(slot)

func _create_slot(item_id: String, quantity: int) -> Control:
	var slot = Panel.new()
	slot.custom_minimum_size = Vector2(64, 64)

	var label = Label.new()
	label.text = "%s x%d" % [item_id, quantity]
	label.horizontal_alignment = 1
	slot.add_child(label)

	return slot

func _input(event):
	if event.is_action_pressed("inventory"):
		if inventory_ui.visible:
			hide()
		elif inventory:
			show_inventory(inventory)

func hide():
	inventory_ui.visible = false
