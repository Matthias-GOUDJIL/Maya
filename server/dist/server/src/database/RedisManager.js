"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const redis_1 = require("redis");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class RedisManager {
    constructor() {
        this.client = (0, redis_1.createClient)({
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
    static getInstance() {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }
    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }
    async disconnect() {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }
    getClient() {
        return this.client;
    }
    async healthCheck() {
        try {
            const pong = await this.client.ping();
            return pong === "PONG";
        }
        catch {
            return false;
        }
    }
    // Player session helpers
    async setPlayerSession(playerId, data, ttlSeconds = 3600) {
        await this.client.setEx(`session:${playerId}`, ttlSeconds, JSON.stringify(data));
    }
    async getPlayerSession(playerId) {
        const data = await this.client.get(`session:${playerId}`);
        return data ? JSON.parse(data) : null;
    }
    async removePlayerSession(playerId) {
        await this.client.del(`session:${playerId}`);
    }
    // Territory state cache
    async cacheTerritory(territoryId, data, ttlSeconds = 300) {
        await this.client.setEx(`territory:${territoryId}`, ttlSeconds, JSON.stringify(data));
    }
    async getCachedTerritory(territoryId) {
        const data = await this.client.get(`territory:${territoryId}`);
        return data ? JSON.parse(data) : null;
    }
}
exports.RedisManager = RedisManager;
