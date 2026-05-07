extends Node3D
class_name FarmingSystem

signal crop_ready(crop_id: String)

var crops: Dictionary = {}
var crop_scenes = {
	"wheat": preload("res://scenes/crops/WheatCrop.tscn"),
	"moonflower": preload("res://scenes/crops/MoonflowerCrop.tscn")
}

func plant_crop(type: String, position: Vector3, is_magical: bool = false) -> String:
	var crop_id = "crop_%d" % Time.get_unix_time_from_system()
	var crop_data = {
		"type": type,
		"position": position,
		"planted_at": Time.get_unix_time_from_system(),
		"growth_stage": 0,
		"max_stage": 4,
		"is_magical": is_magical,
		"growth_time": _get_growth_time(type)
	}
	crops[crop_id] = crop_data
	print("Planted %s at %s" % [type, position])
	return crop_id

func harvest_crop(crop_id: String) -> bool:
	if not crops.has(crop_id):
		return false
	if crops[crop_id].growth_stage >= crops[crop_id].max_stage:
		crops.erase(crop_id)
		print("Harvested crop: %s" % crop_id)
		return true
	return false

func _process(_delta):
	var current_time = Time.get_unix_time_from_system()
	for crop_id in crops.keys():
		var crop = crops[crop_id]
		var elapsed = current_time - crop.planted_at
		var new_stage = floor((elapsed / crop.growth_time) * crop.max_stage)
		crop.growth_stage = min(new_stage, crop.max_stage)
		if crop.growth_stage >= crop.max_stage:
			crop_ready.emit(crop_id)

func _get_growth_time(type: String) -> float:
	match type:
		"wheat": return 300.0
		"carrot": return 240.0
		"moonflower": return 600.0
		"sunberry": return 450.0
		"crystal_mushroom": return 900.0
		_: return 300.0
