/**
 * DevQuest host half.
 *
 * The Session log is the source of truth for agent behaviour. This plugin folds a
 * small, append-only projection of the events it cares about into a durable RPG
 * state file under $DSH_HOME/devquest. It never appends Session events and never
 * changes the agent loop.
 */
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const inject = ['webServer']

const PACKAGE_DIR = path.dirname(fileURLToPath(import.meta.url))
const API_PATH = '/devquest/api'
// Painted art lives beside the plugin and is served from the API path so the
// client can use plain <img> tags without inlining megabytes of base64.
const ASSET_DIR = path.join(PACKAGE_DIR, 'assets')
const ASSETS = {
  hero: { file: 'hero.webp', type: 'image/webp' },
  'hero-small': { file: 'hero-small.webp', type: 'image/webp' },
}
const STATE_VERSION = 2
const MAX_ACTIVITY = 60
const MAX_SESSIONS = 30
const MAX_BODY = 64 * 1024
const CHEST_LINES = 200
const MAX_CHESTS = 50
const SEASON_DAYS = 28
const DAY_MS = 24 * 60 * 60 * 1000

const TOOL_WRITE = new Set(['write', 'edit', 'apply_patch'])
const TOOL_READ = new Set(['read', 'read_image', 'glob', 'grep'])
const TOOL_SEARCH = new Set(['web_search', 'web_fetch'])
const TOOL_SHELL = new Set(['bash', 'pwsh', 'terminal_open', 'terminal_send'])
const TOOL_ORCHESTRATE = new Set([
  'subagent', 'subagent_fork', 'workflow', 'send_message', 'interrupt_agent',
  'list_agents', 'job_output', 'job_kill',
])

const GEAR_SLOTS = ['weapon', 'armor', 'charm', 'frame']
const STARTER_GEAR = ['w.novice', 'a.novice', 'c.novice', 'f.novice']
const GEAR_CATALOG = [
  { id: 'w.novice', slot: 'weapon', rarity: 'common', power: 4, source: 'starter' },
  { id: 'w.quill', slot: 'weapon', rarity: 'rare', power: 12, price: 220, source: 'shop' },
  { id: 'w.forge', slot: 'weapon', rarity: 'rare', power: 16, price: 380, source: 'shop' },
  { id: 'w.serpent', slot: 'weapon', rarity: 'epic', power: 28, source: 'chest' },
  { id: 'w.star', slot: 'weapon', rarity: 'epic', power: 36, source: 'chest' },
  { id: 'w.calamity', slot: 'weapon', rarity: 'legendary', power: 60, source: 'boss' },
  { id: 'a.novice', slot: 'armor', rarity: 'common', power: 3, source: 'starter' },
  { id: 'a.scribe', slot: 'armor', rarity: 'rare', power: 10, price: 260, source: 'shop' },
  { id: 'a.terminal', slot: 'armor', rarity: 'rare', power: 14, price: 420, source: 'shop' },
  { id: 'a.night', slot: 'armor', rarity: 'epic', power: 24, source: 'chest' },
  { id: 'a.season', slot: 'armor', rarity: 'legendary', power: 42, source: 'season' },
  { id: 'c.novice', slot: 'charm', rarity: 'common', power: 2, source: 'starter' },
  { id: 'c.luck', slot: 'charm', rarity: 'rare', power: 8, price: 180, source: 'shop' },
  { id: 'c.focus', slot: 'charm', rarity: 'rare', power: 10, source: 'chest' },
  { id: 'c.void', slot: 'charm', rarity: 'epic', power: 20, source: 'chest' },
  { id: 'c.crown', slot: 'charm', rarity: 'legendary', power: 32, source: 'boss' },
  // Mid-game shop / chest additions, then the season-only titan set.
  { id: 'w.gale', slot: 'weapon', rarity: 'rare', power: 22, price: 320, source: 'shop' },
  { id: 'w.echo', slot: 'weapon', rarity: 'epic', power: 44, source: 'chest' },
  { id: 'a.bulwark', slot: 'armor', rarity: 'epic', power: 30, source: 'chest' },
  { id: 'a.wyrm', slot: 'armor', rarity: 'legendary', power: 58, source: 'chest' },
  { id: 'c.pulse', slot: 'charm', rarity: 'rare', power: 12, price: 240, source: 'shop' },
  { id: 'c.orbit', slot: 'charm', rarity: 'epic', power: 26, source: 'chest' },
  { id: 'f.echo', slot: 'frame', rarity: 'epic', power: 0, price: 520, source: 'shop' },
  // Season-only set: never drops from chests, so the long pass keeps a carrot.
  { id: 'w.aurora', slot: 'weapon', rarity: 'legendary', power: 70, source: 'season', chest: false },
  { id: 'a.aurora', slot: 'armor', rarity: 'legendary', power: 50, source: 'season', chest: false },
  { id: 'c.aurora', slot: 'charm', rarity: 'legendary', power: 40, source: 'season', chest: false },
  { id: 'f.aurora', slot: 'frame', rarity: 'legendary', power: 0, source: 'season', chest: false },
  { id: 'a.starweave', slot: 'armor', rarity: 'legendary', power: 60, source: 'season', chest: false },
  { id: 'w.titan', slot: 'weapon', rarity: 'legendary', power: 82, source: 'season', chest: false },
  { id: 'c.singularity', slot: 'charm', rarity: 'legendary', power: 46, source: 'season', chest: false },
  { id: 'f.titan', slot: 'frame', rarity: 'legendary', power: 0, source: 'season', chest: false },
  { id: 'f.novice', slot: 'frame', rarity: 'common', power: 0, source: 'starter' },
  // Mythic tier: shop-only, the late coin sink above the season sets.
  { id: 'w.nova', slot: 'weapon', rarity: 'mythic', power: 96, price: 6800, source: 'shop' },
  { id: 'a.eclipse', slot: 'armor', rarity: 'mythic', power: 72, price: 7200, source: 'shop' },
  { id: 'c.eternity', slot: 'charm', rarity: 'mythic', power: 56, price: 6400, source: 'shop' },
  { id: 'f.nova', slot: 'frame', rarity: 'mythic', power: 0, price: 4200, source: 'shop' },
  // Second wave: chest epics/legendaries, a shop bridge, and the genesis set.
  { id: 'w.frost', slot: 'weapon', rarity: 'rare', power: 20, price: 260, source: 'shop' },
  { id: 'w.void', slot: 'weapon', rarity: 'epic', power: 42, source: 'chest' },
  { id: 'w.storm', slot: 'weapon', rarity: 'legendary', power: 76, source: 'chest' },
  { id: 'a.aegis', slot: 'armor', rarity: 'epic', power: 32, source: 'chest' },
  { id: 'a.phoenix', slot: 'armor', rarity: 'legendary', power: 64, source: 'chest' },
  { id: 'c.echo', slot: 'charm', rarity: 'rare', power: 14, price: 300, source: 'shop' },
  { id: 'c.prism', slot: 'charm', rarity: 'epic', power: 24, source: 'chest' },
  { id: 'f.storm', slot: 'frame', rarity: 'legendary', power: 0, price: 1500, source: 'shop' },
  { id: 'w.genesis', slot: 'weapon', rarity: 'mythic', power: 108, price: 8800, source: 'shop' },
  { id: 'a.genesis', slot: 'armor', rarity: 'mythic', power: 80, price: 9200, source: 'shop' },
  { id: 'c.genesis', slot: 'charm', rarity: 'mythic', power: 62, price: 8400, source: 'shop' },
  { id: 'f.genesis', slot: 'frame', rarity: 'mythic', power: 0, price: 5600, source: 'shop' },
  // Third wave: rune / abyss.
  { id: 'w.rune', slot: 'weapon', rarity: 'epic', power: 38, source: 'chest' },
  { id: 'a.bastion', slot: 'armor', rarity: 'epic', power: 36, source: 'chest' },
  { id: 'c.sigil', slot: 'charm', rarity: 'epic', power: 28, source: 'chest' },
  { id: 'f.rune', slot: 'frame', rarity: 'epic', power: 0, price: 800, source: 'shop' },
  { id: 'w.abyss', slot: 'weapon', rarity: 'mythic', power: 118, price: 9800, source: 'shop' },
  { id: 'a.abyss', slot: 'armor', rarity: 'mythic', power: 88, price: 10200, source: 'shop' },
  { id: 'c.abyss', slot: 'charm', rarity: 'mythic', power: 70, price: 9200, source: 'shop' },
  { id: 'f.abyss', slot: 'frame', rarity: 'mythic', power: 0, price: 6200, source: 'shop' },
  // Red tier: the season set (one piece per slot), never sold and never in
  // chests. The season boss drops it, and achievement points buy it.
  { id: 'w.crimson', slot: 'weapon', rarity: 'red', power: 132, source: 'season', chest: false },
  { id: 'a.crimson', slot: 'armor', rarity: 'red', power: 100, source: 'season', chest: false },
  { id: 'c.crimson', slot: 'charm', rarity: 'red', power: 82, source: 'season', chest: false },
  { id: 'f.crimson', slot: 'frame', rarity: 'red', power: 0, source: 'season', chest: false },
  // Season-boss signature weapons: one per front, only dropped by that boss.
  { id: 'w.sovereign', slot: 'weapon', rarity: 'red', power: 136, source: 'seasonBoss', chest: false },
  { id: 'w.leviathan', slot: 'weapon', rarity: 'red', power: 138, source: 'seasonBoss', chest: false },
  { id: 'w.oracle', slot: 'weapon', rarity: 'red', power: 140, source: 'seasonBoss', chest: false },
  { id: 'w.entropy', slot: 'weapon', rarity: 'red', power: 142, source: 'seasonBoss', chest: false },
  { id: 'w.mirror', slot: 'weapon', rarity: 'red', power: 144, source: 'seasonBoss', chest: false },
  { id: 'w.voidking', slot: 'weapon', rarity: 'red', power: 146, source: 'seasonBoss', chest: false },
  { id: 'f.bronze', slot: 'frame', rarity: 'rare', power: 0, price: 150, source: 'shop' },
  { id: 'f.verdant', slot: 'frame', rarity: 'rare', power: 0, price: 220, source: 'shop' },
  { id: 'f.starlight', slot: 'frame', rarity: 'epic', power: 0, price: 460, source: 'shop' },
  { id: 'f.ember', slot: 'frame', rarity: 'epic', power: 0, source: 'season' },
  { id: 'f.season', slot: 'frame', rarity: 'legendary', power: 0, source: 'season' },
  { id: 'f.calamity', slot: 'frame', rarity: 'legendary', power: 0, source: 'boss' },
]
// Bulk families: every entry turns into one item per slot, so the catalogue
// grows by content rather than by hand-written rows.
// Tier bands are set so both the hand-authored pieces and the generated
// families sit on the same curve instead of one generation outclassing the other.
const GEAR_TIER_POWER = {
  common: 4, rare: 16, epic: 32, legendary: 76, mythic: 108, ancient: 160, divine: 210, transcendent: 260,
}
const RARITY_LADDER_INDEX = ['common', 'rare', 'epic', 'legendary', 'mythic', 'red', 'ancient', 'divine', 'transcendent']
const GEAR_FAMILIES = [
  { key: 'roughiron', tier: 'common', mul: 0.9 },
  { key: 'oldoak', tier: 'common', mul: 1 },
  { key: 'linen', tier: 'common', mul: 1.05 },
  { key: 'stonechip', tier: 'common', mul: 1.1 },
  { key: 'finesteel', tier: 'rare', mul: 0.9 },
  { key: 'silverwire', tier: 'rare', mul: 1 },
  { key: 'hardhide', tier: 'rare', mul: 1.05 },
  { key: 'brassmark', tier: 'rare', mul: 1.1 },
  { key: 'mithril', tier: 'epic', mul: 0.9 },
  { key: 'stardust', tier: 'epic', mul: 1 },
  { key: 'deepsea', tier: 'epic', mul: 1.05 },
  { key: 'amethyst', tier: 'epic', mul: 1.1 },
  { key: 'dragonscale', tier: 'legendary', mul: 0.9, price: 2400 },
  { key: 'starfall', tier: 'legendary', mul: 1, price: 2800 },
  { key: 'moonlight', tier: 'legendary', mul: 1.05, price: 3200 },
  { key: 'crimsongold', tier: 'legendary', mul: 1.1, price: 3600 },
  { key: 'voidwalk', tier: 'mythic', mul: 0.9, price: 5200 },
  { key: 'dream', tier: 'mythic', mul: 1, price: 5800 },
  { key: 'eternalnight', tier: 'mythic', mul: 1.05, price: 6400 },
  { key: 'oracleblade', tier: 'mythic', mul: 1.1, price: 7000 },
  { key: 'ancient', tier: 'ancient', mul: 0.9, price: 9600 },
  { key: 'primordial', tier: 'ancient', mul: 1, price: 10800 },
  { key: 'titanrock', tier: 'ancient', mul: 1.05, price: 12000 },
  { key: 'starcore', tier: 'ancient', mul: 1.1, price: 13200 },
  { key: 'elderdragon', tier: 'ancient', mul: 1.15, price: 14400 },
  { key: 'beyond', tier: 'ancient', mul: 1.2, price: 15600 },
  { key: 'divine', tier: 'divine', mul: 0.9, price: 18000 },
  { key: 'apocalypse', tier: 'divine', mul: 1, price: 20000 },
  { key: 'genesislight', tier: 'divine', mul: 1.05, price: 22000 },
  { key: 'eternal', tier: 'divine', mul: 1.1, price: 24000 },
  { key: 'radiance', tier: 'divine', mul: 1.15, price: 26000 },
  { key: 'judgement', tier: 'divine', mul: 1.2, price: 28000 },
  // Red families: the season-front tier, so the drop cap has real depth.
  { key: 'bloodoath', tier: 'red', mul: 0.92 },
  { key: 'moltenheart', tier: 'red', mul: 1.0 },
  { key: 'scarletmoon', tier: 'red', mul: 1.08 },
  { key: 'dyingsun', tier: 'red', mul: 1.16 },
]
const GEAR_SLOT_PREFIX = { weapon: 'w', armor: 'a', charm: 'c', frame: 'f' }
const GEAR_SLOT_FACTOR = { weapon: 1, armor: 0.78, charm: 0.62, frame: 0 }

// Signature pieces: hand-named highlights inside the bulk families. They get a
// small power edge and a marker the UI can show.
const GEAR_SIGNATURES = new Set([
  'w.elderdragon', 'a.elderdragon', 'c.elderdragon',
  'w.beyond', 'a.beyond',
  'w.divine', 'a.divine', 'c.divine',
  'w.judgement', 'f.judgement',
  'w.dragonscale', 'w.starfall', 'a.moonlight', 'c.mithril',
  'w.voidwalk', 'c.oracleblade', 'a.titanrock', 'w.starcore',
  'c.apocalypse', 'f.divine',
])

// Synthesis: five copies of one piece fuse into a random weapon of the next
// rarity. Ancient and divine gear can only be reached this way.
const SYNTH_COPIES = 5
const SYNTH_SLOTS = ['weapon', 'armor', 'charm', 'frame']
const RARITY_LADDER = ['common', 'rare', 'epic', 'legendary', 'mythic', 'red', 'ancient', 'divine', 'transcendent']
const SYNTH_ONLY = new Set(['ancient', 'divine'])
const SEASON_ONLY = new Set(['red'])

for (const family of GEAR_FAMILIES) {
  for (const slot of GEAR_SLOTS) {
    const id = `${GEAR_SLOT_PREFIX[slot]}.${family.key}`
    const signature = GEAR_SIGNATURES.has(id)
    const base = (GEAR_TIER_POWER[family.tier] || 10) * GEAR_SLOT_FACTOR[slot] * family.mul
    const power = Math.round(base * (signature ? 1.14 : 1))
    const shopOnly = family.price && !SYNTH_ONLY.has(family.tier)
    GEAR_CATALOG.push({
      id,
      slot,
      rarity: family.tier,
      power: slot === 'frame' ? 0 : Math.max(1, power),
      ...(signature ? { signature: true } : {}),
      ...(SYNTH_ONLY.has(family.tier)
        ? { source: 'synthesis', chest: false }
        : SEASON_ONLY.has(family.tier)
          ? { source: 'season', chest: false }
          : shopOnly
            ? { price: family.price, source: 'shop' }
            : { source: 'chest' }),
    })
  }
}

// Ten-star reward: a one-off skin frame, never sold or dropped.
const PEAK_SKIN_FRAME = 'f.transcend'
GEAR_CATALOG.push({
  id: PEAK_SKIN_FRAME,
  slot: 'frame',
  rarity: 'transcendent',
  power: 0,
  source: 'peak',
  chest: false,
  signature: true,
})

const GEAR_BY_ID = Object.fromEntries(GEAR_CATALOG.map(item => [item.id, item]))
const GEAR_SHOP = GEAR_CATALOG.filter(item => item.price > 0)
const DEFAULT_EQUIPPED = {
  weapon: 'w.novice',
  armor: 'a.novice',
  charm: 'c.novice',
  frame: 'f.novice',
}
const RARITY_SALVAGE = { common: 20, rare: 45, epic: 85, legendary: 150, mythic: 260, red: 400 }
// Enhancement: every level adds 2% of the base power, up to a hundred levels.
const ENHANCE_MAX = 100
const ENHANCE_STEP = 0.02

// Ascension: five tiers on top of enhancement, each worth +25% power, but the
// odds of landing one drop hard.
const ASCEND_MAX = 5
const ASCEND_RATES = [0.9, 0.75, 0.6, 0.45, 0.3]
const ASCEND_STEP = 0.25

function enhanceCost(level) {
  const value = Math.max(0, Number(level) || 0)
  return Math.round(80 + value * 30 + value * value * 4)
}

function ascendCost(tier) {
  const value = Math.max(0, Math.min(ASCEND_MAX, Number(tier) || 0))
  return Math.round(600 * Math.pow(value + 1, 2))
}

function ascendRate(tier) {
  return ASCEND_RATES[Math.max(0, Math.min(ASCEND_MAX - 1, Number(tier) || 0))]
}

function itemPower(state, id) {
  const item = GEAR_BY_ID[id]
  if (!item) return 0
  const level = Math.max(0, Math.min(ENHANCE_MAX, Number(state.gear.enhance?.[id] || 0)))
  const tier = Math.max(0, Math.min(ASCEND_MAX, Number(state.gear.ascend?.[id] || 0)))
  return Math.round(item.power * (1 + ENHANCE_STEP * level) * (1 + ASCEND_STEP * tier))
}
const SHOP_CHESTS = [
  { tier: 'wood', price: 100 },
  { tier: 'iron', price: 240 },
  { tier: 'gold', price: 480 },
  { tier: 'astral', price: 900 },
]

const CHEST_TIERS = {
  wood: {
    id: 'wood',
    pool: ['rare'],
    gearChance: 0.4,
    coins: [30, 80],
    xp: [20, 60],
  },
  iron: {
    id: 'iron',
    pool: ['rare', 'epic'],
    gearChance: 0.58,
    coins: [60, 140],
    xp: [40, 100],
  },
  gold: {
    id: 'gold',
    pool: ['epic', 'legendary'],
    gearChance: 0.72,
    coins: [110, 230],
    xp: [70, 160],
  },
  astral: {
    id: 'astral',
    pool: ['legendary', 'mythic'],
    gearChance: 0.9,
    coins: [200, 420],
    xp: [130, 280],
  },
}
const CHEST_TIER_ORDER = ['wood', 'iron', 'gold', 'astral']

const SEASON_THEMES = [
  { id: 'ember' },
  { id: 'tide' },
  { id: 'astral' },
  { id: 'verdant' },
]
const SEASON_TIERS = [
  { id: 's1', target: 250, xp: 120, coins: 60, chest: 'iron' },
  { id: 's2', target: 900, xp: 240, coins: 120, chest: 'gold', frame: 'f.verdant' },
  { id: 's3', target: 1800, xp: 340, coins: 180, chest: 'gold' },
  { id: 's4', target: 3000, xp: 500, coins: 260, chest: 'astral', frame: 'f.ember' },
  { id: 's5', target: 4500, xp: 680, coins: 340, chest: 'astral', gear: 'c.crown' },
  { id: 's6', target: 6200, xp: 860, coins: 440, chest: 'astral', chestCount: 2 },
  { id: 's7', target: 8200, xp: 1050, coins: 560, chest: 'astral', chestCount: 2, gear: 'a.aurora' },
  { id: 's8', target: 10500, xp: 1300, coins: 700, chest: 'astral', chestCount: 2 },
  { id: 's9', target: 13000, xp: 1600, coins: 860, chest: 'astral', chestCount: 2, frame: 'f.aurora' },
  { id: 's10', target: 15800, xp: 1900, coins: 1040, chest: 'astral', chestCount: 3, gear: 'w.aurora' },
  { id: 's11', target: 19000, xp: 2300, coins: 1250, chest: 'astral', chestCount: 3 },
  { id: 's12', target: 22500, xp: 2900, coins: 1600, chest: 'astral', chestCount: 4, gear: 'c.aurora', frame: 'f.titan', title: 'seasonlegend' },
  { id: 's13', target: 26500, xp: 3400, coins: 1900, chest: 'astral', chestCount: 3, gear: 'a.starweave' },
  { id: 's14', target: 31500, xp: 4000, coins: 2300, chest: 'astral', chestCount: 3, gear: 'w.titan' },
  { id: 's15', target: 37500, xp: 4800, coins: 2800, chest: 'astral', chestCount: 4, gear: 'c.singularity', title: 'seasonmyth' },
]
// Renown ladder shown above the pass: flavour plus a visible next step, no
// extra claim layer to get stuck on.
const SEASON_RANKS = [
  { id: 'bronze', at: 0 },
  { id: 'silver', at: 1500 },
  { id: 'gold', at: 4000 },
  { id: 'platinum', at: 7000 },
  { id: 'astral', at: 11000 },
  { id: 'legend', at: 16000 },
  { id: 'mythic', at: 24000 },
]
const SEASON_BOSSES = [
  { id: 'sovereign' }, { id: 'leviathan' }, { id: 'oracle' },
  { id: 'entropy' }, { id: 'mirror' }, { id: 'voidking' },
]
// Each season front drops its own signature weapon on top of the red set.
const SEASON_BOSS_GEAR = {
  sovereign: 'w.sovereign',
  leviathan: 'w.leviathan',
  oracle: 'w.oracle',
  entropy: 'w.entropy',
  mirror: 'w.mirror',
  voidking: 'w.voidking',
}
const WEEKLY_BOSSES = [
  { id: 'ashen' }, { id: 'echo' }, { id: 'maw' }, { id: 'deadline' },
  { id: 'regression' }, { id: 'dependency' }, { id: 'deadlock' },
  { id: 'legacy' }, { id: 'outage' },
]
const DAILY_BOSSES = [
  { id: 'cinder' }, { id: 'glitch' }, { id: 'quill' },
  { id: 'static' }, { id: 'cache' }, { id: 'null' },
  { id: 'shadow' }, { id: 'deadcode' }, { id: 'lint' },
]

// Regular front: an endless ladder of stages. Every stage reuses a boss from
// the pool, but the HP climbs fast, so the only way to keep the pace is power.
const STORY_POOL = [
  'cinder', 'glitch', 'quill', 'static', 'cache', 'null',
  'shadow', 'deadcode', 'lint', 'ashen', 'echo', 'maw',
  'deadline', 'regression', 'dependency', 'deadlock', 'legacy', 'outage',
  'sovereign', 'leviathan', 'oracle', 'entropy', 'mirror', 'voidking',
]

function storyBossFor(stage) {
  const level = Math.max(1, Math.floor(Number(stage) || 1))
  const bossId = STORY_POOL[(level - 1) % STORY_POOL.length]
  const maxHp = Math.round(500 * Math.pow(1.25, level - 1))
  return { stage: level, bossId, maxHp }
}

const SHOP_TITLES = [
  { id: 'wanderer', price: 60, rarity: 'common' },
  { id: 'starfarer', price: 80, rarity: 'rare' },
  { id: 'bughunter', price: 100, rarity: 'rare' },
  { id: 'nightforge', price: 120, rarity: 'rare' },
  { id: 'architect', price: 160, rarity: 'epic' },
  { id: 'orchestrator', price: 180, rarity: 'epic' },
  { id: 'evergreen', price: 260, rarity: 'epic' },
  { id: 'mythweaver', price: 900, rarity: 'mythic' },
  { id: 'seasonchamp', price: 500, rarity: 'legendary' },
]

const CHALLENGE_DEFS = {
  tools: {
    metric: 'tools',
    target: { daily: 12, weekly: 60 },
    xp: { daily: 45, weekly: 140 },
    coins: { daily: 20, weekly: 65 },
  },
  turns: {
    metric: 'turns',
    target: { daily: 4, weekly: 20 },
    xp: { daily: 40, weekly: 120 },
    coins: { daily: 20, weekly: 55 },
  },
  writes: {
    metric: 'writes',
    target: { daily: 3, weekly: 15 },
    xp: { daily: 50, weekly: 150 },
    coins: { daily: 25, weekly: 70 },
  },
  lines: {
    metric: 'lines',
    target: { daily: 120, weekly: 600 },
    xp: { daily: 55, weekly: 165 },
    coins: { daily: 25, weekly: 80 },
  },
  reads: {
    metric: 'reads',
    target: { daily: 6, weekly: 30 },
    xp: { daily: 35, weekly: 110 },
    coins: { daily: 15, weekly: 50 },
  },
  todos: {
    metric: 'todos',
    target: { daily: 2, weekly: 8 },
    xp: { daily: 55, weekly: 160 },
    coins: { daily: 25, weekly: 75 },
  },
  search: {
    metric: 'searches',
    target: { daily: 3, weekly: 12 },
    xp: { daily: 40, weekly: 125 },
    coins: { daily: 20, weekly: 55 },
  },
  distinct: {
    metric: 'distinct',
    target: { daily: 4, weekly: 9 },
    xp: { daily: 45, weekly: 150 },
    coins: { daily: 20, weekly: 65 },
  },
  xp: {
    metric: 'xp',
    target: { daily: 150, weekly: 900 },
    xp: { daily: 50, weekly: 160 },
    coins: { daily: 25, weekly: 80 },
  },
  subagents: {
    metric: 'subagents',
    target: { daily: 1, weekly: 4 },
    xp: { daily: 50, weekly: 160 },
    coins: { daily: 25, weekly: 75 },
  },
}

const DAILY_POOL = ['tools', 'turns', 'writes', 'lines', 'reads', 'todos', 'search', 'distinct', 'xp', 'subagents']
const WEEKLY_POOL = ['tools', 'turns', 'writes', 'lines', 'reads', 'todos', 'search', 'distinct', 'xp', 'subagents']

const ACHIEVEMENTS = [
  { id: 'arrival', rarity: 'common', coins: 20, check: () => true },
  { id: 'first-turn', rarity: 'common', coins: 20, check: c => c.turns >= 1 },
  { id: 'first-tool', rarity: 'common', coins: 20, check: c => c.tools >= 1 },
  { id: 'first-chest', rarity: 'common', coins: 25, check: c => c.chests >= 1 },
  { id: 'reader', rarity: 'common', coins: 25, check: c => c.reads >= 10 },
  { id: 'explorer', rarity: 'common', coins: 25, check: c => c.distinct >= 5 },
  { id: 'streak-3', rarity: 'common', coins: 30, check: c => c.bestStreak >= 3 },
  { id: 'dawn', rarity: 'common', coins: 30, check: c => c.dawn >= 1 },
  { id: 'level-5', rarity: 'common', coins: 35, check: c => c.level >= 5 },
  { id: 'scribe', rarity: 'rare', coins: 45, check: c => c.writes >= 10 },
  { id: 'line-1000', rarity: 'rare', coins: 55, check: c => c.lines >= 1000 },
  { id: 'polyglot', rarity: 'rare', coins: 50, check: c => c.distinct >= 10 },
  { id: 'quest-clear', rarity: 'rare', coins: 45, check: c => c.todos >= 1 },
  { id: 'delegator', rarity: 'rare', coins: 50, check: c => c.subagents >= 3 },
  { id: 'streak-7', rarity: 'rare', coins: 60, check: c => c.bestStreak >= 7 },
  { id: 'night-owl', rarity: 'rare', coins: 45, check: c => c.night >= 1 },
  { id: 'phoenix', rarity: 'rare', coins: 55, check: c => c.recoveries >= 3 },
  { id: 'level-10', rarity: 'rare', coins: 65, check: c => c.level >= 10 },
  { id: 'rich', rarity: 'rare', coins: 60, check: c => c.coinsEarned >= 500 },
  { id: 'collector', rarity: 'rare', coins: 65, title: 'curator', check: c => c.titles >= 4 },
  { id: 'lucky-star', rarity: 'rare', coins: 55, check: c => c.lottery >= 7 },
  { id: 'webwalker', rarity: 'rare', coins: 50, check: c => c.searches >= 10 },
  { id: 'tinker', rarity: 'rare', coins: 55, check: c => c.shellRuns >= 10 },
  { id: 'shopaholic', rarity: 'rare', coins: 55, check: c => c.purchases >= 3 },
  { id: 'daily-slayer', rarity: 'rare', coins: 60, check: c => c.dailyBosses >= 1 },
  { id: 'centurion', rarity: 'epic', coins: 85, check: c => c.tools >= 100 },
  { id: 'quest-master', rarity: 'epic', coins: 90, check: c => c.todos >= 5 },
  { id: 'director', rarity: 'epic', coins: 90, check: c => c.workflows >= 3 },
  { id: 'line-5000', rarity: 'epic', coins: 100, check: c => c.lines >= 5000 },
  { id: 'gear-power', rarity: 'epic', coins: 100, check: c => c.gearPower >= 100 },
  { id: 'level-20', rarity: 'epic', coins: 100, check: c => c.level >= 20 },
  { id: 'marathon', rarity: 'epic', coins: 95, check: c => c.turns >= 50 },
  { id: 'season-one', rarity: 'epic', coins: 90, check: c => c.weeklyClaims >= 1 },
  { id: 'boss-slayer', rarity: 'legendary', coins: 140, title: 'bossbane', check: c => c.bosses >= 1 },
  { id: 'season-slayer', rarity: 'legendary', coins: 160, check: c => c.seasonBosses >= 1 },
  { id: 'level-30', rarity: 'legendary', coins: 160, title: 'legend', check: c => c.level >= 30 },
  { id: 'boss-veteran', rarity: 'legendary', coins: 180, check: c => c.bosses >= 3 },
  { id: 'tool-250', rarity: 'rare', coins: 70, check: c => c.tools >= 250 },
  { id: 'tool-500', rarity: 'epic', coins: 110, check: c => c.tools >= 500 },
  { id: 'line-10000', rarity: 'legendary', coins: 190, check: c => c.lines >= 10000 },
  { id: 'turn-100', rarity: 'epic', coins: 100, check: c => c.turns >= 100 },
  { id: 'gear-10', rarity: 'rare', coins: 60, check: c => c.gearCount >= 10 },
  { id: 'gear-25', rarity: 'epic', coins: 110, check: c => c.gearCount >= 25 },
  { id: 'gear-40', rarity: 'legendary', coins: 200, title: 'curator', check: c => c.gearCount >= 40 },
  { id: 'mythic-gear', rarity: 'mythic', coins: 260, check: c => c.mythicGear >= 1 },
  { id: 'boss-10', rarity: 'epic', coins: 120, check: c => c.bosses >= 10 },
  { id: 'boss-25', rarity: 'legendary', coins: 220, check: c => c.bosses >= 25 },
  { id: 'rank-gold', rarity: 'rare', coins: 80, check: c => c.rank >= 2 },
  { id: 'rank-legend', rarity: 'legendary', coins: 240, title: 'legend', check: c => c.rank >= 5 },
  { id: 'streak-14', rarity: 'epic', coins: 110, check: c => c.bestStreak >= 14 },
  { id: 'level-40', rarity: 'legendary', coins: 240, check: c => c.level >= 40 },
  { id: 'level-60', rarity: 'legendary', coins: 320, title: 'peak', check: c => c.level >= 60 },
  { id: 'paragon-1', rarity: 'mythic', coins: 400, check: c => c.paragonStars >= 1 },
  { id: 'paragon-5', rarity: 'mythic', coins: 700, title: 'transcend', check: c => c.paragonStars >= 5 },
  { id: 'red-gear', rarity: 'red', coins: 500, title: 'crimson', check: c => c.redCount >= 1 },
  { id: 'red-set', rarity: 'red', coins: 1500, check: c => c.redCount >= 4 },
  { id: 'enhance-10', rarity: 'mythic', coins: 300, check: c => c.maxEnhance >= 10 },
  { id: 'enhance-30', rarity: 'epic', coins: 120, check: c => c.maxEnhance >= 30 },
  { id: 'enhance-60', rarity: 'legendary', coins: 220, check: c => c.maxEnhance >= 60 },
  { id: 'ascend-1', rarity: 'rare', coins: 60, check: c => c.maxAscend >= 1 },
  { id: 'ascend-5', rarity: 'legendary', coins: 200, check: c => c.maxAscend >= 5 },
  { id: 'story-10', rarity: 'epic', coins: 100, check: c => c.storyStage >= 10 },
  { id: 'story-25', rarity: 'legendary', coins: 180, title: 'pathfinder', check: c => c.storyStage >= 25 },
  { id: 'story-50', rarity: 'red', coins: 400, title: 'conqueror', check: c => c.storyStage >= 50 },
  { id: 'points-100', rarity: 'epic', coins: 100, check: c => c.points >= 100 },
  { id: 'points-200', rarity: 'legendary', coins: 180, check: c => c.points >= 200 },
  { id: 'boss-weapon', rarity: 'legendary', coins: 200, title: 'dragonslayer', check: c => c.bossWeapons >= 1 },
  { id: 'gear-400', rarity: 'epic', coins: 120, check: c => c.gearPower >= 400 },
  { id: 'gear-800', rarity: 'legendary', coins: 240, title: 'warlord', check: c => c.gearPower >= 800 },
  { id: 'paragon-10', rarity: 'red', coins: 500, check: c => c.paragonStars >= 10 },
  { id: 'level-50', rarity: 'legendary', coins: 260, check: c => c.level >= 50 },
  { id: 'titles-12', rarity: 'epic', coins: 140, check: c => c.titles >= 12 },
  { id: 'coins-20000', rarity: 'legendary', coins: 220, check: c => c.coinsEarned >= 20000 },
  { id: 'tools-1000', rarity: 'legendary', coins: 200, check: c => c.tools >= 1000 },
  { id: 'titles-8', rarity: 'epic', coins: 120, check: c => c.titles >= 8 },
  { id: 'coins-5000', rarity: 'epic', coins: 120, check: c => c.coinsEarned >= 5000 },
]

function pad2(value) {
  return String(value).padStart(2, '0')
}

function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

function parseDateKey(key) {
  const [year, month, day] = String(key).split('-').map(Number)
  return new Date(year, month - 1, day)
}

function weekStartKey(date = new Date()) {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const offset = (copy.getDay() + 6) % 7
  copy.setDate(copy.getDate() - offset)
  return localDateKey(copy)
}

function weekIndex(key) {
  const epoch = new Date(2025, 0, 6).getTime()
  return Math.floor((parseDateKey(key).getTime() - epoch) / (7 * DAY_MS))
}

function dayIndex(key) {
  const epoch = new Date(2025, 0, 1).getTime()
  return Math.floor((parseDateKey(key).getTime() - epoch) / DAY_MS)
}

function nextMidnight(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime()
}

function nextWeekStart(now = new Date()) {
  const start = parseDateKey(weekStartKey(now))
  start.setDate(start.getDate() + 7)
  return start.getTime()
}

function currentSeasonInfo(date = new Date()) {
  // S1 starts here; the whole ladder is anchored to this date so the current
  // season is #1 and later seasons count up from it.
  const anchor = new Date(2026, 10, 9)
  const index = Math.max(0, Math.floor((date.getTime() - anchor.getTime()) / (SEASON_DAYS * DAY_MS)))
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() + index * SEASON_DAYS)
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + SEASON_DAYS)
  return {
    key: `S${index + 1}`,
    number: index + 1,
    theme: SEASON_THEMES[index % SEASON_THEMES.length].id,
    startedAt: start.getTime(),
    endsAt: end.getTime(),
  }
}

function hash32(text) {
  let hash = 2166136261
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededShuffle(items, seed) {
  const copy = items.slice()
  let state = seed || 1
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const swap = state % (index + 1)
    ;[copy[index], copy[swap]] = [copy[swap], copy[index]]
  }
  return copy
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function xpThreshold(level) {
  return 100 * (level - 1) + 25 * (level - 1) * (level - 2)
}

// Level 60 is the ceiling; past it every PARAGON_STEP experience becomes one
// paragon star, which pays coins and unlocks peak titles.
const MAX_LEVEL = 60
const PARAGON_STEP = 20000
const PARAGON_MAX = 10
const PARAGON_TITLES = [
  { stars: 1, title: 'peak' },
  { stars: 3, title: 'transcend' },
  { stars: 5, title: 'boundless' },
  { stars: 10, title: 'eternalpeak' },
]

function levelForXp(xp) {
  let level = 1
  while (level < MAX_LEVEL && Number(xp) >= xpThreshold(level + 1)) level += 1
  return level
}

function paragonState(xp) {
  const overflow = Math.max(0, Number(xp) - xpThreshold(MAX_LEVEL))
  const raw = Math.floor(overflow / PARAGON_STEP)
  const stars = Math.min(PARAGON_MAX, raw)
  const into = stars >= PARAGON_MAX ? PARAGON_STEP : overflow % PARAGON_STEP
  return {
    stars,
    max: PARAGON_MAX,
    capped: stars >= PARAGON_MAX,
    overflow,
    into,
    need: PARAGON_STEP,
    percent: stars >= PARAGON_MAX ? 100 : Math.round((into / PARAGON_STEP) * 1000) / 10,
  }
}

// Stars come from rebirths now: every rebirth is worth exactly one star.
function peakStars(state) {
  return Math.min(PARAGON_MAX, Math.max(0, Number(state.profile.rebirths) || 0))
}

function createChallengeSeason(kind, key, count) {
  const pool = kind === 'daily' ? DAILY_POOL : WEEKLY_POOL
  const chosen = seededShuffle(pool, hash32(`${kind}:${key}`)).slice(0, count)
  return {
    key,
    challengeIds: chosen,
    counters: {},
    claimed: [],
  }
}

// Boss health scales with level; the three fronts keep a 1 : 6 : 25 ratio so a
// week-long fight still takes real work without starving the daily loop.
function dailyBossHp(level) {
  return 500 + Math.min(level, 60) * 20
}

function weeklyBossHp(level) {
  return 3000 + Math.min(level, 60) * 120
}

function seasonBossHp(level) {
  return 15000 + Math.min(level, 60) * 450
}

function createWeeklyBoss(key, level) {
  const boss = WEEKLY_BOSSES[Math.abs(weekIndex(key)) % WEEKLY_BOSSES.length]
  const maxHp = weeklyBossHp(level)
  return {
    weekKey: key,
    bossId: boss.id,
    maxHp,
    hp: maxHp,
    damage: 0,
    defeated: false,
    defeatedAt: null,
    claimed: false,
    reward: { xp: 380, coins: 260, chest: 'gold', frame: 'f.calamity', gear: 'w.calamity' },
  }
}

function createDailyBoss(key, level) {
  const boss = DAILY_BOSSES[Math.abs(dayIndex(key)) % DAILY_BOSSES.length]
  const maxHp = dailyBossHp(level)
  return {
    dayKey: key,
    bossId: boss.id,
    maxHp,
    hp: maxHp,
    damage: 0,
    defeated: false,
    defeatedAt: null,
    claimed: false,
    reward: { xp: 90, coins: 45, chest: 'iron' },
  }
}

function createSeasonBoss(season, level) {
  const boss = SEASON_BOSSES[(season.number - 1) % SEASON_BOSSES.length]
  const maxHp = seasonBossHp(level)
  return {
    seasonKey: season.key,
    seasonNumber: season.number,
    bossId: boss.id,
    maxHp,
    hp: maxHp,
    damage: 0,
    defeated: false,
    defeatedAt: null,
    claimed: false,
    reward: { xp: 1600, coins: 900, chest: 'astral', frame: 'f.season', gear: 'a.season', title: 'seasonchamp' },
  }
}

function createSeasonState(previous) {
  const info = currentSeasonInfo()
  return {
    ...info,
    renown: 0,
    claimed: [],
    previous: previous
      ? {
        key: previous.key,
        number: previous.number,
        theme: previous.theme,
        renown: Number(previous.renown) || 0,
        endedAt: Number(previous.endsAt) || null,
      }
      : null,
  }
}

function defaultEquipped() {
  return { ...DEFAULT_EQUIPPED }
}

function baseState() {
  const now = Date.now()
  return {
    version: STATE_VERSION,
    profile: {
      name: '旅人',
      joinedAt: now,
      xp: 0,
      coins: 80,
      streak: 0,
      bestStreak: 0,
      lastActiveDay: null,
      equippedTitle: 'novice',
      rebirths: 0,
    },
    titles: { owned: ['novice'] },
    stats: {
      turns: 0,
      tools: 0,
      toolErrors: 0,
      writes: 0,
      lines: 0,
      reads: 0,
      searches: 0,
      todos: 0,
      subagents: 0,
      workflows: 0,
      shellRuns: 0,
      orchestrations: 0,
      recoveries: 0,
      nightWork: 0,
      dawnWork: 0,
      tokens: 0,
      lotteryDraws: 0,
      purchases: 0,
      weeklyClaims: 0,
      bossWins: 0,
      bossClaims: 0,
      dailyBossWins: 0,
      seasonBossWins: 0,
      chestsOpened: 0,
      gearFound: 0,
      daysActive: 0,
      totalXpEarned: 0,
      totalCoinsEarned: 80,
      distinctTools: [],
    },
    achievements: {},
    gear: {
      owned: [...STARTER_GEAR],
      equipped: defaultEquipped(),
      enhance: {},
      ascend: {},
      count: Object.fromEntries(STARTER_GEAR.map(id => [id, 1])),
    },
    story: { stage: 1, hp: 500, maxHp: 500, bossId: 'cinder' },
    chests: {
      stock: [],
      progress: 0,
      totalLines: 0,
      totalEarned: 0,
      last: null,
    },
    daily: null,
    weekly: null,
    season: null,
    dailyBoss: null,
    boss: null,
    seasonBoss: null,
    lottery: { day: null, last: null, history: [] },
    activity: [],
    cursors: {},
    sessions: {},
    nextActivityId: 1,
    updatedAt: now,
  }
}

function createState() {
  const state = baseState()
  const now = Date.now()
  state.daily = createChallengeSeason('daily', localDateKey(), 3)
  state.weekly = createChallengeSeason('weekly', weekStartKey(), 3)
  state.boss = createWeeklyBoss(weekStartKey(), 1)
  state.dailyBoss = createDailyBoss(localDateKey(), 1)
  state.season = createSeasonState(null)
  state.seasonBoss = createSeasonBoss(state.season, 1)
  state.activity.unshift({
    id: state.nextActivityId++,
    at: now,
    kind: 'welcome',
  })
  return state
}

function normalizeGear(raw) {
  const owned = new Set(STARTER_GEAR)
  if (Array.isArray(raw?.owned)) {
    for (const id of raw.owned) if (GEAR_BY_ID[id]) owned.add(id)
  }
  const equipped = defaultEquipped()
  if (raw?.equipped && typeof raw.equipped === 'object') {
    for (const slot of GEAR_SLOTS) {
      const id = raw.equipped[slot]
      if (GEAR_BY_ID[id]?.slot === slot && owned.has(id)) equipped[slot] = id
    }
  }
  const enhance = {}
  if (raw?.enhance && typeof raw.enhance === 'object') {
    for (const [id, level] of Object.entries(raw.enhance)) {
      if (!GEAR_BY_ID[id] || !owned.has(id)) continue
      const value = Math.max(0, Math.min(ENHANCE_MAX, Math.floor(Number(level) || 0)))
      if (value > 0) enhance[id] = value
    }
  }
  const count = {}
  for (const id of owned) count[id] = 1
  if (raw?.count && typeof raw.count === 'object') {
    for (const [id, value] of Object.entries(raw.count)) {
      if (!owned.has(id) || !GEAR_BY_ID[id]) continue
      count[id] = Math.max(1, Math.min(999, Math.floor(Number(value) || 1)))
    }
  }
  const ascend = {}
  if (raw?.ascend && typeof raw.ascend === 'object') {
    for (const [id, tier] of Object.entries(raw.ascend)) {
      if (!GEAR_BY_ID[id] || !owned.has(id)) continue
      const value = Math.max(0, Math.min(ASCEND_MAX, Math.floor(Number(tier) || 0)))
      if (value > 0) ascend[id] = value
    }
  }
  return {
    owned: [...owned].filter(id => GEAR_BY_ID[id]),
    equipped,
    enhance,
    ascend,
    count,
  }
}

function normalizeChests(raw) {
  const stock = Array.isArray(raw?.stock)
    ? raw.stock
      .filter(item => item && CHEST_TIERS[item.tier])
      .map(item => ({ tier: item.tier, at: Number(item.at) || Date.now() }))
      .slice(-MAX_CHESTS)
    : []
  return {
    stock,
    progress: Math.max(0, Number(raw?.progress) || 0) % CHEST_LINES,
    totalLines: Math.max(0, Number(raw?.totalLines) || 0),
    totalEarned: Math.max(0, Number(raw?.totalEarned) || 0),
    last: raw?.last && typeof raw.last === 'object' ? raw.last : null,
  }
}

function normalizeBossState(raw, kind) {
  if (!raw || typeof raw !== 'object') return null
  const base = kind === 'daily'
    ? createDailyBoss(localDateKey(), 1)
    : kind === 'season'
      ? createSeasonBoss(createSeasonState(null), 1)
      : createWeeklyBoss(weekStartKey(), 1)
  const maxHp = Math.max(1, Number(raw.maxHp) || base.maxHp)
  const rawHp = Number(raw.hp)
  return {
    ...base,
    ...raw,
    maxHp,
    hp: Number.isFinite(rawHp) ? Math.max(0, Math.min(rawHp, maxHp)) : maxHp,
    damage: Math.max(0, Number(raw.damage) || 0),
    defeated: Boolean(raw.defeated),
    claimed: Boolean(raw.claimed),
    reward: { ...base.reward, ...(raw.reward || {}) },
  }
}

function normalizeSeasonState(raw) {
  if (!raw || typeof raw !== 'object') return null
  return {
    ...currentSeasonInfo(),
    ...raw,
    renown: Math.max(0, Number(raw.renown) || 0),
    claimed: Array.isArray(raw.claimed) ? raw.claimed.filter(id => SEASON_TIERS.some(tier => tier.id === id)) : [],
    previous: raw.previous && typeof raw.previous === 'object' ? raw.previous : null,
  }
}

function normalizeSeasonChallenge(season, kind) {
  const fallback = createChallengeSeason(kind, kind === 'daily' ? localDateKey() : weekStartKey(), 3)
  const challengeIds = Array.isArray(season?.challengeIds)
    ? season.challengeIds.filter(id => CHALLENGE_DEFS[id]).slice(0, 5)
    : []
  return {
    key: typeof season?.key === 'string' ? season.key : fallback.key,
    challengeIds: challengeIds.length ? challengeIds : fallback.challengeIds,
    counters: season?.counters && typeof season.counters === 'object' ? season.counters : {},
    claimed: Array.isArray(season?.claimed) ? season.claimed.filter(id => CHALLENGE_DEFS[id]) : [],
  }
}

function normalizeState(raw) {
  const state = baseState()
  if (!raw || typeof raw !== 'object') return normalizeState(createState())
  Object.assign(state, raw)
  state.version = STATE_VERSION
  state.profile = { ...baseState().profile, ...(raw.profile || {}) }
  state.titles = { owned: ['novice'], ...(raw.titles || {}) }
  state.stats = { ...baseState().stats, ...(raw.stats || {}) }
  state.stats.distinctTools = Array.isArray(raw.stats?.distinctTools)
    ? raw.stats.distinctTools.filter(item => typeof item === 'string').slice(0, 200)
    : []
  state.stats.bossKinds = raw.stats?.bossKinds && typeof raw.stats.bossKinds === 'object'
    ? Object.fromEntries(Object.entries(raw.stats.bossKinds).filter(([, count]) => Number.isFinite(Number(count))).slice(0, 60))
    : {}
  state.achievements = raw.achievements && typeof raw.achievements === 'object' ? raw.achievements : {}
  state.achievementsSpent = Math.max(0, Math.floor(Number(raw.achievementsSpent) || 0))
  state.gear = normalizeGear(raw.gear)
  state.chests = normalizeChests(raw.chests)
  state.lottery = raw.lottery && typeof raw.lottery === 'object'
    ? { day: null, last: null, history: [], ...raw.lottery }
    : { day: null, last: null, history: [] }
  state.activity = Array.isArray(raw.activity) ? raw.activity.filter(item => item && typeof item === 'object').slice(0, MAX_ACTIVITY) : []
  state.cursors = raw.cursors && typeof raw.cursors === 'object' ? raw.cursors : {}
  state.sessions = raw.sessions && typeof raw.sessions === 'object' ? raw.sessions : {}
  state.titles.owned = Array.isArray(state.titles.owned)
    ? [...new Set(state.titles.owned.filter(item => typeof item === 'string'))]
    : ['novice']
  if (!state.titles.owned.includes('novice')) state.titles.owned.unshift('novice')
  if (!state.titles.owned.includes(state.profile.equippedTitle)) state.profile.equippedTitle = 'novice'
  state.daily = normalizeSeasonChallenge(raw.daily, 'daily')
  // Ledger of claimed daily ids per date, kept even if the daily season itself
  // is rebuilt, so a reload can never hand out the same day's reward twice.
  state.dailyLedger = {}
  if (raw.dailyLedger && typeof raw.dailyLedger === 'object') {
    const days = Object.keys(raw.dailyLedger).sort().slice(-7)
    for (const day of days) {
      const list = raw.dailyLedger[day]
      if (Array.isArray(list)) {
        state.dailyLedger[day] = [...new Set(list.filter(id => typeof id === 'string' && CHALLENGE_DEFS[id]))]
      }
    }
  }
  // Seed the ledger from whatever the current day already has claimed, so old
  // saves get the same protection without a migration step.
  if (state.daily.claimed.length) {
    const day = state.daily.key
    const existing = state.dailyLedger[day] || []
    state.dailyLedger[day] = [...new Set([...existing, ...state.daily.claimed])]
  }
  state.weekly = normalizeSeasonChallenge(raw.weekly, 'weekly')
  state.season = normalizeSeasonState(raw.season)
  state.dailyBoss = normalizeBossState(raw.dailyBoss, 'daily')
  state.boss = normalizeBossState(raw.boss, 'weekly')
  state.seasonBoss = normalizeBossState(raw.seasonBoss, 'season')
  state.story = normalizeStory(raw.story)
  // First load of the codex: credit whatever the current fronts and the recent
  // activity log can still prove, so old hunts are not lost.
  if (!Object.keys(state.stats.bossKinds || {}).length) {
    state.stats.bossKinds = {}
    for (const boss of [state.dailyBoss, state.boss, state.seasonBoss]) {
      if (boss && boss.defeated && boss.bossId) {
        state.stats.bossKinds[boss.bossId] = Number(state.stats.bossKinds[boss.bossId] || 0) + 1
      }
    }
    for (const entry of state.activity) {
      if (entry.kind !== 'boss-defeat' || !entry.bossId) continue
      state.stats.bossKinds[entry.bossId] = Number(state.stats.bossKinds[entry.bossId] || 0) + 1
    }
  }
  const maxActivityId = state.activity.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0)
  state.nextActivityId = Math.max(Number(raw.nextActivityId) || 1, maxActivityId + 1)
  state.updatedAt = Number(raw.updatedAt) || Date.now()
  ensurePeriods(state)
  evaluateAchievements(state)
  return state
}

function ensurePeriods(state) {
  const today = localDateKey()
  const week = weekStartKey()
  if (!state.daily || state.daily.key !== today) {
    state.daily = createChallengeSeason('daily', today, 3)
  }
  if (!state.weekly || state.weekly.key !== week) {
    state.weekly = createChallengeSeason('weekly', week, 3)
  }
  if (!state.boss || state.boss.weekKey !== week) {
    state.boss = createWeeklyBoss(week, levelForXp(state.profile.xp))
  }
  if (!state.dailyBoss || state.dailyBoss.dayKey !== today) {
    state.dailyBoss = createDailyBoss(today, levelForXp(state.profile.xp))
  }
  const info = currentSeasonInfo()
  if (!state.season || state.season.key !== info.key) {
    const previous = state.season
    state.season = createSeasonState(previous)
    state.seasonBoss = createSeasonBoss(state.season, levelForXp(state.profile.xp))
    if (previous) {
      addChest(state, 'iron', 1)
      addActivity(state, { kind: 'season', number: state.season.number, theme: state.season.theme })
    }
  } else if (!state.seasonBoss || state.seasonBoss.seasonKey !== state.season.key) {
    state.seasonBoss = createSeasonBoss(state.season, levelForXp(state.profile.xp))
  }
  // Keep an in-progress fight on the current health scale without throwing away
  // the damage already dealt; finished bosses rotate on their own schedule.
  const level = levelForXp(state.profile.xp)
  const rescale = (boss, expected) => {
    if (!boss || boss.defeated || boss.maxHp === expected) return boss
    const ratio = boss.maxHp > 0 ? Math.max(0, Math.min(1, boss.hp / boss.maxHp)) : 1
    return { ...boss, maxHp: expected, hp: Math.max(1, Math.round(expected * ratio)) }
  }
  state.dailyBoss = rescale(state.dailyBoss, dailyBossHp(level))
  state.boss = rescale(state.boss, weeklyBossHp(level))
  state.seasonBoss = rescale(state.seasonBoss, seasonBossHp(level))
}

function markActiveDay(state, at = Date.now()) {
  const day = localDateKey(new Date(at))
  if (state.profile.lastActiveDay === day) return false
  const yesterday = new Date(at)
  yesterday.setDate(yesterday.getDate() - 1)
  const previous = localDateKey(yesterday)
  if (state.profile.lastActiveDay === previous) state.profile.streak += 1
  else state.profile.streak = 1
  state.profile.lastActiveDay = day
  state.profile.bestStreak = Math.max(state.profile.bestStreak, state.profile.streak)
  state.stats.daysActive = (state.stats.daysActive || 0) + 1
  return true
}

function bumpChallengeSeason(state, metric, amount = 1) {
  for (const season of [state.daily, state.weekly]) {
    if (!season) continue
    if (metric === 'distinct') {
      if (typeof amount !== 'string') continue
      const current = Array.isArray(season.counters.distinct) ? season.counters.distinct : []
      if (!current.includes(amount)) season.counters.distinct = [...current, amount]
      continue
    }
    season.counters[metric] = Number(season.counters[metric] || 0) + Number(amount)
  }
}

function bump(state, metric, amount = 1) {
  state.stats[metric] = Number(state.stats[metric] || 0) + Number(amount)
}

function addActivity(state, entry) {
  state.activity.unshift({
    id: state.nextActivityId++,
    at: Date.now(),
    ...entry,
  })
  if (state.activity.length > MAX_ACTIVITY) state.activity.length = MAX_ACTIVITY
}

function rebirthBonus(state) {
  const lives = Math.max(0, Number(state.profile.rebirths) || 0)
  return {
    lives,
    damage: Math.round(lives * 8),   // percent
    xp: Math.round(lives * 5),       // percent
  }
}

function awardXp(state, amount) {
  const value = Math.max(0, Math.round(Number(amount) || 0))
  if (!value) return 0
  markActiveDay(state)
  const bonus = rebirthBonus(state)
  const scaled = bonus.xp > 0 ? Math.round(value * (1 + bonus.xp / 100)) : value
  // XP past the cap does not buy stars any more: stars come from rebirths, so
  // experience simply stops at the ceiling until the player resets.
  const capXp = xpThreshold(MAX_LEVEL)
  state.profile.xp = Math.min(capXp, state.profile.xp + scaled)
  state.stats.totalXpEarned += scaled
  bumpChallengeSeason(state, 'xp', scaled)
  return scaled
}

// One star per rebirth: pay the star reward and milestone titles.
function grantStar(state, star) {
  const coins = 300 + star * 100
  grantCoins(state, coins)
  addActivity(state, { kind: 'paragon', stars: star, coins })
  for (const milestone of PARAGON_TITLES) {
    if (milestone.stars === star && !state.titles.owned.includes(milestone.title)) {
      state.titles.owned.push(milestone.title)
    }
  }
  if (star >= PARAGON_MAX) grantPeakSkin(state)
  return coins
}

function grantPeakSkin(state) {
  if (state.gear.owned.includes(PEAK_SKIN_FRAME)) return false
  grantGear(state, PEAK_SKIN_FRAME, 'peak')
  addActivity(state, { kind: 'peak', gear: PEAK_SKIN_FRAME })
  return true
}

function grantCoins(state, amount) {
  const value = Math.max(0, Math.round(Number(amount) || 0))
  if (!value) return 0
  state.profile.coins += value
  state.stats.totalCoinsEarned += value
  return value
}

function gearPower(state) {
  return GEAR_SLOTS.reduce((total, slot) => {
    if (slot === 'frame') return total
    const id = state.gear.equipped[slot]
    return total + itemPower(state, id)
  }, 0)
}

// Achievement points are derived from what is unlocked, so old saves need no
// migration; only the amount already spent has to be stored.
const ACHIEVEMENT_POINTS = { common: 1, rare: 2, epic: 3, legendary: 5, mythic: 8, red: 12 }
const RED_GEAR_COST = 45
const RED_GEAR_IDS = ['w.crimson', 'a.crimson', 'c.crimson', 'f.crimson']

function achievementPoints(state) {
  const total = ACHIEVEMENTS.reduce(
    (sum, item) => (state.achievements[item.id] ? sum + (ACHIEVEMENT_POINTS[item.rarity] || 1) : sum), 0)
  const spent = Math.max(0, Number(state.achievementsSpent) || 0)
  return { total, spent, available: Math.max(0, total - spent), cost: RED_GEAR_COST }
}

function touchSession(state, session, patch = {}) {
  if (!session?.id) return
  const id = String(session.id)
  let entry = state.sessions[id]
  if (!entry || typeof entry !== 'object') {
    entry = {
      id,
      firstAt: Date.now(),
      lastAt: Date.now(),
      xp: 0,
      turns: 0,
      tools: 0,
      subagent: Boolean(session.header?.origin === 'subagent' || session.header?.parentSession),
      parent: session.header?.parentSession ? String(session.header.parentSession) : null,
      pending: {},
    }
    state.sessions[id] = entry
  }
  entry.lastAt = Date.now()
  entry.xp = Number(entry.xp || 0) + Number(patch.xp || 0)
  if (patch.turn) entry.turns = Number(entry.turns || 0) + 1
  if (patch.tool) entry.tools = Number(entry.tools || 0) + 1
  if (patch.subagent) entry.subagent = true
  const ids = Object.keys(state.sessions)
  if (ids.length > MAX_SESSIONS) {
    ids
      .sort((left, right) => Number(state.sessions[left].lastAt || 0) - Number(state.sessions[right].lastAt || 0))
      .slice(0, ids.length - MAX_SESSIONS)
      .forEach(oldId => { delete state.sessions[oldId] })
  }
}

function parseArguments(text) {
  if (!text || typeof text !== 'string') return {}
  try {
    const value = JSON.parse(text)
    return value && typeof value === 'object' ? value : {}
  } catch {
    return {}
  }
}

function toolTarget(name, args) {
  if (!['write', 'edit', 'apply_patch', 'read', 'read_image'].includes(name)) return ''
  const candidate = args.path ?? args.file_path ?? args.filePath ?? ''
  let value = String(candidate || '').replace(/\s+/g, ' ').trim()
  if (!value) return ''
  value = value.split(/[\\/]/).filter(Boolean).pop() || value
  return value.slice(0, 52)
}

function countWrittenLines(name, args) {
  if (name === 'apply_patch') {
    const text = args.patch ?? args.input ?? args.diff ?? ''
    if (typeof text !== 'string') return 0
    return Math.min(5000, text.split(/\r?\n/).filter(line => line.startsWith('+') && !line.startsWith('+++')).length)
  }
  const text = name === 'write'
    ? (args.content ?? args.text ?? '')
    : name === 'edit'
      ? (args.new_string ?? args.newText ?? args.newString ?? '')
      : ''
  if (typeof text !== 'string' || !text) return 0
  return Math.min(5000, text.split(/\r?\n/).filter(line => line.trim().length > 0).length)
}

function noteToolName(state, name) {
  if (!state.stats.distinctTools.includes(name)) state.stats.distinctTools.push(name)
  bumpChallengeSeason(state, 'distinct', name)
}

function addChest(state, tier, count = 1) {
  const config = CHEST_TIERS[tier]
  if (!config) return 0
  let added = 0
  for (let index = 0; index < count; index += 1) {
    if (state.chests.stock.length >= MAX_CHESTS) break
    state.chests.stock.push({ tier, at: Date.now() })
    state.chests.totalEarned += 1
    added += 1
  }
  return added
}

function chestTierForLines(totalLines) {
  if (totalLines >= 9000) return 'astral'
  if (totalLines >= 4000) return 'gold'
  if (totalLines >= 1200) return 'iron'
  return 'wood'
}

function noteWrittenLines(state, lines) {
  const value = Math.max(0, Math.round(Number(lines) || 0))
  if (!value) return 0
  bump(state, 'lines', value)
  bumpChallengeSeason(state, 'lines', value)
  state.chests.totalLines += value
  state.chests.progress += Math.min(value, 600)
  let created = 0
  while (state.chests.progress >= CHEST_LINES && created < 20) {
    state.chests.progress -= CHEST_LINES
    addChest(state, chestTierForLines(state.chests.totalLines), 1)
    created += 1
  }
  if (state.chests.progress > CHEST_LINES) state.chests.progress %= CHEST_LINES
  return value
}

function grantGear(state, id, source) {
  const item = GEAR_BY_ID[id]
  if (!item) return { gear: null, duplicate: false, coins: 0 }
  if (!state.gear.count || typeof state.gear.count !== 'object') state.gear.count = {}
  if (state.gear.owned.includes(id)) {
    // Duplicates stack: five copies of one piece can be fused into the next
    // rarity, so a repeat drop is progress instead of a consolation coin.
    state.gear.count[id] = Math.max(1, Number(state.gear.count[id]) || 1) + 1
    bump(state, 'gearFound')
    return { gear: id, duplicate: true, coins: 0, count: state.gear.count[id] }
  }
  state.gear.owned.push(id)
  state.gear.count[id] = 1
  bump(state, 'gearFound')
  return { gear: id, duplicate: false, coins: 0, count: 1 }
}

function eligibleChestGear(state, tier) {
  const config = CHEST_TIERS[tier]
  const candidates = GEAR_CATALOG.filter(item => (
    item.source !== 'starter'
    && item.chest !== false
    && config.pool.includes(item.rarity)
  ))
  const unowned = candidates.filter(item => !state.gear.owned.includes(item.id))
  return unowned.length ? unowned : candidates
}

function openChest(state) {
  if (!state.chests.stock.length) return { ok: false, error: 'no-chest' }
  const entry = state.chests.stock.shift()
  const config = CHEST_TIERS[entry.tier]
  const result = {
    tier: entry.tier,
    coins: randomInt(config.coins[0], config.coins[1]),
    xp: randomInt(config.xp[0], config.xp[1]),
    gear: null,
    duplicate: false,
    at: Date.now(),
  }
  grantCoins(state, result.coins)
  if (Math.random() < config.gearChance) {
    const candidates = eligibleChestGear(state, entry.tier)
    if (candidates.length) {
      const item = randomItem(candidates)
      const granted = grantGear(state, item.id, 'chest')
      result.gear = granted.gear
      result.duplicate = granted.duplicate
      result.coins += granted.coins
    }
  }
  awardXp(state, result.xp)
  bump(state, 'chestsOpened')
  state.chests.last = result
  addActivity(state, {
    kind: 'chest',
    tier: result.tier,
    gear: result.gear,
    duplicate: result.duplicate,
    coins: result.coins,
    xp: result.xp,
  })
  evaluateAchievements(state)
  return { ok: true, chest: result }
}

function evaluateAchievements(state) {
  let changed = false
  for (let pass = 0; pass < 4; pass += 1) {
    const context = achievementContext(state)
    let passChanged = false
    for (const definition of ACHIEVEMENTS) {
      if (state.achievements[definition.id]) continue
      if (!definition.check(context)) continue
      state.achievements[definition.id] = { at: Date.now() }
      const coins = definition.coins || 0
      if (coins) grantCoins(state, coins)
      if (definition.title && !state.titles.owned.includes(definition.title)) {
        state.titles.owned.push(definition.title)
      }
      addActivity(state, {
        kind: 'achievement',
        achievement: definition.id,
        coins,
      })
      passChanged = true
      changed = true
    }
    if (!passChanged) break
  }
  return changed
}

function achievementContext(state) {
  return {
    turns: state.stats.turns,
    tools: state.stats.tools,
    writes: state.stats.writes,
    lines: state.stats.lines,
    reads: state.stats.reads,
    searches: state.stats.searches,
    todos: state.stats.todos,
    subagents: state.stats.subagents,
    workflows: state.stats.workflows,
    shellRuns: state.stats.shellRuns,
    distinct: state.stats.distinctTools.length,
    bestStreak: state.profile.bestStreak,
    night: state.stats.nightWork,
    dawn: state.stats.dawnWork,
    recoveries: state.stats.recoveries,
    bosses: state.stats.bossWins,
    dailyBosses: state.stats.dailyBossWins,
    seasonBosses: state.stats.seasonBossWins,
    chests: state.stats.chestsOpened,
    gearPower: gearPower(state),
    gearCount: state.gear.owned.length,
    mythicGear: state.gear.owned.filter(id => GEAR_BY_ID[id] && GEAR_BY_ID[id].rarity === 'mythic').length,
    redCount: state.gear.owned.filter(id => GEAR_BY_ID[id] && GEAR_BY_ID[id].rarity === 'red').length,
    maxEnhance: Math.max(0, ...Object.values(state.gear.enhance || {}).map(value => Number(value) || 0)),
    maxAscend: Math.max(0, ...Object.values(state.gear.ascend || {}).map(value => Number(value) || 0)),
    storyStage: Math.max(1, Number(state.story?.stage) || 1),
    points: achievementPoints(state).total,
    bossWeapons: state.gear.owned.filter(id => Object.values(SEASON_BOSS_GEAR).includes(id)).length,
    rank: SEASON_RANKS.filter(rank => state.season.renown >= rank.at).length - 1,
    level: levelForXp(state.profile.xp),
    paragonStars: peakStars(state),
    coinsEarned: state.stats.totalCoinsEarned,
    titles: state.titles.owned.length,
    lottery: state.stats.lotteryDraws,
    purchases: state.stats.purchases,
    weeklyClaims: state.stats.weeklyClaims,
  }
}

// Class level pays off in combat: every level adds half a percent of damage,
// capped so a very high mastery cannot run away with the whole game.
function classDamageBonus(state) {
  const total = Object.values(classScores(state)).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0)
  return Math.min(0.5, classLevelForTotal(total) * 0.005)
}

function normalizeStory(raw) {
  const stage = Math.max(1, Math.floor(Number(raw?.stage) || 1))
  const fresh = storyBossFor(stage)
  const hp = Math.max(0, Math.min(fresh.maxHp, Math.floor(Number(raw?.hp))))
  return {
    stage,
    bossId: fresh.bossId,
    maxHp: fresh.maxHp,
    hp: Number.isFinite(hp) ? hp : fresh.maxHp,
  }
}

function ensureStory(state) {
  const fresh = storyBossFor(state.story?.stage || 1)
  if (!state.story || state.story.stage !== fresh.stage) {
    state.story = { stage: fresh.stage, bossId: fresh.bossId, maxHp: fresh.maxHp, hp: fresh.maxHp }
  }
  return state.story
}

function clearStoryStage(state) {
  const story = ensureStory(state)
  const stage = story.stage
  const coins = grantCoins(state, 120 + stage * 40)
  const xp = awardXp(state, 60 + stage * 20)
  if (stage % 5 === 0) addChest(state, 'astral', 1)
  addActivity(state, { kind: 'story', stage, bossId: story.bossId, coins, xp })
  const next = storyBossFor(stage + 1)
  state.story = { stage: next.stage, bossId: next.bossId, maxHp: next.maxHp, hp: next.maxHp }
  bump(state, 'bossWins')
  return { stage, coins, xp, chest: stage % 5 === 0 ? 'astral' : null }
}

function damageAllBosses(state, base) {
  const rebirth = rebirthBonus(state)
  const amount = Math.max(1, Math.round(Number(base) * (1 + gearPower(state) / 220) * (1 + classDamageBonus(state)) * (1 + rebirth.damage / 100)))
  if (state.season) state.season.renown += amount
  applyBossDamage(state, state.dailyBoss, amount, 'daily')
  applyBossDamage(state, state.boss, amount, 'weekly')
  applyBossDamage(state, state.seasonBoss, amount, 'season')
  const story = ensureStory(state)
  story.hp = Math.max(0, story.hp - amount)
  if (story.hp <= 0) clearStoryStage(state)
}

function applyBossDamage(state, boss, amount, kind) {
  if (!boss || boss.defeated || !(amount > 0)) return
  boss.hp = Math.max(0, boss.hp - amount)
  boss.damage += amount
  if (boss.hp > 0) return
  boss.defeated = true
  boss.defeatedAt = Date.now()
  bump(state, 'bossWins')
  state.stats.bossKinds = state.stats.bossKinds || {}
  state.stats.bossKinds[boss.bossId] = Number(state.stats.bossKinds[boss.bossId] || 0) + 1
  if (kind === 'daily') bump(state, 'dailyBossWins')
  if (kind === 'season') bump(state, 'seasonBossWins')
  awardXp(state, boss.reward.xp)
  addActivity(state, {
    kind: 'boss-defeat',
    bossId: boss.bossId,
    bossKind: kind,
    xp: boss.reward.xp,
  })
  evaluateAchievements(state)
}

function challengeProgress(season, definition) {
  if (!season) return 0
  if (definition.metric === 'distinct') {
    return Array.isArray(season.counters.distinct) ? season.counters.distinct.length : 0
  }
  return Number(season.counters[definition.metric] || 0)
}

function challengeSeasonView(state, kind) {
  const season = kind === 'daily' ? state.daily : state.weekly
  const endAt = kind === 'daily' ? nextMidnight() : nextWeekStart()
  return {
    key: season.key,
    endsAt: endAt,
    challenges: season.challengeIds.map(id => {
      const definition = CHALLENGE_DEFS[id]
      const target = definition.target[kind]
      const progress = challengeProgress(season, definition)
      return {
        id,
        metric: definition.metric,
        target,
        progress: Math.min(progress, target),
        rawProgress: progress,
        xp: definition.xp[kind],
        coins: definition.coins[kind],
        claimed: season.claimed.includes(id),
        complete: progress >= target,
      }
    }),
  }
}

function classScores(state) {
  const stats = state.stats
  return {
    ranger: Math.round(stats.tools * 1.2 + stats.reads * 0.35 + stats.turns * 0.6),
    artificer: Math.round(stats.writes * 4 + stats.lines * 0.18 + stats.shellRuns * 1.6 + gearPower(state) * 1.2 + stats.tools * 0.2),
    scholar: Math.round(stats.searches * 5 + stats.reads * 0.8 + stats.tokens / 6000),
    commander: Math.round(stats.subagents * 16 + stats.workflows * 26 + stats.orchestrations * 2),
    debugger: Math.round(stats.recoveries * 18 + stats.toolErrors * 1.5),
  }
}

// Mastery thresholds: the best path's score decides the class tier. Eight
// rungs so the ladder keeps having somewhere to climb at high mastery.
const CLASS_TIER_STEPS = [
  { at: 0 }, { at: 40 }, { at: 400 }, { at: 4000 },
  { at: 25000 }, { at: 120000 }, { at: 400000 }, { at: 1000000 },
]

// Class level is driven by total mastery, on a gentler curve than player XP.
function classLevelThreshold(level) {
  return 300 * (level - 1) + 45 * (level - 1) * (level - 2)
}

function classLevelForTotal(total) {
  let level = 1
  while (level < 99 && Number(total) >= classLevelThreshold(level + 1)) level += 1
  return level
}

function classInfo(state) {
  const scores = classScores(state)
  const entries = Object.entries(scores)
  const best = entries.sort((left, right) => right[1] - left[1])[0]
  const evidence = state.stats.tools
  const id = evidence < 12 ? 'novice' : best[1] > 0 ? best[0] : 'novice'
  const max = Math.max(0, best[1])
  const total = entries.reduce((sum, [, value]) => sum + Math.max(0, Number(value) || 0), 0)
  const tierIndex = CLASS_TIER_STEPS.reduce((index, step, at) => (max >= step.at ? at : index), 0)
  const nextTier = CLASS_TIER_STEPS[tierIndex + 1] || null
  const level = classLevelForTotal(total)
  const floor = classLevelThreshold(level)
  const ceil = classLevelThreshold(level + 1)
  return {
    id,
    tier: tierIndex,
    scores,
    total,
    level,
    xpIntoLevel: Math.max(0, total - floor),
    xpForNext: Math.max(1, ceil - floor),
    percent: Math.round((Math.max(0, total - floor) / Math.max(1, ceil - floor)) * 1000) / 10,
    nextTier: nextTier ? { tier: tierIndex + 1, at: nextTier.at, need: Math.max(0, nextTier.at - max) } : null,
    tierFloor: CLASS_TIER_STEPS[tierIndex].at,
    damageBonus: Math.round(Math.min(0.5, level * 0.005) * 1000) / 10,
  }
}

function bossView(state, kind) {
  const source = kind === 'daily' ? state.dailyBoss : kind === 'season' ? state.seasonBoss : state.boss
  const endsAt = kind === 'daily' ? nextMidnight() : kind === 'season' ? state.season.endsAt : nextWeekStart()
  return {
    ...source,
    kind,
    endsAt,
    seasonNumber: kind === 'season' ? state.season.number : undefined,
    reward: source.reward,
  }
}

function seasonRank(renown) {
  const value = Math.max(0, Number(renown) || 0)
  let current = SEASON_RANKS[0]
  for (const rank of SEASON_RANKS) if (value >= rank.at) current = rank
  const next = SEASON_RANKS.find(rank => rank.at > value) || null
  return {
    id: current.id,
    at: current.at,
    next: next ? { id: next.id, at: next.at } : null,
  }
}

function seasonView(state) {
  const rank = seasonRank(state.season.renown)
  return {
    key: state.season.key,
    number: state.season.number,
    theme: state.season.theme,
    startedAt: state.season.startedAt,
    endsAt: state.season.endsAt,
    renown: state.season.renown,
    rank,
    previous: state.season.previous,
    boss: bossView(state, 'season'),
    tiers: SEASON_TIERS.map(tier => {
      const progress = Math.min(state.season.renown, tier.target)
      return {
        ...tier,
        chestCount: Math.max(0, Number(tier.chestCount) || 1),
        progress,
        complete: state.season.renown >= tier.target,
        claimed: state.season.claimed.includes(tier.id),
      }
    }),
  }
}

function gearView(state) {
  const power = gearPower(state)
  const enhance = state.gear.enhance || {}
  const ascend = state.gear.ascend || {}
  const decorate = item => {
    const level = Math.max(0, Math.min(ENHANCE_MAX, Number(enhance[item.id] || 0)))
    const tier = Math.max(0, Math.min(ASCEND_MAX, Number(ascend[item.id] || 0)))
    return {
      id: item.id,
      slot: item.slot,
      rarity: item.rarity,
      power: item.power,
      powerNow: itemPower(state, item.id),
      signature: item.signature === true,
      count: Math.max(1, Number(state.gear.count?.[item.id]) || 1),
      enhance: level,
      enhanceMax: ENHANCE_MAX,
      enhanceCost: item.slot === 'frame' || level >= ENHANCE_MAX ? null : enhanceCost(level),
      ascend: tier,
      ascendMax: ASCEND_MAX,
      ascendCost: item.slot === 'frame' || tier >= ASCEND_MAX ? null : ascendCost(tier),
      ascendRate: item.slot === 'frame' || tier >= ASCEND_MAX ? null : Math.round(ascendRate(tier) * 100),
      price: item.price || 0,
      source: item.source || 'chest',
      owned: state.gear.owned.includes(item.id),
      equipped: state.gear.equipped[item.slot] === item.id,
    }
  }
  return {
    power,
    equipped: { ...state.gear.equipped },
    owned: [...state.gear.owned],
    items: GEAR_CATALOG
      .map(decorate)
      .sort((left, right) => (RARITY_LADDER_INDEX.indexOf(right.rarity) - RARITY_LADDER_INDEX.indexOf(left.rarity))
        || (right.powerNow || right.power) - (left.powerNow || left.power)
        || left.id.localeCompare(right.id)),
    shop: GEAR_SHOP
      .map(decorate)
      .sort((left, right) => (RARITY_LADDER_INDEX.indexOf(left.rarity) - RARITY_LADDER_INDEX.indexOf(right.rarity))
        || left.price - right.price
        || left.id.localeCompare(right.id)),
    enhanceMax: ENHANCE_MAX,
    redIds: RED_GEAR_IDS.slice(),
    points: achievementPoints(state),
  }
}

function chestsView(state) {
  const stock = state.chests.stock.map(item => ({ ...item }))
  return {
    stock,
    count: stock.length,
    progress: state.chests.progress,
    perChest: CHEST_LINES,
    totalLines: state.chests.totalLines,
    totalEarned: state.chests.totalEarned,
    opened: state.stats.chestsOpened,
    nextTier: chestTierForLines(state.chests.totalLines),
    last: state.chests.last,
  }
}

function buildSnapshot(state) {
  ensurePeriods(state)
  evaluateAchievements(state)
  const level = levelForXp(state.profile.xp)
  const stars = peakStars(state)
  const paragon = {
    stars,
    max: PARAGON_MAX,
    capped: stars >= PARAGON_MAX,
    into: 0,
    need: PARAGON_STEP,
    percent: stars >= PARAGON_MAX ? 100 : Math.round((stars / PARAGON_MAX) * 1000) / 10,
    ready: level >= MAX_LEVEL && stars < PARAGON_MAX,
  }
  const maxed = level >= MAX_LEVEL
  const currentFloor = xpThreshold(level)
  const nextFloor = xpThreshold(level + 1)
  const xpIntoLevel = maxed ? 0 : Math.max(0, state.profile.xp - currentFloor)
  const xpForNext = maxed ? 1 : Math.max(1, nextFloor - currentFloor)
  const now = Date.now()
  const party = Object.values(state.sessions)
    .filter(entry => entry && typeof entry === 'object')
    .sort((left, right) => Number(right.xp || 0) - Number(left.xp || 0) || Number(right.lastAt || 0) - Number(left.lastAt || 0))
    .slice(0, 8)
    .map(entry => ({
      id: String(entry.id),
      xp: Number(entry.xp || 0),
      turns: Number(entry.turns || 0),
      tools: Number(entry.tools || 0),
      lastAt: Number(entry.lastAt || 0),
      subagent: Boolean(entry.subagent),
      active: now - Number(entry.lastAt || 0) < 15 * 60 * 1000,
    }))
  const weekly = bossView(state, 'weekly')
  const daily = bossView(state, 'daily')
  const seasonData = seasonView(state)
  return {
    ok: true,
    version: STATE_VERSION,
    serverTime: now,
    dayKey: state.daily.key,
    weekKey: state.weekly.key,
    player: {
      name: state.profile.name,
      xp: state.profile.xp,
      level,
      maxLevel: MAX_LEVEL,
      paragon,
      rebirths: rebirthBonus(state).lives,
      rebirth: rebirthBonus(state),
      xpIntoLevel,
      xpForNext,
      xpPercent: maxed ? 100 : Math.round((xpIntoLevel / xpForNext) * 1000) / 10,
      coins: state.profile.coins,
      streak: state.profile.streak,
      bestStreak: state.profile.bestStreak,
      equippedTitle: state.profile.equippedTitle,
      equippedFrame: state.gear.equipped.frame,
      gearPower: gearPower(state),
      ownedTitles: state.titles.owned,
      achievements: state.achievements,
      achievementRewards: Object.fromEntries(ACHIEVEMENTS.map(item => [item.id, item.coins || 0])),
      unlockedCount: Object.keys(state.achievements).length,
      totalAchievements: ACHIEVEMENTS.length,
      stats: { ...state.stats },
      class: classInfo(state),
      joinedAt: state.profile.joinedAt,
    },
    daily: challengeSeasonView(state, 'daily'),
    weekly: challengeSeasonView(state, 'weekly'),
    season: seasonData,
    boss: weekly,
    weeklyBoss: weekly,
    dailyBoss: daily,
    seasonBoss: seasonData.boss,
    story: (() => {
      const current = ensureStory(state)
      const next = storyBossFor(current.stage + 1)
      return {
        stage: current.stage,
        bossId: current.bossId,
        hp: current.hp,
        maxHp: current.maxHp,
        percent: Math.round((current.hp / Math.max(1, current.maxHp)) * 1000) / 10,
        reward: { coins: 120 + current.stage * 40, xp: 60 + current.stage * 20, chest: current.stage % 5 === 0 ? 'astral' : null },
        next: { stage: next.stage, bossId: next.bossId, maxHp: next.maxHp },
      }
    })(),
    gear: gearView(state),
    chests: chestsView(state),
    lottery: {
      available: state.lottery.day !== localDateKey(),
      last: state.lottery.last && state.lottery.last.day === localDateKey() ? state.lottery.last : null,
      history: Array.isArray(state.lottery.history) ? state.lottery.history.slice(0, 10) : [],
      resetsAt: nextMidnight(),
    },
    shop: SHOP_TITLES.map(item => ({
      ...item,
      owned: state.titles.owned.includes(item.id),
      equipped: state.profile.equippedTitle === item.id,
    })),
    shopChests: SHOP_CHESTS.map(item => ({
      tier: item.tier,
      price: item.price,
      affordable: state.profile.coins >= item.price,
      full: state.chests.stock.length >= MAX_CHESTS,
    })),
    bossPools: {
      daily: DAILY_BOSSES.map(item => item.id),
      weekly: WEEKLY_BOSSES.map(item => item.id),
      season: SEASON_BOSSES.map(item => item.id),
    },
    bossKinds: { ...(state.stats.bossKinds || {}) },
    party,
    activity: state.activity.slice(0, 30),
  }
}

function fail(state, code, detail) {
  return { ok: false, error: code, detail: detail || null, state: buildSnapshot(state) }
}

function claimChallenge(state, period, id) {
  const season = period === 'daily' ? state.daily : state.weekly
  const definition = CHALLENGE_DEFS[id]
  if (!season || !definition || !season.challengeIds.includes(id)) {
    return { ok: false, error: 'unknown-challenge' }
  }
  if (season.claimed.includes(id)) return { ok: false, error: 'already-claimed' }
  if (period === 'daily') {
    const ledger = state.dailyLedger?.[season.key] || []
    if (ledger.includes(id)) return { ok: false, error: 'already-claimed' }
  }
  const progress = challengeProgress(season, definition)
  const target = definition.target[period]
  if (progress < target) return { ok: false, error: 'not-complete' }
  season.claimed.push(id)
  if (period === 'daily') {
    if (!state.dailyLedger || typeof state.dailyLedger !== 'object') state.dailyLedger = {}
    const day = season.key
    const list = Array.isArray(state.dailyLedger[day]) ? state.dailyLedger[day] : []
    state.dailyLedger[day] = [...new Set([...list, id])]
  }
  const xp = awardXp(state, definition.xp[period])
  const coins = grantCoins(state, definition.coins[period])
  if (period === 'weekly') bump(state, 'weeklyClaims')
  addActivity(state, {
    kind: 'reward',
    source: period,
    challenge: id,
    xp,
    coins,
  })
  return { ok: true, xp, coins }
}

function claimBoss(state, kind = 'weekly') {
  const boss = kind === 'daily' ? state.dailyBoss : kind === 'season' ? state.seasonBoss : state.boss
  if (!boss.defeated) return { ok: false, error: 'boss-alive' }
  if (boss.claimed) return { ok: false, error: 'already-claimed' }
  boss.claimed = true
  bump(state, 'bossClaims')
  if (kind === 'weekly') bump(state, 'weeklyClaims')
  const xp = awardXp(state, boss.reward.xp)
  const coins = grantCoins(state, boss.reward.coins)
  if (boss.reward.chest) addChest(state, boss.reward.chest, 1)
  if (boss.reward.frame) grantGear(state, boss.reward.frame, 'boss')
  if (boss.reward.gear) grantGear(state, boss.reward.gear, 'boss')
  // The season front drops the red set, one piece per kill.
  let redGear = null
  if (kind === 'season') {
    redGear = RED_GEAR_IDS.find(id => !state.gear.owned.includes(id)) || null
    if (!redGear) {
      // Base set complete: keep paying out from the wider red pool.
      const pool = GEAR_CATALOG.filter(item => item.rarity === 'red' && !state.gear.owned.includes(item.id))
      if (pool.length) redGear = pool[Math.floor(Math.random() * pool.length)].id
    }
    if (redGear) grantGear(state, redGear, 'season')
  }
  // ...and its own signature weapon.
  let bossGear = null
  if (kind === 'season') {
    const signature = SEASON_BOSS_GEAR[boss.bossId] || null
    if (signature && !state.gear.owned.includes(signature)) {
      grantGear(state, signature, 'seasonBoss')
      bossGear = signature
    }
  }
  if (boss.reward.title && !state.titles.owned.includes(boss.reward.title)) {
    state.titles.owned.push(boss.reward.title)
  }
  addActivity(state, {
    kind: 'reward',
    source: `${kind}Boss`,
    xp,
    coins,
  })
  evaluateAchievements(state)
  return {
    ok: true,
    xp,
    coins,
    chest: boss.reward.chest || null,
    frame: boss.reward.frame || null,
    gear: boss.reward.gear || null,
    redGear,
    bossGear,
  }
}

function claimSeasonTier(state, id) {
  const tier = SEASON_TIERS.find(candidate => candidate.id === id)
  if (!tier) return { ok: false, error: 'unknown-tier' }
  if (state.season.claimed.includes(id)) return { ok: false, error: 'already-claimed' }
  if (state.season.renown < tier.target) return { ok: false, error: 'not-complete' }
  state.season.claimed.push(id)
  const xp = awardXp(state, tier.xp)
  const coins = grantCoins(state, tier.coins)
  const chestCount = Math.max(0, Number(tier.chestCount) || 1)
  if (tier.chest && chestCount > 0) addChest(state, tier.chest, chestCount)
  if (tier.frame) grantGear(state, tier.frame, 'season')
  if (tier.gear) grantGear(state, tier.gear, 'season')
  if (tier.title && !state.titles.owned.includes(tier.title)) state.titles.owned.push(tier.title)
  addActivity(state, {
    kind: 'season-tier',
    tier: tier.id,
    xp,
    coins,
  })
  evaluateAchievements(state)
  return {
    ok: true,
    xp,
    coins,
    chest: tier.chest || null,
    chestCount: tier.chest ? chestCount : 0,
    frame: tier.frame || null,
    gear: tier.gear || null,
    title: tier.title || null,
  }
}

function drawLottery(state) {
  const today = localDateKey()
  if (state.lottery.day === today) return { ok: false, error: 'already-drawn' }
  const roll = Math.random() * 100
  let prize
  if (roll < 50) {
    prize = { kind: 'coins', amount: 10 + Math.floor(Math.random() * 21) }
  } else if (roll < 75) {
    prize = { kind: 'xp', amount: 20 + Math.floor(Math.random() * 31) }
  } else if (roll < 88) {
    prize = { kind: 'coins', amount: 50 }
  } else if (roll < 96) {
    prize = { kind: 'xp', amount: 80 }
  } else {
    prize = { kind: 'title', title: 'lucky' }
  }
  state.lottery.day = today
  state.lottery.last = { day: today, prize, at: Date.now() }
  state.lottery.history = [{ day: today, prize, at: Date.now() }, ...(state.lottery.history || [])].slice(0, 14)
  bump(state, 'lotteryDraws')
  if (prize.kind === 'coins') grantCoins(state, prize.amount)
  else if (prize.kind === 'xp') awardXp(state, prize.amount)
  else if (state.titles.owned.includes(prize.title)) {
    prize = { kind: 'coins', amount: 60 }
    grantCoins(state, prize.amount)
  } else {
    state.titles.owned.push(prize.title)
  }
  addActivity(state, { kind: 'lottery', prize })
  evaluateAchievements(state)
  return { ok: true, prize }
}

function applyAction(state, payload) {
  ensurePeriods(state)
  evaluateAchievements(state)
  const action = String(payload?.action || '')
  if (action === 'rename') {
    const name = String(payload?.name || '')
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .trim()
      .slice(0, 20)
    if (!name) return fail(state, 'invalid-name')
    state.profile.name = name
    return { ok: true, state: buildSnapshot(state) }
  }
  if (action === 'lottery') {
    const result = drawLottery(state)
    if (!result.ok) return fail(state, result.error)
    return { ok: true, prize: result.prize, state: buildSnapshot(state) }
  }
  if (action === 'open-chest') {
    const result = openChest(state)
    if (!result.ok) return fail(state, result.error)
    return { ok: true, chest: result.chest, state: buildSnapshot(state) }
  }
  if (action === 'buy-chest') {
    const tier = String(payload?.tier || '')
    const entry = SHOP_CHESTS.find(candidate => candidate.tier === tier)
    if (!entry) return fail(state, 'unknown-chest')
    if (state.chests.stock.length >= MAX_CHESTS) return fail(state, 'chest-full')
    if (state.profile.coins < entry.price) return fail(state, 'not-enough-coins')
    state.profile.coins -= entry.price
    addChest(state, entry.tier, 1)
    bump(state, 'purchases')
    addActivity(state, { kind: 'purchase-chest', tier: entry.tier, spentCoins: entry.price })
    evaluateAchievements(state)
    return { ok: true, state: buildSnapshot(state) }
  }
  if (action === 'buy-title') {
    const item = SHOP_TITLES.find(candidate => candidate.id === payload?.id)
    if (!item) return fail(state, 'unknown-title')
    if (state.titles.owned.includes(item.id)) return fail(state, 'already-owned')
    if (state.profile.coins < item.price) return fail(state, 'not-enough-coins')
    state.profile.coins -= item.price
    state.titles.owned.push(item.id)
    bump(state, 'purchases')
    addActivity(state, { kind: 'purchase', title: item.id, spentCoins: item.price })
    evaluateAchievements(state)
    return { ok: true, state: buildSnapshot(state) }
  }
  if (action === 'buy-gear') {
    const item = GEAR_BY_ID[String(payload?.id || '')]
    if (!item || !item.price) return fail(state, 'unknown-gear')
    if (state.gear.owned.includes(item.id)) return fail(state, 'already-owned')
    if (state.profile.coins < item.price) return fail(state, 'not-enough-coins')
    state.profile.coins -= item.price
    state.gear.owned.push(item.id)
    bump(state, 'purchases')
    addActivity(state, { kind: 'purchase-gear', gear: item.id, spentCoins: item.price })
    evaluateAchievements(state)
    return { ok: true, state: buildSnapshot(state) }
  }
  if (action === 'equip-gear') {
    const item = GEAR_BY_ID[String(payload?.id || '')]
    if (!item) return fail(state, 'unknown-gear')
    if (!state.gear.owned.includes(item.id)) return fail(state, 'not-owned')
    state.gear.equipped[item.slot] = item.id
    return { ok: true, state: buildSnapshot(state) }
  }
  if (action === 'enhance-gear') {
    const item = GEAR_BY_ID[String(payload?.id || '')]
    if (!item) return fail(state, 'unknown-gear')
    if (!state.gear.owned.includes(item.id)) return fail(state, 'not-owned')
    if (item.slot === 'frame') return fail(state, 'not-enhanceable')
    const level = Math.max(0, Number(state.gear.enhance?.[item.id] || 0))
    if (level >= ENHANCE_MAX) return fail(state, 'max-enhance')
    const cost = enhanceCost(level)
    if (state.profile.coins < cost) return fail(state, 'not-enough-coins')
    state.profile.coins -= cost
    state.gear.enhance[item.id] = level + 1
    addActivity(state, { kind: 'enhance', gear: item.id, level: level + 1, coins: cost })
    evaluateAchievements(state)
    return { ok: true, level: level + 1, state: buildSnapshot(state) }
  }
  if (action === 'ascend-gear') {
    const item = GEAR_BY_ID[String(payload?.id || '')]
    if (!item) return fail(state, 'unknown-gear')
    if (!state.gear.owned.includes(item.id)) return fail(state, 'not-owned')
    if (item.slot === 'frame') return fail(state, 'not-enhanceable')
    const tier = Math.max(0, Number(state.gear.ascend?.[item.id] || 0))
    if (tier >= ASCEND_MAX) return fail(state, 'max-ascend')
    const cost = ascendCost(tier)
    if (state.profile.coins < cost) return fail(state, 'not-enough-coins')
    state.profile.coins -= cost
    const rate = ascendRate(tier)
    const success = Math.random() < rate
    if (success) state.gear.ascend[item.id] = tier + 1
    addActivity(state, { kind: 'ascend', gear: item.id, tier: tier + (success ? 1 : 0), success })
    evaluateAchievements(state)
    return {
      ok: true,
      success,
      rate: Math.round(rate * 100),
      tier: tier + (success ? 1 : 0),
      cost,
      id: item.id,
      state: buildSnapshot(state),
    }
  }
  if (action === 'rebirth') {
    const level = levelForXp(state.profile.xp)
    if (level < MAX_LEVEL) return fail(state, 'not-at-peak')
    const stars = peakStars(state)
    if (stars >= PARAGON_MAX) return fail(state, 'peak-maxed')
    const lives = Math.max(0, Number(state.profile.rebirths) || 0) + 1
    state.profile.rebirths = lives
    state.profile.xp = 0
    const coins = 4000 + lives * 2000
    grantCoins(state, coins)
    const starCoins = grantStar(state, Math.min(PARAGON_MAX, lives))
    addChest(state, 'astral', 1 + Math.floor(lives / 3))
    const bonus = rebirthBonus(state)
    const title = `rebirth${Math.min(5, lives)}`
    if (!state.titles.owned.includes(title)) state.titles.owned.push(title)
    addActivity(state, { kind: 'rebirth', lives, coins })
    evaluateAchievements(state)
    return {
      ok: true,
      lives,
      stars: peakStars(state),
      coins: coins + starCoins,
      bonus,
      title,
      state: buildSnapshot(state),
    }
  }
  if (action === 'synthesize-gear') {
    // Fusion is per slot: five weapons make a weapon, five cores make a core.
    const requested = String(payload?.rarity || '')
    const slot = String(payload?.slot || '')
    if (!SYNTH_SLOTS.includes(slot)) return fail(state, 'unknown-slot')
    const item = GEAR_BY_ID[String(payload?.id || '')]
    const rarity = RARITY_LADDER.includes(requested) ? requested : (item?.rarity || '')
    const step = RARITY_LADDER.indexOf(rarity)
    if (step < 0) return fail(state, 'unknown-rarity')
    const nextRarity = RARITY_LADDER[step + 1]
    if (!nextRarity || nextRarity === 'transcendent') return fail(state, 'max-rarity')
    const pool = GEAR_CATALOG.filter(entry => entry.rarity === nextRarity && entry.slot === slot)
    if (!pool.length) return fail(state, 'no-target')
    const entries = state.gear.owned
      .filter(id => GEAR_BY_ID[id] && GEAR_BY_ID[id].rarity === rarity && GEAR_BY_ID[id].slot === slot)
      .map(id => ({
        id,
        count: Math.max(1, Number(state.gear.count?.[id]) || 1),
        power: GEAR_BY_ID[id].power || 0,
      }))
    const total = entries.reduce((sum, entry) => sum + entry.count, 0)
    if (total < SYNTH_COPIES) return fail(state, 'not-enough-copies')
    // Spare copies go first, then the weakest uniques, so a fusion never eats
    // the piece you are actually wearing if a duplicate is available.
    entries.sort((left, right) => (right.count - left.count)
      || (left.power - right.power)
      || left.id.localeCompare(right.id))
    if (!state.gear.count || typeof state.gear.count !== 'object') state.gear.count = {}
    let need = SYNTH_COPIES
    let refund = 0
    const consumed = []
    for (const entry of entries) {
      if (need <= 0) break
      const take = Math.min(need, entry.count)
      entry.count -= take
      need -= take
      consumed.push(entry.id)
      if (entry.count > 0) {
        state.gear.count[entry.id] = entry.count
        continue
      }
      const slot = GEAR_BY_ID[entry.id].slot
      state.gear.owned = state.gear.owned.filter(id => id !== entry.id)
      delete state.gear.count[entry.id]
      const level = Number(state.gear.enhance[entry.id] || 0)
      for (let index = 0; index < level; index += 1) refund += enhanceCost(index)
      const tier = Number(state.gear.ascend[entry.id] || 0)
      for (let index = 0; index < tier; index += 1) refund += ascendCost(index)
      delete state.gear.enhance[entry.id]
      delete state.gear.ascend[entry.id]
      if (state.gear.equipped[slot] === entry.id) state.gear.equipped[slot] = DEFAULT_EQUIPPED[slot]
    }
    if (refund > 0) grantCoins(state, refund)
    const target = pool[Math.floor(Math.random() * pool.length)]
    grantGear(state, target.id, 'synthesis')
    addActivity(state, { kind: 'synthesis', from: consumed[0] || null, gear: target.id, refund })
    evaluateAchievements(state)
    return { ok: true, gained: target.id, refund, consumed, state: buildSnapshot(state) }
  }
  if (action === 'claim-red-gear') {
    const points = achievementPoints(state)
    if (points.available < RED_GEAR_COST) return fail(state, 'not-enough-points')
    const next = RED_GEAR_IDS.find(id => !state.gear.owned.includes(id))
    if (!next) return fail(state, 'all-owned')
    state.achievementsSpent = points.spent + RED_GEAR_COST
    grantGear(state, next, 'achievements')
    addActivity(state, { kind: 'purchase-gear', gear: next, spentPoints: RED_GEAR_COST })
    evaluateAchievements(state)
    return { ok: true, gear: next, state: buildSnapshot(state) }
  }
  if (action === 'equip-title') {
    const id = String(payload?.id || '')
    if (!state.titles.owned.includes(id)) return fail(state, 'not-owned')
    state.profile.equippedTitle = id
    return { ok: true, state: buildSnapshot(state) }
  }
  if (action === 'claim-challenge') {
    const period = payload?.period === 'weekly' ? 'weekly' : 'daily'
    const result = claimChallenge(state, period, String(payload?.id || ''))
    if (!result.ok) return fail(state, result.error)
    evaluateAchievements(state)
    return {
      ok: true,
      reward: { xp: result.xp, coins: result.coins },
      state: buildSnapshot(state),
    }
  }
  if (action === 'claim-boss' || action === 'claim-daily-boss' || action === 'claim-season-boss') {
    const kind = action === 'claim-daily-boss' ? 'daily' : action === 'claim-season-boss' ? 'season' : 'weekly'
    const result = claimBoss(state, kind)
    if (!result.ok) return fail(state, result.error)
    return {
      ok: true,
      reward: { xp: result.xp, coins: result.coins, chest: result.chest, frame: result.frame, gear: result.gear },
      state: buildSnapshot(state),
    }
  }
  if (action === 'claim-season-tier') {
    const result = claimSeasonTier(state, String(payload?.id || ''))
    if (!result.ok) return fail(state, result.error)
    return {
      ok: true,
      reward: { xp: result.xp, coins: result.coins, chest: result.chest, frame: result.frame, gear: result.gear },
      state: buildSnapshot(state),
    }
  }
  if (action === 'claim-all') {
    let xp = 0
    let coins = 0
    let count = 0
    for (const period of ['daily', 'weekly']) {
      const season = period === 'daily' ? state.daily : state.weekly
      for (const id of season.challengeIds) {
        const result = claimChallenge(state, period, id)
        if (result.ok) {
          xp += result.xp
          coins += result.coins
          count += 1
        }
      }
    }
    for (const kind of ['daily', 'weekly', 'season']) {
      const boss = kind === 'daily' ? state.dailyBoss : kind === 'season' ? state.seasonBoss : state.boss
      if (boss.defeated && !boss.claimed) {
        const result = claimBoss(state, kind)
        if (result.ok) {
          xp += result.xp
          coins += result.coins
          count += 1
        }
      }
    }
    for (const tier of SEASON_TIERS) {
      if (state.season.renown >= tier.target && !state.season.claimed.includes(tier.id)) {
        const result = claimSeasonTier(state, tier.id)
        if (result.ok) {
          xp += result.xp
          coins += result.coins
          count += 1
        }
      }
    }
    if (!count) return fail(state, 'nothing-to-claim')
    evaluateAchievements(state)
    return {
      ok: true,
      reward: { xp, coins, count },
      state: buildSnapshot(state),
    }
  }
  return fail(state, 'unknown-action')
}

function sendJson(response, status, body) {
  if (response.headersSent) return
  const text = JSON.stringify(body)
  response.statusCode = status
  response.setHeader('content-type', 'application/json; charset=utf-8')
  response.setHeader('cache-control', 'no-store')
  response.setHeader('x-content-type-options', 'nosniff')
  response.end(text)
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    request.on('data', chunk => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(Object.assign(new Error('body-too-large'), { code: 'body-too-large' }))
        request.destroy()
        return
      }
      chunks.push(chunk)
    })
    request.on('end', () => {
      if (!chunks.length) return resolve({})
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch {
        reject(Object.assign(new Error('invalid-json'), { code: 'invalid-json' }))
      }
    })
    request.on('error', reject)
  })
}

export async function apply(ctx) {
  const state = await loadState()
  let disposed = false
  let saveTimer = null
  let writeChain = Promise.resolve()
  const stateDir = stateDirectory()
  const stateFile = path.join(stateDir, 'state.json')

  const saveNow = () => {
    state.updatedAt = Date.now()
    const text = JSON.stringify(state)
    writeChain = writeChain.then(async () => {
      await mkdir(stateDir, { recursive: true })
      const temporary = path.join(stateDir, `state.json.${process.pid}.tmp`)
      await writeFile(temporary, text, 'utf8')
      try {
        await rename(temporary, stateFile)
      } catch {
        await rm(stateFile, { force: true }).catch(() => {})
        await rename(temporary, stateFile)
      }
    }).catch(error => {
      console.warn('[devquest] could not persist state:', error?.message || error)
    })
    return writeChain
  }

  const saveSoon = () => {
    if (disposed) return
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      saveTimer = null
      void saveNow()
    }, 250)
    saveTimer.unref?.()
  }

  const commit = () => {
    ensurePeriods(state)
    evaluateAchievements(state)
    saveSoon()
  }

  const handleSessionEvent = (session, event) => {
    try {
      if (!session?.id || !event) return
      ensurePeriods(state)
      markActiveDay(state)
      const id = String(session.id)
      const cursor = Number(state.cursors[id] || 0)
      if (Number(event.seq) <= cursor) return
      state.cursors[id] = Number(event.seq)
      if (event.type === 'tool/call') {
        const name = String(event.data?.name || 'tool')
        const args = parseArguments(event.data?.arguments)
        const todos = Array.isArray(args.todos)
          ? args.todos.slice(0, 80).map(item => ({
            status: String(item?.status || ''),
            text: String(item?.content ?? item?.text ?? '').replace(/\s+/g, ' ').trim().slice(0, 90),
          }))
          : null
        touchSession(state, session)
        state.sessions[id].pending = state.sessions[id].pending || {}
        state.sessions[id].pending[String(event.data?.callId)] = {
          name,
          target: toolTarget(name, args),
          lines: countWrittenLines(name, args),
          todos,
        }
        saveSoon()
        return
      }
      if (event.type === 'tool/result') {
        handleToolResult(state, session, event)
        commit()
        saveSoon()
        return
      }
      if (event.type === 'turn/end') {
        if (event.data?.reason?.kind === 'completed') {
          bump(state, 'turns')
          bumpChallengeSeason(state, 'turns')
          const xp = awardXp(state, 18)
          touchSession(state, session, { xp, turn: true })
          addActivity(state, { kind: 'turn', turn: event.data.turn, xp })
          damageAllBosses(state, 35)
          evaluateAchievements(state)
        }
        saveSoon()
        return
      }
      if (event.type === 'assistant/message') {
        const usage = event.data?.usage
        if (usage) {
          const tokens = Number(usage.totalTokens || (Number(usage.inputTokens || 0) + Number(usage.outputTokens || 0)))
          if (tokens > 0) bump(state, 'tokens', tokens)
        }
        saveSoon()
        return
      }
      if (event.type === 'user/message') {
        touchSession(state, session)
        saveSoon()
        return
      }
      saveSoon()
    } catch (error) {
      console.warn('[devquest] event projection failed:', error?.message || error)
    }
  }

  const handleWorkflowEnd = (info, result) => {
    try {
      if (result?.stopReason !== 'completed') return
      ensurePeriods(state)
      markActiveDay(state)
      bump(state, 'workflows')
      bumpChallengeSeason(state, 'workflows')
      const xp = awardXp(state, 70)
      addActivity(state, {
        kind: 'workflow',
        name: String(info?.meta?.name || 'workflow').slice(0, 48),
        agents: Number(result.agentsStarted || 0),
        xp,
      })
      damageAllBosses(state, 120)
      commit()
    } catch (error) {
      console.warn('[devquest] workflow projection failed:', error?.message || error)
    }
  }

  const handleSubagentEnd = info => {
    try {
      if (info?.stopReason !== 'completed') return
      ensurePeriods(state)
      markActiveDay(state)
      bump(state, 'subagents')
      bumpChallengeSeason(state, 'subagents')
      const xp = awardXp(state, 30)
      addActivity(state, {
        kind: 'subagent',
        provider: String(info?.provider || 'subagent').slice(0, 32),
        xp,
      })
      damageAllBosses(state, 60)
      commit()
    } catch (error) {
      console.warn('[devquest] subagent projection failed:', error?.message || error)
    }
  }

  const handler = async (request, response) => {
    try {
      const assetName = new URL(request.url || '/', 'http://localhost').searchParams.get('asset')
      if (assetName) {
        const asset = ASSETS[assetName]
        if (!asset) return sendJson(response, 404, { ok: false, error: 'unknown-asset' })
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          return sendJson(response, 405, { ok: false, error: 'method-not-allowed' })
        }
        const bytes = await readFile(path.join(ASSET_DIR, asset.file))
        response.writeHead(200, {
          'content-type': asset.type,
          'content-length': bytes.length,
          'cache-control': 'public, max-age=3600',
        })
        response.end(request.method === 'HEAD' ? undefined : bytes)
        return
      }
      if (request.method === 'GET' || request.method === 'HEAD') {
        return sendJson(response, 200, buildSnapshot(state))
      }
      if (request.method !== 'POST') {
        return sendJson(response, 405, { ok: false, error: 'method-not-allowed' })
      }
      const payload = await readJsonBody(request)
      const result = applyAction(state, payload)
      if (result.ok) saveSoon()
      return sendJson(response, 200, result)
    } catch (error) {
      const code = error?.code === 'body-too-large' ? 'body-too-large' : error?.code === 'invalid-json' ? 'invalid-json' : 'server-error'
      return sendJson(response, code === 'server-error' ? 500 : 400, { ok: false, error: code })
    }
  }

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: API_PATH,
    handler,
  }), 'devquest: HTTP API')

  ctx.on('session/event', handleSessionEvent)
  ctx.on('workflow/end', handleWorkflowEnd)
  ctx.on('subagent/end', handleSubagentEnd)

  ctx.effect(() => {
    return () => {
      disposed = true
      if (saveTimer) clearTimeout(saveTimer)
      saveTimer = null
      void saveNow()
    }
  }, 'devquest: persistence')

  ensurePeriods(state)
  evaluateAchievements(state)
  saveSoon()
}

function handleToolResult(state, session, event) {
  const id = String(session.id)
  const callId = String(event.data?.message?.toolCallId || '')
  const entry = state.sessions[id]
  const call = entry?.pending?.[callId] || null
  if (entry?.pending) delete entry.pending[callId]
  const name = String(call?.name || 'tool')
  const isError = Boolean(event.data?.error || event.data?.message?.isError)
  touchSession(state, session, { tool: !isError })
  noteToolName(state, name)
  if (!isError) {
    bump(state, 'tools')
    bumpChallengeSeason(state, 'tools')
  }
  const hour = new Date().getHours()
  if (hour < 5) bump(state, 'nightWork')
  else if (hour < 8) bump(state, 'dawnWork')

  if (isError) {
    bump(state, 'toolErrors')
    if (entry) entry.lastToolFailed = true
    addActivity(state, {
      kind: 'tool-error',
      tool: name,
      xp: 0,
    })
    return
  }

  if (entry?.lastToolFailed) {
    bump(state, 'recoveries')
    entry.lastToolFailed = false
  }

  let xp = 6
  const lines = Math.max(0, Number(call?.lines) || 0)
  if (lines > 0) {
    noteWrittenLines(state, lines)
    xp += Math.min(40, Math.ceil(lines / 20))
  }
  const target = String(call?.target || '')
  if (TOOL_WRITE.has(name)) {
    bump(state, 'writes')
    bumpChallengeSeason(state, 'writes')
    xp += 4
  } else if (TOOL_READ.has(name)) {
    bump(state, 'reads')
    bumpChallengeSeason(state, 'reads')
  } else if (TOOL_SEARCH.has(name)) {
    bump(state, 'searches')
    bumpChallengeSeason(state, 'searches')
    xp += 2
  } else if (TOOL_SHELL.has(name)) {
    bump(state, 'shellRuns')
    xp += 2
  } else if (TOOL_ORCHESTRATE.has(name)) {
    bump(state, 'orchestrations')
    bumpChallengeSeason(state, 'orchestrations')
  }

  const todos = Array.isArray(call?.todos) ? call.todos : null
  if (name === 'todo_write' && todos && todos.length) {
    // Older saves stored plain status strings; accept both shapes.
    const entries = todos.map(item => (typeof item === 'string'
      ? { status: item, text: '' }
      : { status: String(item?.status || ''), text: String(item?.text || '') }))
    const allDone = entries.every(item => item.status === 'completed')
    const signature = hash32(entries.map(item => `${item.status}\u0001${item.text}`).join('\u0002'))
    const previous = entry && entry.todoState && typeof entry.todoState === 'object'
      ? entry.todoState
      : null
    // A fresh list that arrives already finished still counts; re-sending the
    // same finished list does not. The old boolean latch stalled forever after
    // one completed list, which is what froze the "清空清单" quest.
    const fresh = !previous || !previous.allDone || previous.signature !== signature
    if (allDone && fresh) {
      bump(state, 'todos')
      bumpChallengeSeason(state, 'todos')
      xp += 24
      addActivity(state, { kind: 'todo', count: entries.length, xp: 0 })
      damageAllBosses(state, 55)
    }
    if (entry) entry.todoState = { signature, allDone }
  }

  const awarded = awardXp(state, xp)
  touchSession(state, session, { xp: awarded })
  addActivity(state, {
    kind: 'tool',
    tool: name,
    target,
    lines,
    xp: awarded,
  })
  damageAllBosses(state, TOOL_WRITE.has(name) ? 14 : 10)
}

async function loadState() {
  const directory = stateDirectory()
  const file = path.join(directory, 'state.json')
  try {
    const text = await readFile(file, 'utf8')
    return normalizeState(JSON.parse(text))
  } catch (error) {
    if (error?.code === 'ENOENT') {
      const migrated = await migrateLegacyState(file)
      if (migrated) return migrated
    } else {
      console.warn('[devquest] could not read state, starting fresh:', error?.message || error)
    }
    return normalizeState(createState())
  }
}

async function migrateLegacyState(localFile) {
  const legacyFile = path.join(legacyStateDirectory(), 'state.json')
  try {
    const text = await readFile(legacyFile, 'utf8')
    const state = normalizeState(JSON.parse(text))
    await mkdir(path.dirname(localFile), { recursive: true })
    await writeFile(localFile, JSON.stringify(state), 'utf8')
    await rm(legacyFile, { force: true })
    console.info('[devquest] moved progress state into the plugin directory')
    return state
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      console.warn('[devquest] could not migrate the legacy state:', error?.message || error)
    }
    return null
  }
}

function stateDirectory() {
  // Keep progress with the plugin so moving the package moves the save file too.
  // HMR ignores a `data` directory by default, so writes do not look like code changes.
  return path.join(PACKAGE_DIR, 'data')
}

function legacyStateDirectory() {
  const home = process.env.DSH_HOME || path.join(os.homedir(), '.dsh')
  return path.join(home, 'devquest')
}
