import { createClient, RedisClientType } from "redis";
import * as dotenv from "dotenv";

dotenv.config();

export class RedisManager {
  private static instance: RedisManager;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
      },
      password: process.env.REDIS_PASSWORD || undefined,
    });

    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });

    this.client.on("connect", () => {
      console.log("Redis connected");
    });
  }

  static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const pong = await this.client.ping();
      return pong === "PONG";
    } catch {
      return false;
    }
  }

  // Player session helpers
  async setPlayerSession(playerId: string, data: any, ttlSeconds: number = 3600): Promise<void> {
    await this.client.setEx(`session:${playerId}`, ttlSeconds, JSON.stringify(data));
  }

  async getPlayerSession(playerId: string): Promise<any | null> {
    const data = await this.client.get(`session:${playerId}`);
    return data ? JSON.parse(data) : null;
  }

  async removePlayerSession(playerId: string): Promise<void> {
    await this.client.del(`session:${playerId}`);
  }

  // Territory state cache
  async cacheTerritory(territoryId: string, data: any, ttlSeconds: number = 300): Promise<void> {
    await this.client.setEx(`territory:${territoryId}`, ttlSeconds, JSON.stringify(data));
  }

  async getCachedTerritory(territoryId: string): Promise<any | null> {
    const data = await this.client.get(`territory:${territoryId}`);
    return data ? JSON.parse(data) : null;
  }
}
