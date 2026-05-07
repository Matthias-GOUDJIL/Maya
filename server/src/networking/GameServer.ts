import { WebSocketServer } from "ws";
import { MessageType, Message } from "../../shared/protocol/Protocol";

export class GameServer {
  private wss: WebSocketServer;
  private clients: Map<string, any> = new Map();
  private serverPort: number;
  
  constructor(port: number) {
    this.serverPort = port;
    this.wss = new WebSocketServer({ port: port });
    this.init();
  }
  
  private init() {
    this.wss.on("connection", (ws) => {
      const clientId = this.generateId();
      console.log(`Client connected: ${clientId}`);
      
      this.clients.set(clientId, { ws, playerId: null });
      
      ws.on("message", (data) => {
        try {
          const message: Message = JSON.parse(data.toString());
          this.handleMessage(clientId, message);
        } catch (e) {
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
  
  private handleMessage(clientId: string, message: Message) {
    switch (message.type) {
      case MessageType.PlayerMove:
        this.broadcast(message, clientId);
        break;
      case MessageType.ChatSend:
        this.handleChat(clientId, message);
        break;
    }
  }
  
  private handleChat(clientId: string, message: Message) {
    const chatMessage: Message = {
      type: MessageType.ChatMessage,
      payload: {
        sender: clientId,
        message: message.payload.message
      },
      timestamp: Date.now()
    };
    this.broadcast(chatMessage);
  }
  
  broadcast(message: Message, excludeClientId?: string) {
    const data = JSON.stringify(message);
    this.clients.forEach((client, id) => {
      if (id !== excludeClientId && client.ws.readyState === 1) {
        client.ws.send(data);
      }
    });
  }
  
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
