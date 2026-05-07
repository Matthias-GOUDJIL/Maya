extends Node
class_name NetworkManager

signal connected
signal disconnected
signal message_received(message: Dictionary)

var socket: WebSocketPeer
var server_url: String = "ws://localhost:8080"

func _ready():
	socket = WebSocketPeer.new()

func connect_to_server():
	socket.connect_to_url(server_url)
	set_process(true)
	print("Connecting to Maya Server...")

func _process(_delta):
	socket.poll()
	var state = socket.get_ready_state()
	if state == WebSocketPeer.STATE_OPEN:
		while socket.get_available_packet_count():
			var packet = socket.get_packet()
			var data = packet.get_string_from_utf8()
			var message = JSON.parse_string(data)
			if message:
				message_received.emit(message)
	elif state == WebSocketPeer.STATE_CLOSED:
		print("Disconnected from server")
		disconnected.emit()
		set_process(false)

func send_message(type: String, payload: Dictionary):
	if socket.get_ready_state() == WebSocketPeer.STATE_OPEN:
		var message = {"type": type, "payload": payload, "timestamp": Time.get_unix_time_from_system()}
		var json = JSON.stringify(message)
		socket.put_packet(json.to_utf8_buffer())

func _exit_tree():
	if socket.get_ready_state() == WebSocketPeer.STATE_OPEN:
		socket.close()
