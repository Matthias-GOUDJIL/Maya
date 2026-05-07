import { GameServer } from "./networking/GameServer";
import { TerritorySystem } from "./systems/TerritorySystem";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "8080");
const gameServer = new GameServer(PORT);
const territorySystem = new TerritorySystem();

console.log(`
╔══════════════════════════════════════╗
║          Maya MMO Server             ║
║     Sandbox Fantastique v0.1.0       ║
╚══════════════════════════════════════╝
`);

setInterval(() => {
  // Game loop - 20Hz state broadcast
}, 50);
