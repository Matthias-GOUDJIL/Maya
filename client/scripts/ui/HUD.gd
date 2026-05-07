extends CanvasLayer
class_name HUD

@onready var chat_panel = $ChatPanel
@onready var chat_log = $ChatPanel/ChatWindow/ChatLog
@onready var chat_input = $ChatPanel/ChatWindow/ChatInput
@onready var territory_info = $TerritoryInfo
@onready var territory_label = $TerritoryInfo/TerritoryLabel
@onready var interaction_prompt = $InteractionPrompt
@onready var prompt_label = $InteractionPrompt/PromptLabel
@onready var player_name_label = $PlayerInfo/VBox/NameLabel
@onready var skill_label = $PlayerInfo/VBox/SkillLabel

var network: Node

func _ready():
	chat_input.text_submitted.connect(_on_chat_submitted)
	hide_chat()

func setup(network_node: Node, player_name: String):
	network = network_node
	player_name_label.text = player_name
	network.message_received.connect(_on_message_received)

func _on_message_received(message: Dictionary):
	match message.get("type"):
		"chat_message":
			add_chat_message(message.payload.sender, message.payload.message)
		"territory_update":
			_update_territory_info(message.payload)

func add_chat_message(sender: String, message: String):
	chat_log.append_text("[color=cyan]%s:[/color] %s\n" % [sender, message])

func _on_chat_submitted(text: String):
	if text.is_empty():
		return
	if network and network.socket.get_ready_state() == WebSocketPeer.STATE_OPEN:
		network.send_message("chat_send", {"message": text})
		add_chat_message("Moi", text)
		chat_input.text = ""

func toggle_chat():
	chat_panel.visible = !chat_panel.visible
	if chat_panel.visible:
		chat_input.grab_focus()

func hide_chat():
	chat_panel.visible = false

func show_interaction_prompt(text: String = "[E] Interagir"):
	prompt_label.text = text
	interaction_prompt.visible = true

func hide_interaction_prompt():
	interaction_prompt.visible = false

func _update_territory_info(data: Dictionary):
	if data.has("territory_id"):
		territory_info.visible = true
		territory_label.text = "Territoire: Niveau %d" % data.get("level", 1)
		skill_label.text = "Compétences: %d" % data.get("total_level", 1)

func _input(event):
	if event.is_action_pressed("ui_text_submit"):
		toggle_chat()
