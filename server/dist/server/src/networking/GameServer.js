"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const ws_1 = require("ws");
const Protocol_1 = require("../../shared/protocol/Protocol");
class GameServer {
    constructor(port) {
        this.clients = new Map();
        this.serverPort = port;
        this.wss = new ws_1.WebSocketServer({ port: port });
        this.init();
    }
    init() {
        this.wss.on("connection", (ws) => {
            const clientId = this.generateId();
            console.log(`Client connected: ${clientId}`);
            this.clients.set(clientId, { ws, playerId: null });
            ws.on("message", (data) => {
                try {
                    const message = JSON.parse(data.toString());
                    this.handleMessage(clientId, message);
                }
                catch (e) {
                    console.error("Invalid message:", e);
                }
            });
            ws.on("close", () => {
                console.log(`Client disconnected: ${clientId}`);
                this.clients.delete(clientId);
            });
        });
        console.log(`Game server started on port ${this.serverPort}`);
    }
    handleMessage(clientId, message) {
        switch (message.type) {
            case Protocol_1.MessageType.PlayerMove:
                this.broadcast(message, clientId);
                break;
            case Protocol_1.MessageType.ChatSend:
                this.handleChat(clientId, message);
                break;
        }
    }
    handleChat(clientId, message) {
        const chatMessage = {
            type: Protocol_1.MessageType.ChatMessage,
            payload: {
                sender: clientId,
                message: message.payload.message
            },
            timestamp: Date.now()
        };
        this.broadcast(chatMessage);
    }
    broadcast(message, excludeClientId) {
        const data = JSON.stringify(message);
        this.clients.forEach((client, id) => {
            if (id !== excludeClientId && client.ws.readyState === 1) {
                client.ws.send(data);
            }
        });
    }
    generateId() {
        return Math.random().toString(36).substring(2, 15);
    }
}
exports.GameServer = GameServer;
