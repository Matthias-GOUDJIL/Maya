extends CharacterBody3D
class_name PlayerController

@onready var network = get_node("/root/Main/NetworkManager")
@onready var camera = $Camera3D

var speed = 5.0
var jump_velocity = 4.5
var mouse_sensitivity = 0.002

func _ready():
	Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
	network.message_received.connect(_on_message_received)

func _unhandled_input(event):
	if event is InputEventMouseMotion:
		rotate_y(-event.relative.x * mouse_sensitivity)
		camera.rotate_x(-event.relative.y * mouse_sensitivity)
		camera.rotation.x = clamp(camera.rotation.x, -PI/2, PI/2)

func _physics_process(_delta):
	var input_dir = Input.get_vector("move_left", "move_right", "move_forward", "move_backward")
	var direction = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()
	
	if direction:
		velocity.x = direction.x * speed
		velocity.z = direction.z * speed
	else:
		velocity.x = move_toward(velocity.x, 0, speed)
		velocity.z = move_toward(velocity.z, 0, speed)

	if not is_on_floor():
		velocity.y -= 9.8 * _delta

	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = jump_velocity

	move_and_slide()
	_update_server()

func _update_server():
	if network and network.socket.get_ready_state() == WebSocketPeer.STATE_OPEN:
		var pos = {"x": global_position.x, "y": global_position.y, "z": global_position.z}
		network.send_message("player_move", {"position": pos, "rotation": rotation.y})

func _input(event):
	if event.is_action_pressed("interact"):
		network.send_message("player_interact", {})
	if event.is_action_pressed("craft"):
		print("Opening Crafting UI...")

func _on_message_received(message: Dictionary):
	match message.get("type"):
		"entity_update":
			pass
		"chat_message":
			print("Chat: ", message.payload.message)
