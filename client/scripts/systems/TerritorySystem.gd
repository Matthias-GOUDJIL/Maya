extends Node3D
class_name TerritorySystem

@export var territory_radius: float = 50.0
var territory_id: String = ""
var owner_id: String = ""

func _ready():
	var sphere = MeshInstance3D.new()
	sphere.mesh = SphereMesh.new()
	sphere.material_override = StandardMaterial3D.new()
	sphere.material_override.albedo_color = Color(0, 1, 0, 0.2)
	sphere.scale = Vector3(territory_radius, territory_radius, territory_radius)
	add_child(sphere)

func initialize(id: String, owner: String, radius: float):
	territory_id = id
	owner_id = owner
	territory_radius = radius
	scale = Vector3(radius, radius, radius)

func expand(amount: float):
	territory_radius += amount
	scale = Vector3(territory_radius, territory_radius, territory_radius)

func is_point_inside(point: Vector3) -> bool:
	return global_position.distance_to(point) <= territory_radius
