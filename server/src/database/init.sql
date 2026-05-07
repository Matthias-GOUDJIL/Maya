-- Maya MMO Database Schema
-- PostgreSQL initialization script

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    position_x FLOAT DEFAULT 0,
    position_y FLOAT DEFAULT 0,
    position_z FLOAT DEFAULT 0,
    rotation FLOAT DEFAULT 0,
    health INTEGER DEFAULT 100,
    max_health INTEGER DEFAULT 100,
    mana INTEGER DEFAULT 50,
    max_mana INTEGER DEFAULT 50,
    level INTEGER DEFAULT 1,
    experience BIGINT DEFAULT 0
);

-- Territories table
CREATE TABLE IF NOT EXISTS territories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    owner_id UUID REFERENCES players(id) ON DELETE SET NULL,
    center_x FLOAT NOT NULL,
    center_y FLOAT NOT NULL,
    radius FLOAT DEFAULT 50,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_pvp BOOLEAN DEFAULT FALSE,
    tax_rate FLOAT DEFAULT 0.05
);

-- Buildings table
CREATE TABLE IF NOT EXISTS buildings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    territory_id UUID REFERENCES territories(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    position_x FLOAT NOT NULL,
    position_y FLOAT NOT NULL,
    position_z FLOAT NOT NULL,
    rotation FLOAT DEFAULT 0,
    health INTEGER DEFAULT 100,
    max_health INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items table
CREATE TABLE IF NOT EXISTS items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    rarity VARCHAR(20) DEFAULT 'common',
    value INTEGER DEFAULT 0,
    description TEXT
);

-- Player inventory (many-to-many with items)
CREATE TABLE IF NOT EXISTS player_inventory (
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    durability INTEGER DEFAULT 100,
    PRIMARY KEY (player_id, item_id)
);

-- Farming plots table
CREATE TABLE IF NOT EXISTS farming_plots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    territory_id UUID REFERENCES territories(id) ON DELETE CASCADE,
    crop_type VARCHAR(50) NOT NULL,
    planted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    growth_stage INTEGER DEFAULT 0,
    is_watered BOOLEAN DEFAULT FALSE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_username ON players(username);
CREATE INDEX IF NOT EXISTS idx_players_email ON players(email);
CREATE INDEX IF NOT EXISTS idx_territories_owner ON territories(owner_id);
CREATE INDEX IF NOT EXISTS idx_buildings_territory ON buildings(territory_id);
CREATE INDEX IF NOT EXISTS idx_player_inventory_player ON player_inventory(player_id);
CREATE INDEX IF NOT EXISTS idx_farming_plots_territory ON farming_plots(territory_id);

-- Insert default items
INSERT INTO items (name, type, rarity, value, description) VALUES
('Iron Sword', 'weapon', 'common', 100, 'A basic iron sword'),
('Health Potion', 'consumable', 'common', 10, 'Restores 50 health'),
('Mana Potion', 'consumable', 'common', 10, 'Restores 30 mana'),
('Wheat Seeds', 'seed', 'common', 5, 'Plant to grow wheat'),
('Corn Seeds', 'seed', 'common', 5, 'Plant to grow corn');
