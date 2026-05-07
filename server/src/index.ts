import { GameServer } from "./networking/GameServer";
import { TerritorySystem } from "./systems/TerritorySystem";
import { DatabaseManager } from "./database/DatabaseManager";
import { RedisManager } from "./database/RedisManager";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "8080");
const gameServer = new GameServer(PORT);
const territorySystem = new TerritorySystem();
const db = DatabaseManager.getInstance();
const redis = RedisManager.getInstance();

async function initialize() {
  console.log(`
╔══════════════════════════════════════╗
║          Maya MMO Server             ║
║     Sandbox Fantastique v0.1.0       ║
╚══════════════════════════════════════╝
`);

  try {
    await redis.connect();
    console.log("✓ Redis connected");

    const dbHealthy = await db.healthCheck();
    if (dbHealthy) {
      console.log("✓ PostgreSQL connected");
    } else {
      console.warn("⚠ PostgreSQL not available - running without persistence");
    }
  } catch (err) {
    console.error("Initialization error:", err);
  }

  const tickRate = parseInt(process.env.TICK_RATE || "20");
  setInterval(() => {
    territorySystem.update();
  }, 1000 / tickRate);

  console.log(`Game loop running at ${tickRate}Hz`);
}

initialize();
