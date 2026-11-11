window.__ModuleLoader__.load({
  id: '@local/dsh-devquest',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const API = '/devquest/api'
    const RARITY_ORDER = { common: 0, rare: 1, epic: 2, legendary: 3, mythic: 4, red: 5, ancient: 6, divine: 7, transcendent: 8 }
    const TABS = [
      { id: 'overview', glyph: '◇' },
      { id: 'quests', glyph: '⚑' },
      { id: 'gear', glyph: '⚒' },
      { id: 'bosses', glyph: '♛' },
      { id: 'achievements', glyph: '✦' },
      { id: 'shop', glyph: '◈' },
      { id: 'chronicle', glyph: '≡' },
    ]

    const ACHIEVEMENT_META = [
      { id: 'arrival', rarity: 'common', glyph: '✦' },
      { id: 'first-turn', rarity: 'common', glyph: '➤' },
      { id: 'first-tool', rarity: 'common', glyph: '⚔' },
      { id: 'first-chest', rarity: 'common', glyph: '▣' },
      { id: 'reader', rarity: 'common', glyph: '❖' },
      { id: 'explorer', rarity: 'common', glyph: '◇' },
      { id: 'streak-3', rarity: 'common', glyph: '▲' },
      { id: 'dawn', rarity: 'common', glyph: '☀' },
      { id: 'level-5', rarity: 'common', glyph: '✧' },
      { id: 'scribe', rarity: 'rare', glyph: '✎' },
      { id: 'line-1000', rarity: 'rare', glyph: '⌁' },
      { id: 'polyglot', rarity: 'rare', glyph: '⌘' },
      { id: 'quest-clear', rarity: 'rare', glyph: '✓' },
      { id: 'delegator', rarity: 'rare', glyph: '♟' },
      { id: 'streak-7', rarity: 'rare', glyph: '△' },
      { id: 'night-owl', rarity: 'rare', glyph: '☾' },
      { id: 'phoenix', rarity: 'rare', glyph: '✹' },
      { id: 'level-10', rarity: 'rare', glyph: '★' },
      { id: 'rich', rarity: 'rare', glyph: '◈' },
      { id: 'collector', rarity: 'rare', glyph: '▣' },
      { id: 'lucky-star', rarity: 'rare', glyph: '✶' },
      { id: 'webwalker', rarity: 'rare', glyph: '⌁' },
      { id: 'tinker', rarity: 'rare', glyph: '⌨' },
      { id: 'shopaholic', rarity: 'rare', glyph: '◫' },
      { id: 'daily-slayer', rarity: 'rare', glyph: '☀' },
      { id: 'centurion', rarity: 'epic', glyph: '♜' },
      { id: 'quest-master', rarity: 'epic', glyph: '☑' },
      { id: 'director', rarity: 'epic', glyph: '⌬' },
      { id: 'line-5000', rarity: 'epic', glyph: '∞' },
      { id: 'gear-power', rarity: 'epic', glyph: '⚒' },
      { id: 'level-20', rarity: 'epic', glyph: '✵' },
      { id: 'marathon', rarity: 'epic', glyph: '∞' },
      { id: 'season-one', rarity: 'epic', glyph: '❂' },
      { id: 'boss-slayer', rarity: 'legendary', glyph: '♛' },
      { id: 'season-slayer', rarity: 'legendary', glyph: '❂' },
      { id: 'level-30', rarity: 'legendary', glyph: '✺' },
      { id: 'boss-veteran', rarity: 'legendary', glyph: '⚑' },
      { id: 'tool-250', rarity: 'rare', glyph: '⚔' },
      { id: 'tool-500', rarity: 'epic', glyph: '⚔' },
      { id: 'line-10000', rarity: 'legendary', glyph: '∞' },
      { id: 'turn-100', rarity: 'epic', glyph: '➤' },
      { id: 'gear-10', rarity: 'rare', glyph: '⚒' },
      { id: 'gear-25', rarity: 'epic', glyph: '⚒' },
      { id: 'gear-40', rarity: 'legendary', glyph: '▣' },
      { id: 'mythic-gear', rarity: 'mythic', glyph: '✺' },
      { id: 'boss-10', rarity: 'epic', glyph: '♛' },
      { id: 'boss-25', rarity: 'legendary', glyph: '♛' },
      { id: 'rank-gold', rarity: 'rare', glyph: '✦' },
      { id: 'rank-legend', rarity: 'legendary', glyph: '✵' },
      { id: 'streak-14', rarity: 'epic', glyph: '▲' },
      { id: 'level-40', rarity: 'legendary', glyph: '✺' },
      { id: 'level-60', rarity: 'legendary', glyph: '✷' },
      { id: 'paragon-1', rarity: 'mythic', glyph: '★' },
      { id: 'paragon-5', rarity: 'mythic', glyph: '★' },
      { id: 'red-gear', rarity: 'red', glyph: '♦' },
      { id: 'red-set', rarity: 'red', glyph: '♦' },
      { id: 'enhance-10', rarity: 'mythic', glyph: '⚡' },
      { id: 'enhance-30', rarity: 'epic', glyph: '⚡' },
      { id: 'enhance-60', rarity: 'legendary', glyph: '⚡' },
      { id: 'ascend-1', rarity: 'rare', glyph: '✦' },
      { id: 'ascend-5', rarity: 'legendary', glyph: '✦' },
      { id: 'story-10', rarity: 'epic', glyph: '⚔' },
      { id: 'story-25', rarity: 'legendary', glyph: '⚔' },
      { id: 'story-50', rarity: 'red', glyph: '♛' },
      { id: 'points-100', rarity: 'epic', glyph: '◈' },
      { id: 'points-200', rarity: 'legendary', glyph: '◈' },
      { id: 'boss-weapon', rarity: 'legendary', glyph: '♦' },
      { id: 'gear-400', rarity: 'epic', glyph: '⚒' },
      { id: 'gear-800', rarity: 'legendary', glyph: '⚒' },
      { id: 'paragon-10', rarity: 'red', glyph: '★' },
      { id: 'level-50', rarity: 'legendary', glyph: '✷' },
      { id: 'titles-12', rarity: 'epic', glyph: '◈' },
      { id: 'coins-20000', rarity: 'legendary', glyph: '◈' },
      { id: 'tools-1000', rarity: 'legendary', glyph: '⚔' },
      { id: 'titles-8', rarity: 'epic', glyph: '◈' },
      { id: 'coins-5000', rarity: 'epic', glyph: '◈' },
    ]

    const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENT_META.map(item => [item.id, item]))

    const TITLE_META = {
      novice: { rarity: 'common', glyph: '✧' },
      wanderer: { rarity: 'common', glyph: '⌁' },
      starfarer: { rarity: 'rare', glyph: '✶' },
      bughunter: { rarity: 'rare', glyph: '⌖' },
      nightforge: { rarity: 'rare', glyph: '☾' },
      architect: { rarity: 'epic', glyph: '⌬' },
      orchestrator: { rarity: 'epic', glyph: '♬' },
      seasonchamp: { rarity: 'legendary', glyph: '♛' },
      evergreen: { rarity: 'epic', glyph: '❧' },
      mythweaver: { rarity: 'mythic', glyph: '✺' },
      bossbane: { rarity: 'legendary', glyph: '⚔' },
      legend: { rarity: 'legendary', glyph: '✺' },
      curator: { rarity: 'epic', glyph: '▣' },
      lucky: { rarity: 'rare', glyph: '✶' },
    }

    const BOSS_META = {
      ashen: { glyph: '▲' },
      echo: { glyph: '◎' },
      maw: { glyph: '◉' },
      deadline: { glyph: '⌛' },
      cinder: { glyph: '♨' },
      glitch: { glyph: '▦' },
      quill: { glyph: '✒' },
      sovereign: { glyph: '♛' },
      leviathan: { glyph: '≋' },
      oracle: { glyph: '◉' },
      static: { glyph: '⌁' },
      cache: { glyph: '▦' },
      null: { glyph: '∅' },
      regression: { glyph: '⟲' },
      dependency: { glyph: '⌘' },
      deadlock: { glyph: '⊗' },
      entropy: { glyph: '☄' },
      mirror: { glyph: '◈' },
      shadow: { glyph: '◐' },
      deadcode: { glyph: '⌫' },
      lint: { glyph: '⌗' },
      legacy: { glyph: '⛨' },
      outage: { glyph: '⚡' },
      voidking: { glyph: '♚' },
    }

    const GEAR_SLOT_META = {
      weapon: { glyph: '⚔' },
      armor: { glyph: '⛨' },
      charm: { glyph: '✦' },
      frame: { glyph: '▣' },
    }

    const CHEST_META = {
      wood: { glyph: '▤' },
      iron: { glyph: '▥' },
      gold: { glyph: '▦' },
      astral: { glyph: '✶' },
    }

    const CHEST_SHOP_RARITY = { wood: 'common', iron: 'rare', gold: 'legendary', astral: 'epic' }

    const SEASON_THEME_META = {
      ember: { glyph: '♨' },
      tide: { glyph: '≋' },
      astral: { glyph: '✶' },
      verdant: { glyph: '❧' },
    }

    const CLASS_META = {
      novice: { glyph: '✧' },
      ranger: { glyph: '➶' },
      artificer: { glyph: '⚒' },
      scholar: { glyph: '❖' },
      commander: { glyph: '♜' },
      debugger: { glyph: '⌁' },
    }

    const CLASS_PATH_ORDER = ['ranger', 'artificer', 'scholar', 'commander', 'debugger']
    const CHALLENGE_GLYPHS = {
      tools: '⚔',
      turns: '➤',
      writes: '✎',
      lines: '⌁',
      reads: '❖',
      todos: '✓',
      search: '⌁',
      distinct: '◇',
      xp: '✦',
      subagents: '♟',
    }

    // Pixel sprites are drawn as one string per row: every character is one
    // square, and the palette decides which squares are painted. Rows must all
    // be the same length; `node --check` keeps the syntax honest and the art
    // stays editable as plain text.
    // Parametric pixel figure: a skeleton plus equipment numbers is turned into
    // a grid, then shaded and outlined automatically, so proportions never drift
    // and a new item is a data row instead of a new drawing.
    const FIGURE = { width: 56, height: 72 }

    const CUTS = {
      coat: { shoulder: 28, waist: 20, hem: 0, skirt: false, trim: false, cape: false },
      plate: { shoulder: 34, waist: 24, hem: 0, skirt: false, trim: true, cape: true },
      robe: { shoulder: 28, waist: 20, hem: 34, skirt: true, trim: true, cape: true },
    }

    const WEAPONS = {
      dagger: { bladeTop: 32, bladeBottom: 43, bladeW: 2, guardW: 7 },
      spear: { bladeTop: 8, bladeBottom: 43, bladeW: 2, guardW: 7 },
      greatsword: { bladeTop: 11, bladeBottom: 43, bladeW: 4, guardW: 9 },
      wrench: { bladeTop: 24, bladeBottom: 41, bladeW: 5, guardW: 7, wrench: true },
      bow: { bladeTop: 16, bladeBottom: 58, bladeW: 2, guardW: 5, bow: true },
    }
    
    const SHADE = { m: 'M', h: 'H', s: 'S', b: 'b' }
    
    function blankGrid() {
      return Array.from({ length: FIGURE.height }, () => Array(FIGURE.width).fill('.'))
    }
    
    function setCell(grid, x, y, ch) {
      if (y < 0 || y >= FIGURE.height || x < 0 || x >= FIGURE.width) return
      grid[y][x] = ch
    }
    
    function fillRect(grid, x0, y0, x1, y1, ch) {
      for (let y = Math.max(0, y0); y <= Math.min(FIGURE.height - 1, y1); y += 1) {
        for (let x = Math.max(0, x0); x <= Math.min(FIGURE.width - 1, x1); x += 1) grid[y][x] = ch
      }
    }
    
    function fillEllipse(grid, cx, cy, rx, ry, ch) {
      for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
        for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
          const dx = (x - cx) / (rx + 0.35)
          const dy = (y - cy) / (ry + 0.35)
          if (dx * dx + dy * dy <= 1) setCell(grid, x, y, ch)
        }
      }
    }
    
    function fillTrapezoid(grid, top, bottom, topW, bottomW, cx, ch) {
      const span = Math.max(1, bottom - top)
      for (let y = top; y <= bottom; y += 1) {
        const t = (y - top) / span
        const w = Math.max(2, Math.round(topW + (bottomW - topW) * t))
        const x0 = Math.round(cx - (w - 1) / 2)
        fillRect(grid, x0, y, x0 + w - 1, y, ch)
      }
    }
    
    function shadeEdges(grid) {
      for (let y = 0; y < FIGURE.height; y += 1) {
        for (let x = FIGURE.width - 1; x >= 0; x -= 1) {
          const ch = grid[y][x]
          const shade = SHADE[ch]
          if (!shade) continue
          const right = x + 1 < FIGURE.width ? grid[y][x + 1] : '.'
          if (right === '.') grid[y][x] = shade
        }
      }
    }
    
    function addOutline(grid) {
      const marks = []
      for (let y = 0; y < FIGURE.height; y += 1) {
        for (let x = 0; x < FIGURE.width; x += 1) {
          if (grid[y][x] !== '.') continue
          const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
            const ny = y + dy
            const nx = x + dx
            return ny >= 0 && ny < FIGURE.height && nx >= 0 && nx < FIGURE.width && grid[ny][nx] !== '.'
          })
          if (near) marks.push([x, y])
        }
      }
      for (const [x, y] of marks) grid[y][x] = 'o'
    }
    
    function drawWeapon(grid, shapeName, handX, handY) {
      const weapon = WEAPONS[shapeName] || WEAPONS.greatsword
      if (!weapon) return
      const left = handX - Math.floor(weapon.guardW / 2)
      if (weapon.bow) {
        const top = weapon.bladeTop
        const bottom = weapon.bladeBottom
        const mid = Math.round((top + bottom) / 2)
        for (let y = top; y <= bottom; y += 1) {
          const t = Math.abs(y - mid) / ((bottom - top) / 2)
          const x = left + Math.round(t * 2)
          setCell(grid, x, y, '4')
          setCell(grid, x + 2, y, '2')
        }
        return
      }
      if (weapon.wrench) {
        fillRect(grid, left, weapon.bladeTop, left + 2, weapon.bladeTop + 1, '4')
        fillRect(grid, left, weapon.bladeTop + 2, left, weapon.bladeTop + 4, '4')
        fillRect(grid, left + 2, weapon.bladeTop + 2, left + 2, weapon.bladeTop + 4, '4')
        fillRect(grid, left + 1, weapon.bladeTop + 5, left + 1, handY - 1, '3')
        return
      }
      const bladeLeft = handX + 1
      fillRect(grid, bladeLeft, weapon.bladeTop, bladeLeft + weapon.bladeW - 1, weapon.bladeBottom, '1')
      fillRect(grid, handX - Math.floor(weapon.guardW / 2), handY, handX + Math.ceil(weapon.guardW / 2), handY, '4')
      fillRect(grid, handX, handY + 1, handX, handY + 3, '3')
      fillRect(grid, handX, handY + 4, handX, handY + 4, '4')
    }
    
    function renderFigure(look = {}) {
      const cut = CUTS[look.cut] || CUTS.coat
      const g = blankGrid()
      const cx = 28
      const handX = cx + 12
      const handY = 46

      // Cloak first: it sits behind the body and only shows as a flare.
      if (cut.cape) fillTrapezoid(g, 25, 52, cut.shoulder - 3, cut.waist + 2, cx, 'C')

      // legs and boots
      fillRect(g, cx - 8, 53, cx - 2, 65, 'b')
      fillRect(g, cx + 2, 53, cx + 8, 65, 'b')
      fillRect(g, cx - 9, 66, cx - 2, 69, 'B')
      fillRect(g, cx + 2, 66, cx + 9, 69, 'B')
      fillRect(g, cx - 9, 69, cx - 2, 69, 'b')
      fillRect(g, cx + 2, 69, cx + 9, 69, 'b')

      // torso: narrow at the collar, widest at the chest, tapering to the waist
      fillTrapezoid(g, 24, 32, Math.max(12, cut.shoulder - 6), cut.shoulder, cx, 'm')
      fillTrapezoid(g, 33, 49, cut.shoulder, cut.waist, cx, 'm')
      if (cut.skirt) fillTrapezoid(g, 50, 60, cut.waist, cut.hem, cx, 'm')
      if (cut.trim) fillRect(g, cx - 4, 35, cx + 4, 37, 'g')

      // collar line and a single fabric fold
      fillRect(g, cx - 5, 24, cx + 5, 24, 'M')
      fillRect(g, cx - 5, 27, cx - 5, 48, 'M')

      // belt with a buckle
      const waistHalf = Math.max(4, Math.floor(cut.waist / 2) - 2)
      fillRect(g, cx - waistHalf, 50, cx + waistHalf, 52, 'g')
      fillRect(g, cx - 2, 50, cx + 2, 52, 'G')

      // hands at the sleeve ends
      fillRect(g, cx - 12, 46, cx - 9, 50, 's')
      fillRect(g, cx + 9, 46, cx + 12, 50, 's')

      // neck before the head so the collar sits under the chin
      fillRect(g, cx - 1, 19, cx + 2, 24, 's')

      // head: hair blob, then a face with brows, eyes, nose and mouth
      fillEllipse(g, cx, 13, 7, 7, 'h')
      fillRect(g, cx - 4, 11, cx + 4, 20, 's')
      // sideburns
      fillRect(g, cx - 5, 13, cx - 5, 17, 'h')
      fillRect(g, cx + 5, 13, cx + 5, 17, 'h')
      // brows
      fillRect(g, cx - 3, 13, cx - 1, 13, 'h')
      fillRect(g, cx + 1, 13, cx + 3, 13, 'h')
      // eyes
      fillRect(g, cx - 3, 15, cx - 2, 15, 'e')
      fillRect(g, cx + 2, 15, cx + 3, 15, 'e')
      // nose and mouth
      setCell(g, cx, 17, 'S')
      fillRect(g, cx - 1, 19, cx + 1, 19, 'e')
      // rim light down the left edge of the hood
      for (let y = 9; y <= 18; y += 1) {
        const row = g[y] || []
        const first = row.findIndex(ch => ch !== '.')
        if (first >= 0 && row[first] === 'h') row[first] = 'w'
      }

      // weapon at the right hand
      drawWeapon(g, look.weapon, handX, handY)

      // charm gem on the chest
      if (look.charm) fillRect(g, cx - 1, 42, cx, 43, '5')

      shadeEdges(g)
      addOutline(g)
      return g.map(row => row.join(''))
    }

    function mixColor(color, factor) {
      const hex = String(color || '').replace('#', '')
      if (hex.length !== 6) return color
      const channel = index => {
        const value = Math.round(parseInt(hex.slice(index, index + 2), 16) * factor)
        return Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0")
      }
      return `#${channel(0)}${channel(2)}${channel(4)}`
    }

    const ARMOR_LOOK = {
      'a.novice': { hood: '#5a4632', chest: '#b9a88f', shade: '#8a7a63', boot: '#2b2438' },
      'a.scribe': { hood: '#463a78', chest: '#8f7fd6', shade: '#5f4fa0', boot: '#2b2438' },
      'a.terminal': { hood: '#1d4a46', chest: '#3fa39a', shade: '#25706b', boot: '#162b2a' },
      'a.night': { hood: '#232a44', chest: '#4d5f95', shade: '#333d63', boot: '#151a2b' },
      'a.season': { hood: '#8a6329', chest: '#e8c15c', shade: '#b08a2e', boot: '#3a2a12' },
      'a.bulwark': { hood: '#3a4256', chest: '#8fa3c4', shade: '#5f7292', boot: '#232a38' },
      'a.wyrm': { hood: '#4a2a2a', chest: '#b8625a', shade: '#7d3f3a', boot: '#2a1717' },
      'a.starweave': { hood: '#2a2f5e', chest: '#a7b4ff', shade: '#6a78c8', boot: '#1a1d3a' },
      'a.eclipse': { hood: '#2a1530', chest: '#e07ac0', shade: '#8f3f76', boot: '#1a0d1a' },
      'a.aegis': { hood: '#2a3346', chest: '#9fb3d0', shade: '#6b7a92', boot: '#1a2030' },
      'a.phoenix': { hood: '#5a2a1e', chest: '#ff9a5c', shade: '#b85f2e', boot: '#2a1410' },
      'a.genesis': { hood: '#3a2a4a', chest: '#e8d8b0', shade: '#a89060', boot: '#221a2a' },
      'a.bastion': { hood: '#2a3a3a', chest: '#8fb0a8', shade: '#5a7a72', boot: '#16201e' },
      'a.abyss': { hood: '#141024', chest: '#6a5aa8', shade: '#3a2f66', boot: '#0c0a16' },
      'a.aurora': { hood: '#1c5a70', chest: '#7cf0ff', shade: '#3f8fbf', boot: '#0e2233' },
      'a.crimson': { hood: '#3a1015', chest: '#d63a3a', shade: '#8a1f26', boot: '#1a080b' },
    }

    const CHARM_LOOK = {
      'c.novice': '#c08a5a',
      'c.luck': '#6fd6a0',
      'c.focus': '#7f9dff',
      'c.void': '#b07fff',
      'c.crown': '#f2c14e',
      'c.pulse': '#6fd6a0',
      'c.orbit': '#7f9dff',
      'c.singularity': '#b07fff',
      'c.eternity': '#ff7ad9',
      'c.echo': '#9ef4d0',
      'c.prism': '#ffd76b',
      'c.genesis': '#e8d8b0',
      'c.sigil': '#9ef4d0',
      'c.abyss': '#6a5aa8',
      'c.aurora': '#7cf0ff',
      'c.crimson': '#ff4d4d',
    }

    const WEAPON_PALETTES = {
      common: { 1: '#c2cbd9', 2: '#ffffff', 3: '#6b4a2b', 4: '#d8b25a' },
      rare: { 1: '#63d2b4', 2: '#e9fff8', 3: '#4a5f2b', 4: '#d8b25a' },
      epic: { 1: '#7f9dff', 2: '#eef2ff', 3: '#4a3a6b', 4: '#d8b25a' },
      legendary: { 1: '#f2c14e', 2: '#fff6d8', 3: '#6b4a2b', 4: '#e8d8b0' },
      mythic: { 1: '#ff7ad9', 2: '#fff0fb', 3: '#5a2a4a', 4: '#f2d27a' },
      red: { 1: '#ff4d4d', 2: '#ffdada', 3: '#6b1a1f', 4: '#f2b25a' },
      ancient: { 1: '#ff8a3c', 2: '#ffe3c4', 3: '#7a3a10', 4: '#f2b25a' },
      divine: { 1: '#b8f0ff', 2: '#ffffff', 3: '#2b5a6b', 4: '#f2d27a' },
      aurora: { 1: '#7cf0ff', 2: '#ffffff', 3: '#3a2a6b', 4: '#f2d27a' },
    }

    // Which silhouette each armour piece wears.
    const ARMOR_CUT = {
      'a.novice': 'coat',
      'a.scribe': 'coat',
      'a.phoenix': 'coat',
      'a.terminal': 'plate',
      'a.night': 'plate',
      'a.bulwark': 'plate',
      'a.aegis': 'plate',
      'a.wyrm': 'plate',
      'a.season': 'robe',
      'a.starweave': 'robe',
      'a.eclipse': 'robe',
      'a.aurora': 'robe',
      'a.genesis': 'robe',
      'a.bastion': 'plate',
      'a.abyss': 'robe',
      'a.crimson': 'plate',
    }

    const WEAPON_SHAPE = {
      'w.novice': 'dagger',
      'w.quill': 'spear',
      'w.forge': 'wrench',
      'w.serpent': 'greatsword',
      'w.star': 'bow',
      'w.calamity': 'greatsword',
      'w.gale': 'bow',
      'w.echo': 'greatsword',
      'w.titan': 'greatsword',
      'w.nova': 'greatsword',
      'w.frost': 'dagger',
      'w.void': 'greatsword',
      'w.storm': 'greatsword',
      'w.genesis': 'greatsword',
      'w.rune': 'spear',
      'w.abyss': 'greatsword',
      'w.aurora': 'greatsword',
      'w.crimson': 'greatsword',
      'w.sovereign': 'greatsword',
      'w.leviathan': 'spear',
      'w.oracle': 'spear',
      'w.entropy': 'greatsword',
      'w.mirror': 'dagger',
      'w.voidking': 'greatsword',
      // Signature pieces get their own silhouettes.
      'w.elderdragon': 'greatsword',
      'w.beyond': 'scythe',
      'w.divine': 'staff',
      'w.judgement': 'twinblade',
      'w.dragonscale': 'scythe',
      'w.starfall': 'greatsword',
      'w.voidwalk': 'twinblade',
      'w.starcore': 'staff',
    }

    // What the avatar actually wears: armour recolours hood and chest, the
    // charm is a gem on the chest, the weapon is an overlay beside the body.

    const PX_HERO_PALETTE = {
      o: '#2a1c33',
      r: '#e8635a',
      h: '#453a6e',
      s: '#f3c9a0',
      e: '#2a1c33',
      m: '#cfd8e8',
      M: '#93a2bb',
      b: '#2b2438',
      B: '#3d3348',
      w: '#e9eef8',
      W: '#ffffff',
      g: '#f5c451',
      G: '#b8862c',
      y: '#8a5a2b',
      Y: '#5e3a1c',
    }
    const PX_IMP = [
      '.a............a.',
      '.aa..........aa.',
      '..oa........ao..',
      '...oooooooooo...',
      '..ohhhhhhhhhho..',
      '..oheehhhheeho..',
      '..oheehhhheeho..',
      '..ohhhhhhhhhho..',
      '..ohffhhhhffho..',
      '...ohhhhhhhho...',
      '...obbbbbbbbo...',
      '..obbbbbbbbbbo..',
      '.oabbbbbbbbbbao.',
      '.oabbbbbbbbbbao.',
      '..obbbbbbbbbbo..',
      '..obb......bbo..',
      '..obb......bbo..',
      '..oo........oo..',
    ]
    const PX_WRAITH = [
      '......oooo......',
      '....oohhhhoo....',
      '...ohhhhhhhho...',
      '..ohhhhhhhhhho..',
      '..ohhhhhhhhhho..',
      '..ohhhheehhhho..',
      '..ohhhheehhhho..',
      '..ohhhheehhhho..',
      '..ohhhhhhhhhho..',
      '..ohhhffffhhho..',
      '.ohhhhhhhhhhhho.',
      '.ohhhhhhhhhhhho.',
      '.ohhohhohhohhho.',
      '.ohho.ohho.ohho.',
      '..oo...oo...oo..',
      '..o....oo....o..',
      '.......oo.......',
      '......o..o......',
    ]
    const PX_SOVEREIGN = [
      '....g.g..g.g....',
      '....gggggggg....',
      '....oggggggo....',
      '.....oooooo.....',
      '..ohhhhhhhhhho..',
      '..ohhhhhhhhhho..',
      '..ohheehheehho..',
      '..ohheehheehho..',
      '..ohhhhhhhhhho..',
      '...ohhhhhhhho...',
      '...ommmmmmmmo...',
      '.ommggggggggmmo.',
      '.omMggggggggMmo.',
      '.omMggggggggMmo.',
      '..oMggggggggMo..',
      '..oMggggggggMo..',
      '...oooooooooo...',
      '..obb......bbo..',
    ]

    // Fixed palettes: sprites are artwork, so they keep their own colours
    // instead of following theme tokens, exactly like the crest SVG.

    const PX_IMP_PALETTE = {
      o: '#2a1220',
      a: '#f0d7b0',
      h: '#c2452f',
      e: '#ffe9a8',
      f: '#fff4d6',
      b: '#8f2f22',
    }
    const PX_WRAITH_PALETTE = {
      o: '#170f26',
      h: '#6a4bb0',
      e: '#9ef4ff',
      f: '#2a1d3f',
    }
    const PX_SOVEREIGN_PALETTE = {
      o: '#241428',
      g: '#e8c15c',
      h: '#7a4f9e',
      e: '#ff9a6b',
      m: '#c9a24a',
      M: '#8a6a24',
      b: '#3a2340',
    }

    const BOSS_ART = {
      daily: { rows: PX_IMP, palette: PX_IMP_PALETTE },
      weekly: { rows: PX_WRAITH, palette: PX_WRAITH_PALETTE },
      season: { rows: PX_SOVEREIGN, palette: PX_SOVEREIGN_PALETTE },
    }

    // The boss itself keeps the shape of its kind but takes the colour of the
    // rotation it currently holds: cinder is ember red, glitch is toxic green…
    const BOSS_PALETTE_ACCENT = {
      cinder: { h: '#c2452f', e: '#ffe9a8' },
      glitch: { h: '#2f8f6f', e: '#b6ffe9' },
      quill: { h: '#3a5c9e', e: '#cfe4ff' },
      ashen: { h: '#5d5870', e: '#ffd8a8' },
      echo: { h: '#2f7f9e', e: '#b6f0ff' },
      maw: { h: '#9e2f42', e: '#ffd0d6' },
      deadline: { h: '#8a6a2f', e: '#ffe9a8' },
      sovereign: { h: '#7a4f9e', e: '#ff9a6b' },
      leviathan: { h: '#2f7f7a', e: '#b6fff2' },
      oracle: { h: '#6a3f9e', e: '#e6c8ff' },
      static: { h: '#4f8fb0', e: '#d8f4ff' },
      cache: { h: '#7a5a3a', e: '#ffe0a8' },
      null: { h: '#3a3a4a', e: '#9ef4ff' },
      regression: { h: '#8a3a2a', e: '#ffd0a8' },
      dependency: { h: '#3a5a8a', e: '#cfe4ff' },
      deadlock: { h: '#4a4a5a', e: '#ff9a6b' },
      entropy: { h: '#5a3a6a', e: '#e6c8ff' },
      mirror: { h: '#3a6a7a', e: '#b6fff2' },
      shadow: { h: '#2a2a3a', e: '#c8d0ff' },
      deadcode: { h: '#4a3a3a', e: '#ffd8a8' },
      lint: { h: '#3a4a2a', e: '#e8ffb0' },
      legacy: { h: '#5a4a2a', e: '#ffe0a8' },
      outage: { h: '#6a2a2a', e: '#ffb0b0' },
      voidking: { h: '#1a1230', e: '#d0b0ff' },
    }

    // 10x10 gear icons, one shape per weapon/armour/charm family. Items of the
    // same shape are told apart by the rarity palette, like the cards are.
    const PX_ITEM_ICONS = {
      dagger: [
        '....o.....',
        '...oao....',
        '...oao....',
        '...oao....',
        '...oao....',
        '..oaaao...',
        '...oso....',
        '...oso....',
        '...oso....',
        '....o.....',
      ],
      spear: [
        '....a.....',
        '...aao....',
        '...aao....',
        '....so....',
        '....so....',
        '....so....',
        '....so....',
        '....so....',
        '....so....',
        '...oooo...',
      ],
      wrench: [
        '.oo.......',
        'o..o......',
        'o..o......',
        '.oo.......',
        '..a.......',
        '...a......',
        '....a.....',
        '.....a....',
        '......a...',
        '.......a..',
      ],
      greatsword: [
        '...oooo...',
        '...oaao...',
        '...oaao...',
        '...oaao...',
        '...oaao...',
        '..oaaaao..',
        '...oaao...',
        '...osso...',
        '....oo....',
        '....oo....',
      ],
      arrow: [
        '.......oo.',
        '......oao.',
        '.....oao..',
        '....oao...',
        '...oao....',
        '..oao.....',
        '.oao......',
        'ooo.......',
        '.o........',
        '..........',
      ],
      coat: [
        '..oooo....',
        '.oooooo...',
        'ooaaaoo...',
        '.oaaaao...',
        '.oaaaao...',
        '.oaaaao...',
        '.oaaaao...',
        '.oaaaao...',
        '.oooooo...',
        '..........',
      ],
      plate: [
        '..oooo....',
        '.oaaaao...',
        'oaawaaao..',
        'oaawaaao..',
        'oaawaaao..',
        '.oaaaao...',
        '..oao.....',
        '...o......',
        '..........',
        '..........',
      ],
      gem: [
        '...oo.....',
        '..oaao....',
        '.oaaaao...',
        'oaaaaaao..',
        '.oaaaao...',
        '..oaao....',
        '...oo.....',
        '...oo.....',
        '..........',
        '..........',
      ],
      dice: [
        '..oooo....',
        '.oaaaao...',
        '.oaaoao...',
        '.oaaaao...',
        '.oaoaao...',
        '.oaaaao...',
        '.oaoaao...',
        '..oooo....',
        '..........',
        '..........',
      ],
      lens: [
        '..oooo....',
        '.oaaaao...',
        'oaawaaao..',
        'oaawaaao..',
        'oaaaaaao..',
        '.oaaaao...',
        '..oooo....',
        '....ooo...',
        '.....oo...',
        '..........',
      ],
      crown: [
        '..........',
        '..o..o..o.',
        '..o..o..o.',
        '.oaooaooa.',
        '.oaaaaaao.',
        '.oaaaaaao.',
        '..oooooo..',
        '..........',
        '..........',
        '..........',
      ],
    }

    const PX_ICON_PALETTES = {
      common: { o: '#2b2433', a: '#c2cbd9', s: '#8b97a9', w: '#ffffff' },
      rare: { o: '#152a26', a: '#63d2b4', s: '#2f8f78', w: '#e9fff8' },
      epic: { o: '#1b2144', a: '#7f9dff', s: '#4863bd', w: '#eef2ff' },
      legendary: { o: '#33240f', a: '#f2c14e', s: '#b8862c', w: '#fff6d8' },
      mythic: { o: '#2a1024', a: '#ff7ad9', s: '#b8439a', w: '#fff0fb' },
      red: { o: '#3a0d12', a: '#ff4d4d', s: '#a82a2a', w: '#ffe0e0' },
      ancient: { o: '#3a1c06', a: '#ff8a3c', s: '#b2541c', w: '#ffe9d2' },
      divine: { o: '#0d2a33', a: '#b8f0ff', s: '#5fa8bd', w: '#ffffff' },
      aurora: { o: '#12233a', a: '#7cf0ff', s: '#3f8fbf', w: '#eaffff' },
    }

    const GEAR_ICON = {
      'w.novice': 'dagger',
      'w.quill': 'spear',
      'w.forge': 'wrench',
      'w.serpent': 'greatsword',
      'w.star': 'arrow',
      'w.calamity': 'greatsword',
      'w.gale': 'arrow',
      'w.echo': 'greatsword',
      'w.titan': 'greatsword',
      'w.nova': 'greatsword',
      'w.frost': 'dagger',
      'w.void': 'greatsword',
      'w.storm': 'greatsword',
      'w.genesis': 'greatsword',
      'w.rune': 'spear',
      'w.abyss': 'greatsword',
      'w.aurora': 'greatsword',
      'w.crimson': 'greatsword',
      'w.sovereign': 'greatsword',
      'w.leviathan': 'spear',
      'w.oracle': 'spear',
      'w.entropy': 'greatsword',
      'w.mirror': 'dagger',
      'w.voidking': 'greatsword',
      'a.novice': 'coat',
      'a.scribe': 'coat',
      'a.terminal': 'plate',
      'a.night': 'plate',
      'a.season': 'plate',
      'a.bulwark': 'plate',
      'a.wyrm': 'plate',
      'a.starweave': 'plate',
      'a.eclipse': 'plate',
      'a.aegis': 'plate',
      'a.phoenix': 'plate',
      'a.genesis': 'plate',
      'a.bastion': 'plate',
      'a.abyss': 'plate',
      'a.aurora': 'plate',
      'a.crimson': 'plate',
      'c.novice': 'gem',
      'c.luck': 'dice',
      'c.focus': 'lens',
      'c.void': 'gem',
      'c.crown': 'crown',
      'c.pulse': 'gem',
      'c.orbit': 'lens',
      'c.singularity': 'gem',
      'c.eternity': 'gem',
      'c.echo': 'gem',
      'c.prism': 'lens',
      'c.genesis': 'gem',
      'c.sigil': 'lens',
      'c.abyss': 'gem',
      'c.aurora': 'gem',
      'c.crimson': 'gem',
    }

    // Aurora gear is legendary but reads cyan, so it gets its own palette.
    const GEAR_ICON_PALETTE = {
      'w.aurora': 'aurora',
      'a.aurora': 'aurora',
      'c.aurora': 'aurora',
    }

    const GEAR_ICON_FALLBACK = { weapon: 'dagger', armor: 'coat', charm: 'gem' }

    const ZH = {
      'nav.title': 'DevQuest',
      'nav.subtitle': '冒险者公会',
      'nav.open': '打开 DevQuest 冒险者公会',
      'page.eyebrow': 'DEVQUEST · 冒险者日志',
      'page.title': '冒险者公会',
      'page.subtitle': '每一次工具调用，都是史诗的一行。',
      'page.back': '返回对话',
      'page.editName': '修改冒险者名',
      'page.renameHint': '输入 1–20 个字符，回车保存',
      'page.renameSave': '保存',
      'page.renameCancel': '取消',
      'page.loading': '正在读取冒险记录…',
      'page.error': '冒险记录暂时无法读取',
      'page.retry': '重试',
      'page.offline': '与 Host 的连接中断，正在重试…',
      'page.live': '实时',
      'page.updated': '更新于 {time}',
      'tab.overview': '总览',
      'tab.quests': '委托',
      'tab.achievements': '成就',
      'tab.shop': '商店',
      'tab.chronicle': '编年史',
      'hero.level': '等级 {level}',
      'hero.maxLevel': 'Lv.60 · 满级',
      'paragon.stars': '巅峰之星 ×{stars}',
      'paragon.peak': '巅峰已满 · 转生皮肤已解锁',
      'paragon.capped': '巅峰十阶 · 已满',
      'rebirth.lives': '轮回 {lives} 世',
      'rebirth.bonus': '伤害 +{damage}% · 经验 +{xp}%',
      'rebirth.ready': '转生',
      'rebirth.confirm': '确定转生？等级与巅峰会清零',
      'rebirth.done': '第 {lives} 次转生完成：+{coins} 星币，伤害 +{damage}%，经验 +{xp}%',
      'title.rebirth1.name': '轮回一世',
      'title.rebirth2.name': '轮回二世',
      'title.rebirth3.name': '轮回三世',
      'title.rebirth4.name': '轮回四世',
      'title.rebirth5.name': '轮回无尽',
      'paragon.line': '每 2 万经验一颗星，下一颗 +{coins} 星币',
      'paragon.toNext': '距下一颗星 {xp} 经验',
      'hero.toNext': '距下一级 {xp} 经验',
      'hero.xp': '{current} / {next} 经验',
      'hero.streak': '连续冒险',
      'hero.streakValue': '{days} 天',
      'hero.coins': '星币',
      'hero.achievements': '成就',
      'hero.achievementValue': '{unlocked} / {total}',
      'hero.boss': '本周灾厄',
      'hero.bossDone': '已讨伐',
      'hero.title': '当前称号',
      'hero.editName': '修改名字',
      'overview.quests': '今日委托',
      'overview.questsHint': '完成行为，领取星币与经验',
      'overview.openQuests': '查看全部',
      'overview.progress': '{done} / {total} 已完成',
      'overview.activity': '冒险编年史',
      'overview.activityHint': '由 Session 事件流实时生成',
      'overview.openChronicle': '查看全部',
      'overview.emptyActivity': '还没有足迹。去完成一次工具调用吧。',
      'overview.class': '职业专精',
      'overview.classHint': '你的行为正在塑造职业',
      'overview.boss': '每周 BOSS',
      'overview.bossHint': '本周剩余 {time}',
      'overview.stats': '冒险数据',
      'overview.party': 'Agent 编队',
      'overview.partyHint': '与你并肩作战的会话',
      'overview.partyEmpty': '完成一次对话后，这里会出现你的第一位同伴。',
      'overview.recentAchievements': '最近解锁',
      'overview.noAchievements': '尚未解锁成就',
      'stat.turns': '完成回合',
      'stat.tools': '工具调用',
      'stat.writes': '文件写入',
      'stat.reads': '文件读取',
      'stat.searches': '网页探索',
      'stat.todos': '清单完成',
      'stat.subagents': '子代理',
      'stat.workflows': 'Workflow',
      'stat.shellRuns': 'Shell 命令',
      'stat.tokens': '思考 Token',
      'stat.toolErrors': '受挫次数',
      'stat.recoveries': '逆境翻盘',
      'stat.daysActive': '冒险天数',
      'stat.bestStreak': '最长连续',
      'quests.daily': '每日委托',
      'quests.weekly': '每周试炼',
      'quests.dailyHint': '每天 00:00 刷新 · 剩余 {time}',
      'quests.weeklyHint': '每周一 00:00 刷新 · 剩余 {time}',
      'quests.claim': '领取',
      'quests.claimed': '已领取',
      'quests.incomplete': '进行中',
      'quests.claimAll': '全部领取',
      'quests.reward': '{xp} 经验 · {coins} 星币',
      'quests.progress': '{current} / {target}',
      'quests.complete': '可领取',
      'q.tools.name': '挥动工具',
      'q.tools.desc': '完成 {target} 次成功的工具调用。',
      'q.turns.name': '推进回合',
      'q.turns.desc': '完成 {target} 个 Agent 回合。',
      'q.writes.name': '刻下文件',
      'q.writes.desc': '写入或编辑 {target} 个文件。',
      'q.reads.name': '翻阅卷宗',
      'q.reads.desc': '读取 {target} 次文件、目录或搜索结果。',
      'q.todos.name': '清单归零',
      'q.todos.desc': '完成 {target} 份待办清单。',
      'q.search.name': '远行求索',
      'q.search.desc': '完成 {target} 次网页搜索或抓取。',
      'q.distinct.name': '博采众长',
      'q.distinct.desc': '使用 {target} 种不同工具。',
      'q.xp.name': '积累经验',
      'q.xp.desc': '在本次周期内获得 {target} 经验。',
      'q.subagents.name': '召唤同伴',
      'q.subagents.desc': '完成 {target} 个子代理任务。',
      'ach.title': '成就殿堂',
      'ach.subtitle': '已解锁 {unlocked} / {total}',
      'ach.filter.all': '全部',
      'ach.filter.unlocked': '已解锁',
      'ach.filter.locked': '未解锁',
      'ach.unlockedAt': '解锁于 {time}',
      'ach.locked': '尚未解锁',
      'ach.rarity.common': '普通',
      'ach.rarity.rare': '稀有',
      'ach.rarity.epic': '史诗',
      'ach.rarity.legendary': '传说',
      'ach.rarity.mythic': '神话',
      'ach.rarity.red': '红装',
      'ach.rarity.ancient': '远古',
      'ach.rarity.divine': '神圣',
      'ach.rarity.transcendent': '超凡',
      'ach.reward': '+{coins} 星币',
      'ach.arrival.name': '推门而入',
      'ach.arrival.desc': '第一次打开冒险者公会。',
      'ach.first-turn.name': '第一回合',
      'ach.first-turn.desc': '完成第一个 Agent 回合。',
      'ach.first-tool.name': '初次挥剑',
      'ach.first-tool.desc': '完成第一次成功的工具调用。',
      'ach.reader.name': '博览群书',
      'ach.reader.desc': '累计读取 10 次文件或目录。',
      'ach.explorer.name': '工具收藏家',
      'ach.explorer.desc': '使用 5 种不同工具。',
      'ach.streak-3.name': '三日不辍',
      'ach.streak-3.desc': '连续 3 天冒险。',
      'ach.dawn.name': '破晓者',
      'ach.dawn.desc': '在 5–7 点间完成一次工具调用。',
      'ach.level-5.name': '见习冒险者',
      'ach.level-5.desc': '达到 5 级。',
      'ach.scribe.name': '刻印者',
      'ach.scribe.desc': '累计写入或编辑 10 个文件。',
      'ach.polyglot.name': '百器通',
      'ach.polyglot.desc': '使用 10 种不同工具。',
      'ach.quest-clear.name': '清单归零',
      'ach.quest-clear.desc': '首次完成一份待办清单。',
      'ach.delegator.name': '召唤师',
      'ach.delegator.desc': '完成 3 个子代理任务。',
      'ach.streak-7.name': '一周远征',
      'ach.streak-7.desc': '连续 7 天冒险。',
      'ach.night-owl.name': '夜行者',
      'ach.night-owl.desc': '在 0–4 点间完成一次工具调用。',
      'ach.phoenix.name': '浴火',
      'ach.phoenix.desc': '从失败中恢复 3 次。',
      'ach.level-10.name': '资深冒险者',
      'ach.level-10.desc': '达到 10 级。',
      'ach.rich.name': '金库回响',
      'ach.rich.desc': '累计获得 500 星币。',
      'ach.collector.name': '衣橱鉴赏家',
      'ach.collector.desc': '拥有 4 个称号。',
      'ach.lucky-star.name': '命运之友',
      'ach.lucky-star.desc': '累计抽奖 7 次。',
      'ach.webwalker.name': '边境信使',
      'ach.webwalker.desc': '完成 10 次网页搜索或抓取。',
      'ach.tinker.name': '终端工匠',
      'ach.tinker.desc': '执行 10 次 shell 命令。',
      'ach.shopaholic.name': '收藏癖',
      'ach.shopaholic.desc': '在商店兑换 3 个称号。',
      'ach.centurion.name': '百炼',
      'ach.centurion.desc': '累计完成 100 次工具调用。',
      'ach.quest-master.name': '清单大师',
      'ach.quest-master.desc': '完成 5 份待办清单。',
      'ach.director.name': '编排者',
      'ach.director.desc': '完成 3 次 workflow。',
      'ach.level-20.name': '传奇冒险者',
      'ach.level-20.desc': '达到 20 级。',
      'ach.marathon.name': '长途跋涉',
      'ach.marathon.desc': '完成 50 个 Agent 回合。',
      'ach.season-one.name': '首赛季勋章',
      'ach.season-one.desc': '领取一次每周试炼奖励。',
      'ach.boss-slayer.name': '灾厄终结',
      'ach.boss-slayer.desc': '首次讨伐每周 BOSS。',
      'ach.level-30.name': '星辰旅人',
      'ach.level-30.desc': '达到 30 级。',
      'ach.boss-veteran.name': '三度弑王',
      'ach.boss-veteran.desc': '讨伐 3 个每周 BOSS。',
      'shop.title': '赛季商店',
      'shop.subtitle': '用星币兑换称号，装点你的冒险者名片。',
      'shop.balance': '余额',
      'shop.buy': '兑换',
      'shop.equip': '装备',
      'shop.equipped': '已装备',
      'shop.owned': '已拥有',
      'shop.insufficient': '星币不足',
      'shop.inventory': '已获得称号',
      'shop.inventoryHint': '点击称号即可装备',
      'shop.price': '{coins} 星币',
      'shop.buySuccess': '已兑换「{title}」',
      'shop.equipSuccess': '已装备「{title}」',
      'shop.lotteryHint': '每日一次，让命运给冒险加一点意外。',
      'title.novice.name': '初来者',
      'title.novice.desc': '刚刚推开公会大门的人，故事从此刻开始。',
      'title.wanderer.name': '边境旅人',
      'title.wanderer.desc': '把风尘写进披风，把地图折进口袋。',
      'title.starfarer.name': '逐星者',
      'title.starfarer.desc': '不追路，只追夜空里最亮的那一点。',
      'title.bughunter.name': 'Bug 猎手',
      'title.bughunter.desc': '循着异常的足迹，把混乱钉回因果。',
      'title.nightforge.name': '夜锻师',
      'title.nightforge.desc': '在别人睡去之后，把代码敲成兵器。',
      'title.architect.name': '织梦建筑师',
      'title.architect.desc': '不只写文件，也为想法搭出可以居住的结构。',
      'title.orchestrator.name': '万弦指挥',
      'title.orchestrator.desc': '让多个 Agent 同频，把复杂任务拆成一首合奏。',
      'title.seasonchamp.name': '赛季冠军',
      'title.seasonchamp.desc': '这一季的传说，由你的名字收尾。',
      'title.evergreen.name': '常青',
      'title.evergreen.desc': '不管项目怎么变，你还在。',
      'title.mythweaver.name': '神话织者',
      'title.peak.name': '巅峰',
      'title.transcend.name': '超凡',
      'title.boundless.name': '无尽',
      'title.eternalpeak.name': '永恒巅峰',
      'title.crimson.name': '赤焰',
      'title.pathfinder.name': '破阵者',
      'title.conqueror.name': '征伐者',
      'title.dragonslayer.name': '屠龙者',
      'title.warlord.name': '战将',
      'title.mythweaver.desc': '把一次次普通的提交，织成了传说。',
      'title.bossbane.name': '灾厄终结者',
      'title.bossbane.desc': '每周 BOSS 的噩梦，公会大厅里的常客。',
      'title.legend.name': '星辰旅人',
      'title.legend.desc': '走到等级尽头的人，自己成为了路标。',
      'title.curator.name': '收藏家',
      'title.curator.desc': '把每一段冒险都装进橱窗，留一盏灯。',
      'title.lucky.name': '命运宠儿',
      'title.lucky.desc': '连随机数都愿意为你多停留一秒。',
      'class.title': '职业专精',
      'class.current': '当前职业',
      'class.tier.0': '新芽',
      'class.tier.1': '行者',
      'class.tier.2': '专家',
      'class.tier.3': '大师',
      'class.tier.4': '宗师',
      'class.tier.5': '传奇',
      'class.tier.6': '神话',
      'class.tier.7': '永恒',
      'class.level': 'Lv.{level}',
      'class.toNextLevel': '距 {level} 级 {xp}',
      'class.toNextTier': '距「{tier}」{xp}',
      'class.maxTier': '已达顶阶',
      'class.bonus': '职业加成 · BOSS 伤害 +{percent}%',
      'class.bonusShort': '伤害 +{percent}%',
      'class.next': '职业由行为实时塑造',
      'class.major': '主修',
      'class.share': '占 {share}%',
      'class.radarLabel': '五维分布',
      'class.novice.name': '初来者',
      'class.novice.desc': '还没有足够的足迹。多完成几次工具调用，命运会给出答案。',
      'class.ranger.name': '游侠',
      'class.ranger.desc': '以工具与阅读丈量世界，出手轻快，路径清晰。',
      'class.artificer.name': '工匠',
      'class.artificer.desc': '把想法刻进文件，让代码与命令成为作品。',
      'class.scholar.name': '学者',
      'class.scholar.desc': '在网页与文档间求证，先理解，再行动。',
      'class.commander.name': '指挥官',
      'class.commander.desc': '用子代理与 workflow 编队，让多个 Agent 同频推进。',
      'class.debugger.name': '破咒师',
      'class.debugger.desc': '在失败中追踪因果，把错误变成下一次成功的地图。',
      'class.path.ranger': '探索',
      'class.path.ranger.hint': '工具调用 ×1.2 · 读取 ×0.35 · 回合 ×0.6',
      'class.path.artificer.hint': '写入 ×4 · 代码行 ×0.18 · 命令 ×1.6 · 装备战力 ×1.2',
      'class.path.scholar.hint': '搜索 ×5 · 读取 ×0.8 · token ÷6000',
      'class.path.commander.hint': '子代理 ×16 · 工作流 ×26 · 编排 ×2',
      'class.path.debugger.hint': '错误恢复 ×18 · 失败调用 ×1.5',
      'class.path.artificer': '造物',
      'class.path.scholar': '求知',
      'class.path.commander': '统御',
      'class.path.debugger': '洞察',
      'boss.title': '每周 BOSS',
      'boss.hp': '{hp} / {max} HP',
      'boss.damage': '累计伤害 {damage}',
      'boss.remaining': '剩余 {time}',
      'boss.defeated': '已讨伐',
      'boss.claim': '领取战利品',
      'boss.claimed': '战利品已领取',
      'boss.reward': '讨伐奖励：{xp} 经验 + {coins} 星币 + 称号',
      'boss.alive': '灾厄仍在蔓延',
      'boss.week': '第 {week} 周',
      'boss.ashen.name': '熵蚀巨像',
      'boss.ashen.lore': '它由被遗忘的上下文堆成，每一步都让世界更模糊。持续行动，才能让它显形。',
      'boss.echo.name': '递归回响',
      'boss.echo.lore': '同一个问题在它的胸腔里反复回响。用不同的工具打断循环，找到唯一的出口。',
      'boss.maw.name': '吞词者',
      'boss.maw.lore': '它吞下未完成的句子与半截计划。把待办清单清空，它就会失去牙齿。',
      'boss.deadline.name': '死线魔龙',
      'boss.deadline.lore': '它的鳞片由倒计时铸成。别凝视它太久，完成一个回合，就斩下一片鳞。',
      'lottery.title': '每日命运抽奖',
      'lottery.subtitle': '每天一次，让命运给冒险加一点意外。',
      'lottery.button': '转动命运',
      'lottery.again': '今日已抽取',
      'lottery.available': '今日可抽 1 次',
      'lottery.resets': '{time} 后刷新',
      'lottery.result': '命运的回响',
      'lottery.prize.coins': '星币 ×{amount}',
      'lottery.prize.xp': '经验 +{amount}',
      'lottery.prize.title': '称号「{title}」',
      'lottery.history': '最近抽奖',
      'activity.title': '冒险编年史',
      'activity.subtitle': '最近 30 条由事件流生成的故事。',
      'activity.empty': '还没有足迹。',
      'activity.tool': '调用了 {tool}',
      'activity.toolTarget': '调用了 {tool} · {target}',
      'activity.turn': '完成了第 {turn} 回合',
      'activity.todo': '清空了一份 {count} 项待办清单',
      'activity.workflow': '完成了 workflow「{name}」',
      'activity.subagent': '一个子代理完成任务',
      'activity.achievement': '解锁成就「{name}」',
      'activity.reward': '领取了{source}奖励',
      'activity.purchase': '兑换了称号「{title}」',
      'activity.lottery': '抽中了{prize}',
      'activity.bossDefeat': '讨伐了本周 BOSS「{name}」',
      'activity.paragon': '达到巅峰之星 ×{stars}',
      'activity.enhance': '{gear} 强化到 +{level}',
      'activity.toolError': '在 {tool} 上遇到了阻碍',
      'activity.welcome': '推开了冒险者公会的大门',
      'activity.unknown': '留下了新的足迹',
      'activity.source.daily': '每日委托',
      'activity.source.weekly': '每周试炼',
      'activity.source.boss': 'BOSS 讨伐',
      'toast.achievement': '解锁成就「{name}」',
      'toast.reward': '获得 {xp} 经验 + {coins} 星币',
      'toast.claimAll': '领取了 {count} 份奖励：{xp} 经验 + {coins} 星币',
      'toast.error.not-complete': '这份委托还没有完成。',
      'toast.error.already-claimed': '奖励已经领取过了。',
      'toast.error.already-drawn': '今天已经抽过命运了。',
      'toast.error.not-enough-coins': '星币不足。',
      'toast.error.already-owned': '你已经拥有这个称号。',
      'toast.error.not-owned': '尚未拥有这个称号。',
      'toast.error.boss-alive': 'BOSS 还未被讨伐。',
      'toast.error.nothing-to-claim': '暂无可领取奖励。',
      'toast.error.invalid-name': '名字需为 1–20 个字符。',
      'toast.error.unknown-challenge': '找不到这份委托。',
      'toast.error.no-chest': '还没有可开启的宝箱。',
      'toast.error.unknown-gear': '找不到这件装备。',
      'toast.error.unknown-tier': '找不到这个赛季阶段。',
      'toast.error.unknown': '操作没有完成，请重试。',
      'toast.error.network': '无法连接 Host，请稍后重试。',
      'toast.titleChanged': '冒险者名已更新',
      'hud.open': '打开 DevQuest 冒险者公会',
      'hud.move': '按住拖动，放到任意位置',
      'hud.reset': '双击归位',
      'hud.level': 'Lv.{level}',
      'hud.xp': '{current} / {next} XP',
      'hud.streak': '{days} 天连续',
      'hud.coins': '{coins}',
      'hud.quests': '{done}/{total} 委托',
      'hud.boss': 'BOSS {percent}%',
      'hud.loading': '冒险记录读取中',
      'hud.error': 'DevQuest 离线',
      'time.justNow': '刚刚',
      'time.minutesAgo': '{n} 分钟前',
      'time.hoursAgo': '{n} 小时前',
      'time.daysAgo': '{n} 天前',
      'time.today': '今天',
      'time.yesterday': '昨天',
      'time.remaining': '{days} 天 {hours} 小时',
      'time.remainingShort': '{hours} 小时 {minutes} 分',
      'party.agent': 'Agent {id}',
      'party.subagent': '子代理 {id}',
      'party.active': '活跃',
      'party.idle': '待机',
      'party.xp': '{xp} XP',
      'party.tools': '{tools} 工具',
      'party.turns': '{turns} 回合',
      'tab.gear': '装备',
      'tab.bosses': 'BOSS',
      'hero.gearPower': '战力 {power}',
      'hero.season': 'S{number} · {theme}',
      'hero.chests': '宝箱',
      'hero.chestValue': '{count} 个',
      'overview.chests': '工坊宝箱',
      'overview.chestsHint': '每写 {lines} 行代码，工坊送来一个宝箱',
      'overview.openGear': '装备与工坊',
      'overview.bosses': 'BOSS 总览',
      'overview.bossesHint': '每日、每周与赛季灾厄共享你的行动伤害',
      'overview.openBosses': '进入讨伐面板',
      'stat.lines': '代码行数',
      'stat.chestsOpened': '宝箱开启',
      'q.lines.name': '刻写代码',
      'q.lines.desc': '写下 {target} 行代码。',
      'gear.title': '装备与工坊',
      'gear.subtitle': '武器、护甲、护符与头像框。战力会放大对 BOSS 的伤害。',
      'gear.power': '战力',
      'enhance.title': '强化',
      'enhance.hint': '每级 +2% 战力，最高 +{max}',
      'ascend.title': '进阶',
      'ascend.short': '进阶{tier}',
      'ascend.button': '进阶 · {cost}（成功率 {rate}%）',
      'ascend.max': '进阶已满',
      'ascend.success': '{name} 进阶成功，战力 +25%',
      'ascend.fail': '进阶失败，{cost} 星币没了',
      'story.title': '常规战线',
      'story.stage': '第 {stage} 关',
      'story.hint': '每一次行动都会削它血，血量随关卡指数上涨——战力不够就会卡住。',
      'story.reward': '通关 {coins} 星币 · {xp} 经验',
      'story.next': '下一关 {stage}：{name} · {hp} HP',
      'enhance.button': '强化 · {cost}',
      'enhance.max': '已满级',
      'enhance.success': '{name} 强化成功',
      'synth.title': '合成',
      'synth.hint': '同一部位、同一稀有度任意 5 件 → 1 件下一稀有度的同部位装备；优先消耗多余副本，被吃掉的装备会退回强化/进阶费用。',
      'synth.pieces': '（{pieces} 种）',
      'synth.top': '已达顶阶',
      'synth.none': '还没有任何装备可用来合成',
      'synth.next': '→ {rarity}{slot}',
      'synth.button': '合成 ×{count}',
      'synth.result': '合成成功：{name}',
      'synth.refund': '退回 {coins} 星币',
      'toast.error.not-enough-copies': '同部位同稀有度的装备不够 5 件。',
      'toast.error.unknown-slot': '这个部位不能合成。',
      'toast.error.max-rarity': '已经是最高稀有度了。',
      'toast.error.no-target': '没有可合成的目标。',
      'points.title': '成就点',
      'points.hint': '已兑换红装 {owned}/{total}',
      'points.exchange': '兑换红装 · {cost} 点',
      'points.allOwned': '红装已集齐',
      'points.success': '红装已到手：{name}',
      'points.locked': '未获得',
      'gear.slots': '装备槽',
      'gear.weapon': '武器',
      'gear.armor': '护甲',
      'gear.charm': '护符',
      'gear.frame': '头像框',
      'gear.empty': '未装备',
      'gear.inventory': '装备库',
      'gear.inventoryHint': '点击装备即可换上，头像框会同步到等级徽章与 HUD。',
      'gear.equip': '装备',
      'gear.equipped': '已装备',
      'gear.owned': '已拥有',
      'gear.powerBonus': '战力 +{power}',
      'gear.frameHint': '头像框会显示在等级徽章、HUD 与角色名片上。',
      'gear.buy': '兑换',
      'gear.buySuccess': '已获得「{name}」',
      'gear.equipSuccess': '已装备「{name}」',
      'gear.notOwned': '尚未拥有',
      'gear.source.chest': '宝箱',
      'gear.source.shop': '商店',
      'gear.source.boss': 'BOSS',
      'gear.source.season': '赛季',
      'gear.source.starter': '初始',
      'gear.stat': '战力',
      'gear.change': '更换',
      'gear.changeSlot': '更换{slot}',
      'gear.cosmetic': '外观',
      'gear.pickTitle': '更换{slot}',
      'gear.pickHint': '点击已经拥有的装备即可换上，头像框会立刻出现在等级徽章上。',
      'gear.pickLocked': '还没有获得',
      'gear.frameChange': '更换头像框',
      'arena.title': '像素战场',
      'arena.subtitle': '这里的一刀一刀，来自真实的工具调用。',
      'arena.target.daily': '每日',
      'arena.target.weekly': '每周',
      'arena.target.season': '赛季',
      'arena.you': '你',
      'arena.hp': '{hp} / {max} HP',
      'arena.waiting': '等待下一次行动',
      'arena.victory': 'VICTORY',
      'arena.defeated': '已讨伐',
      'arena.claim': '领取战利品',
      'arena.claimed': '战利品已领取',
      'arena.powerSurge': '战力 +{power}',
      'arena.practice': '试斩',
      'arena.practiceHint': '练习挥剑：只播放动作，不造成伤害。',
      'arena.hint': '写代码、完成回合、清空待办，都会在这里落下一刀。',
      'levelup.kicker': 'LEVEL UP',
      'levelup.title': '提升',
      'levelup.sub': '等级 +{gain} · 新的力量已经生效',
      'levelup.close': '继续冒险',
      'gear.w.novice.name': '初心短刃',
      'gear.w.novice.desc': '每个冒险者都有的第一把刀，刃口还带着新手的犹豫。',
      'gear.w.quill.name': '墨羽笔枪',
      'gear.w.quill.desc': '用写下的每一行代码磨尖的笔枪。',
      'gear.w.forge.name': '熔火扳手',
      'gear.w.forge.desc': '把构建失败拧成火花。',
      'gear.w.serpent.name': '递归蛇刃',
      'gear.w.serpent.desc': '每一次回环都让它更长一寸。',
      'gear.w.star.name': '星辉长弓',
      'gear.w.star.desc': '把远方的目标拉进射程。',
      'gear.w.calamity.name': '灾厄断罪者',
      'gear.w.calamity.desc': '从每周 BOSS 的碎片里重铸的巨刃。',
      'gear.a.novice.name': '旅人外套',
      'gear.a.novice.desc': '耐磨、耐脏，也耐得住第一次失败。',
      'gear.a.scribe.name': '档案员斗篷',
      'gear.a.scribe.desc': '口袋里永远有一份刚读完的文件。',
      'gear.a.terminal.name': '终端甲胄',
      'gear.a.terminal.desc': '由一条条命令编织成的外壳。',
      'gear.a.night.name': '夜行鳞衣',
      'gear.a.night.desc': '在别人睡去之后，替你挡住噪音。',
      'gear.a.season.name': '赛季荣耀战袍',
      'gear.a.season.desc': '绣着当前赛季纹章的传奇护甲。',
      'gear.c.novice.name': '铜制护符',
      'gear.c.novice.desc': '不值钱，但能让你记得为什么出发。',
      'gear.c.luck.name': '命运骰子',
      'gear.c.luck.desc': '每次投掷都相信下一次会更好。',
      'gear.c.focus.name': '专注透镜',
      'gear.c.focus.desc': '把噪音折叠成一条清晰的光。',
      'gear.c.void.name': '虚空回声',
      'gear.c.void.desc': '在空无一物的地方听见下一步。',
      'gear.c.crown.name': '王冠碎片',
      'gear.c.crown.desc': '从 BOSS 身上掰下来的权力残片。',
      'gear.f.novice.name': '木质边框',
      'gear.f.novice.desc': '刚入公会时的朴素相框。',
      'gear.f.bronze.name': '青铜冒险框',
      'gear.f.bronze.desc': '刻着第一段旅程的边框。',
      'gear.f.verdant.name': '森语框',
      'gear.f.verdant.desc': '藤蔓会随着你的等级缓慢生长。',
      'gear.f.starlight.name': '星辉框',
      'gear.f.starlight.desc': '夜里会亮起一圈很轻的星尘。',
      'gear.f.ember.name': '余烬框',
      'gear.f.ember.desc': '把失败烧成的余烬，镶在头像边缘。',
      'gear.f.season.name': '赛季冠军框',
      'gear.f.season.desc': '只属于当前赛季征服者的边框。',
      'gear.f.calamity.name': '灾厄征服框',
      'gear.f.calamity.desc': '每个 BOSS 都认识这个边框。',
      'gear.w.aurora.name': '极光裁决',
      'gear.w.aurora.desc': '在赛季长夜里磨出的光刃，越晚越亮。',
      'gear.a.aurora.name': '极光星衣',
      'gear.a.aurora.desc': '把整条星带的颜色缝进衣摆。',
      'gear.c.aurora.name': '极光核心',
      'gear.c.aurora.desc': '一颗不会熄灭的冷光，替你看清下一步。',
      'gear.f.aurora.name': '极光之框',
      'gear.f.aurora.desc': '只有走完通行证的人，头像才会这样发光。',
      'gear.w.gale.name': '疾风短弓',
      'gear.w.gale.desc': '轻得像是被风推着走的弓。',
      'gear.w.echo.name': '回响之刃',
      'gear.w.echo.desc': '每次挥砍，都会在下一刀里再响一次。',
      'gear.w.titan.name': '泰坦切片',
      'gear.w.titan.desc': '从泰坦骨架上削下来的那一截。',
      'gear.a.bulwark.name': '壁垒外骨骼',
      'gear.a.bulwark.desc': '把人整个包进去的移动工事。',
      'gear.a.wyrm.name': '龙鳞护甲',
      'gear.a.wyrm.desc': '每一片鳞都记着一次差点失败的重构。',
      'gear.a.starweave.name': '星织战衣',
      'gear.a.starweave.desc': '用整条银河的线头织成的护甲。',
      'gear.c.pulse.name': '脉冲核心',
      'gear.c.pulse.desc': '稳定、便宜，关键时刻从不断电。',
      'gear.c.orbit.name': '轨道仪',
      'gear.c.orbit.desc': '让灵感绕着你的思路转。',
      'gear.c.singularity.name': '奇点之眼',
      'gear.c.singularity.desc': '看得见所有还没写下的东西。',
      'gear.f.echo.name': '回响框',
      'gear.f.echo.desc': '边框会跟着你的动作轻微震动。',
      'gear.f.titan.name': '泰坦框',
      'gear.f.titan.desc': '只有走到通行证尽头的人戴得动。',
      'gear.w.nova.name': '星爆重刃',
      'gear.w.nova.desc': '一刀劈开过载的夜空。',
      'gear.a.eclipse.name': '蚀日战甲',
      'gear.a.eclipse.desc': '把整次日食穿在身上。',
      'gear.c.eternity.name': '永动核心',
      'gear.c.eternity.desc': '不需要维护，也不会停。',
      'gear.f.nova.name': '星爆框',
      'gear.f.nova.desc': '边框里装着一颗正在爆发的星。',
      'gear.w.frost.name': '霜刃',
      'gear.w.frost.desc': '刃上永远结着一层薄霜。',
      'gear.w.void.name': '虚空刃',
      'gear.w.void.desc': '挥出去的时候会短暂地不存在。',
      'gear.w.storm.name': '风暴之牙',
      'gear.w.storm.desc': '一记重击能撕开整片积雨云。',
      'gear.w.genesis.name': '创世残片',
      'gear.w.genesis.desc': '据说是第一行代码碎掉后留下的那一角。',
      'gear.a.aegis.name': '神盾外衣',
      'gear.a.aegis.desc': '把所有报错挡在身外的一层薄壳。',
      'gear.a.phoenix.name': '不死鸟羽衣',
      'gear.a.phoenix.desc': '烧掉一次，就重新长出来一次。',
      'gear.a.genesis.name': '创世甲',
      'gear.a.genesis.desc': '把整个仓库的重量压成一件衣服。',
      'gear.c.echo.name': '回响铃',
      'gear.c.echo.desc': '摇一下，昨天的答案会回你一声。',
      'gear.c.prism.name': '棱镜',
      'gear.c.prism.desc': '把一条需求拆成七种颜色。',
      'gear.c.genesis.name': '创世核心',
      'gear.c.genesis.desc': '一切从这里开始，也在这里收束。',
      'gear.f.storm.name': '风暴框',
      'gear.f.storm.desc': '边框里一直打雷。',
      'gear.f.genesis.name': '创世框',
      'gear.f.transcend.name': '转生·永恒之光',
      'gear.f.transcend.desc': '只有走到巅峰十阶的人才能看见的边框——光从身体里透出来。',
      'gear.f.genesis.desc': '第一帧画面被镶在了边框里。',
      'gear.w.rune.name': '符文战杖',
      'gear.w.rune.desc': '每一道刻痕都是一次编译通过的咒语。',
      'gear.a.bastion.name': '堡垒外壳',
      'gear.a.bastion.desc': '把整台服务器背在身上的装甲。',
      'gear.c.sigil.name': '符文印记',
      'gear.c.sigil.desc': '刻在手腕内侧的一小段保护逻辑。',
      'gear.f.rune.name': '符文框',
      'gear.f.rune.desc': '边框上刻着一圈看不懂的符号。',
      'gear.w.abyss.name': '深渊之刃',
      'gear.w.abyss.desc': '没人知道它从哪里被捞上来。',
      'gear.a.abyss.name': '深渊甲',
      'gear.a.abyss.desc': '穿上它，你会听见海平面以下的回声。',
      'gear.c.abyss.name': '深渊核心',
      'gear.c.abyss.desc': '一颗一直在缓慢搏动的黑色心脏。',
      'gear.f.abyss.name': '深渊框',
      'gear.f.abyss.desc': '边框里没有光，只有更深的一层。',
      'gear.w.crimson.name': '赤霄',
      'gear.w.crimson.desc': '剑身上有一道永远不灭的血线。',
      'gear.a.crimson.name': '赤鳞甲',
      'gear.a.crimson.desc': '每片甲叶都像凝固的火焰。',
      'gear.c.crimson.name': '赤心',
      'gear.c.crimson.desc': '一颗还在跳动的红色核心。',
      'gear.f.crimson.name': '赤焰框',
      'gear.f.crimson.desc': '边框里烧着一圈不会熄灭的火。',
      'gear.w.sovereign.name': '王权之刃',
      'gear.w.sovereign.desc': '时之冕碎裂后留下的那截剑锋。',
      'gear.w.leviathan.name': '潮汐长枪',
      'gear.w.leviathan.desc': '从词海里拔出来时还在滴水。',
      'gear.w.oracle.name': '预言法杖',
      'gear.w.oracle.desc': '杖头的眼睛一直看着你下一步。',
      'gear.w.entropy.name': '熵灭巨刃',
      'gear.w.entropy.desc': '挥动时周围的一切都在变旧。',
      'gear.w.mirror.name': '镜像双刃',
      'gear.w.mirror.desc': '劈开它，你会看见另一个自己先倒下。',
      'gear.w.voidking.name': '虚空之牙',
      'gear.w.voidking.desc': '从空白里咬下来的一颗牙。',
      'chest.title': '工坊宝箱',
      'chest.subtitle': '写代码会积累工坊进度，每 {lines} 行铸造一个宝箱。',
      'chest.progress': '{current} / {next} 行',
      'chest.totalLines': '累计 {lines} 行',
      'chest.count': '宝箱 ×{count}',
      'chest.open': '开启宝箱',
      'chest.empty': '还没有宝箱',
      'chest.next': '下一个：{tier}',
      'chest.opened': '已开启 {count} 个',
      'chest.tier.wood': '木箱',
      'chest.tier.iron': '铁箱',
      'chest.tier.gold': '金箱',
      'chest.tier.astral': '星辉箱',
      'chest.reward': '宝箱奖励',
      'chest.gear': '获得装备「{name}」',
      'chest.duplicate': '重复装备转化为 {coins} 星币',
      'chest.coins': '星币 +{coins}',
      'chest.xp': '经验 +{xp}',
      'chest.noGear': '这次没有掉落装备',
      'chest.opening': '正在开启…',
      'chest.last': '上次开启',
      'boss.title': 'BOSS 讨伐',
      'boss.subtitle': '每日、每周、赛季三条战线共享你的行动伤害。',
      'boss.kind.daily': '每日悬赏',
      'boss.kind.weekly': '每周灾厄',
      'boss.kind.season': '赛季主宰',
      'boss.kindHint.daily': '每天 00:00 刷新',
      'boss.kindHint.weekly': '每周一 00:00 刷新',
      'boss.kindHint.season': '赛季结束时刷新',
      'boss.reward': '奖励',
      'boss.rewardLine': '{xp} 经验 · {coins} 星币',
      'bestiary.title': '怪物图鉴',
      'bestiary.subtitle': '共 {total} 种，已讨伐 {slain} 种。',
      'boss.rewardChest': '宝箱',
      'boss.rewardFrame': '头像框',
      'boss.rewardGear': '装备',
      'boss.rewardTitle': '称号',
      'boss.seasonNumber': 'S{number} 赛季',
      'boss.cinder.name': '灰烬小鬼',
      'boss.cinder.lore': '它从每次失败的构建里爬出来，专咬刚修好的地方。',
      'boss.glitch.name': '故障幽灵',
      'boss.glitch.lore': '它在日志的缝隙里闪烁，让确定性短暂失效。',
      'boss.quill.name': '断墨鸦',
      'boss.quill.lore': '它偷走未写完的句子，在第二天早晨还给你一堆乱码。',
      'boss.sovereign.name': '时之冕',
      'boss.sovereign.lore': '赛季的主宰，用倒计时铸成王座。每一次行动都在削它的冠冕。',
      'boss.leviathan.name': '词海利维坦',
      'boss.leviathan.lore': '它游过所有未读的文档，吞下没有被引用的句子。',
      'boss.oracle.name': '零号先知',
      'boss.oracle.lore': '它声称看见了赛季的结局，却只肯透露下一个 commit。',
      'boss.static.name': '静电史莱姆',
      'boss.static.lore': '它在你碰到机箱时爬出来，把一切都粘在地毯上。',
      'boss.cache.name': '缓存蜘蛛',
      'boss.cache.lore': '它把昨天的结果织成网，专等你相信那张网。',
      'boss.null.name': '空指针',
      'boss.null.lore': '它指向不存在的地方，然后理直气壮地崩溃。',
      'boss.regression.name': '回归巨龙',
      'boss.regression.lore': '每一版新功能都会唤醒它，它只吃老功能。',
      'boss.dependency.name': '依赖漩涡',
      'boss.dependency.lore': '它把整个生态卷进去，再问你为什么不能升级。',
      'boss.deadlock.name': '死锁骑士',
      'boss.deadlock.lore': '两个线程互相等对方先动，它就在旁边看着。',
      'boss.entropy.name': '熵之君主',
      'boss.entropy.lore': '它不攻击你，只是让一切慢慢变乱。',
      'boss.mirror.name': '镜像之神',
      'boss.mirror.lore': '它复制你的架构，也复制你的技术债。',
      'boss.shadow.name': '影子进程',
      'boss.shadow.lore': '它一直在后台跑，没人知道它在算什么。',
      'boss.deadcode.name': '死代码',
      'boss.deadcode.lore': '没有人调用它，但它还占着整个角落。',
      'boss.lint.name': '格式审查官',
      'boss.lint.lore': '它不关心逻辑，只关心你少了一个空格。',
      'boss.legacy.name': '遗留系统',
      'boss.legacy.lore': '没人敢动它，因为动它的人都没回来。',
      'boss.outage.name': '宕机风暴',
      'boss.outage.lore': '它来的时候所有仪表盘一起变红。',
      'boss.voidking.name': '虚空之王',
      'boss.voidking.lore': '赛季尽头的那片空白，戴着王冠。',
      'season.title': '赛季',
      'season.label': 'S{number} · {theme}',
      'season.remaining': '赛季剩余 {time}',
      'season.renown': '赛季声望',
      'season.renownValue': '{value}',
      'season.pass': '赛季通行证',
      'season.passHint': '用赛季声望解锁阶段奖励',
      'season.tier': '阶段 {n}',
      'season.claim': '领取',
      'season.claimed': '已领取',
      'season.locked': '未解锁',
      'season.progress': '{current} / {target}',
      'season.previous': '上赛季',
      'season.previousLine': 'S{number} · {theme} · {renown} 声望',
      'season.rankLabel': '段位',
      'season.rankNext': '距{rank}还差 {renown} 声望',
      'season.rankMax': '已达最高段位',
      'season.tierCount': '已领取 {claimed} / {total}',
      'season.rank.bronze': '青铜',
      'season.rank.silver': '白银',
      'season.rank.gold': '黄金',
      'season.rank.platinum': '铂金',
      'season.rank.astral': '星辉',
      'season.rank.legend': '传说',
      'season.rank.mythic': '神话',
      'title.seasonlegend.name': '赛季传说',
      'title.seasonlegend.desc': '在漫长的赛季通行证上走到最后的人。',
      'title.seasonmyth.name': '赛季神话',
      'title.seasonmyth.desc': '走完整条通行证，还继续往上爬的人。',
      'season.theme.ember': '余烬赛季',
      'season.theme.tide': '潮汐赛季',
      'season.theme.astral': '星辉赛季',
      'season.theme.verdant': '森语赛季',
      'season.chest': '赛季补给',
      'season.new': '新赛季开启',
      'activity.chest': '开启了{tier}',
      'activity.chestGear': '从{tier}中开出「{gear}」',
      'activity.season': 'S{number} 新赛季开启',
      'activity.season-tier': '领取了赛季阶段奖励',
      'activity.purchase-gear': '兑换了装备「{gear}」',
      'activity.source.dailyBoss': '每日悬赏',
      'activity.source.weeklyBoss': '每周灾厄',
      'activity.source.seasonBoss': '赛季主宰',
      'activity.source.boss': 'BOSS 讨伐',
      'activity.lines': ' · {lines} 行',
      'toast.chest': '开启{tier}：{rewards}',
      'toast.chestGear': '获得装备「{name}」',
      'toast.gearBought': '已兑换「{name}」',
      'toast.gearEquipped': '已装备「{name}」',
      'toast.seasonTier': '赛季阶段奖励已领取',
      'toast.noChest': '还没有可开启的宝箱。',
      'shop.gear': '装备与头像框',
      'shop.gearHint': '用星币直接兑换；也可以写代码开宝箱。',
      'shop.supply': '工坊补给',
      'shop.supplyHint': '直接用星币换宝箱，换完去工坊开。',
      'shop.buyChest': '兑换',
      'shop.chestFull': '宝箱堆满了',
      'toast.error.unknown-chest': '找不到这种宝箱。',
      'toast.error.chest-full': '宝箱堆满了，先开掉几个。',
      'toast.chestBought': '兑换了{tier}',
      'ach.first-chest.name': '第一口宝箱',
      'ach.first-chest.desc': '开启第一个工坊宝箱。',
      'ach.line-1000.name': '千行刻印',
      'ach.line-1000.desc': '累计写下 1000 行代码。',
      'ach.line-5000.name': '五千行史诗',
      'ach.line-5000.desc': '累计写下 5000 行代码。',
      'ach.daily-slayer.name': '日课终结',
      'ach.daily-slayer.desc': '首次讨伐每日 BOSS。',
      'ach.season-slayer.name': '赛季终章',
      'ach.season-slayer.desc': '首次讨伐赛季 BOSS。',
      'ach.gear-power.name': '全副武装',
      'ach.gear-power.desc': '装备战力达到 100。',
      'ach.tool-250.name': '百器成师',
      'ach.tool-250.desc': '完成 250 次成功工具调用。',
      'ach.tool-500.name': '千锤百炼',
      'ach.tool-500.desc': '完成 500 次成功工具调用。',
      'ach.line-10000.name': '万行长城',
      'ach.line-10000.desc': '累计写下 10000 行代码。',
      'ach.turn-100.name': '百回不倦',
      'ach.turn-100.desc': '完成 100 个回合。',
      'ach.gear-10.name': '第一套装备',
      'ach.gear-10.desc': '拥有 10 件装备。',
      'ach.gear-25.name': '军械库',
      'ach.gear-25.desc': '拥有 25 件装备。',
      'ach.gear-40.name': '装备博物馆',
      'ach.gear-40.desc': '拥有 40 件装备。',
      'ach.mythic-gear.name': '神话入手',
      'ach.mythic-gear.desc': '拥有第一件神话装备。',
      'ach.boss-10.name': '十战十胜',
      'ach.boss-10.desc': '累计讨伐 10 个 BOSS。',
      'ach.boss-25.name': '灾厄常客',
      'ach.boss-25.desc': '累计讨伐 25 个 BOSS。',
      'ach.rank-gold.name': '黄金段位',
      'ach.rank-gold.desc': '赛季段位到达黄金。',
      'ach.rank-legend.name': '传说之证',
      'ach.rank-legend.desc': '赛季段位到达传说。',
      'ach.streak-14.name': '两周不断',
      'ach.streak-14.desc': '连续 14 天有行动。',
      'ach.level-40.name': '四十级冒险者',
      'ach.level-40.desc': '等级到达 40。',
      'ach.level-60.name': '满级',
      'ach.level-60.desc': '等级到达 60。',
      'ach.paragon-1.name': '第一颗星',
      'ach.paragon-1.desc': '获得第一颗巅峰之星。',
      'ach.paragon-5.name': '五星巅峰',
      'ach.paragon-5.desc': '累计获得 5 颗巅峰之星。',
      'ach.red-gear.name': '第一件红装',
      'ach.red-gear.desc': '获得任意一件红装。',
      'ach.red-set.name': '赤焰全套',
      'ach.red-set.desc': '集齐四件红装。',
      'ach.enhance-10.name': '强化大师',
      'ach.enhance-10.desc': '把一件装备强化到 +10。',
      'ach.enhance-30.name': '强化匠人',
      'ach.enhance-30.desc': '把一件装备强化到 +30。',
      'ach.enhance-60.name': '强化宗师',
      'ach.enhance-60.desc': '把一件装备强化到 +60。',
      'ach.ascend-1.name': '初次进阶',
      'ach.ascend-1.desc': '首次进阶成功。',
      'ach.ascend-5.name': '圆满进阶',
      'ach.ascend-5.desc': '把一件装备进阶到第 5 阶。',
      'ach.story-10.name': '第十关',
      'ach.story-10.desc': '常规战线推进到第 10 关。',
      'ach.story-25.name': '破阵者',
      'ach.story-25.desc': '常规战线推进到第 25 关。',
      'ach.story-50.name': '征伐者',
      'ach.story-50.desc': '常规战线推进到第 50 关。',
      'ach.points-100.name': '成就百点',
      'ach.points-100.desc': '累计获得 100 成就点。',
      'ach.points-200.name': '成就两百点',
      'ach.points-200.desc': '累计获得 200 成就点。',
      'ach.boss-weapon.name': '屠龙者',
      'ach.boss-weapon.desc': '获得一把赛季 BOSS 专属武器。',
      'ach.gear-400.name': '战力四百',
      'ach.gear-400.desc': '装备战力达到 400。',
      'ach.gear-800.name': '战力八百',
      'ach.gear-800.desc': '装备战力达到 800。',
      'ach.paragon-10.name': '十星巅峰',
      'ach.paragon-10.desc': '获得 10 颗巅峰之星。',
      'ach.level-50.name': '五十级冒险者',
      'ach.level-50.desc': '等级到达 50。',
      'ach.titles-12.name': '称号大师',
      'ach.titles-12.desc': '拥有 12 个称号。',
      'ach.coins-20000.name': '两万星币',
      'ach.coins-20000.desc': '累计获得 20000 星币。',
      'ach.tools-1000.name': '千次调用',
      'ach.tools-1000.desc': '完成 1000 次工具调用。',
      'ach.titles-8.name': '称号收藏家',
      'ach.titles-8.desc': '拥有 8 个称号。',
      'ach.coins-5000.name': '五千星币',
      'ach.coins-5000.desc': '累计获得 5000 星币。',
      'common.back': '返回',
      'common.close': '关闭',
      'common.none': '—',
    }

    const EN = {
      'nav.title': 'DevQuest',
      'nav.subtitle': "Adventurer's Guild",
      'nav.open': "Open DevQuest Adventurer's Guild",
      'page.eyebrow': 'DEVQUEST · ADVENTURER LOG',
      'page.title': "Adventurer's Guild",
      'page.subtitle': 'Every tool call is a line in the epic.',
      'page.back': 'Back to chat',
      'page.editName': 'Edit adventurer name',
      'page.renameHint': '1–20 characters. Press Enter to save.',
      'page.renameSave': 'Save',
      'page.renameCancel': 'Cancel',
      'page.loading': 'Reading your adventure log…',
      'page.error': 'The adventure log is unavailable',
      'page.retry': 'Retry',
      'page.offline': 'Lost the Host connection. Retrying…',
      'page.live': 'Live',
      'page.updated': 'Updated {time}',
      'tab.overview': 'Overview',
      'tab.quests': 'Quests',
      'tab.achievements': 'Achievements',
      'tab.shop': 'Shop',
      'tab.chronicle': 'Chronicle',
      'hero.level': 'Level {level}',
      'hero.maxLevel': 'Lv.60 · max',
      'paragon.stars': 'Paragon stars ×{stars}',
      'paragon.peak': 'Peak reached · transcendence skin unlocked',
      'paragon.capped': 'Peak ten · maxed',
      'rebirth.lives': 'Rebirth {lives}',
      'rebirth.bonus': 'Damage +{damage}% · XP +{xp}%',
      'rebirth.ready': 'Rebirth',
      'rebirth.confirm': 'Rebirth? Level and peak reset to zero',
      'rebirth.done': 'Rebirth {lives}: +{coins} coins, damage +{damage}%, XP +{xp}%',
      'title.rebirth1.name': 'First life',
      'title.rebirth2.name': 'Second life',
      'title.rebirth3.name': 'Third life',
      'title.rebirth4.name': 'Fourth life',
      'title.rebirth5.name': 'Endless lives',
      'paragon.line': 'Every 20,000 XP is one star; the next pays +{coins} coins',
      'paragon.toNext': '{xp} XP to the next star',
      'hero.toNext': '{xp} XP to the next level',
      'hero.xp': '{current} / {next} XP',
      'hero.streak': 'Streak',
      'hero.streakValue': '{days} days',
      'hero.coins': 'Star coins',
      'hero.achievements': 'Achievements',
      'hero.achievementValue': '{unlocked} / {total}',
      'hero.boss': 'Weekly calamity',
      'hero.bossDone': 'Defeated',
      'hero.title': 'Equipped title',
      'hero.editName': 'Edit name',
      'overview.quests': "Today's quests",
      'overview.questsHint': 'Act in the world, claim XP and coins',
      'overview.openQuests': 'View all',
      'overview.progress': '{done} / {total} complete',
      'overview.activity': 'Adventure chronicle',
      'overview.activityHint': 'Generated live from the Session event stream',
      'overview.openChronicle': 'View all',
      'overview.emptyActivity': 'No footprints yet. Make a tool call.',
      'overview.class': 'Class specialization',
      'overview.classHint': 'Your behaviour shapes your class',
      'overview.boss': 'Weekly boss',
      'overview.bossHint': 'Ends in {time}',
      'overview.stats': 'Adventure stats',
      'overview.party': 'Agent party',
      'overview.partyHint': 'Sessions that adventure beside you',
      'overview.partyEmpty': 'Finish a conversation and your first companion appears here.',
      'overview.recentAchievements': 'Recently unlocked',
      'overview.noAchievements': 'No achievements yet',
      'stat.turns': 'Turns',
      'stat.tools': 'Tool calls',
      'stat.writes': 'Files written',
      'stat.reads': 'Files read',
      'stat.searches': 'Web journeys',
      'stat.todos': 'Lists cleared',
      'stat.subagents': 'Subagents',
      'stat.workflows': 'Workflows',
      'stat.shellRuns': 'Shell runs',
      'stat.tokens': 'Thought tokens',
      'stat.toolErrors': 'Setbacks',
      'stat.recoveries': 'Comebacks',
      'stat.daysActive': 'Active days',
      'stat.bestStreak': 'Best streak',
      'quests.daily': 'Daily commissions',
      'quests.weekly': 'Weekly trials',
      'quests.dailyHint': 'Resets at 00:00 · {time} left',
      'quests.weeklyHint': 'Resets Monday 00:00 · {time} left',
      'quests.claim': 'Claim',
      'quests.claimed': 'Claimed',
      'quests.incomplete': 'In progress',
      'quests.claimAll': 'Claim all',
      'quests.reward': '{xp} XP · {coins} coins',
      'quests.progress': '{current} / {target}',
      'quests.complete': 'Ready',
      'q.tools.name': 'Swing the tools',
      'q.tools.desc': 'Complete {target} successful tool calls.',
      'q.turns.name': 'Advance the turn',
      'q.turns.desc': 'Complete {target} agent turns.',
      'q.writes.name': 'Carve the files',
      'q.writes.desc': 'Write or edit {target} files.',
      'q.reads.name': 'Read the archives',
      'q.reads.desc': 'Read files, directories or search results {target} times.',
      'q.todos.name': 'Clear the list',
      'q.todos.desc': 'Finish {target} todo lists.',
      'q.search.name': 'Journey outward',
      'q.search.desc': 'Complete {target} web searches or fetches.',
      'q.distinct.name': 'Many disciplines',
      'q.distinct.desc': 'Use {target} different tools.',
      'q.xp.name': 'Gather experience',
      'q.xp.desc': 'Earn {target} XP in this period.',
      'q.subagents.name': 'Call the companions',
      'q.subagents.desc': 'Complete {target} subagent tasks.',
      'ach.title': 'Hall of achievements',
      'ach.subtitle': '{unlocked} of {total} unlocked',
      'ach.filter.all': 'All',
      'ach.filter.unlocked': 'Unlocked',
      'ach.filter.locked': 'Locked',
      'ach.unlockedAt': 'Unlocked {time}',
      'ach.locked': 'Locked',
      'ach.rarity.common': 'Common',
      'ach.rarity.rare': 'Rare',
      'ach.rarity.epic': 'Epic',
      'ach.rarity.legendary': 'Legendary',
      'ach.rarity.mythic': 'Mythic',
      'ach.rarity.red': 'Red',
      'ach.rarity.ancient': 'Ancient',
      'ach.rarity.divine': 'Divine',
      'ach.rarity.transcendent': 'Transcendent',
      'ach.reward': '+{coins} coins',
      'ach.arrival.name': 'Through the door',
      'ach.arrival.desc': 'Open the Adventurer’s Guild for the first time.',
      'ach.first-turn.name': 'First turn',
      'ach.first-turn.desc': 'Complete your first agent turn.',
      'ach.first-tool.name': 'First draw',
      'ach.first-tool.desc': 'Complete your first successful tool call.',
      'ach.reader.name': 'Well read',
      'ach.reader.desc': 'Read files or directories 10 times.',
      'ach.explorer.name': 'Tool collector',
      'ach.explorer.desc': 'Use 5 different tools.',
      'ach.streak-3.name': 'Three days running',
      'ach.streak-3.desc': 'Adventure for 3 days in a row.',
      'ach.dawn.name': 'Dawnbreaker',
      'ach.dawn.desc': 'Make a successful tool call between 05:00 and 07:59.',
      'ach.level-5.name': 'Apprentice',
      'ach.level-5.desc': 'Reach level 5.',
      'ach.scribe.name': 'Inscriber',
      'ach.scribe.desc': 'Write or edit 10 files.',
      'ach.polyglot.name': 'Polyglot',
      'ach.polyglot.desc': 'Use 10 different tools.',
      'ach.quest-clear.name': 'Inbox zero',
      'ach.quest-clear.desc': 'Clear your first todo list.',
      'ach.delegator.name': 'Summoner',
      'ach.delegator.desc': 'Complete 3 subagent tasks.',
      'ach.streak-7.name': 'Weeklong expedition',
      'ach.streak-7.desc': 'Adventure for 7 days in a row.',
      'ach.night-owl.name': 'Night owl',
      'ach.night-owl.desc': 'Make a successful tool call between 00:00 and 04:59.',
      'ach.phoenix.name': 'Phoenix',
      'ach.phoenix.desc': 'Recover from a failed tool call 3 times.',
      'ach.level-10.name': 'Veteran',
      'ach.level-10.desc': 'Reach level 10.',
      'ach.rich.name': 'Vault echo',
      'ach.rich.desc': 'Earn 500 star coins in total.',
      'ach.collector.name': 'Curator',
      'ach.collector.desc': 'Own 4 titles.',
      'ach.lucky-star.name': 'Friend of fate',
      'ach.lucky-star.desc': 'Draw from fate 7 times.',
      'ach.webwalker.name': 'Frontier courier',
      'ach.webwalker.desc': 'Complete 10 web searches or fetches.',
      'ach.tinker.name': 'Terminal artisan',
      'ach.tinker.desc': 'Run 10 shell commands.',
      'ach.shopaholic.name': 'Collector’s habit',
      'ach.shopaholic.desc': 'Buy 3 titles from the shop.',
      'ach.centurion.name': 'Hundredfold',
      'ach.centurion.desc': 'Complete 100 successful tool calls.',
      'ach.quest-master.name': 'List master',
      'ach.quest-master.desc': 'Finish 5 todo lists.',
      'ach.director.name': 'Director',
      'ach.director.desc': 'Complete 3 workflows.',
      'ach.level-20.name': 'Legend',
      'ach.level-20.desc': 'Reach level 20.',
      'ach.marathon.name': 'Long haul',
      'ach.marathon.desc': 'Complete 50 agent turns.',
      'ach.season-one.name': 'Season one',
      'ach.season-one.desc': 'Claim a weekly trial reward.',
      'ach.boss-slayer.name': "Calamity's end",
      'ach.boss-slayer.desc': 'Defeat your first weekly boss.',
      'ach.level-30.name': 'Starlit traveler',
      'ach.level-30.desc': 'Reach level 30.',
      'ach.boss-veteran.name': 'Thrice a kingkiller',
      'ach.boss-veteran.desc': 'Defeat 3 weekly bosses.',
      'shop.title': 'Season shop',
      'shop.subtitle': 'Spend star coins on titles for your adventurer card.',
      'shop.balance': 'Balance',
      'shop.buy': 'Buy',
      'shop.equip': 'Equip',
      'shop.equipped': 'Equipped',
      'shop.owned': 'Owned',
      'shop.insufficient': 'Not enough coins',
      'shop.inventory': 'Your titles',
      'shop.inventoryHint': 'Select a title to equip it',
      'shop.price': '{coins} coins',
      'shop.buySuccess': 'Bought “{title}”',
      'shop.equipSuccess': 'Equipped “{title}”',
      'shop.lotteryHint': 'Once a day, let fate add a little surprise.',
      'title.novice.name': 'Newcomer',
      'title.novice.desc': 'You just pushed the guild door open. The story starts here.',
      'title.wanderer.name': 'Border wanderer',
      'title.wanderer.desc': 'Dust in the cloak, a folded map in the pocket.',
      'title.starfarer.name': 'Starfarer',
      'title.starfarer.desc': 'Not chasing roads, only the brightest point in the night.',
      'title.bughunter.name': 'Bug hunter',
      'title.bughunter.desc': 'Follows the tracks of anomalies and nails chaos back to cause.',
      'title.nightforge.name': 'Nightforger',
      'title.nightforge.desc': 'While others sleep, turns code into a blade.',
      'title.architect.name': 'Dream architect',
      'title.architect.desc': 'Builds structures for ideas, not just files for code.',
      'title.orchestrator.name': 'Conductor',
      'title.orchestrator.desc': 'Keeps many agents in tune and turns complexity into an ensemble.',
      'title.seasonchamp.name': 'Season champion',
      'title.seasonchamp.desc': 'This season’s legend ends with your name.',
      'title.evergreen.name': 'Evergreen',
      'title.evergreen.desc': 'Whatever the project turns into, you are still here.',
      'title.mythweaver.name': 'Myth weaver',
      'title.peak.name': 'Peak',
      'title.transcend.name': 'Transcendent',
      'title.boundless.name': 'Boundless',
      'title.eternalpeak.name': 'Eternal peak',
      'title.crimson.name': 'Crimson flame',
      'title.pathfinder.name': 'Pathfinder',
      'title.conqueror.name': 'Conqueror',
      'title.dragonslayer.name': 'Dragonslayer',
      'title.warlord.name': 'Warlord',
      'title.mythweaver.desc': 'Spinning ordinary commits into legend.',
      'title.bossbane.name': 'Calamity’s bane',
      'title.bossbane.desc': 'The weekly boss’s nightmare, and a regular at the guild hall.',
      'title.legend.name': 'Starlit traveler',
      'title.legend.desc': 'At the end of the level road, you became the signpost.',
      'title.curator.name': 'Curator',
      'title.curator.desc': 'Every adventure gets a place in the cabinet, and a lamp.',
      'title.lucky.name': 'Fortune’s favorite',
      'title.lucky.desc': 'Even the random number generator lingers a second for you.',
      'class.title': 'Class specialization',
      'class.current': 'Current class',
      'class.tier.0': 'Seedling',
      'class.tier.1': 'Wayfarer',
      'class.tier.2': 'Expert',
      'class.tier.3': 'Master',
      'class.tier.4': 'Grandmaster',
      'class.tier.5': 'Legend',
      'class.tier.6': 'Mythic',
      'class.tier.7': 'Eternal',
      'class.level': 'Lv.{level}',
      'class.toNextLevel': '{xp} to level {level}',
      'class.toNextTier': '{xp} to “{tier}”',
      'class.maxTier': 'Top tier reached',
      'class.bonus': 'Class bonus · boss damage +{percent}%',
      'class.bonusShort': 'damage +{percent}%',
      'class.next': 'Your class is shaped live by what you do',
      'class.major': 'Major',
      'class.share': '{share}% of mastery',
      'class.radarLabel': 'Five-axis distribution',
      'class.novice.name': 'Newcomer',
      'class.novice.desc': 'Not enough footprints yet. Make a few more tool calls and fate will answer.',
      'class.ranger.name': 'Ranger',
      'class.ranger.desc': 'Measures the world with tools and reading. Quick on the path, clear in intent.',
      'class.artificer.name': 'Artificer',
      'class.artificer.desc': 'Carves ideas into files and makes code and commands into artifacts.',
      'class.scholar.name': 'Scholar',
      'class.scholar.desc': 'Verifies across the web and documents. Understand first, then act.',
      'class.commander.name': 'Commander',
      'class.commander.desc': 'Commands subagents and workflows, keeping many agents in one rhythm.',
      'class.debugger.name': 'Hexbreaker',
      'class.debugger.desc': 'Follows cause through failure and turns errors into maps for the next success.',
      'class.path.ranger': 'Explore',
      'class.path.ranger.hint': 'Tool calls ×1.2 · reads ×0.35 · turns ×0.6',
      'class.path.artificer.hint': 'Writes ×4 · lines ×0.18 · shell ×1.6 · gear power ×1.2',
      'class.path.scholar.hint': 'Searches ×5 · reads ×0.8 · tokens ÷6000',
      'class.path.commander.hint': 'Subagents ×16 · workflows ×26 · orchestrations ×2',
      'class.path.debugger.hint': 'Error recoveries ×18 · failed calls ×1.5',
      'class.path.artificer': 'Forge',
      'class.path.scholar': 'Learn',
      'class.path.commander': 'Command',
      'class.path.debugger': 'Insight',
      'boss.title': 'Weekly boss',
      'boss.hp': '{hp} / {max} HP',
      'boss.damage': '{damage} total damage',
      'boss.remaining': '{time} left',
      'boss.defeated': 'Defeated',
      'boss.claim': 'Claim spoils',
      'boss.claimed': 'Spoils claimed',
      'boss.reward': 'Reward: {xp} XP + {coins} coins + a title',
      'boss.alive': 'The calamity is still spreading',
      'boss.week': 'Week {week}',
      'boss.ashen.name': 'The Ashen Colossus',
      'boss.ashen.lore': 'Built from forgotten context, every step blurs the world. Keep moving and it takes shape.',
      'boss.echo.name': 'The Recursive Echo',
      'boss.echo.lore': 'The same question echoes through its chest. Break the loop with a different tool and find the only exit.',
      'boss.maw.name': 'The Word-Eater',
      'boss.maw.lore': 'It swallows unfinished sentences and half-made plans. Clear the todo list and its teeth fall out.',
      'boss.deadline.name': 'The Deadline Wyrm',
      'boss.deadline.lore': 'Its scales are cast from countdowns. Do not stare too long—finish a turn and cut one away.',
      'lottery.title': 'Daily fate draw',
      'lottery.subtitle': 'Once a day, let fate add a little surprise to the adventure.',
      'lottery.button': 'Turn fate',
      'lottery.again': 'Drawn today',
      'lottery.available': 'One draw available today',
      'lottery.resets': 'Resets in {time}',
      'lottery.result': 'Echo of fate',
      'lottery.prize.coins': 'Star coins ×{amount}',
      'lottery.prize.xp': 'XP +{amount}',
      'lottery.prize.title': 'Title “{title}”',
      'lottery.history': 'Recent draws',
      'activity.title': 'Adventure chronicle',
      'activity.subtitle': 'The last 30 stories generated from the event stream.',
      'activity.empty': 'No footprints yet.',
      'activity.tool': 'Called {tool}',
      'activity.toolTarget': 'Called {tool} · {target}',
      'activity.turn': 'Completed turn {turn}',
      'activity.todo': 'Cleared a {count}-item todo list',
      'activity.workflow': 'Completed workflow “{name}”',
      'activity.subagent': 'A subagent finished its task',
      'activity.achievement': 'Unlocked “{name}”',
      'activity.reward': 'Claimed a {source} reward',
      'activity.purchase': 'Bought the title “{title}”',
      'activity.lottery': 'Drew {prize}',
      'activity.bossDefeat': 'Defeated the weekly boss “{name}”',
      'activity.paragon': 'Reached paragon star ×{stars}',
      'activity.enhance': '{gear} enhanced to +{level}',
      'activity.toolError': 'Hit a setback in {tool}',
      'activity.welcome': 'Pushed open the Adventurer’s Guild door',
      'activity.unknown': 'Left a new footprint',
      'activity.source.daily': 'daily commission',
      'activity.source.weekly': 'weekly trial',
      'activity.source.boss': 'boss',
      'toast.achievement': 'Achievement unlocked: “{name}”',
      'toast.reward': 'Gained {xp} XP + {coins} coins',
      'toast.claimAll': 'Claimed {count} rewards: {xp} XP + {coins} coins',
      'toast.error.not-complete': 'This quest is not complete yet.',
      'toast.error.already-claimed': 'This reward has already been claimed.',
      'toast.error.already-drawn': 'Fate has already been drawn today.',
      'toast.error.not-enough-coins': 'Not enough star coins.',
      'toast.error.already-owned': 'You already own this title.',
      'toast.error.not-owned': 'You do not own this title yet.',
      'toast.error.boss-alive': 'The boss has not been defeated yet.',
      'toast.error.nothing-to-claim': 'There is nothing to claim.',
      'toast.error.invalid-name': 'The name must be 1–20 characters.',
      'toast.error.unknown-challenge': 'That quest could not be found.',
      'toast.error.no-chest': 'There is no chest to open.',
      'toast.error.unknown-gear': 'That piece of gear could not be found.',
      'toast.error.unknown-tier': 'That season stage could not be found.',
      'toast.error.unknown': 'The action did not complete. Try again.',
      'toast.error.network': 'Could not reach the Host. Try again shortly.',
      'toast.titleChanged': 'Adventurer name updated',
      'hud.open': "Open DevQuest Adventurer's Guild",
      'hud.move': 'Drag it anywhere',
      'hud.reset': 'double-click to reset',
      'hud.level': 'Lv.{level}',
      'hud.xp': '{current} / {next} XP',
      'hud.streak': '{days}-day streak',
      'hud.coins': '{coins}',
      'hud.quests': '{done}/{total} quests',
      'hud.boss': 'BOSS {percent}%',
      'hud.loading': 'Reading adventure log',
      'hud.error': 'DevQuest offline',
      'time.justNow': 'just now',
      'time.minutesAgo': '{n}m ago',
      'time.hoursAgo': '{n}h ago',
      'time.daysAgo': '{n}d ago',
      'time.today': 'Today',
      'time.yesterday': 'Yesterday',
      'time.remaining': '{days}d {hours}h',
      'time.remainingShort': '{hours}h {minutes}m',
      'party.agent': 'Agent {id}',
      'party.subagent': 'Subagent {id}',
      'party.active': 'Active',
      'party.idle': 'Idle',
      'party.xp': '{xp} XP',
      'party.tools': '{tools} tools',
      'party.turns': '{turns} turns',
      'tab.gear': 'Gear',
      'tab.bosses': 'Bosses',
      'hero.gearPower': '{power} power',
      'hero.season': 'S{number} · {theme}',
      'hero.chests': 'Chests',
      'hero.chestValue': '{count}',
      'overview.chests': 'Workshop chests',
      'overview.chestsHint': 'Every {lines} lines of code forges a chest',
      'overview.openGear': 'Gear & workshop',
      'overview.bosses': 'Boss overview',
      'overview.bossesHint': 'Daily, weekly and season calamities share your action damage',
      'overview.openBosses': 'Open boss board',
      'stat.lines': 'Lines written',
      'stat.chestsOpened': 'Chests opened',
      'q.lines.name': 'Carve the code',
      'q.lines.desc': 'Write {target} lines of code.',
      'gear.title': 'Gear & workshop',
      'gear.subtitle': 'Weapons, armor, charms and avatar frames. Gear power amplifies boss damage.',
      'gear.power': 'Power',
      'enhance.title': 'Enhance',
      'enhance.hint': '+2% power per level, up to +{max}',
      'ascend.title': 'Ascend',
      'ascend.short': 'Asc {tier}',
      'ascend.button': 'Ascend · {cost} ({rate}% chance)',
      'ascend.max': 'Fully ascended',
      'ascend.success': '{name} ascended, +25% power',
      'ascend.fail': 'Ascension failed, {cost} coins gone',
      'story.title': 'Regular front',
      'story.stage': 'Stage {stage}',
      'story.hint': 'Every action chips its HP. Health grows exponentially, so low power stalls here.',
      'story.reward': 'Clear for {coins} coins · {xp} XP',
      'story.next': 'Next stage {stage}: {name} · {hp} HP',
      'enhance.button': 'Enhance · {cost}',
      'enhance.max': 'Maxed',
      'enhance.success': '{name} enhanced',
      'synth.title': 'Synthesis',
      'synth.hint': 'Any five items of the same slot and rarity fuse into one item of the next rarity in that slot; spare copies go first and consumed pieces refund their enhancement coins.',
      'synth.pieces': '({pieces} kinds)',
      'synth.top': 'Top tier',
      'synth.none': 'Nothing to fuse yet',
      'synth.next': '→ {rarity} {slot}',
      'synth.button': 'Fuse ×{count}',
      'synth.result': 'Synthesised: {name}',
      'synth.refund': 'Refunded {coins} coins',
      'toast.error.not-enough-copies': 'You need five items of that slot and rarity.',
      'toast.error.unknown-slot': 'That slot cannot be fused.',
      'toast.error.max-rarity': 'Already the highest rarity.',
      'toast.error.no-target': 'No valid target.',
      'points.title': 'Achievement points',
      'points.hint': 'Red gear claimed {owned}/{total}',
      'points.exchange': 'Claim red gear · {cost} pts',
      'points.allOwned': 'Red set complete',
      'points.success': 'Red gear claimed: {name}',
      'points.locked': 'Not owned',
      'gear.slots': 'Equipment slots',
      'gear.weapon': 'Weapon',
      'gear.armor': 'Armor',
      'gear.charm': 'Charm',
      'gear.frame': 'Avatar frame',
      'gear.empty': 'Empty',
      'gear.inventory': 'Armory',
      'gear.inventoryHint': 'Select a piece to equip it. Frames also update the level crest and HUD.',
      'gear.equip': 'Equip',
      'gear.equipped': 'Equipped',
      'gear.owned': 'Owned',
      'gear.powerBonus': '{power} power',
      'gear.frameHint': 'Frames appear on the level crest, the HUD and your adventurer card.',
      'gear.buy': 'Buy',
      'gear.buySuccess': 'Acquired “{name}”',
      'gear.equipSuccess': 'Equipped “{name}”',
      'gear.notOwned': 'Not owned',
      'gear.source.chest': 'Chest',
      'gear.source.shop': 'Shop',
      'gear.source.boss': 'Boss',
      'gear.source.season': 'Season',
      'gear.source.starter': 'Starter',
      'gear.stat': 'Power',
      'gear.change': 'Change',
      'gear.changeSlot': 'Change {slot}',
      'gear.cosmetic': 'Cosmetic',
      'gear.pickTitle': 'Change {slot}',
      'gear.pickHint': 'Click an owned piece to equip it. Frames show up on the level crest immediately.',
      'gear.pickLocked': 'Not owned yet',
      'gear.frameChange': 'Change avatar frame',
      'arena.title': 'Pixel arena',
      'arena.subtitle': 'Every hit in here comes from real tool calls.',
      'arena.target.daily': 'Daily',
      'arena.target.weekly': 'Weekly',
      'arena.target.season': 'Season',
      'arena.you': 'You',
      'arena.hp': '{hp} / {max} HP',
      'arena.waiting': 'Waiting for the next action',
      'arena.victory': 'VICTORY',
      'arena.defeated': 'Defeated',
      'arena.claim': 'Claim spoils',
      'arena.claimed': 'Spoils claimed',
      'arena.powerSurge': 'Power +{power}',
      'arena.practice': 'Swing',
      'arena.practiceHint': 'Practice swing: plays the animation without dealing damage.',
      'arena.hint': 'Write, edit, finish a turn or clear a todo list to land a hit.',
      'levelup.kicker': 'LEVEL UP',
      'levelup.title': 'Level up',
      'levelup.sub': '+{gain} levels · new power online',
      'levelup.close': 'Keep adventuring',
      'gear.w.novice.name': 'Novice blade',
      'gear.w.novice.desc': 'Everyone’s first blade. The edge still hesitates.',
      'gear.w.quill.name': 'Inkfeather spear',
      'gear.w.quill.desc': 'Sharpened on every line of code you write.',
      'gear.w.forge.name': 'Molten wrench',
      'gear.w.forge.desc': 'Turns failed builds into sparks.',
      'gear.w.serpent.name': 'Recursive fang',
      'gear.w.serpent.desc': 'Grows one inch longer with every loop.',
      'gear.w.star.name': 'Starlight longbow',
      'gear.w.star.desc': 'Pulls distant goals into range.',
      'gear.w.calamity.name': 'Calamity’s edge',
      'gear.w.calamity.desc': 'A greatblade reforged from weekly boss fragments.',
      'gear.a.novice.name': 'Traveler’s coat',
      'gear.a.novice.desc': 'Wears well, gets dirty well, survives the first failure.',
      'gear.a.scribe.name': 'Archivist cloak',
      'gear.a.scribe.desc': 'There is always a freshly read file in the pocket.',
      'gear.a.terminal.name': 'Terminal plate',
      'gear.a.terminal.desc': 'An outer shell woven from commands.',
      'gear.a.night.name': 'Nightscale',
      'gear.a.night.desc': 'Blocks the noise while everyone else sleeps.',
      'gear.a.season.name': 'Season regalia',
      'gear.a.season.desc': 'Legendary armor embroidered with the current season sigil.',
      'gear.c.novice.name': 'Copper charm',
      'gear.c.novice.desc': 'Worth little, but it remembers why you set out.',
      'gear.c.luck.name': 'Fate dice',
      'gear.c.luck.desc': 'Every roll believes the next one will be better.',
      'gear.c.focus.name': 'Focus lens',
      'gear.c.focus.desc': 'Folds the noise into one clear beam.',
      'gear.c.void.name': 'Void echo',
      'gear.c.void.desc': 'Hears the next step where there is nothing at all.',
      'gear.c.crown.name': 'Crown shard',
      'gear.c.crown.desc': 'A splinter of authority torn from a boss.',
      'gear.f.novice.name': 'Wooden frame',
      'gear.f.novice.desc': 'A plain frame from your first day at the guild.',
      'gear.f.bronze.name': 'Bronze adventurer frame',
      'gear.f.bronze.desc': 'Carved with the first leg of the journey.',
      'gear.f.verdant.name': 'Verdant frame',
      'gear.f.verdant.desc': 'Vines grow slowly with your level.',
      'gear.f.starlight.name': 'Starlight frame',
      'gear.f.starlight.desc': 'A soft ring of stardust appears at night.',
      'gear.f.ember.name': 'Ember frame',
      'gear.f.ember.desc': 'Failures burned down to an ember around your portrait.',
      'gear.f.season.name': 'Season champion frame',
      'gear.f.season.desc': 'Reserved for the conqueror of the current season.',
      'gear.f.calamity.name': 'Calamity conqueror frame',
      'gear.f.calamity.desc': 'Every boss knows this frame.',
      'gear.w.aurora.name': 'Aurora verdict',
      'gear.w.aurora.desc': 'A blade of light honed through the longest season nights.',
      'gear.a.aurora.name': 'Aurora mantle',
      'gear.a.aurora.desc': 'The whole star belt sewn into the hem.',
      'gear.c.aurora.name': 'Aurora core',
      'gear.c.aurora.desc': 'A cold light that never goes out, showing the next step.',
      'gear.f.aurora.name': 'Aurora frame',
      'gear.f.aurora.desc': 'Only those who finish the pass get a portrait that glows.',
      'gear.w.gale.name': 'Gale shortbow',
      'gear.w.gale.desc': 'So light the wind practically draws it for you.',
      'gear.w.echo.name': 'Echo edge',
      'gear.w.echo.desc': 'Every swing rings again in the next one.',
      'gear.w.titan.name': 'Titan shard',
      'gear.w.titan.desc': 'A slice pared off a titan’s frame.',
      'gear.a.bulwark.name': 'Bulwark exosuit',
      'gear.a.bulwark.desc': 'A walking fortification built around you.',
      'gear.a.wyrm.name': 'Wyrm scale',
      'gear.a.wyrm.desc': 'Each scale remembers a rebuild that almost failed.',
      'gear.a.starweave.name': 'Starwoven plate',
      'gear.a.starweave.desc': 'Armor woven from the loose ends of a galaxy.',
      'gear.c.pulse.name': 'Pulse core',
      'gear.c.pulse.desc': 'Cheap, stable, never offline at the worst moment.',
      'gear.c.orbit.name': 'Orbit meter',
      'gear.c.orbit.desc': 'Keeps inspiration circling your train of thought.',
      'gear.c.singularity.name': 'Singularity eye',
      'gear.c.singularity.desc': 'Sees everything that has not been written yet.',
      'gear.f.echo.name': 'Echo frame',
      'gear.f.echo.desc': 'The border trembles slightly with your movements.',
      'gear.f.titan.name': 'Titan frame',
      'gear.f.titan.desc': 'Only someone who walked to the end of the pass can carry it.',
      'gear.w.nova.name': 'Nova greatblade',
      'gear.w.nova.desc': 'Cuts through an overloaded night sky.',
      'gear.a.eclipse.name': 'Eclipse plate',
      'gear.a.eclipse.desc': 'Wearing an entire solar eclipse.',
      'gear.c.eternity.name': 'Eternity core',
      'gear.c.eternity.desc': 'No maintenance, no stopping.',
      'gear.f.nova.name': 'Nova frame',
      'gear.f.nova.desc': 'A star caught mid-explosion, worn as a border.',
      'gear.w.frost.name': 'Frost edge',
      'gear.w.frost.desc': 'A thin frost never leaves the blade.',
      'gear.w.void.name': 'Void edge',
      'gear.w.void.desc': 'Briefly stops existing mid-swing.',
      'gear.w.storm.name': 'Storm fang',
      'gear.w.storm.desc': 'One hit tears a cumulonimbus open.',
      'gear.w.genesis.name': 'Genesis shard',
      'gear.w.genesis.desc': 'What was left when the first line of code broke.',
      'gear.a.aegis.name': 'Aegis coat',
      'gear.a.aegis.desc': 'A thin shell that keeps every error outside.',
      'gear.a.phoenix.name': 'Phoenix plumage',
      'gear.a.phoenix.desc': 'Burn once, grow back once.',
      'gear.a.genesis.name': 'Genesis plate',
      'gear.a.genesis.desc': 'The weight of a whole repository, pressed into cloth.',
      'gear.c.echo.name': 'Echo bell',
      'gear.c.echo.desc': 'Ring it and yesterday’s answer rings back.',
      'gear.c.prism.name': 'Prism',
      'gear.c.prism.desc': 'Splits one requirement into seven colours.',
      'gear.c.genesis.name': 'Genesis core',
      'gear.c.genesis.desc': 'Everything starts here, and folds back here.',
      'gear.f.storm.name': 'Storm frame',
      'gear.f.storm.desc': 'It is always thundering inside the border.',
      'gear.f.genesis.name': 'Genesis frame',
      'gear.f.transcend.name': 'Transcendence · eternal light',
      'gear.f.transcend.desc': 'A border only ten-star peaks ever see — the light comes from inside.',
      'gear.f.genesis.desc': 'The first frame ever drawn, set into a border.',
      'gear.w.rune.name': 'Rune staff',
      'gear.w.rune.desc': 'Every notch is a spell that once compiled.',
      'gear.a.bastion.name': 'Bastion shell',
      'gear.a.bastion.desc': 'Armour that carries a whole server on its back.',
      'gear.c.sigil.name': 'Rune sigil',
      'gear.c.sigil.desc': 'A small piece of protective logic, carved inside the wrist.',
      'gear.f.rune.name': 'Rune frame',
      'gear.f.rune.desc': 'A ring of symbols nobody can quite read.',
      'gear.w.abyss.name': 'Abyss edge',
      'gear.w.abyss.desc': 'Nobody knows what depth it was dredged from.',
      'gear.a.abyss.name': 'Abyss plate',
      'gear.a.abyss.desc': 'Wear it and you hear echoes from below the waterline.',
      'gear.c.abyss.name': 'Abyss core',
      'gear.c.abyss.desc': 'A black heart, still slowly beating.',
      'gear.f.abyss.name': 'Abyss frame',
      'gear.f.abyss.desc': 'There is no light in this border, only a deeper layer.',
      'gear.w.crimson.name': 'Crimson edge',
      'gear.w.crimson.desc': 'A bloodline that never fades runs down the blade.',
      'gear.a.crimson.name': 'Crimson scale',
      'gear.a.crimson.desc': 'Every scale looks like frozen flame.',
      'gear.c.crimson.name': 'Crimson heart',
      'gear.c.crimson.desc': 'A red core, still beating.',
      'gear.f.crimson.name': 'Crimson frame',
      'gear.f.crimson.desc': 'A ring of fire that never goes out.',
      'gear.w.sovereign.name': 'Crown blade',
      'gear.w.sovereign.desc': 'The shard of the blade left when the crown shattered.',
      'gear.w.leviathan.name': 'Tide spear',
      'gear.w.leviathan.desc': 'Still dripping when it was pulled out of the word-sea.',
      'gear.w.oracle.name': 'Prophecy staff',
      'gear.w.oracle.desc': 'The eye on its head is watching your next move.',
      'gear.w.entropy.name': 'Entropy edge',
      'gear.w.entropy.desc': 'Everything nearby ages while it swings.',
      'gear.w.mirror.name': 'Mirror twinblade',
      'gear.w.mirror.desc': 'Cut it and another you falls first.',
      'gear.w.voidking.name': 'Void fang',
      'gear.w.voidking.desc': 'A tooth bitten out of the blank.',
      'chest.title': 'Workshop chest',
      'chest.subtitle': 'Writing code fills the workshop. Every {lines} lines forges a chest.',
      'chest.progress': '{current} / {next} lines',
      'chest.totalLines': '{lines} lines total',
      'chest.count': 'Chests ×{count}',
      'chest.open': 'Open chest',
      'chest.empty': 'No chests yet',
      'chest.next': 'Next: {tier}',
      'chest.opened': '{count} opened',
      'chest.tier.wood': 'Wooden chest',
      'chest.tier.iron': 'Iron chest',
      'chest.tier.gold': 'Golden chest',
      'chest.tier.astral': 'Astral chest',
      'chest.reward': 'Chest reward',
      'chest.gear': 'Found “{name}”',
      'chest.duplicate': 'Duplicate converted to {coins} star coins',
      'chest.coins': 'Star coins +{coins}',
      'chest.xp': 'XP +{xp}',
      'chest.noGear': 'No gear this time',
      'chest.opening': 'Opening…',
      'chest.last': 'Last opened',
      'boss.title': 'Boss board',
      'boss.subtitle': 'Daily, weekly and season fronts all share your action damage.',
      'boss.kind.daily': 'Daily bounty',
      'boss.kind.weekly': 'Weekly calamity',
      'boss.kind.season': 'Season sovereign',
      'boss.kindHint.daily': 'Resets daily at 00:00',
      'boss.kindHint.weekly': 'Resets Monday at 00:00',
      'boss.kindHint.season': 'Resets when the season ends',
      'boss.reward': 'Reward',
      'boss.rewardLine': '{xp} XP · {coins} star coins',
      'bestiary.title': 'Monster codex',
      'bestiary.subtitle': '{slain} of {total} species defeated.',
      'boss.rewardChest': 'Chest',
      'boss.rewardFrame': 'Frame',
      'boss.rewardGear': 'Gear',
      'boss.rewardTitle': 'Title',
      'boss.seasonNumber': 'Season {number}',
      'boss.cinder.name': 'Cinder imp',
      'boss.cinder.lore': 'It crawls out of every failed build and bites the part you just fixed.',
      'boss.glitch.name': 'Glitch wraith',
      'boss.glitch.lore': 'It flickers in the gaps between logs and makes certainty briefly fail.',
      'boss.quill.name': 'Dry-ink raven',
      'boss.quill.lore': 'It steals unfinished sentences and returns a pile of mojibake the next morning.',
      'boss.sovereign.name': 'The Crown of Hours',
      'boss.sovereign.lore': 'The season’s sovereign, throned on countdowns. Every action chips its crown.',
      'boss.leviathan.name': 'Word-Sea Leviathan',
      'boss.leviathan.lore': 'It swims through every unread document and swallows uncited sentences.',
      'boss.oracle.name': 'Oracle Zero',
      'boss.oracle.lore': 'It claims to have seen the season’s ending, but only reveals the next commit.',
      'boss.static.name': 'Static slime',
      'boss.static.lore': 'It crawls out the moment you touch the case and glues everything to the rug.',
      'boss.cache.name': 'Cache spider',
      'boss.cache.lore': 'Weaves yesterday’s results into a web, then waits for you to trust it.',
      'boss.null.name': 'Null pointer',
      'boss.null.lore': 'Points at nothing, then crashes with total confidence.',
      'boss.regression.name': 'Regression wyrm',
      'boss.regression.lore': 'Every new feature wakes it; it only eats old ones.',
      'boss.dependency.name': 'Dependency maelstrom',
      'boss.dependency.lore': 'Swallows the whole ecosystem, then asks why you cannot upgrade.',
      'boss.deadlock.name': 'Deadlock knight',
      'boss.deadlock.lore': 'Two threads wait for each other to move; it just watches.',
      'boss.entropy.name': 'Entropy sovereign',
      'boss.entropy.lore': 'It never attacks, it just lets everything drift into disorder.',
      'boss.mirror.name': 'Mirror deity',
      'boss.mirror.lore': 'Copies your architecture, and your technical debt with it.',
      'boss.shadow.name': 'Shadow process',
      'boss.shadow.lore': 'It has been running in the background; nobody knows what it computes.',
      'boss.deadcode.name': 'Dead code',
      'boss.deadcode.lore': 'Nobody calls it, yet it still occupies a whole corner.',
      'boss.lint.name': 'Format inquisitor',
      'boss.lint.lore': 'It does not care about logic, only about your missing space.',
      'boss.legacy.name': 'Legacy system',
      'boss.legacy.lore': 'Nobody dares touch it, because everyone who did never came back.',
      'boss.outage.name': 'Outage storm',
      'boss.outage.lore': 'Every dashboard turns red at once when it arrives.',
      'boss.voidking.name': 'Void king',
      'boss.voidking.lore': 'The blank space at the end of the season, wearing a crown.',
      'season.title': 'Season',
      'season.label': 'S{number} · {theme}',
      'season.remaining': '{time} left in the season',
      'season.renown': 'Season renown',
      'season.renownValue': '{value}',
      'season.pass': 'Season pass',
      'season.passHint': 'Spend season renown to unlock stage rewards',
      'season.tier': 'Stage {n}',
      'season.claim': 'Claim',
      'season.claimed': 'Claimed',
      'season.locked': 'Locked',
      'season.progress': '{current} / {target}',
      'season.previous': 'Previous season',
      'season.previousLine': 'S{number} · {theme} · {renown} renown',
      'season.rankLabel': 'Rank',
      'season.rankNext': '{renown} renown to {rank}',
      'season.rankMax': 'Highest rank reached',
      'season.tierCount': 'Claimed {claimed} / {total}',
      'season.rank.bronze': 'Bronze',
      'season.rank.silver': 'Silver',
      'season.rank.gold': 'Gold',
      'season.rank.platinum': 'Platinum',
      'season.rank.astral': 'Astral',
      'season.rank.legend': 'Legend',
      'season.rank.mythic': 'Mythic',
      'title.seasonlegend.name': 'Season legend',
      'title.seasonlegend.desc': 'For those who walked the whole season pass to its end.',
      'title.seasonmyth.name': 'Season myth',
      'title.seasonmyth.desc': 'For those who finished the pass and kept climbing.',
      'season.theme.ember': 'Ember season',
      'season.theme.tide': 'Tide season',
      'season.theme.astral': 'Astral season',
      'season.theme.verdant': 'Verdant season',
      'season.chest': 'Season supply',
      'season.new': 'New season',
      'activity.chest': 'Opened a {tier}',
      'activity.chestGear': 'Pulled “{gear}” from a {tier}',
      'activity.season': 'Season S{number} began',
      'activity.season-tier': 'Claimed a season stage reward',
      'activity.purchase-gear': 'Bought gear “{gear}”',
      'activity.source.dailyBoss': 'daily bounty',
      'activity.source.weeklyBoss': 'weekly calamity',
      'activity.source.seasonBoss': 'season sovereign',
      'activity.source.boss': 'boss',
      'activity.lines': ' · {lines} lines',
      'toast.chest': 'Opened {tier}: {rewards}',
      'toast.chestGear': 'Found “{name}”',
      'toast.gearBought': 'Acquired “{name}”',
      'toast.gearEquipped': 'Equipped “{name}”',
      'toast.seasonTier': 'Season stage reward claimed',
      'toast.noChest': 'There is no chest to open.',
      'shop.gear': 'Gear & avatar frames',
      'shop.gearHint': 'Buy with star coins, or write code to forge chests.',
      'shop.supply': 'Workshop supply',
      'shop.supplyHint': 'Trade star coins for chests, then open them in the workshop.',
      'shop.buyChest': 'Buy',
      'shop.chestFull': 'Chest storage full',
      'toast.error.unknown-chest': 'That chest tier does not exist.',
      'toast.error.chest-full': 'Chest storage is full. Open a few first.',
      'toast.chestBought': 'Bought a {tier}',
      'ach.first-chest.name': 'First chest',
      'ach.first-chest.desc': 'Open your first workshop chest.',
      'ach.line-1000.name': 'A thousand lines',
      'ach.line-1000.desc': 'Write 1,000 lines of code.',
      'ach.line-5000.name': 'Five thousand lines',
      'ach.line-5000.desc': 'Write 5,000 lines of code.',
      'ach.daily-slayer.name': 'Daily breaker',
      'ach.daily-slayer.desc': 'Defeat a daily boss for the first time.',
      'ach.season-slayer.name': 'Season finale',
      'ach.season-slayer.desc': 'Defeat a season boss for the first time.',
      'ach.gear-power.name': 'Full kit',
      'ach.gear-power.desc': 'Reach 100 gear power.',
      'ach.tool-250.name': 'Toolsmith',
      'ach.tool-250.desc': 'Complete 250 successful tool calls.',
      'ach.tool-500.name': 'Forged in calls',
      'ach.tool-500.desc': 'Complete 500 successful tool calls.',
      'ach.line-10000.name': 'Ten-thousand-line wall',
      'ach.line-10000.desc': 'Write 10,000 lines of code.',
      'ach.turn-100.name': 'Hundred turns',
      'ach.turn-100.desc': 'Finish 100 turns.',
      'ach.gear-10.name': 'First kit',
      'ach.gear-10.desc': 'Own 10 pieces of gear.',
      'ach.gear-25.name': 'Armory',
      'ach.gear-25.desc': 'Own 25 pieces of gear.',
      'ach.gear-40.name': 'Museum',
      'ach.gear-40.desc': 'Own 40 pieces of gear.',
      'ach.mythic-gear.name': 'Mythic touch',
      'ach.mythic-gear.desc': 'Own your first mythic item.',
      'ach.boss-10.name': 'Ten for ten',
      'ach.boss-10.desc': 'Defeat 10 bosses.',
      'ach.boss-25.name': 'Calamity regular',
      'ach.boss-25.desc': 'Defeat 25 bosses.',
      'ach.rank-gold.name': 'Gold rank',
      'ach.rank-gold.desc': 'Reach the gold season rank.',
      'ach.rank-legend.name': 'Proof of legend',
      'ach.rank-legend.desc': 'Reach the legend season rank.',
      'ach.streak-14.name': 'Two weeks running',
      'ach.streak-14.desc': 'Stay active 14 days in a row.',
      'ach.level-40.name': 'Level 40 adventurer',
      'ach.level-40.desc': 'Reach level 40.',
      'ach.level-60.name': 'Max level',
      'ach.level-60.desc': 'Reach level 60.',
      'ach.paragon-1.name': 'First star',
      'ach.paragon-1.desc': 'Earn your first paragon star.',
      'ach.paragon-5.name': 'Five-star peak',
      'ach.paragon-5.desc': 'Earn 5 paragon stars.',
      'ach.red-gear.name': 'First red piece',
      'ach.red-gear.desc': 'Own any red gear.',
      'ach.red-set.name': 'Crimson set',
      'ach.red-set.desc': 'Own all four red pieces.',
      'ach.enhance-10.name': 'Enhancement master',
      'ach.enhance-10.desc': 'Enhance one item to +10.',
      'ach.enhance-30.name': 'Enhancement artisan',
      'ach.enhance-30.desc': 'Enhance one item to +30.',
      'ach.enhance-60.name': 'Enhancement grandmaster',
      'ach.enhance-60.desc': 'Enhance one item to +60.',
      'ach.ascend-1.name': 'First ascension',
      'ach.ascend-1.desc': 'Succeed at an ascension.',
      'ach.ascend-5.name': 'Full ascension',
      'ach.ascend-5.desc': 'Ascend one item to tier 5.',
      'ach.story-10.name': 'Stage ten',
      'ach.story-10.desc': 'Push the regular front to stage 10.',
      'ach.story-25.name': 'Line breaker',
      'ach.story-25.desc': 'Push the regular front to stage 25.',
      'ach.story-50.name': 'Conqueror',
      'ach.story-50.desc': 'Push the regular front to stage 50.',
      'ach.points-100.name': 'Hundred points',
      'ach.points-100.desc': 'Earn 100 achievement points.',
      'ach.points-200.name': 'Two hundred points',
      'ach.points-200.desc': 'Earn 200 achievement points.',
      'ach.boss-weapon.name': 'Dragonslayer',
      'ach.boss-weapon.desc': 'Obtain a season boss signature weapon.',
      'ach.gear-400.name': 'Power 400',
      'ach.gear-400.desc': 'Reach 400 gear power.',
      'ach.gear-800.name': 'Power 800',
      'ach.gear-800.desc': 'Reach 800 gear power.',
      'ach.paragon-10.name': 'Ten stars',
      'ach.paragon-10.desc': 'Earn 10 paragon stars.',
      'ach.level-50.name': 'Level 50 adventurer',
      'ach.level-50.desc': 'Reach level 50.',
      'ach.titles-12.name': 'Title master',
      'ach.titles-12.desc': 'Own 12 titles.',
      'ach.coins-20000.name': 'Twenty thousand coins',
      'ach.coins-20000.desc': 'Earn 20,000 star coins.',
      'ach.tools-1000.name': 'Thousand calls',
      'ach.tools-1000.desc': 'Complete 1,000 tool calls.',
      'ach.titles-8.name': 'Title collector',
      'ach.titles-8.desc': 'Own 8 titles.',
      'ach.coins-5000.name': 'Five thousand coins',
      'ach.coins-5000.desc': 'Earn 5,000 star coins.',
      'common.back': 'Back',
      'common.close': 'Close',
      'common.none': '—',
    }

    // Hand-named highlights inside the bulk families; the host marks the same
    // ids with a small power edge.
    const SIGNATURE_GEAR = {
      'w.elderdragon': { zh: '烬齿', en: 'Elder fang', dzh: '古龙最后脱落的那颗牙，边缘至今还是红的。', den: 'The last tooth an elder dragon shed; its edge is still red.' },
      'a.elderdragon': { zh: '脊鳞', en: 'Spine scale', dzh: '整条龙脊的鳞片缝成的一件甲。', den: 'Armour stitched from the scales along a dragon spine.' },
      'c.elderdragon': { zh: '心火', en: 'Heart ember', dzh: '从龙心里取出来的一簇火，至今没熄。', den: 'An ember taken from a dragon heart, still burning.' },
      'w.beyond': { zh: '坠星', en: 'Fallen star', dzh: '从天空之外掉下来的那一段光。', den: 'A shard of light that fell from beyond the sky.' },
      'a.beyond': { zh: '陨甲', en: 'Meteor plate', dzh: '烧穿大气层还没融尽的外壳。', den: 'A shell that survived the atmosphere without melting.' },
      'w.divine': { zh: '黎明裁决', en: 'Dawn verdict', dzh: '斩下去的那一瞬，天色会亮一瞬。', den: 'For one instant when it falls, the sky brightens.' },
      'a.divine': { zh: '圣座', en: 'Holy throne', dzh: '从圣座上拆下来的金属，穿在身上。', den: 'Metal pried off a holy throne, worn as armour.' },
      'c.divine': { zh: '圣辉心', en: 'Radiant heart', dzh: '一颗不会熄灭的白色心脏。', den: 'A white heart that never goes out.' },
      'w.judgement': { zh: '终末之刻', en: 'Final hour', dzh: '钟声响起的那一刻，被锻进了刃里。', den: 'The hour the bell rang, hammered into the blade.' },
      'f.judgement': { zh: '天秤框', en: 'Scales frame', dzh: '边框里浮着一架永远平衡的天秤。', den: 'A pair of scales floats in this border, always level.' },
      'w.dragonscale': { zh: '龙鳞·裂空', en: 'Dragonscale · Skyrend', dzh: '鳞片顺着刃口长，挥出去像龙抬头。', den: 'Scales run along the edge; a swing looks like a dragon rising.' },
      'w.starfall': { zh: '星陨·夜航', en: 'Starfall · Nightvoyage', dzh: '夜里挥动会拉出一道星轨。', den: 'Swinging it at night leaves a trail of stars.' },
      'a.moonlight': { zh: '月华·镜衣', en: 'Moonlight · Mirrorweave', dzh: '月光落在上面会被折成两半。', den: 'Moonlight falling on it splits in two.' },
      'c.mithril': { zh: '秘银·银芯', en: 'Mithril · Silvercore', dzh: '一层银色的芯，凉得像井水。', den: 'A silver core, cold as well water.' },
      'w.voidwalk': { zh: '虚空·无声', en: 'Void · Hush', dzh: '它划过的地方，连声音都会晚半拍。', den: 'Sound arrives half a beat late where it passes.' },
      'c.oracleblade': { zh: '神谕·第三只眼', en: 'Oracle · Third eye', dzh: '它闭着，但它一直在看。', den: 'It is shut, and it never stops watching.' },
      'a.titanrock': { zh: '泰坦·石心甲', en: 'Titan · Stoneheart', dzh: '整块山岩凿出来的胸甲，重得让人踏实。', den: 'A breastplate carved from one slab of mountain.' },
      'w.starcore': { zh: '星核·引力', en: 'Starcore · Gravity', dzh: '刃口附近的光会往它那里弯。', den: 'Light bends toward the edge.' },
      'c.apocalypse': { zh: '天启·余烬', en: 'Apocalypse · Embers', dzh: '一切结束之后，还剩这一点点温度。', den: 'After everything ended, this little warmth was left.' },
      'f.divine': { zh: '神圣·晨光框', en: 'Divine · Daybreak frame', dzh: '边框里永远是清晨六点的光。', den: 'The border always holds six-in-the-morning light.' },
    }
    const BULK_FAMILIES = [
      { key: 'roughiron', tier: 'common', zh: '粗铁', en: 'Rough iron' },
      { key: 'oldoak', tier: 'common', zh: '旧木', en: 'Old oak' },
      { key: 'linen', tier: 'common', zh: '麻布', en: 'Linen' },
      { key: 'stonechip', tier: 'common', zh: '石片', en: 'Stone chip' },
      { key: 'finesteel', tier: 'rare', zh: '精钢', en: 'Fine steel' },
      { key: 'silverwire', tier: 'rare', zh: '银线', en: 'Silver wire' },
      { key: 'hardhide', tier: 'rare', zh: '硬革', en: 'Hardened hide' },
      { key: 'brassmark', tier: 'rare', zh: '铜纹', en: 'Brass' },
      { key: 'mithril', tier: 'epic', zh: '秘银', en: 'Mithril' },
      { key: 'stardust', tier: 'epic', zh: '星尘', en: 'Stardust' },
      { key: 'deepsea', tier: 'epic', zh: '深海', en: 'Deep sea' },
      { key: 'amethyst', tier: 'epic', zh: '紫晶', en: 'Amethyst' },
      { key: 'dragonscale', tier: 'legendary', zh: '龙鳞', en: 'Dragonscale' },
      { key: 'starfall', tier: 'legendary', zh: '星陨', en: 'Starfall' },
      { key: 'moonlight', tier: 'legendary', zh: '月华', en: 'Moonlight' },
      { key: 'crimsongold', tier: 'legendary', zh: '赤金', en: 'Crimson gold' },
      { key: 'voidwalk', tier: 'mythic', zh: '虚空', en: 'Void' },
      { key: 'dream', tier: 'mythic', zh: '幻梦', en: 'Dream' },
      { key: 'eternalnight', tier: 'mythic', zh: '永夜', en: 'Eternal night' },
      { key: 'oracleblade', tier: 'mythic', zh: '神谕', en: 'Oracle' },
      { key: 'ancient', tier: 'ancient', zh: '远古', en: 'Ancient' },
      { key: 'primordial', tier: 'ancient', zh: '洪荒', en: 'Primordial' },
      { key: 'titanrock', tier: 'ancient', zh: '泰坦', en: 'Titan' },
      { key: 'starcore', tier: 'ancient', zh: '星核', en: 'Star core' },
      { key: 'elderdragon', tier: 'ancient', zh: '古龙', en: 'Elder dragon' },
      { key: 'beyond', tier: 'ancient', zh: '天外', en: 'Beyond' },
      { key: 'divine', tier: 'divine', zh: '神圣', en: 'Divine' },
      { key: 'apocalypse', tier: 'divine', zh: '天启', en: 'Apocalypse' },
      { key: 'genesislight', tier: 'divine', zh: '创世', en: 'Genesis' },
      { key: 'eternal', tier: 'divine', zh: '永恒', en: 'Eternal' },
      { key: 'radiance', tier: 'divine', zh: '光辉', en: 'Radiance' },
      { key: 'judgement', tier: 'divine', zh: '审判', en: 'Judgement' },
      { key: 'bloodoath', tier: 'red', zh: '血誓', en: 'Blood oath' },
      { key: 'moltenheart', tier: 'red', zh: '熔心', en: 'Molten heart' },
      { key: 'scarletmoon', tier: 'red', zh: '绯月', en: 'Scarlet moon' },
      { key: 'dyingsun', tier: 'red', zh: '残阳', en: 'Dying sun' },
    ]
    const BULK_TIER_TONE = {
      common: '#b8c0cc', rare: '#63d2b4', epic: '#7f9dff', legendary: '#f2c14e',
      mythic: '#ff7ad9', red: '#ff4d4d', ancient: '#ff8a3c', divine: '#b8f0ff',
    }
    const BULK_SLOT_WORD = {
      weapon: ['刃', 'Blade'], armor: ['铠', 'Plate'], charm: ['符', 'Charm'], frame: ['框', 'Frame'],
    }
    const BULK_SLOT_PREFIX = { weapon: 'w', armor: 'a', charm: 'c', frame: 'f' }
    const BULK_SLOT_SHAPE = { weapon: 'greatsword', armor: 'plate', charm: 'gem', frame: null }

    for (const family of BULK_FAMILIES) {
      const tone = BULK_TIER_TONE[family.tier] || '#b8c0cc'
      const tierZh = ZH[`ach.rarity.${family.tier}`] || family.tier
      const tierEn = EN[`ach.rarity.${family.tier}`] || family.tier
      for (const slot of ['weapon', 'armor', 'charm', 'frame']) {
        const id = `${BULK_SLOT_PREFIX[slot]}.${family.key}`
        ZH[`gear.${id}.name`] = `${tierZh}·${family.zh}${BULK_SLOT_WORD[slot][0]}`
        ZH[`gear.${id}.desc`] = `用${family.zh}打造的${slot === 'frame' ? '头像框' : slot === 'weapon' ? '武器' : slot === 'armor' ? '护甲' : '护符'}，${family.tier === 'divine' ? '带着不属于这个世界的光。' : '扎实可靠。'}`
        EN[`gear.${id}.name`] = `${tierEn} · ${family.en} ${BULK_SLOT_WORD[slot][1]}`
        EN[`gear.${id}.desc`] = `${family.en} work, ${family.tier === 'divine' ? 'lit by a light that does not belong here.' : 'dependable and plain.'}`
        if (slot === 'weapon') {
          WEAPON_SHAPE[id] = 'greatsword'
          GEAR_ICON[id] = 'greatsword'
        }
        if (slot === 'armor') {
          ARMOR_LOOK[id] = {
            hood: mixColor(tone, 0.62),
            chest: tone,
            shade: mixColor(tone, 0.72),
            boot: mixColor(tone, 0.42),
          }
          ARMOR_CUT[id] = 'plate'
          GEAR_ICON[id] = 'plate'
        }
        if (slot === 'charm') {
          CHARM_LOOK[id] = mixColor(tone, 1.25)
          GEAR_ICON[id] = 'gem'
        }
        if (slot === 'frame') GEAR_ICON[id] = 'plate'
      }
    }
    // Signature names win over the generated ones.
    for (const [id, sig] of Object.entries(SIGNATURE_GEAR)) {
      ZH[`gear.${id}.name`] = sig.zh
      ZH[`gear.${id}.desc`] = sig.dzh
      EN[`gear.${id}.name`] = sig.en
      EN[`gear.${id}.desc`] = sig.den
    }

    // Frame rarity drives how ornate the ring gets; the bulk families fill the
    // same table from their tier.
    // Ten gem studs fit around a frame; one rebirth fills one stud.
    const GEM_SLOTS = [
      { x: 24, y: 2 }, { x: 50, y: 2 }, { x: 76, y: 2 },
      { x: 98, y: 26 }, { x: 98, y: 50 }, { x: 98, y: 74 },
      { x: 76, y: 98 }, { x: 50, y: 98 }, { x: 24, y: 98 },
      { x: 2, y: 50 },
    ]
    const FRAME_RARITY = {
      'f.novice': 'common', 'f.bronze': 'rare', 'f.verdant': 'rare', 'f.starlight': 'epic',
      'f.ember': 'epic', 'f.echo': 'epic', 'f.rune': 'epic', 'f.season': 'legendary',
      'f.calamity': 'legendary', 'f.aurora': 'legendary', 'f.titan': 'legendary', 'f.storm': 'legendary',
      'f.nova': 'mythic', 'f.abyss': 'mythic', 'f.genesis': 'mythic', 'f.crimson': 'red',
      'f.transcend': 'transcendent',
    }
    for (const family of BULK_FAMILIES) FRAME_RARITY[`f.${family.key}`] = family.tier

    // Frames of one tier share a base hue but shift around it, so two mythic
    // borders never look like the same object.
    const shiftHue = (hex, degrees) => {
      const match = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim())
      if (!match) return hex
      const value = parseInt(match[1], 16)
      const r = ((value >> 16) & 255) / 255
      const g = ((value >> 8) & 255) / 255
      const b = (value & 255) / 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const light = (max + min) / 2
      const delta = max - min
      if (!delta) return hex
      const sat = light > 0.5 ? delta / (2 - max - min) : delta / (max + min)
      let hue = 0
      if (max === r) hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6
      else if (max === g) hue = ((b - r) / delta + 2) / 6
      else hue = ((r - g) / delta + 4) / 6
      hue = (hue + degrees / 360 + 1) % 1
      const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat
      const p = 2 * light - q
      const channel = (t) => {
        let temp = t
        if (temp < 0) temp += 1
        if (temp > 1) temp -= 1
        if (temp < 1 / 6) return p + (q - p) * 6 * temp
        if (temp < 1 / 2) return q
        if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6
        return p
      }
      const toHex = (value2) => Math.round(Math.max(0, Math.min(1, value2)) * 255).toString(16).padStart(2, '0')
      return `#${toHex(channel(hue + 1 / 3))}${toHex(channel(hue))}${toHex(channel(hue - 1 / 3))}`
    }
    // Each tier keeps its identity hue; families inside it only drift a little
    // so a red frame never turns yellow.
    const FRAME_HUE_STEPS = {
      common: [0, 10, -10, 18, -18],
      rare: [0, -14, 16, -26, 26],
      epic: [0, -18, 14, -30, 30],
      legendary: [0, -12, 12, -22, 22],
      mythic: [0, -16, 16, -28, 28],
      red: [0, -7, 7, -13, 13],
      ancient: [0, -9, 9, -17, 17],
      divine: [0, -12, 12, -22, 22],
    }
    const tierCursor = {}

    const BULK_FRAME_CSS = BULK_FAMILIES.map(family => {
      const baseTone = BULK_TIER_TONE[family.tier] || '#b8c0cc'
      const steps = FRAME_HUE_STEPS[family.tier] || [0]
      const cursor = tierCursor[family.tier] || 0
      tierCursor[family.tier] = cursor + 1
      const tone = shiftHue(baseTone, steps[cursor % steps.length])
      const width = family.tier === 'divine' ? '3px'
        : family.tier === 'ancient' ? '2.5px'
          : family.tier === 'mythic' || family.tier === 'legendary' ? '2px' : '1px'
      const glow = family.tier === 'divine'
        ? `0 0 0 2px color-mix(in srgb, ${tone} 40%, transparent), 0 0 30px color-mix(in srgb, ${tone} 60%, transparent)`
        : family.tier === 'ancient'
          ? `0 0 0 2px color-mix(in srgb, ${tone} 34%, transparent), 0 0 24px color-mix(in srgb, ${tone} 48%, transparent)`
          : family.tier === 'mythic' || family.tier === 'legendary'
            ? `0 0 0 2px color-mix(in srgb, ${tone} 30%, transparent), 0 0 20px color-mix(in srgb, ${tone} 40%, transparent)`
            : `0 0 14px color-mix(in srgb, ${tone} 28%, transparent)`
      const style = family.tier === 'common' || family.tier === 'rare' || family.tier === 'epic'
        ? ['solid', 'dashed', 'dotted', 'double'][cursor % 4]
        : 'solid'
      return `[data-frame="f.${family.key}"] { --frame-color: ${tone}; --frame-width: ${width}; --frame-style: ${style}; --frame-glow: ${glow}; }`
    }).join('\n      ')

    const CSS = `
      .dq-root {
        height: 100%;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        color: var(--dsw-alias-label-primary);
        background:
          radial-gradient(70% 46% at 8% 0%, color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent), transparent 62%),
          radial-gradient(48% 36% at 100% 2%, color-mix(in srgb, var(--dsw-alias-state-warn-primary) 6%, transparent), transparent 68%),
          var(--dsw-alias-bg-base);
        font-family: inherit;
        font-size: 13px;
        line-height: 1.55;
        scrollbar-width: thin;
        scrollbar-color: var(--dsw-alias-border-l2) transparent;
      }
      .dq-root *, .dq-hud, .dq-hud * { box-sizing: border-box; }
      .dq-page { width: 100%; max-width: 1160px; margin: 0 auto; padding: 26px 28px 58px; }
      .dq-topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
      .dq-brandline { display: flex; align-items: center; gap: 11px; min-width: 0; }
      .dq-brandmark {
        width: 38px; height: 38px; flex: none; border-radius: 12px;
        border: 1px solid var(--dsw-alias-border-l2);
        background:
          radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--dsw-alias-state-warn-primary) 22%, transparent), transparent 54%),
          var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-brand-primary);
        display: grid; place-items: center;
        box-shadow: 0 6px 18px color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
      }
      .dq-kicker { font-size: 10px; line-height: 1.3; letter-spacing: .14em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); font-weight: 600; }
      .dq-brandtitle { font-size: 14px; font-weight: 650; letter-spacing: -.01em; margin-top: 1px; }
      .dq-back {
        appearance: none; border: 1px solid var(--dsw-alias-border-l1); background: transparent;
        color: var(--dsw-alias-label-secondary); font: inherit; font-size: 12px;
        border-radius: 9px; padding: 7px 11px; cursor: pointer; white-space: nowrap;
      }
      .dq-back:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l2); }
      .dq-hero {
        position: relative; overflow: hidden; border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 20px; padding: 24px;
        background:
          radial-gradient(90% 160% at 0% 0%, color-mix(in srgb, var(--dsw-alias-brand-primary) 17%, transparent), transparent 56%),
          radial-gradient(70% 120% at 100% 0%, color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent), transparent 62%),
          linear-gradient(145deg, color-mix(in srgb, var(--dsw-alias-bg-layer-1) 94%, var(--dsw-alias-brand-primary) 6%), var(--dsw-alias-bg-layer-1));
        box-shadow: 0 18px 48px color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
      }
      .dq-hero::before {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: radial-gradient(58% 120% at 8% 4%,
          color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 18%, transparent),
          transparent 66%);
        animation: dq-hero-breathe 7s ease-in-out infinite;
      }
      @keyframes dq-hero-breathe {
        0%, 100% { opacity: .55; }
        50% { opacity: .95; }
      }
      .dq-hero::after {
        content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .55;
        background-image: radial-gradient(color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent) .6px, transparent .6px);
        background-size: 14px 14px;
        mask-image: linear-gradient(90deg, var(--dsw-alias-label-primary), transparent 68%);
      }
      .dq-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(250px, 1.05fr) minmax(260px, 1.2fr); gap: 24px 28px; }
      .dq-hero-identity { display: flex; align-items: center; gap: 17px; min-width: 0; }
      .dq-crest {
        width: 78px; height: 78px; flex: none; border-radius: 23px; position: relative;
        display: grid; place-items: center;
        border: 1px solid color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 62%, var(--dsw-alias-border-l2));
        background:
          radial-gradient(130% 86% at 50% -14%, color-mix(in srgb, #ffffff 22%, transparent), transparent 58%),
          radial-gradient(circle at 50% 34%, color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 34%, transparent), transparent 64%),
          linear-gradient(160deg,
            color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 20%, var(--dsw-alias-bg-layer-2)),
            color-mix(in srgb, var(--dsw-alias-bg-base) 86%, #000000));
        box-shadow:
          inset 0 0 0 1px color-mix(in srgb, #000000 34%, transparent),
          inset 0 0 22px color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 24%, transparent),
          inset 0 2px 0 color-mix(in srgb, #ffffff 14%, transparent),
          0 12px 30px color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 28%, transparent);
      }
      .dq-crest::before, .dq-crest::after {
        content: ""; position: absolute; width: 9px; height: 9px;
        border: 1px solid var(--frame-color, var(--dsw-alias-state-warn-primary));
        background: color-mix(in srgb, var(--dsw-alias-bg-base) 70%, transparent);
        transform: rotate(45deg); opacity: .85;
      }
      .dq-crest::before { top: -5px; left: 50%; margin-left: -4px; }
      .dq-crest::after { bottom: -5px; left: 50%; margin-left: -4px; }
      /* XP arc hugging the badge; only the large crest renders it. */
      .dq-crest-arc {
        position: absolute; left: 50%; top: 50%; width: 96px; height: 96px;
        margin: -48px 0 0 -48px; pointer-events: none; overflow: visible;
      }
      .dq-crest-arc-track { fill: none; stroke: color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent); stroke-width: 2; }
      .dq-crest-arc-fill {
        fill: none; stroke: var(--frame-color, var(--dsw-alias-state-warn-primary)); stroke-width: 2.4; stroke-linecap: round;
        filter: drop-shadow(0 0 6px color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 85%, transparent));
        transition: stroke-dashoffset .8s cubic-bezier(.22, 1, .36, 1);
      }
      .dq-crest-level {
        font-size: 31px; line-height: 1; font-weight: 800; letter-spacing: -.04em;
        background: linear-gradient(180deg, #ffffff,
          color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 72%, #ffffff));
        -webkit-background-clip: text; background-clip: text; color: transparent;
        filter: drop-shadow(0 1px 0 rgba(0, 0, 0, .55));
      }
      .dq-crest-label {
        position: absolute; bottom: 9px; font-size: 7.5px; letter-spacing: .22em;
        color: color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 55%, var(--dsw-alias-label-secondary));
      }
      /* One gem per rebirth, studded around the frame edge. */
      .dq-crest-gems {
        position: absolute; inset: 0; pointer-events: none; z-index: 2;
      }
      .dq-crest-gem {
        position: absolute; width: 5px; height: 5px; border-radius: 1px;
        transform: translate(-50%, -50%) rotate(45deg);
        background: linear-gradient(135deg, #fff3c4, #ffb43c 55%, #b26a12);
        box-shadow: 0 0 6px rgba(255, 190, 80, .85), inset 0 0 2px rgba(255, 255, 255, .8);
      }
      .dq-crest-gems.is-maxed .dq-crest-gem {
        background: linear-gradient(135deg, #ffffff, #ffe9a8 50%, #ffb43c);
        box-shadow: 0 0 8px rgba(255, 236, 170, .95), inset 0 0 2px rgba(255, 255, 255, .95);
        animation: dq-frame-pulse 2.6s ease-in-out infinite;
      }
      .dq-crest[data-size="mini"] .dq-crest-gem { width: 4px; height: 4px; }
      .dq-crest[data-size="hud"] .dq-crest-gem { width: 3px; height: 3px; }
      .dq-hero-copy { min-width: 0; }
      .dq-name-row { display: flex; align-items: center; gap: 7px; min-width: 0; }
      .dq-hero-name { font-size: 25px; line-height: 1.15; font-weight: 680; letter-spacing: -.03em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      /* Gold sheen on the name; the gradient is built from tokens so it still
         reads in the light theme. */
      .dq-hero-name {
        background: linear-gradient(100deg,
          var(--dsw-alias-label-primary) 0%,
          color-mix(in srgb, var(--dsw-alias-state-warn-primary) 88%, var(--dsw-alias-label-primary)) 42%,
          color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, var(--dsw-alias-label-primary)) 62%,
          var(--dsw-alias-label-primary) 100%);
        background-size: 220% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: dq-name-shine 9s ease-in-out infinite;
      }
      @keyframes dq-name-shine {
        0%, 72%, 100% { background-position: 0% 50%; }
        86% { background-position: 100% 50%; }
      }
      .dq-icon-btn {
        appearance: none; border: 0; background: transparent; color: var(--dsw-alias-label-secondary);
        width: 24px; height: 24px; border-radius: 6px; display: inline-grid; place-items: center;
        cursor: pointer; font: inherit; font-size: 12px; flex: none;
      }
      .dq-icon-btn:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
      .dq-title-pill {
        display: inline-flex; align-items: center; gap: 6px; max-width: 100%;
        margin-top: 7px; padding: 4px 11px 4px 9px; border-radius: 999px;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 46%, var(--dsw-alias-border-l1));
        background:
          linear-gradient(100deg,
            color-mix(in srgb, var(--dsw-alias-state-warn-primary) 18%, transparent),
            color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent));
        color: var(--dsw-alias-state-warn-primary); font-size: 11px; font-weight: 600;
        letter-spacing: .02em;
        box-shadow: 0 0 18px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 20%, transparent),
          inset 0 1px 0 color-mix(in srgb, #ffffff 10%, transparent);
      }
      .dq-title-spark { font-size: 10px; opacity: .9; animation: dq-spark 2.8s ease-in-out infinite; }
      @keyframes dq-spark { 0%, 100% { opacity: .45; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.12); } }
      .dq-title-pill span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-hero-class { margin-top: 9px; font-size: 11.5px; color: var(--dsw-alias-label-secondary); display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
      .dq-hero-class b { color: var(--dsw-alias-label-primary); font-weight: 550; }
      .dq-chip {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 3px 9px; border-radius: 999px;
        font-size: 10.5px; line-height: 1.5;
        border: 1px solid var(--dsw-alias-border-l1);
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-secondary);
        white-space: nowrap;
      }
      .dq-chip b { color: inherit; font-weight: 600; }
      .dq-chip-class {
        color: #8fb0ff;
        border-color: color-mix(in srgb, #7f9dff 34%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #7f9dff 12%, transparent);
      }
      .dq-chip-tier {
        margin-left: 2px; padding: 0 5px; border-radius: 5px;
        font-size: 9px; font-weight: 600;
        background: color-mix(in srgb, #7f9dff 22%, transparent);
      }
      .dq-chip-season {
        color: var(--dsw-alias-state-warn-primary);
        border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 34%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 11%, transparent);
      }
      .dq-chip-power {
        color: #ffb08a;
        border-color: color-mix(in srgb, #ff9a6b 34%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #ff9a6b 12%, transparent);
        position: relative;
      }
      .dq-chip-power.is-up { box-shadow: 0 0 16px color-mix(in srgb, #ff9a6b 45%, transparent); }
      .dq-hero-progress { align-self: center; min-width: 0; }
      .dq-progress-top { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 8px; }
      .dq-progress-label { font-size: 11px; color: var(--dsw-alias-label-secondary); }
      .dq-progress-value { font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; }
      .dq-meter { height: 9px; border-radius: 999px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, var(--dsw-alias-bg-layer-2)); overflow: hidden; }
      .dq-meter > i {
        display: block; height: 100%; border-radius: inherit; min-width: 3px;
        background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary));
        box-shadow: 0 0 12px color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, transparent);
      }
      .dq-progress-foot { display: flex; justify-content: space-between; gap: 10px; margin-top: 7px; font-size: 10.5px; color: var(--dsw-alias-label-secondary); }
      .dq-hero-stats {
        grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
        border-top: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 80%, transparent);
        padding-top: 16px; gap: 0;
      }
      .dq-hero-stat { padding: 0 17px; border-left: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent); min-width: 0; }
      .dq-hero-stat:first-child { border-left: 0; padding-left: 0; }
      .dq-hero-stat-label { display: flex; align-items: center; gap: 5px; font-size: 10px; letter-spacing: .04em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); }
      .dq-hero-stat-value { display: flex; align-items: baseline; gap: 5px; margin-top: 4px; font-size: 19px; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
      .dq-hero-stat-value small { font-size: 10.5px; font-weight: 400; color: var(--dsw-alias-label-secondary); letter-spacing: 0; }
      .dq-tabs {
        position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 4px;
        padding: 10px 0; margin: 10px 0 18px; overflow-x: auto;
        background: color-mix(in srgb, var(--dsw-alias-bg-base) 82%, transparent);
        backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
        border-bottom: 1px solid var(--dsw-alias-border-l1);
        scrollbar-width: none;
      }
      .dq-tabs::-webkit-scrollbar { display: none; }
      .dq-tab {
        appearance: none; display: inline-flex; align-items: center; gap: 6px; flex: none;
        border: 1px solid transparent; background: transparent; color: var(--dsw-alias-label-secondary);
        font: inherit; font-size: 12px; font-weight: 550; padding: 7px 12px; border-radius: 9px; cursor: pointer;
        white-space: nowrap;
      }
      .dq-tab:hover { color: var(--dsw-alias-label-primary); background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 64%, transparent); }
      .dq-tab[aria-selected="true"] {
        color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1);
        border-color: var(--dsw-alias-border-l1);
        box-shadow: 0 2px 8px color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent);
      }
      .dq-tab-glyph { color: var(--dsw-alias-brand-primary); font-size: 11px; }
      .dq-overview { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 18px; align-items: start; }
      .dq-stack { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
      .dq-full { grid-column: 1 / -1; }
      .dq-card {
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 16px; padding: 18px;
        background: linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-bg-layer-1) 97%, var(--dsw-alias-brand-primary) 3%), var(--dsw-alias-bg-layer-1));
        box-shadow: 0 8px 26px color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent);
        min-width: 0;
      }
      .dq-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
      .dq-card-title { font-size: 14px; font-weight: 640; letter-spacing: -.01em; display: flex; align-items: center; gap: 7px; }
      .dq-card-title-glyph { color: var(--dsw-alias-brand-primary); font-size: 12px; }
      .dq-card-sub { margin-top: 3px; font-size: 10.8px; color: var(--dsw-alias-label-secondary); }
      .dq-text-btn {
        appearance: none; border: 0; background: transparent; color: var(--dsw-alias-brand-primary);
        font: inherit; font-size: 11px; padding: 4px 6px; border-radius: 6px; cursor: pointer; white-space: nowrap;
      }
      .dq-text-btn:hover { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent); }
      .dq-quest-list { display: flex; flex-direction: column; }
      .dq-quest { display: grid; grid-template-columns: 36px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 12px 0; border-top: 1px solid var(--dsw-alias-border-l1); }
      .dq-quest:first-child { border-top: 0; padding-top: 2px; }
      .dq-quest.is-claimed { opacity: .64; }
      .dq-quest-icon {
        width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center;
        color: var(--dsw-alias-brand-primary);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 11%, var(--dsw-alias-bg-layer-2));
        border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 15%, var(--dsw-alias-border-l1));
        font-size: 15px;
      }
      .dq-quest-main { min-width: 0; }
      .dq-quest-top { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .dq-quest-name { font-size: 12.5px; font-weight: 600; }
      .dq-chip {
        display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; border-radius: 5px;
        border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2);
        font-size: 9.5px; line-height: 1.5; color: var(--dsw-alias-label-secondary); white-space: nowrap;
      }
      .dq-chip.xp { color: var(--dsw-alias-brand-primary); border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, var(--dsw-alias-border-l1)); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 7%, transparent); }
      .dq-chip.coins { color: var(--dsw-alias-state-warn-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 22%, var(--dsw-alias-border-l1)); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 7%, transparent); }
      .dq-quest-desc { margin-top: 2px; font-size: 10.8px; color: var(--dsw-alias-label-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-quest-progress { display: flex; align-items: center; gap: 9px; margin-top: 7px; }
      .dq-bar { flex: 1; min-width: 42px; height: 5px; border-radius: 999px; background: var(--dsw-alias-bg-layer-2); overflow: hidden; }
      .dq-bar > i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary)); }
      .dq-count { font-size: 9.5px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .dq-quest-side { display: flex; align-items: center; justify-content: flex-end; min-width: 72px; }
      .dq-status { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
      .dq-status.done { color: var(--dsw-alias-state-success-primary); }
      .dq-status.ready { color: var(--dsw-alias-brand-primary); }
      .dq-btn {
        appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
        border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary); font: inherit; font-size: 10.5px; font-weight: 550;
        padding: 5px 9px; border-radius: 7px; cursor: pointer; white-space: nowrap;
        transition: background .15s ease, border-color .15s ease, transform .15s ease;
      }
      .dq-btn:hover { background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 82%, var(--dsw-alias-brand-primary) 18%); border-color: var(--dsw-alias-border-l2); }
      .dq-btn:active { transform: translateY(1px); }
      .dq-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }
      .dq-btn.primary {
        border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 52%, var(--dsw-alias-border-l1));
        background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-bg-base);
      }
      .dq-btn.primary:hover { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 88%, var(--dsw-alias-label-primary)); }
      .dq-btn.ghost { background: transparent; }
      .dq-btn.lg { font-size: 12px; padding: 8px 13px; border-radius: 9px; }
      .dq-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .dq-empty { padding: 24px 8px; text-align: center; color: var(--dsw-alias-label-secondary); font-size: 11.5px; }
      .dq-activity { display: flex; flex-direction: column; }
      .dq-activity-row { display: grid; grid-template-columns: 27px minmax(0, 1fr) auto; gap: 10px; align-items: start; padding: 8px 0; border-top: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent); }
      .dq-activity-row:first-child { border-top: 0; }
      .dq-activity-dot {
        width: 27px; height: 27px; border-radius: 50%; display: grid; place-items: center;
        background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); font-size: 11px;
        border: 1px solid var(--dsw-alias-border-l1);
      }
      .dq-activity-row.is-achievement .dq-activity-dot { color: var(--dsw-alias-state-warn-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 30%, var(--dsw-alias-border-l1)); }
      .dq-activity-row.is-error .dq-activity-dot { color: var(--dsw-alias-state-error-primary); }
      .dq-activity-text { font-size: 11.5px; min-width: 0; overflow-wrap: anywhere; }
      .dq-activity-text b { font-weight: 600; }
      .dq-activity-time { margin-top: 2px; font-size: 9.8px; color: var(--dsw-alias-label-secondary); }
      .dq-activity-gain { font-size: 10.5px; color: var(--dsw-alias-brand-primary); font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .dq-activity-gain.coins { color: var(--dsw-alias-state-warn-primary); }
      .dq-day-head { position: sticky; top: 54px; z-index: 2; padding: 8px 0 5px; background: color-mix(in srgb, var(--dsw-alias-bg-base) 88%, transparent); backdrop-filter: blur(8px); font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); font-weight: 600; }
      .dq-stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
      .dq-stat { padding: 11px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1); background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 55%, transparent); min-width: 0; }
      .dq-stat-label { font-size: 9.5px; color: var(--dsw-alias-label-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dq-stat-value { margin-top: 2px; font-size: 16px; font-weight: 650; font-variant-numeric: tabular-nums; }
      .dq-party { display: flex; flex-direction: column; }
      .dq-party-row { display: grid; grid-template-columns: 30px minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 8px 0; border-top: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent); }
      .dq-party-row:first-child { border-top: 0; }
      .dq-avatar {
        width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center;
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, var(--dsw-alias-bg-layer-2));
        border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, var(--dsw-alias-border-l1));
        color: var(--dsw-alias-brand-primary); font-size: 12px;
      }
      .dq-party-name { font-size: 11.5px; font-weight: 550; display: flex; align-items: center; gap: 6px; min-width: 0; }
      .dq-party-name span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-party-meta { margin-top: 1px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-live { width: 5px; height: 5px; border-radius: 50%; background: var(--dsw-alias-state-success-primary); box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-success-primary) 16%, transparent); flex: none; }
      .dq-party-xp { font-size: 10.5px; color: var(--dsw-alias-brand-primary); font-weight: 600; white-space: nowrap; }
      .dq-boss-card { overflow: hidden; }
      .dq-boss-body { display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 15px; align-items: center; }
      .dq-boss-art {
        position: relative; width: 84px; height: 84px; border-radius: 16px; display: grid; place-items: center;
        color: var(--dsw-alias-state-error-primary);
        border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 28%, var(--dsw-alias-border-l1));
        background:
          radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--dsw-alias-state-error-primary) 22%, transparent), transparent 62%),
          var(--dsw-alias-bg-layer-2);
      }
      .dq-boss-art.is-defeated { color: var(--dsw-alias-state-success-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 30%, var(--dsw-alias-border-l1)); background: radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--dsw-alias-state-success-primary) 18%, transparent), transparent 62%), var(--dsw-alias-bg-layer-2); }
      .dq-boss-pct { position: absolute; bottom: 7px; font-size: 9px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-boss-name { font-size: 16px; font-weight: 660; letter-spacing: -.015em; }
      .dq-boss-lore { margin-top: 3px; font-size: 10.8px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }
      .dq-boss-hp { margin-top: 9px; height: 8px; }
      .dq-boss-hp > i { background: linear-gradient(90deg, var(--dsw-alias-state-error-primary), var(--dsw-alias-state-warn-primary)); }
      .dq-boss-hp.is-defeated > i { background: var(--dsw-alias-state-success-primary); }
      .dq-boss-meta { display: flex; justify-content: space-between; gap: 8px; margin-top: 4px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-boss-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; border-top: 1px solid var(--dsw-alias-border-l1); margin-top: 13px; padding-top: 11px; }
      .dq-boss-reward { font-size: 10px; color: var(--dsw-alias-label-secondary); }
      .dq-boss-reward b { color: var(--dsw-alias-state-warn-primary); font-weight: 600; }
      .dq-lottery { position: relative; overflow: hidden; }
      .dq-lottery::after {
        content: "✦"; position: absolute; right: 15px; top: 4px; font-size: 44px; color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent); pointer-events: none;
      }
      .dq-lottery-result { display: flex; align-items: center; gap: 8px; margin: 10px 0 12px; padding: 9px 10px; border-radius: 10px; background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, var(--dsw-alias-bg-layer-2)); border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 16%, var(--dsw-alias-border-l1)); font-size: 11px; }
      .dq-lottery-result span { color: var(--dsw-alias-label-secondary); }
      .dq-lottery-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .dq-lottery-note { font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-class-head { display: flex; align-items: center; gap: 11px; }
      .dq-class-glyph { width: 44px; height: 44px; flex: none; border-radius: 12px; display: grid; place-items: center; font-size: 21px; color: var(--dsw-alias-brand-primary); border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, var(--dsw-alias-border-l1)); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, var(--dsw-alias-bg-layer-2)); }
      .dq-class-name { font-size: 15px; font-weight: 650; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
      .dq-class-copy { min-width: 0; flex: 1; display: flex; flex-direction: column; }
      /* Level ring: one big number, progress drawn as an arc. */
      .dq-class-levelring { position: relative; width: 64px; height: 64px; flex: none; display: grid; place-items: center; }
      .dq-ring { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
      .dq-ring-track { fill: none; stroke: color-mix(in srgb, var(--dsw-alias-label-primary) 13%, transparent); stroke-width: 4; }
      .dq-ring-fill {
        fill: none; stroke: var(--tier-tone, #7f9dff); stroke-width: 4; stroke-linecap: round;
        filter: drop-shadow(0 0 6px color-mix(in srgb, var(--tier-tone, #7f9dff) 65%, transparent));
        transition: stroke-dashoffset .6s cubic-bezier(.22, 1, .36, 1);
      }
      .dq-ring-value { font-size: 21px; font-weight: 700; letter-spacing: -.03em; line-height: 1; color: var(--tier-tone, #7f9dff); }
      .dq-ring-label { position: absolute; bottom: 10px; font-size: 6.5px; letter-spacing: .22em; color: var(--dsw-alias-label-secondary); }
      .dq-class-tiertext { font-size: 10px; font-weight: 600; color: var(--tier-tone, #7f9dff); letter-spacing: .04em; }
      /* Tier rail: six milestones on a line, the current one is the glowing node. */
      .dq-tier-rail { position: relative; display: flex; align-items: flex-start; justify-content: space-between; margin-top: 7px; }
      .dq-tier-rail::before {
        content: ""; position: absolute; left: 4px; right: 4px; top: 4px; height: 1px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
      }
      .dq-tier-item { position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 1; min-width: 0; }
      .dq-tier-node {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--dsw-alias-bg-layer-1);
        border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 22%, transparent);
        transition: all .3s ease;
      }
      .dq-tier-item[data-state="done"] .dq-tier-node { background: color-mix(in srgb, var(--tier-color, #7f9dff) 62%, transparent); border-color: transparent; }
      .dq-tier-item[data-state="done"] b { color: color-mix(in srgb, var(--tier-color, #7f9dff) 72%, var(--dsw-alias-label-secondary)); opacity: .9; }
      .dq-tier-item[data-state="current"] .dq-tier-node {
        width: 9px; height: 9px; margin-top: -1px;
        background: var(--tier-color, #7f9dff); border-color: transparent;
        box-shadow: 0 0 12px color-mix(in srgb, var(--tier-color, #7f9dff) 80%, transparent);
        animation: dq-node-pulse 2.4s ease-in-out infinite;
      }
      @keyframes dq-node-pulse {
        0%, 100% { box-shadow: 0 0 8px color-mix(in srgb, var(--tier-color, #7f9dff) 55%, transparent); }
        50% { box-shadow: 0 0 16px color-mix(in srgb, var(--tier-color, #7f9dff) 95%, transparent); }
      }
      .dq-tier-item b { font-size: 7px; font-weight: 500; color: var(--dsw-alias-label-secondary); letter-spacing: .01em; white-space: nowrap; opacity: .66; }
      .dq-tier-item[data-state="current"] b { color: var(--tier-color, #7f9dff); font-weight: 700; opacity: 1; }
      .dq-classbar { margin-top: 6px; height: 6px; border-radius: 999px; overflow: hidden; background: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, var(--dsw-alias-bg-layer-2)); }
      .dq-classbar > i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--class-tone, #7f9dff) 45%, #16121f), var(--class-tone, #7f9dff)); box-shadow: 0 0 12px color-mix(in srgb, var(--class-tone, #7f9dff) 45%, transparent); }
      .dq-classbar-foot { margin-top: 4px; display: flex; align-items: center; gap: 10px; font-size: 9px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-classbar-foot > span:nth-child(2) { margin-left: auto; }
      .dq-class-bonus {
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 9px; font-weight: 600; color: #ffb08a;
        white-space: nowrap;
      }
      .dq-class-tier { display: inline-flex; margin-left: 6px; padding: 1px 6px; border-radius: 4px; background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); font-size: 9px; color: var(--dsw-alias-label-secondary); vertical-align: 1px; }
      .dq-class-desc { margin-top: 8px; font-size: 10.8px; color: var(--dsw-alias-label-secondary); }
      .dq-classcard { position: relative; overflow: hidden; }
      .dq-classcard::before {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: radial-gradient(58% 92% at 12% 6%,
          color-mix(in srgb, var(--class-tone, #7f9dff) 20%, transparent), transparent 70%);
      }
      .dq-class-body {
        position: relative;
        display: grid; grid-template-columns: 132px minmax(0, 1fr);
        gap: 14px; align-items: center; margin-top: 14px;
      }
      .dq-radar-wrap { display: grid; place-items: center; gap: 4px; min-width: 0; }
      .dq-radar {
        width: 132px; height: 132px; overflow: visible; display: block;
        filter: drop-shadow(0 0 14px color-mix(in srgb, var(--class-tone, #7f9dff) 42%, transparent));
      }
      .dq-radar-ring { fill: none; stroke: color-mix(in srgb, var(--dsw-alias-label-primary) 13%, transparent); stroke-width: 1; }
      .dq-radar-axis { stroke: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent); stroke-width: 1; }
      .dq-radar-shape {
        stroke-width: 1.6;
        transform-origin: 50% 50%;
        animation: dq-radar-in .7s cubic-bezier(.22, 1, .36, 1) both,
          dq-radar-breath 4.5s ease-in-out 1s infinite;
      }
      @keyframes dq-radar-in { from { transform: scale(.15); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      @keyframes dq-radar-breath { 0%, 100% { opacity: .82; } 50% { opacity: 1; } }
      .dq-radar-dot { stroke: rgba(0, 0, 0, .38); stroke-width: .8; }
      .dq-radar-dot.is-leader { filter: drop-shadow(0 0 6px rgba(255, 255, 255, .55)); }
      .dq-radar-major {
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 9px; letter-spacing: .04em; color: var(--class-tone, #7f9dff);
      }
      /* Each mastery path owns a hue, so the card reads at a glance instead of
         being five identical grey bars. */
      [data-path="ranger"] { --path: #4fd1c5; }
      [data-path="artificer"] { --path: #f2c14e; }
      [data-path="scholar"] { --path: #7f9dff; }
      [data-path="commander"] { --path: #b07fff; }
      [data-path="debugger"] { --path: #6fd6a0; }
      .dq-class-glyph { color: var(--path, var(--dsw-alias-brand-primary)); border-color: color-mix(in srgb, var(--path, var(--dsw-alias-brand-primary)) 34%, var(--dsw-alias-border-l1)); background: color-mix(in srgb, var(--path, var(--dsw-alias-brand-primary)) 12%, var(--dsw-alias-bg-layer-2)); box-shadow: inset 0 0 18px color-mix(in srgb, var(--path, var(--dsw-alias-brand-primary)) 16%, transparent); }
      .dq-paths { position: relative; display: flex; flex-direction: column; gap: 3px; }
      .dq-path {
        display: grid; grid-template-columns: minmax(0, 1fr) auto auto;
        column-gap: 7px; row-gap: 3px; align-items: center;
        padding: 4px 6px; margin: 0 -6px; border-radius: 8px;
        font-size: 9.8px; color: var(--dsw-alias-label-secondary);
      }
      .dq-path.is-current { color: var(--dsw-alias-label-primary); }
      .dq-path.is-leader { background: color-mix(in srgb, var(--path) 10%, transparent); }
      .dq-path-name { grid-column: 1; grid-row: 1; display: inline-flex; align-items: center; gap: 6px; min-width: 0; }
      .dq-path-dot {
        width: 6px; height: 6px; border-radius: 50%; flex: none;
        background: var(--path);
        box-shadow: 0 0 8px color-mix(in srgb, var(--path) 70%, transparent);
      }
      .dq-path-major {
        padding: 0 5px; border-radius: 4px; font-size: 8px; font-weight: 600;
        color: var(--path);
        background: color-mix(in srgb, var(--path) 22%, transparent);
      }
      .dq-path.is-current .dq-path-name { color: var(--path); }
      .dq-path-bar {
        grid-column: 1 / -1; grid-row: 2;
        height: 6px; border-radius: 999px; overflow: hidden;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, var(--dsw-alias-bg-layer-2));
      }
      .dq-path-bar > i {
        position: relative; display: block; height: 100%; border-radius: inherit; overflow: hidden;
        background: linear-gradient(90deg, color-mix(in srgb, var(--path) 45%, #16121f), var(--path));
        box-shadow: 0 0 10px color-mix(in srgb, var(--path) 45%, transparent);
      }
      .dq-path-bar > i::after {
        content: ""; position: absolute; inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .42), transparent);
        transform: translateX(-120%);
        animation: dq-bar-sheen 4.2s ease-in-out infinite;
      }
      @keyframes dq-bar-sheen {
        0%, 52% { transform: translateX(-120%); }
        84%, 100% { transform: translateX(220%); }
      }
      .dq-path-score { grid-column: 2; grid-row: 1; text-align: right; font-variant-numeric: tabular-nums; font-size: 9px; }
      .dq-path.is-leader .dq-path-score { color: var(--path); font-weight: 600; }
      .dq-path-share { grid-column: 3; grid-row: 1; min-width: 26px; text-align: right; font-size: 9px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; opacity: .72; }
      .dq-ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(235px, 1fr)); gap: 12px; }
      .dq-ach { --rarity: var(--dsw-alias-state-idle-primary); position: relative; display: flex; flex-direction: column; gap: 7px; min-height: 150px; padding: 14px; border-radius: 14px; border: 1px solid var(--dsw-alias-border-l1); background: linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-bg-layer-1) 96%, var(--rarity) 4%), var(--dsw-alias-bg-layer-1)); overflow: hidden; }
      .dq-ach::before { content: ""; position: absolute; inset: 0 0 auto; height: 2px; background: var(--rarity); opacity: .8; }
      .dq-ach[data-rarity="common"] { --rarity: var(--dsw-alias-state-idle-primary); }
      .dq-ach[data-rarity="rare"] { --rarity: var(--dsw-alias-state-success-primary); }
      .dq-ach[data-rarity="epic"] { --rarity: var(--dsw-alias-brand-primary); }
      .dq-ach[data-rarity="legendary"] { --rarity: var(--dsw-alias-state-warn-primary); }
      .dq-ach[data-rarity="mythic"] { --rarity: #ff7ad9; }
      .dq-ach[data-rarity="red"] { --rarity: #ff4d4d; }
      .dq-ach.is-locked { opacity: .58; filter: saturate(.55); }
      .dq-ach-top { display: flex; align-items: center; gap: 9px; min-width: 0; }
      .dq-ach-icon { width: 34px; height: 34px; flex: none; border-radius: 10px; display: grid; place-items: center; font-size: 16px; color: var(--rarity); background: color-mix(in srgb, var(--rarity) 11%, var(--dsw-alias-bg-layer-2)); border: 1px solid color-mix(in srgb, var(--rarity) 20%, var(--dsw-alias-border-l1)); }
      .dq-ach-name { font-size: 12px; font-weight: 620; line-height: 1.35; }
      .dq-ach-desc { flex: 1; font-size: 10.6px; color: var(--dsw-alias-label-secondary); line-height: 1.45; }
      .dq-ach-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-top: 7px; border-top: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 75%, transparent); font-size: 9.3px; color: var(--dsw-alias-label-secondary); }
      .dq-rarity { color: var(--rarity); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; font-size: 8.5px; }
      .dq-ach-reward { color: var(--dsw-alias-state-warn-primary); white-space: nowrap; }
      .dq-ach-date { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dq-filters { display: flex; gap: 5px; flex-wrap: wrap; }
      .dq-filter { appearance: none; border: 1px solid transparent; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 10.5px; padding: 4px 8px; border-radius: 6px; cursor: pointer; }
      .dq-filter:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
      .dq-filter[aria-pressed="true"] { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); border-color: var(--dsw-alias-border-l1); }
      .dq-shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(238px, 1fr)); gap: 13px; }
      .dq-shop-card { --rarity: var(--dsw-alias-state-idle-primary); display: flex; flex-direction: column; gap: 8px; padding: 14px; border-radius: 14px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1); }
      .dq-shop-card[data-rarity="rare"] { --rarity: var(--dsw-alias-state-success-primary); }
      .dq-shop-card[data-rarity="epic"] { --rarity: var(--dsw-alias-brand-primary); }
      .dq-shop-card[data-rarity="legendary"] { --rarity: var(--dsw-alias-state-warn-primary); }
      .dq-shop-card[data-rarity="mythic"] { --rarity: #ff7ad9; }
      .dq-plaque { padding: 12px 13px; border-radius: 10px; border: 1px solid color-mix(in srgb, var(--rarity) 25%, var(--dsw-alias-border-l1)); background: linear-gradient(135deg, color-mix(in srgb, var(--rarity) 12%, var(--dsw-alias-bg-layer-2)), var(--dsw-alias-bg-layer-2)); }
      .dq-plaque-name { font-size: 17px; font-weight: 660; letter-spacing: .02em; }
      .dq-plaque-rarity { margin-top: 3px; color: var(--rarity); font-size: 8.5px; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; }
      .dq-shop-desc { flex: 1; font-size: 10.7px; color: var(--dsw-alias-label-secondary); }
      .dq-shop-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-top: 8px; border-top: 1px solid var(--dsw-alias-border-l1); }
      .dq-supply-head { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .dq-supply-head .dq-shop-desc { flex: 1; }
      .dq-chest-art.is-mini { width: 46px; height: 46px; flex: none; border-radius: 12px; }
      .dq-chest-art.is-mini .dq-chest-glyph { font-size: 19px; }
      .dq-price { font-size: 11px; color: var(--dsw-alias-state-warn-primary); font-weight: 600; font-variant-numeric: tabular-nums; }
      .dq-inventory { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
      .dq-inv { appearance: none; display: inline-flex; align-items: center; gap: 5px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font: inherit; font-size: 10.5px; padding: 5px 8px; border-radius: 7px; cursor: pointer; }
      .dq-inv:hover { border-color: var(--dsw-alias-border-l2); }
      .dq-inv[aria-pressed="true"] { border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, var(--dsw-alias-border-l1)); color: var(--dsw-alias-state-warn-primary); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, var(--dsw-alias-bg-layer-2)); }
      .dq-toasts { position: fixed; right: 24px; bottom: 24px; z-index: 80; display: flex; flex-direction: column; gap: 8px; pointer-events: none; max-width: min(340px, calc(100vw - 32px)); }
      .dq-toast { pointer-events: auto; display: flex; align-items: flex-start; gap: 8px; padding: 10px 13px; border-radius: 11px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary); box-shadow: 0 12px 32px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent); font-size: 11.5px; animation: dq-rise .2s ease-out; }
      .dq-toast-glyph { color: var(--dsw-alias-brand-primary); flex: none; }
      .dq-toast.success .dq-toast-glyph { color: var(--dsw-alias-state-success-primary); }
      .dq-toast.error .dq-toast-glyph { color: var(--dsw-alias-state-error-primary); }
      .dq-toast.achievement .dq-toast-glyph { color: var(--dsw-alias-state-warn-primary); }
      .dq-skeleton { border-radius: 8px; background: linear-gradient(90deg, var(--dsw-alias-bg-layer-2), color-mix(in srgb, var(--dsw-alias-bg-layer-2) 65%, var(--dsw-alias-bg-layer-1)), var(--dsw-alias-bg-layer-2)); background-size: 200% 100%; animation: dq-shimmer 1.4s linear infinite; }
      .dq-loading { display: flex; flex-direction: column; gap: 14px; padding: 24px; }
      .dq-loading-line { height: 13px; width: 42%; }
      .dq-loading-block { height: 120px; border-radius: 16px; }
      .dq-error-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; min-height: 280px; text-align: center; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .dq-offline { display: flex; align-items: center; gap: 7px; margin-bottom: 12px; padding: 7px 10px; border-radius: 8px; border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 25%, var(--dsw-alias-border-l1)); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 7%, transparent); color: var(--dsw-alias-state-warn-primary); font-size: 10.5px; }
      .dq-rename { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
      .dq-name-input { appearance: none; min-width: 0; width: 150px; border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); border-radius: 7px; padding: 5px 8px; font: inherit; font-size: 12px; outline: none; }
      .dq-name-input:focus { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent); }
      .dq-hud-float { position: fixed; z-index: 60; pointer-events: none; }
      .dq-hud-float .dq-hud { pointer-events: auto; }
      .dq-hud-card {
        width: 106px; height: 106px; padding: 0; border-radius: 24px;
        display: block; overflow: visible;
      }
      /* Outer halo around the whole HUD badge, scaled by the equipped frame. */
      .dq-hud-card::before {
        content: ""; position: absolute; inset: -10px; border-radius: 34px;
        pointer-events: none; opacity: 0; z-index: 0; transition: opacity .3s ease;
      }
      .dq-hud-card::after {
        content: ""; position: absolute; inset: -3px; border-radius: 27px;
        pointer-events: none; opacity: 0; z-index: 0; transition: opacity .3s ease;
      }
      .dq-hud-card[data-frarity="legendary"]::before {
        opacity: .42;
        background: radial-gradient(circle, color-mix(in srgb, #f2c14e 40%, transparent), transparent 70%);
        animation: dq-frame-pulse 4.4s ease-in-out infinite;
      }
      .dq-hud-card[data-frarity="mythic"]::before,
      .dq-hud-card[data-frarity="red"]::before,
      .dq-hud-card[data-frarity="ancient"]::before,
      .dq-hud-card[data-frarity="divine"]::before,
      .dq-hud-card[data-frarity="transcendent"]::before {
        opacity: .9;
        background: conic-gradient(from 0deg,
          transparent 0deg,
          color-mix(in srgb, var(--hud-tone) 90%, transparent) 34deg,
          transparent 96deg,
          color-mix(in srgb, #ffffff 55%, transparent) 190deg,
          transparent 268deg);
        mask: radial-gradient(closest-side, transparent 72%, #000 84%, #000 96%, transparent 100%);
        -webkit-mask: radial-gradient(closest-side, transparent 72%, #000 84%, #000 96%, transparent 100%);
        filter: blur(3px) saturate(1.2);
        animation: dq-aura-spin 8s linear infinite;
      }
      .dq-hud-card[data-frarity="red"]::before { animation-duration: 6.4s; }
      .dq-hud-card[data-frarity="ancient"]::before { animation-duration: 5.4s; }
      .dq-hud-card[data-frarity="divine"]::before { animation-duration: 4.6s; inset: -12px; filter: blur(3.5px) saturate(1.3); }
      .dq-hud-card[data-frarity="transcendent"]::before { animation-duration: 4s; inset: -14px; opacity: 1; }
      .dq-hud-card[data-frarity="mythic"] { --hud-tone: #ff7ad9; }
      .dq-hud-card[data-frarity="red"] { --hud-tone: #ff4d4d; }
      .dq-hud-card[data-frarity="ancient"] { --hud-tone: #ff8a3c; }
      .dq-hud-card[data-frarity="divine"] { --hud-tone: #b8f0ff; }
      .dq-hud-card[data-frarity="transcendent"] { --hud-tone: #ffe9a8; }
      .dq-hud-card[data-frarity="mythic"]::after,
      .dq-hud-card[data-frarity="red"]::after,
      .dq-hud-card[data-frarity="ancient"]::after,
      .dq-hud-card[data-frarity="divine"]::after,
      .dq-hud-card[data-frarity="transcendent"]::after {
        opacity: .8;
        border: 1px solid color-mix(in srgb, var(--hud-tone) 46%, transparent);
        box-shadow: 0 0 22px color-mix(in srgb, var(--hud-tone) 40%, transparent);
      }
      .dq-hud-frame {
        --frame-color: color-mix(in srgb, var(--dsw-alias-label-secondary) 46%, transparent);
        --frame-width: 1px;
        --frame-glow: 0 0 0 transparent;
        position: absolute; inset: 6px; border-radius: 16px; overflow: hidden;
        border: var(--frame-width) solid var(--frame-color);
        background:
          radial-gradient(70% 60% at 50% 30%, color-mix(in srgb, var(--frame-color) 16%, transparent), transparent 74%),
          linear-gradient(180deg, #1b1630, #12101f);
        box-shadow: var(--frame-glow);
      }
      .dq-hud-hero { display: block; width: 100%; height: 100%; }
      .dq-hud-gems { inset: 2px; }
      .dq-hud-gems .dq-crest-gem { width: 3.5px; height: 3.5px; }
      /* Painted portrait replaces the pixel figure when the bundle ships one. */
      .dq-portrait {
        object-fit: cover;
        object-position: 50% 22%;
        border-radius: 12px;
        filter: none;
        -webkit-user-drag: none;
        user-select: none;
      }
      .dq-doll-px.dq-portrait { border-radius: 14px; box-shadow: 0 8px 18px rgba(0, 0, 0, .45); }
      .dq-fighter-hero .dq-portrait { border-radius: 16px; }
      .dq-hud-ring { position: absolute; inset: 4px; border-radius: 12px; border: 1px solid color-mix(in srgb, var(--frame-color) 45%, transparent); pointer-events: none; }
      /* HUD badge gets the same tier treatment: outer bloom plus a spinning
         light band inside the frame. */
      .dq-hud-frame::before {
        content: ""; position: absolute; inset: 1px; border-radius: 15px;
        pointer-events: none; opacity: 0; z-index: 0;
      }
      .dq-hud-frame[data-frarity="legendary"] { box-shadow: var(--frame-glow), 0 0 20px color-mix(in srgb, var(--frame-color) 40%, transparent); }
      .dq-hud-frame[data-frarity="mythic"],
      .dq-hud-frame[data-frarity="red"],
      .dq-hud-frame[data-frarity="ancient"],
      .dq-hud-frame[data-frarity="divine"] {
        box-shadow: var(--frame-glow), 0 0 26px color-mix(in srgb, var(--frame-color) 52%, transparent);
      }
      .dq-hud-frame[data-frarity="ancient"] { box-shadow: var(--frame-glow), 0 0 30px color-mix(in srgb, var(--frame-color) 58%, transparent); }
      .dq-hud-frame[data-frarity="divine"] { box-shadow: var(--frame-glow), 0 0 36px color-mix(in srgb, var(--frame-color) 62%, transparent); }
      .dq-hud-frame[data-frarity="mythic"]::before,
      .dq-hud-frame[data-frarity="red"]::before,
      .dq-hud-frame[data-frarity="ancient"]::before,
      .dq-hud-frame[data-frarity="divine"]::before {
        opacity: .95;
        background: conic-gradient(from 0deg,
          transparent 0deg,
          color-mix(in srgb, var(--frame-color) 95%, transparent) 30deg,
          color-mix(in srgb, #ffffff 70%, transparent) 48deg,
          transparent 100deg,
          color-mix(in srgb, var(--frame-color) 55%, transparent) 210deg,
          transparent 268deg);
        mask: radial-gradient(closest-side, transparent calc(100% - 9px), #000 calc(100% - 5px));
        -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 9px), #000 calc(100% - 5px));
        animation: dq-aura-spin 7s linear infinite;
      }
      .dq-hud-frame[data-frarity="red"]::before { animation-duration: 5.4s; }
      .dq-hud-frame[data-frarity="ancient"]::before { animation-duration: 4.6s; }
      .dq-hud-frame[data-frarity="divine"]::before { animation-duration: 3.8s; }
      .dq-hud-badge {
        position: absolute; left: -6px; top: -6px; min-width: 24px; height: 24px; padding: 0 5px;
        display: grid; place-items: center; border-radius: 999px;
        font-size: 11px; font-weight: 700; color: #201322;
        background: var(--dsw-alias-state-warn-primary);
        border: 2px solid var(--dsw-alias-bg-base);
        box-shadow: 0 2px 8px color-mix(in srgb, var(--dsw-alias-label-primary) 25%, transparent);
        font-variant-numeric: tabular-nums;
      }
      .dq-hud-claim {
        position: absolute; right: -3px; top: -3px; width: 12px; height: 12px; border-radius: 50%;
        background: var(--dsw-alias-state-error-primary);
        border: 2px solid var(--dsw-alias-bg-base);
        animation: dq-pulse 1.8s ease-in-out infinite;
      }
      .dq-hud-xpbar {
        position: absolute; left: 12px; right: 12px; bottom: 9px; height: 4px;
        border-radius: 999px; overflow: hidden;
        background: rgba(0, 0, 0, .5); border: 1px solid rgba(255, 255, 255, .14);
      }
      .dq-hud-xpbar > i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary)); }
      .dq-hud-grip {
        position: absolute; right: 5px; bottom: 15px; width: 14px; height: 14px;
        display: grid; place-items: center; font-size: 9px; line-height: 1;
        color: #fff; text-shadow: 0 1px 2px #000; opacity: 0; transition: opacity .15s ease;
        cursor: grab; touch-action: none;
      }
      .dq-hud-card:hover .dq-hud-grip { opacity: .85; }
      .dq-hud-pop {
        position: absolute; right: 106px; bottom: 0; width: 196px;
        display: flex; flex-direction: column; gap: 4px;
        padding: 10px 12px; border-radius: 12px; text-align: left;
        border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-overlay);
        box-shadow: 0 16px 40px color-mix(in srgb, var(--dsw-alias-label-primary) 22%, transparent);
        opacity: 0; transform: translateX(6px); pointer-events: none;
        transition: opacity .15s ease, transform .15s ease;
      }
      .dq-hud-card:hover .dq-hud-pop, .dq-hud-card:focus-visible .dq-hud-pop { opacity: 1; transform: none; }
      .dq-hud-float[data-side="right"] .dq-hud-pop { left: 106px; right: auto; transform: translateX(-6px); }
      .dq-hud-float[data-side="right"] .dq-hud-card:hover .dq-hud-pop { transform: none; }
      .dq-hud-float[data-vside="below"] .dq-hud-pop { bottom: auto; top: 0; }
      .dq-hud-pop-top { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
      .dq-hud-pop-name { font-size: 12px; font-weight: 650; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-hud-pop-xp { font-size: 10px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-hud-pop-chips { display: flex; flex-wrap: wrap; gap: 4px 8px; margin-top: 2px; }
      .dq-hud-card .dq-hud-badge, .dq-hud-card .dq-hud-claim { pointer-events: none; }
      .dq-hud-stars {
        position: absolute; left: -8px; top: 20px;
        padding: 1px 5px; border-radius: 999px;
        font-size: 9px; font-weight: 700; line-height: 1.4;
        color: #241a05; background: #f2c14e;
        border: 1px solid rgba(0, 0, 0, .35);
        box-shadow: 0 2px 8px rgba(242, 193, 78, .35);
        pointer-events: none;
      }
      .dq-paragon {
        display: flex; align-items: center; gap: 9px; flex-wrap: wrap;
        margin-top: 9px; padding: 6px 10px; border-radius: 9px;
        border: 1px solid color-mix(in srgb, #f2c14e 26%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #f2c14e 8%, transparent);
      }
      .dq-paragon-stars {
        color: #f2c14e; font-size: 11px; letter-spacing: 1.5px;
        text-shadow: 0 0 10px color-mix(in srgb, #f2c14e 60%, transparent);
      }
      .dq-paragon-stars > b { margin-left: 4px; font-size: 9.5px; letter-spacing: 0; }
      .dq-paragon-label { font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-hud { position: relative; appearance: none; display: inline-flex; align-items: center; gap: 9px; max-width: calc(100vw - 24px); border: 1px solid var(--dsw-alias-border-l1); background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 84%, transparent); color: var(--dsw-alias-label-primary); font: inherit; text-align: left; border-radius: 999px; padding: 5px 11px 5px 5px; cursor: grab; touch-action: none; box-shadow: 0 4px 14px color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: border-color .15s ease, background .15s ease; }
      .dq-hud:active { cursor: grabbing; }
      .dq-hud:hover { border-color: var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1); }
      .dq-hud-grip {
        flex: none; width: 11px; align-self: stretch; display: grid; place-items: center;
        font-size: 9px; line-height: 1; color: var(--dsw-alias-label-secondary); opacity: .5;
        cursor: grab; touch-action: none; user-select: none; -webkit-user-select: none;
      }
      .dq-hud-grip:hover { opacity: 1; }
      .dq-hud-grip:active { cursor: grabbing; }
      .dq-crest[data-size="hud"] { flex: none; display: grid; place-items: center; color: var(--dsw-alias-state-warn-primary); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 10%, var(--dsw-alias-bg-layer-2)); border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 28%, var(--dsw-alias-border-l1)); box-shadow: none; }
      .dq-hud-main { display: flex; flex-direction: column; min-width: 124px; max-width: 180px; }
      .dq-hud-line { display: flex; align-items: center; gap: 6px; min-width: 0; }
      .dq-hud-name { font-size: 10.5px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-hud-lv { font-size: 9px; color: var(--dsw-alias-brand-primary); white-space: nowrap; }
      .dq-hud-meter { height: 3px; margin-top: 3px; border-radius: 999px; background: var(--dsw-alias-bg-layer-2); overflow: hidden; }
      .dq-hud-meter > i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--dsw-alias-brand-primary), var(--dsw-alias-state-warn-primary)); }
      .dq-hud-chips { display: flex; align-items: center; gap: 9px; padding-left: 9px; border-left: 1px solid var(--dsw-alias-border-l1); }
      .dq-hud-chip { display: inline-flex; align-items: center; gap: 3px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); white-space: nowrap; font-variant-numeric: tabular-nums; }
      .dq-hud-dot { width: 5px; height: 5px; border-radius: 50%; flex: none; background: var(--dsw-alias-state-warn-primary); animation: dq-pulse 1.8s ease-in-out infinite; }
      .dq-hud-error { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 999px; padding: 4px 9px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); }
      /* Floating pill: it lives in the shell overlay so it can be dragged
         anywhere; the layer is click-through, the pill opts back in. */
      @media (max-width: 720px) {
        .dq-hud-optional { display: none; }
        .dq-hud-main { min-width: 96px; max-width: 132px; }
      }
      @media (max-width: 480px) {
        .dq-hud-main { min-width: 0; max-width: 108px; }
        .dq-hud-lv { display: none; }
      }
      .dq-hero-sep { color: var(--dsw-alias-label-secondary); opacity: .45; }
      .dq-hero-season { color: var(--dsw-alias-state-warn-primary); display: inline-flex; align-items: center; gap: 3px; }
      .dq-hero-power {
        position: relative;
        display: inline-flex; align-items: center; padding: 1px 7px; border-radius: 5px;
        color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, transparent);
        border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, var(--dsw-alias-border-l1));
        font-size: 9.5px; white-space: nowrap;
      }
      .dq-crest-wrap { display: flex; flex-direction: column; align-items: center; gap: 7px; flex: none; max-width: 118px; position: relative; }
      /* Rotating aura behind the level badge, tinted by the equipped frame. */
      .dq-crest-wrap::before {
        content: ""; position: absolute; left: 50%; top: 39px; width: 128px; height: 128px;
        margin: -64px 0 0 -64px; border-radius: 50%; pointer-events: none; z-index: 0;
        background: conic-gradient(from 0deg,
          color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 70%, transparent),
          transparent 28%,
          color-mix(in srgb, var(--frame-color, var(--dsw-alias-state-warn-primary)) 45%, transparent) 52%,
          transparent 78%);
        filter: blur(11px);
        opacity: .55;
        animation: dq-aura-spin 11s linear infinite;
      }
      @keyframes dq-aura-spin { to { transform: rotate(1turn); } }
      /* The outer halo grows with the frame tier, so a mythic badge lights the
         card around it instead of only its own border. */
      .dq-crest-wrap:has(.dq-crest[data-frarity="legendary"])::before { opacity: .72; }
      .dq-crest-wrap:has(.dq-crest[data-frarity="mythic"])::before {
        opacity: .88; width: 152px; height: 152px; margin: -76px 0 0 -76px;
        filter: blur(13px); animation-duration: 9s;
      }
      .dq-crest-wrap:has(.dq-crest[data-frarity="red"])::before {
        opacity: .92; width: 158px; height: 158px; margin: -79px 0 0 -79px;
        filter: blur(13px); animation-duration: 7.4s;
      }
      .dq-crest-wrap:has(.dq-crest[data-frarity="ancient"])::before {
        opacity: 1; width: 166px; height: 166px; margin: -83px 0 0 -83px;
        filter: blur(14px); animation-duration: 6.4s;
      }
      .dq-crest-wrap:has(.dq-crest[data-frarity="divine"])::before {
        opacity: 1; width: 182px; height: 182px; margin: -91px 0 0 -91px;
        filter: blur(16px); animation-duration: 5.4s;
      }
      .dq-crest-aura { display: block; }
      /* Diagonal light sweep across the badge. */
      .dq-crest-sheen { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; pointer-events: none; }
      /* Frame aura: the higher the rarity, the more it moves. */
      .dq-crest-halo {
        position: absolute; inset: -26px; border-radius: 50%; pointer-events: none;
        opacity: 0; transition: opacity .3s ease; z-index: 0;
      }
      .dq-crest[data-frarity="legendary"] .dq-crest-halo {
        opacity: .34;
        background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--frame-color) 42%, transparent), transparent 68%);
        animation: dq-frame-pulse 4.6s ease-in-out infinite;
      }
      .dq-crest[data-frarity="mythic"] .dq-crest-halo,
      .dq-crest[data-frarity="red"] .dq-crest-halo,
      .dq-crest[data-frarity="ancient"] .dq-crest-halo,
      .dq-crest[data-frarity="divine"] .dq-crest-halo {
        opacity: .55;
        background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--frame-color) 52%, transparent), transparent 66%);
        animation: dq-frame-pulse 3.4s ease-in-out infinite;
      }
      .dq-crest[data-frarity="ancient"] .dq-crest-halo { opacity: .6; animation-duration: 2.8s; }
      .dq-crest[data-frarity="divine"] .dq-crest-halo { opacity: .68; animation-duration: 2.4s; inset: -34px; }
      .dq-crest-aura {
        position: absolute; inset: -9px; border-radius: 24px; pointer-events: none;
        opacity: 0; transition: opacity .3s ease; z-index: 0;
      }
      .dq-crest[data-frarity="legendary"] .dq-crest-aura {
        opacity: .5;
        background: radial-gradient(58% 58% at 50% 42%, color-mix(in srgb, var(--frame-color) 55%, transparent), transparent 72%);
        animation: dq-frame-pulse 4.2s ease-in-out infinite;
      }
      .dq-crest[data-frarity="mythic"] .dq-crest-aura,
      .dq-crest[data-frarity="red"] .dq-crest-aura,
      .dq-crest[data-frarity="ancient"] .dq-crest-aura,
      .dq-crest[data-frarity="divine"] .dq-crest-aura {
        opacity: .95;
        border-radius: 26px;
        background: conic-gradient(from 0deg,
          transparent 0deg,
          color-mix(in srgb, var(--frame-color) 95%, transparent) 30deg,
          color-mix(in srgb, #ffffff 70%, transparent) 48deg,
          transparent 100deg,
          color-mix(in srgb, var(--frame-color) 60%, transparent) 210deg,
          transparent 270deg);
        /* Keep only the ring band so the sweep reads as spinning light. */
        mask: radial-gradient(closest-side, transparent calc(100% - 9px), #000 calc(100% - 5px));
        -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 9px), #000 calc(100% - 5px));
        filter: blur(1.4px) saturate(1.3);
        animation: dq-aura-spin 7s linear infinite;
        will-change: transform;
      }
      .dq-crest[data-frarity="red"] .dq-crest-aura { animation-duration: 5.4s; }
      .dq-crest[data-frarity="ancient"] .dq-crest-aura { animation-duration: 4.6s; }
      .dq-crest[data-frarity="divine"] .dq-crest-aura { animation-duration: 3.8s; inset: -12px; filter: blur(6px); }
      .dq-crest[data-frarity="mythic"] .dq-crest-ring,
      .dq-crest[data-frarity="red"] .dq-crest-ring,
      .dq-crest[data-frarity="ancient"] .dq-crest-ring,
      .dq-crest[data-frarity="divine"] .dq-crest-ring {
        border-color: color-mix(in srgb, var(--frame-color) 82%, #ffffff 18%);
      }
      .dq-crest[data-frarity="mythic"] .dq-crest-ring::before,
      .dq-crest[data-frarity="red"] .dq-crest-ring::before,
      .dq-crest[data-frarity="ancient"] .dq-crest-ring::before,
      .dq-crest[data-frarity="divine"] .dq-crest-ring::before {
        content: ""; position: absolute; inset: -4px; border-radius: inherit;
        border: 1px solid color-mix(in srgb, var(--frame-color) 42%, transparent);
        pointer-events: none;
      }
      .dq-crest[data-frarity="divine"] .dq-crest-level { color: #fff; text-shadow: 0 0 14px color-mix(in srgb, var(--frame-color) 85%, transparent); }
      /* Divine frames get a rotating burst of light rays behind the badge. */
      .dq-crest[data-frarity="divine"] {
        box-shadow:
          inset 0 0 0 1px rgba(255, 255, 255, .42),
          inset 0 0 24px rgba(255, 255, 255, .34),
          0 0 34px rgba(184, 240, 255, .55);
      }
      .dq-crest[data-frarity="divine"] .dq-crest-aura {
        inset: -18px; border-radius: 50%; opacity: .9;
        background:
          repeating-conic-gradient(from 0deg,
            rgba(255, 255, 255, .58) 0deg 2.4deg,
            transparent 2.4deg 16deg),
          conic-gradient(from 0deg,
            transparent 0deg,
            rgba(184, 240, 255, .85) 40deg,
            transparent 110deg,
            rgba(255, 255, 255, .8) 200deg,
            transparent 280deg);
        mask: radial-gradient(closest-side,
          transparent 46%, #000 62%, #000 88%, transparent 100%);
        -webkit-mask: radial-gradient(closest-side,
          transparent 46%, #000 62%, #000 88%, transparent 100%);
        filter: blur(.6px) saturate(1.2);
        animation: dq-aura-spin 11s linear infinite;
      }
      .dq-crest-sheen::after {
        content: ""; position: absolute; top: -40%; left: -130%; width: 52%; height: 180%;
        background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .32), transparent);
        transform: rotate(16deg);
        animation: dq-crest-sheen 7.5s ease-in-out infinite;
      }
      @keyframes dq-crest-sheen {
        0%, 58% { left: -130%; }
        82%, 100% { left: 132%; }
      }
      .dq-frame-caption {
        appearance: none; border: 1px solid transparent; background: transparent;
        color: var(--dsw-alias-label-secondary); font: inherit; font-size: 9px; line-height: 1.3;
        display: inline-flex; align-items: center; justify-content: center; gap: 3px;
        padding: 2px 7px; border-radius: 999px; cursor: pointer; text-align: center;
      }
      .dq-frame-caption:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); }
      /* Avatar frames are a ring inside the crest: a colour, a weight and a
         glow that the crest picks up through custom properties, so every
         frame reads differently and a swap is visible at a glance. */
      .dq-crest {
        --frame-color: color-mix(in srgb, var(--dsw-alias-label-secondary) 46%, transparent);
        --frame-width: 1px;
        --frame-glow: 0 0 0 transparent;
        animation: dq-frame-pop .5s cubic-bezier(.22, 1, .36, 1) 1;
      }
      .dq-crest-ring {
        position: absolute; inset: 5px; border-radius: 18px; pointer-events: none;
        border: var(--frame-width) var(--frame-style, solid) var(--frame-color);
        box-shadow: var(--frame-glow);
        transition: border-color .2s ease, box-shadow .2s ease;
      }
      .dq-crest[data-frame]:not([data-frame="f.novice"]) .dq-crest-ring {
        background-image:
          radial-gradient(circle at 5px 5px, var(--frame-color) 1.4px, transparent 1.7px),
          radial-gradient(circle at calc(100% - 5px) 5px, var(--frame-color) 1.4px, transparent 1.7px),
          radial-gradient(circle at 5px calc(100% - 5px), var(--frame-color) 1.4px, transparent 1.7px),
          radial-gradient(circle at calc(100% - 5px) calc(100% - 5px), var(--frame-color) 1.4px, transparent 1.7px);
      }
      .dq-crest[data-frame="f.novice"] .dq-crest-ring { border-style: dashed; }
      [data-frame="f.bronze"] { --frame-color: var(--dsw-alias-state-warn-primary); --frame-glow: 0 0 14px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 24%, transparent); }
      [data-frame="f.verdant"] { --frame-color: var(--dsw-alias-state-success-primary); --frame-width: 2px; --frame-glow: 0 0 13px color-mix(in srgb, var(--dsw-alias-state-success-primary) 24%, transparent); }
      [data-frame="f.starlight"] { --frame-color: var(--dsw-alias-brand-primary); --frame-glow: 0 0 20px color-mix(in srgb, var(--dsw-alias-brand-primary) 38%, transparent); }
      [data-frame="f.ember"] { --frame-color: var(--dsw-alias-state-error-primary); --frame-glow: 0 0 18px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 34%, transparent); }
      [data-frame="f.season"] { --frame-color: var(--dsw-alias-state-warn-primary); --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 24%, transparent), 0 0 22px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 38%, transparent); }
      [data-frame="f.calamity"] { --frame-color: var(--dsw-alias-state-error-primary); --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-error-primary) 28%, transparent), 0 0 24px color-mix(in srgb, var(--dsw-alias-state-error-primary) 34%, transparent); }
      /* The aurora frame is the season-pass finale, so it gets its own two-tone
         light instead of a theme token. */
      [data-frame="f.aurora"] { --frame-color: #7cf0ff; --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, #b07fff 34%, transparent), 0 0 26px color-mix(in srgb, #7cf0ff 48%, transparent); }
      [data-frame="f.echo"] { --frame-color: #b07fff; --frame-glow: 0 0 16px color-mix(in srgb, #b07fff 36%, transparent); }
      [data-frame="f.titan"] { --frame-color: #e0a55a; --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, #e0a55a 26%, transparent), 0 0 24px color-mix(in srgb, #e0a55a 34%, transparent); }
      [data-frame="f.nova"] { --frame-color: #ff7ad9; --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, #ff7ad9 32%, transparent), 0 0 28px color-mix(in srgb, #ff7ad9 48%, transparent); }
      [data-frame="f.storm"] { --frame-color: #6fd6ff; --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, #6fd6ff 28%, transparent), 0 0 24px color-mix(in srgb, #6fd6ff 42%, transparent); }
      [data-frame="f.genesis"] { --frame-color: #e8d8b0; --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, #e8d8b0 34%, transparent), 0 0 30px color-mix(in srgb, #fff2c8 46%, transparent); }
      [data-frame="f.rune"] { --frame-color: #9ef4d0; --frame-glow: 0 0 15px color-mix(in srgb, #9ef4d0 32%, transparent); }
      [data-frame="f.abyss"] { --frame-color: #6a5aa8; --frame-width: 2px; --frame-glow: 0 0 0 2px color-mix(in srgb, #6a5aa8 40%, transparent), 0 0 30px color-mix(in srgb, #2a1a4a 55%, transparent); }
      .dq-crest[data-size="mini"] { width: 48px; height: 48px; border-radius: 14px; }
      .dq-crest[data-size="mini"] .dq-crest-level { font-size: 16px; }
      .dq-crest[data-size="mini"] .dq-crest-label { display: none; }
      .dq-crest[data-size="mini"]::before, .dq-crest[data-size="mini"]::after { display: none; }
      .dq-crest[data-size="mini"] .dq-crest-ring { inset: 3px; border-radius: 9px; }
      .dq-crest[data-size="hud"] { width: 27px; height: 27px; border-radius: 50%; }
      .dq-crest[data-size="hud"] .dq-crest-aura { inset: -4px; border-radius: 50%; }
      /* Transcendent: the single peak frame, gold rays over a white core. */
      .dq-crest[data-frarity="transcendent"] {
        box-shadow:
          inset 0 0 0 1px rgba(255, 255, 255, .55),
          inset 0 0 28px rgba(255, 233, 168, .45),
          0 0 42px rgba(255, 214, 107, .6);
      }
      .dq-crest[data-frarity="transcendent"] .dq-crest-level {
        color: #fff; text-shadow: 0 0 8px #fff, 0 0 20px rgba(255, 233, 168, .95);
      }
      .dq-crest[data-frarity="transcendent"] .dq-crest-aura {
        inset: -20px; border-radius: 50%; opacity: .95;
        background:
          repeating-conic-gradient(from 0deg,
            rgba(255, 236, 170, .7) 0deg 3deg,
            transparent 3deg 15deg),
          conic-gradient(from 0deg,
            transparent 0deg,
            rgba(255, 233, 168, .9) 40deg,
            transparent 110deg,
            rgba(255, 255, 255, .85) 200deg,
            transparent 280deg);
        mask: radial-gradient(closest-side, transparent 42%, #000 60%, #000 90%, transparent 100%);
        -webkit-mask: radial-gradient(closest-side, transparent 42%, #000 60%, #000 90%, transparent 100%);
        filter: blur(.5px) saturate(1.25);
        animation: dq-aura-spin 9s linear infinite;
      }
      .dq-crest[data-size="hud"][data-frarity="mythic"] .dq-crest-aura,
      .dq-crest[data-size="hud"][data-frarity="red"] .dq-crest-aura,
      .dq-crest[data-size="hud"][data-frarity="ancient"] .dq-crest-aura,
      .dq-crest[data-size="hud"][data-frarity="divine"] .dq-crest-aura {
        mask: radial-gradient(closest-side, transparent calc(100% - 5px), #000 calc(100% - 2px));
        -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 5px), #000 calc(100% - 2px));
        filter: blur(.8px) saturate(1.35);
      }
      .dq-crest[data-size="mini"] .dq-crest-aura { inset: -6px; }
      .dq-crest[data-size="mini"][data-frarity="mythic"] .dq-crest-aura,
      .dq-crest[data-size="mini"][data-frarity="red"] .dq-crest-aura,
      .dq-crest[data-size="mini"][data-frarity="ancient"] .dq-crest-aura,
      .dq-crest[data-size="mini"][data-frarity="divine"] .dq-crest-aura {
        mask: radial-gradient(closest-side, transparent calc(100% - 7px), #000 calc(100% - 4px));
        -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 7px), #000 calc(100% - 4px));
      }
      .dq-crest[data-size="hud"] .dq-crest-level { font-size: 10.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
      .dq-crest[data-size="hud"] .dq-crest-label { display: none; }
      .dq-crest[data-size="hud"]::before, .dq-crest[data-size="hud"]::after { display: none; }
      .dq-crest[data-size="hud"] .dq-crest-ring { inset: 2px; border-radius: 50%; }
      .dq-picker { margin-top: 13px; padding-top: 12px; border-top: 1px dashed color-mix(in srgb, var(--dsw-alias-border-l1) 82%, transparent); }
      .dq-picker-head { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 9px; }
      .dq-picker-title { font-size: 11px; font-weight: 600; }
      .dq-picker-hint { font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-picker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(162px, 1fr)); gap: 8px; }
      .dq-pick {
        appearance: none; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 9px;
        text-align: left; font: inherit; cursor: pointer; padding: 7px 9px; border-radius: 11px;
        border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        transition: border-color .15s ease, background .15s ease, transform .15s ease;
      }
      .dq-pick:hover:not(:disabled) { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 42%, var(--dsw-alias-border-l1)); transform: translateY(-1px); }
      .dq-pick:disabled { opacity: .45; cursor: not-allowed; }
      /* Divine and ancient frames keep more of their art while still locked. */
      .dq-pick[data-rarity="divine"]:disabled { opacity: .66; }
      .dq-pick[data-rarity="ancient"]:disabled { opacity: .6; }
      .dq-pick[data-rarity="divine"] { box-shadow: inset 0 0 18px color-mix(in srgb, #b8f0ff 12%, transparent); }
      .dq-pick[data-equipped="true"] { border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 46%, var(--dsw-alias-border-l1)); background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 7%, var(--dsw-alias-bg-layer-1)); }
      .dq-pick-glyph {
        width: 32px; height: 32px; padding: 3px; display: grid; place-items: center; border-radius: 9px; font-size: 14px;
        color: var(--dsw-alias-brand-primary);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, var(--dsw-alias-bg-layer-2));
        border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, var(--dsw-alias-border-l1));
      }
      .dq-pick[data-rarity="legendary"] .dq-pick-glyph { color: var(--dsw-alias-state-warn-primary); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 10%, var(--dsw-alias-bg-layer-2)); border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 22%, var(--dsw-alias-border-l1)); }
      .dq-pick[data-rarity="mythic"] .dq-pick-glyph { color: #ff7ad9; background: color-mix(in srgb, #ff7ad9 10%, var(--dsw-alias-bg-layer-2)); border-color: color-mix(in srgb, #ff7ad9 26%, var(--dsw-alias-border-l1)); }
      .dq-pick[data-rarity="epic"] .dq-pick-glyph { color: var(--dsw-alias-brand-primary); }
      .dq-pick-main { min-width: 0; }
      .dq-pick-name { display: block; font-size: 10.8px; font-weight: 550; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-pick-count { color: #f2c14e; font-weight: 700; font-size: 10px; }
      /* Rarity is the first thing you should see in the picker. */
      .dq-pick { border-color: color-mix(in srgb, var(--pick-tone, var(--dsw-alias-border-l1)) 45%, var(--dsw-alias-border-l1)); }
      .dq-pick[data-rarity="common"] { --pick-tone: #b8c0cc; }
      .dq-pick[data-rarity="rare"] { --pick-tone: #63d2b4; }
      .dq-pick[data-rarity="epic"] { --pick-tone: #7f9dff; }
      .dq-pick[data-rarity="legendary"] { --pick-tone: #f2c14e; }
      .dq-pick[data-rarity="mythic"] { --pick-tone: #ff7ad9; }
      .dq-pick[data-rarity="red"] { --pick-tone: #ff4d4d; }
      .dq-pick[data-rarity="ancient"] { --pick-tone: #ff8a3c; }
      .dq-pick[data-rarity="divine"] { --pick-tone: #b8f0ff; }
      .dq-pick[data-rarity="transcendent"] {
        --pick-tone: #ffe9a8;
        background: linear-gradient(120deg,
          color-mix(in srgb, #ffe9a8 12%, var(--dsw-alias-bg-layer-1)),
          color-mix(in srgb, #ffffff 6%, var(--dsw-alias-bg-layer-1)));
      }
      .dq-pick[data-rarity="transcendent"]:disabled { opacity: .78; }
      .dq-pick-rarity { font-weight: 650; }
      .dq-pick { border-left-width: 3px; }
      .dq-pick[data-equipped="true"] { border-color: color-mix(in srgb, var(--pick-tone, var(--dsw-alias-brand-primary)) 80%, var(--dsw-alias-border-l1)); }
      .dq-synth .dq-enhance-title { color: #ffd76b; }
      .dq-synth-empty { padding: 6px 2px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-synth-tabs { display: flex; gap: 4px; margin: 1px 0 3px; }
      .dq-synth-tab {
        appearance: none; font: inherit; cursor: pointer;
        padding: 3px 11px; border-radius: 999px; font-size: 9.5px; font-weight: 600;
        border: 1px solid var(--dsw-alias-border-l1);
        background: transparent; color: var(--dsw-alias-label-secondary);
        transition: color .15s ease, border-color .15s ease, background .15s ease;
      }
      .dq-synth-tab:hover { color: var(--dsw-alias-label-primary); }
      .dq-synth-tab.is-active {
        color: var(--dsw-alias-label-primary);
        border-color: color-mix(in srgb, #ffd76b 52%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #ffd76b 14%, transparent);
      }
      .dq-pick-meta { display: block; margin-top: 1px; font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-pick-badge { font-size: 9px; font-weight: 600; color: var(--dsw-alias-state-success-primary); white-space: nowrap; }
      .dq-gear-slot {
        appearance: none; text-align: left; font: inherit; cursor: pointer; color: inherit;
        position: relative; overflow: hidden;
        display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 9px; align-items: center;
        padding: 10px; border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--slot-tone, var(--dsw-alias-border-l1)) 26%, var(--dsw-alias-border-l1));
        background:
          radial-gradient(120% 100% at 50% -20%, color-mix(in srgb, var(--slot-tone, transparent) 18%, transparent), transparent 72%),
          color-mix(in srgb, var(--dsw-alias-bg-layer-2) 58%, transparent);
        min-width: 0;
        transition: transform .18s cubic-bezier(.22, 1, .36, 1), border-color .18s ease, box-shadow .18s ease;
      }
      .dq-gear-slot[data-rarity="common"] { --slot-tone: #9aa4b8; }
      .dq-gear-slot[data-rarity="rare"] { --slot-tone: #4fd1c5; }
      .dq-gear-slot[data-rarity="epic"] { --slot-tone: #7f9dff; }
      .dq-gear-slot[data-rarity="legendary"] { --slot-tone: #f2c14e; }
      .dq-gear-slot[data-rarity="mythic"] { --slot-tone: #ff7ad9; }
      /* Rarity hairline along the top edge. */
      .dq-gear-slot::after {
        content: ""; position: absolute; left: 12%; right: 12%; top: 0; height: 1px;
        background: linear-gradient(90deg, transparent, var(--slot-tone, transparent), transparent);
        opacity: .75;
      }
      .dq-gear-slot[data-rarity="mythic"]::before {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: linear-gradient(110deg, transparent 32%, rgba(255, 255, 255, .16) 50%, transparent 68%);
        transform: translateX(-110%);
        animation: dq-slot-sheen 5.5s ease-in-out infinite;
      }
      @keyframes dq-slot-sheen { 0%, 62% { transform: translateX(-110%); } 100% { transform: translateX(110%); } }
      .dq-gear-slot[data-rarity="red"] { --slot-tone: #ff4d4d; }
      .dq-gear-slot[data-rarity="ancient"] { --slot-tone: #ff8a3c; }
      .dq-gear-slot[data-rarity="divine"] { --slot-tone: #b8f0ff; }
      .dq-gear-slot[data-rarity="transcendent"] { --slot-tone: #ffe9a8; }
      .dq-gear-slot[data-rarity="red"]::before,
      .dq-gear-slot[data-rarity="ancient"]::before,
      .dq-gear-slot[data-rarity="divine"]::before,
      .dq-gear-slot[data-rarity="transcendent"]::before {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: linear-gradient(110deg, transparent 32%, rgba(255, 255, 255, .22) 50%, transparent 68%);
        transform: translateX(-110%);
        animation: dq-slot-sheen 4.4s ease-in-out infinite;
      }
      .dq-gear-slot[data-rarity="ancient"]::before { animation-duration: 3.8s; }
      .dq-gear-slot[data-rarity="divine"]::before { animation-duration: 3.2s; }
      .dq-gear-slot[data-rarity="transcendent"]::before { animation-duration: 2.6s; }
      .dq-gear-slot[data-rarity="mythic"],
      .dq-gear-slot[data-rarity="red"],
      .dq-gear-slot[data-rarity="ancient"],
      .dq-gear-slot[data-rarity="divine"],
      .dq-gear-slot[data-rarity="transcendent"] {
        border-color: color-mix(in srgb, var(--slot-tone) 48%, var(--dsw-alias-border-l1));
        box-shadow:
          inset 0 0 22px color-mix(in srgb, var(--slot-tone) 14%, transparent),
          0 0 16px color-mix(in srgb, var(--slot-tone) 22%, transparent);
      }
      .dq-gear-slot[data-rarity="ancient"],
      .dq-gear-slot[data-rarity="divine"],
      .dq-gear-slot[data-rarity="transcendent"] {
        box-shadow:
          inset 0 0 26px color-mix(in srgb, var(--slot-tone) 18%, transparent),
          0 0 22px color-mix(in srgb, var(--slot-tone) 30%, transparent);
      }
      .dq-gear-slot-icon {
        width: 40px; height: 40px; display: grid; place-items: center; padding: 3px; border-radius: 11px;
        background:
          radial-gradient(circle at 50% 28%, color-mix(in srgb, var(--slot-tone, transparent) 30%, transparent), transparent 72%),
          color-mix(in srgb, var(--dsw-alias-bg-layer-2) 76%, transparent);
        border: 1px solid color-mix(in srgb, var(--slot-tone, var(--dsw-alias-border-l1)) 38%, var(--dsw-alias-border-l1));
        color: var(--dsw-alias-label-secondary);
        box-shadow: inset 0 0 14px color-mix(in srgb, var(--slot-tone, transparent) 26%, transparent),
          0 0 14px color-mix(in srgb, var(--slot-tone, transparent) 16%, transparent);
      }
      .dq-gear-slot-icon .dq-crest[data-size="mini"] { width: 34px; height: 34px; border-radius: 9px; }
      .dq-gear-slot-icon .dq-crest[data-size="mini"] .dq-crest-level { font-size: 11px; }
      .dq-slot-empty { font-size: 15px; opacity: .6; }
      .dq-gear-slot-text { min-width: 0; display: block; }
      .dq-gear-slot:hover {
        transform: translateY(-2px);
        border-color: color-mix(in srgb, var(--slot-tone, var(--dsw-alias-border-l2)) 58%, var(--dsw-alias-border-l1));
        box-shadow: 0 10px 24px color-mix(in srgb, var(--slot-tone, transparent) 20%, transparent);
      }
      .dq-gear-slot.is-open {
        border-color: color-mix(in srgb, var(--slot-tone, var(--dsw-alias-brand-primary)) 72%, var(--dsw-alias-border-l1));
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--slot-tone, var(--dsw-alias-brand-primary)) 30%, transparent),
          0 10px 24px color-mix(in srgb, var(--slot-tone, transparent) 22%, transparent);
      }
      .dq-gear-slot .dq-gear-slot-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-gear-slot .dq-rarity { display: block; }
      .dq-gear-slot-edit { display: block; margin-top: 6px; font-size: 9px; font-weight: 600; color: var(--slot-tone, var(--dsw-alias-brand-primary)); opacity: .78; }
      .dq-gear-slot:hover .dq-gear-slot-edit { opacity: 1; }
      .dq-gear-slot[data-signature="true"] {
        box-shadow:
          inset 0 0 24px color-mix(in srgb, #f2c14e 18%, transparent),
          0 0 20px color-mix(in srgb, #f2c14e 24%, transparent);
      }
      .dq-gear-slot[data-signature="true"] .dq-gear-slot-icon {
        border-color: color-mix(in srgb, #f2c14e 62%, var(--dsw-alias-border-l1));
        box-shadow: inset 0 0 16px color-mix(in srgb, #f2c14e 32%, transparent), 0 0 16px color-mix(in srgb, #f2c14e 28%, transparent);
      }
      .dq-sig { margin-left: 3px; font-size: 9px; color: #f2c14e; text-shadow: 0 0 8px rgba(242, 193, 78, .75); }
      /* Weapon-rarity aura behind the doll, so a good weapon is visible even
         when the silhouette barely changes. */
      .dq-doll[data-weapon="rare"] { --weapon-glow: #4fd1c5; }
      .dq-doll[data-weapon="epic"] { --weapon-glow: #7f9dff; }
      .dq-doll[data-weapon="legendary"] { --weapon-glow: #f2c14e; }
      .dq-doll[data-weapon="mythic"] { --weapon-glow: #ff7ad9; }
      .dq-doll[data-weapon="red"] { --weapon-glow: #ff4d4d; }
      .dq-doll::after {
        content: ""; position: absolute; left: 50%; top: 50%; width: 84%; height: 72%;
        transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none; z-index: 0;
        background: radial-gradient(circle,
          color-mix(in srgb, var(--weapon-glow) 36%, transparent), transparent 70%);
        filter: blur(9px);
        animation: dq-doll-glow 3.8s ease-in-out infinite;
      }
      .dq-doll[data-weapon="common"]::after, .dq-doll[data-weapon="rare"]::after { opacity: .55; }
      @keyframes dq-doll-glow { 0%, 100% { opacity: .5; } 50% { opacity: .95; } }
      .dq-doll-sprite, .dq-doll-meta { position: relative; z-index: 1; }
      /* Loadout strip on the character card: the four equipped pieces at a glance. */
      .dq-doll-loadout {
        position: relative; z-index: 1;
        display: flex; align-items: center; justify-content: center; gap: 4px;
        margin-top: 2px; flex-wrap: nowrap;
      }
      .dq-doll-gear {
        display: grid; place-items: center;
        width: 20px; height: 20px; border-radius: 6px; padding: 1px;
        border: 1px solid color-mix(in srgb, var(--slot-tone, var(--dsw-alias-border-l1)) 45%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, var(--slot-tone, transparent) 14%, var(--dsw-alias-bg-layer-2));
        box-shadow: 0 0 8px color-mix(in srgb, var(--slot-tone, transparent) 30%, transparent);
      }
      .dq-doll-gear[data-rarity="common"] { --slot-tone: #9aa4b8; }
      .dq-doll-gear[data-rarity="rare"] { --slot-tone: #4fd1c5; }
      .dq-doll-gear[data-rarity="epic"] { --slot-tone: #7f9dff; }
      .dq-doll-gear[data-rarity="legendary"] { --slot-tone: #f2c14e; }
      .dq-doll-gear[data-rarity="mythic"] { --slot-tone: #ff7ad9; }
      .dq-doll-gear[data-rarity="red"] { --slot-tone: #ff4d4d; }
      .dq-doll-gear .dq-crest[data-size="mini"] { width: 16px; height: 16px; border-radius: 4px; }
      .dq-doll-gear .dq-crest[data-size="mini"] .dq-crest-level { font-size: 7px; }
      .dq-doll-gear .dq-crest[data-size="mini"] .dq-crest-label { display: none; }
      .dq-doll-gear .dq-item-px { width: 15px; height: 15px; }
      .dq-enhance { margin-top: 12px; padding-top: 11px; border-top: 1px solid var(--dsw-alias-border-l1); display: flex; flex-direction: column; gap: 6px; }
      .dq-enhance-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
      .dq-enhance-title { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 600; color: var(--dsw-alias-label-primary); }
      .dq-enhance-hint { font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-enhance-row {
        display: grid; grid-template-columns: minmax(0, 1fr) auto auto auto; align-items: center; gap: 7px;
        padding: 5px 8px; border-radius: 8px;
        border: 1px solid color-mix(in srgb, var(--slot-tone, var(--dsw-alias-border-l1)) 26%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, var(--slot-tone, transparent) 7%, transparent);
      }
      .dq-enhance-row[data-rarity="red"] { --slot-tone: #ff4d4d; }
      .dq-enhance-row[data-rarity="mythic"] { --slot-tone: #ff7ad9; }
      .dq-enhance-row[data-rarity="legendary"] { --slot-tone: #f2c14e; }
      .dq-enhance-row[data-rarity="epic"] { --slot-tone: #7f9dff; }
      .dq-enhance-row[data-rarity="rare"] { --slot-tone: #4fd1c5; }
      .dq-enhance-name { display: inline-flex; align-items: baseline; gap: 6px; font-size: 10px; font-weight: 550; min-width: 0; }
      .dq-enhance-level { font-size: 9.5px; font-weight: 700; color: var(--slot-tone, var(--dsw-alias-brand-primary)); }
      .dq-enhance-power { font-size: 9.5px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-enhance-row .dq-btn { padding: 3px 9px; font-size: 9.5px; }
      .dq-enhance-ascend { font-size: 8.5px; font-weight: 700; color: #f2c14e; letter-spacing: .02em; }
      .dq-ascend-btn { color: #f2c14e; border-color: color-mix(in srgb, #f2c14e 32%, var(--dsw-alias-border-l1)); }
      .dq-story-stage {
        padding: 2px 9px; border-radius: 999px;
        font-size: 10px; font-weight: 700; color: #ffb08a;
        border: 1px solid color-mix(in srgb, #ff9a6b 34%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #ff9a6b 12%, transparent);
        white-space: nowrap;
      }
      .dq-story-body { margin-top: 12px; display: flex; flex-direction: column; gap: 7px; }
      .dq-story-boss { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 650; }
      .dq-story-hp { font-size: 10px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-story-meter { height: 8px; border-radius: 999px; overflow: hidden; background: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, var(--dsw-alias-bg-layer-2)); }
      .dq-story-meter > i {
        display: block; height: 100%; border-radius: inherit;
        background: linear-gradient(90deg, #ff9a6b, #f2c14e);
        box-shadow: 0 0 12px rgba(255, 154, 107, .45);
        transition: width .5s cubic-bezier(.22, 1, .36, 1);
      }
      .dq-story-foot { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-points {
        display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px;
        margin-top: 12px; padding: 9px 11px; border-radius: 10px;
        border: 1px solid color-mix(in srgb, #ff4d4d 32%, var(--dsw-alias-border-l1));
        background: linear-gradient(100deg,
          color-mix(in srgb, #ff4d4d 12%, transparent),
          color-mix(in srgb, #ff7ad9 8%, transparent));
      }
      .dq-points-info { display: flex; align-items: baseline; gap: 7px; }
      .dq-points-label { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; color: var(--dsw-alias-label-secondary); }
      .dq-points-value { font-size: 17px; font-weight: 700; color: #ff6b6b; font-variant-numeric: tabular-nums; }
      .dq-points-total { font-size: 10px; font-weight: 500; color: var(--dsw-alias-label-secondary); }
      .dq-points-hint { font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-points .dq-btn { padding: 4px 11px; font-size: 10px; }
      .dq-red-set { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
      .dq-red-chip {
        padding: 2px 8px; border-radius: 999px;
        font-size: 9px; font-weight: 600; letter-spacing: .02em;
        border: 1px dashed color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);
        color: var(--dsw-alias-label-secondary);
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent);
      }
      .dq-red-chip[data-owned="true"] {
        border-style: solid;
        border-color: color-mix(in srgb, #ff4d4d 55%, transparent);
        color: #ff8080;
        background: color-mix(in srgb, #ff4d4d 14%, transparent);
        box-shadow: 0 0 12px rgba(255, 77, 77, .28);
      }
      .dq-gear-body { display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 12px; align-items: stretch; }
      .dq-doll {
        --frame-color: color-mix(in srgb, var(--dsw-alias-label-secondary) 46%, transparent);
        --frame-width: 1px;
        --frame-glow: 0 0 0 transparent;
        --weapon-glow: transparent;
        position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px;
        padding: 9px 7px 8px; border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--frame-color) 55%, var(--dsw-alias-border-l1));
        background:
          radial-gradient(72% 58% at 50% 34%, color-mix(in srgb, var(--frame-color) 18%, transparent), transparent 72%),
          radial-gradient(64% 42% at 50% 82%, color-mix(in srgb, var(--armor-tone, transparent) 30%, transparent), transparent 72%),
          linear-gradient(180deg, #1a1530, #141020);
        box-shadow: var(--frame-glow);
      }
      .dq-doll-ring { position: absolute; inset: 5px; border-radius: 9px; border: var(--frame-width) solid var(--frame-color); opacity: .5; pointer-events: none; }
      .dq-doll-sprite { position: relative; z-index: 1; width: 120px; height: 120px; }
      /* Gear aura behind the figure: driven by the best equipped rarity. */
      .dq-doll-aura {
        position: absolute; left: 50%; top: 46%; width: 168px; height: 168px;
        margin: -84px 0 0 -84px; border-radius: 50%; pointer-events: none; z-index: 0;
        opacity: 0; transition: opacity .3s ease;
      }
      .dq-doll-aura[data-tone="rare"] {
        opacity: .3;
        background: radial-gradient(circle, color-mix(in srgb, #63d2b4 40%, transparent), transparent 66%);
      }
      .dq-doll-aura[data-tone="epic"] {
        opacity: .4;
        background: radial-gradient(circle, color-mix(in srgb, #7f9dff 44%, transparent), transparent 68%);
        animation: dq-frame-pulse 4.4s ease-in-out infinite;
      }
      .dq-doll-aura[data-tone="legendary"] {
        opacity: .55;
        background: radial-gradient(circle, color-mix(in srgb, #f2c14e 48%, transparent), transparent 70%);
        animation: dq-frame-pulse 3.8s ease-in-out infinite;
      }
      .dq-doll-aura[data-tone="mythic"],
      .dq-doll-aura[data-tone="red"],
      .dq-doll-aura[data-tone="ancient"],
      .dq-doll-aura[data-tone="divine"],
      .dq-doll-aura[data-tone="transcendent"] {
        opacity: .85;
        background:
          conic-gradient(from 0deg,
            transparent 0deg,
            color-mix(in srgb, var(--gear-tone) 80%, transparent) 40deg,
            transparent 110deg,
            color-mix(in srgb, #ffffff 55%, transparent) 200deg,
            transparent 280deg),
          radial-gradient(circle, color-mix(in srgb, var(--gear-tone) 42%, transparent), transparent 70%);
        mask: radial-gradient(closest-side, transparent 44%, #000 62%, #000 92%, transparent 100%);
        -webkit-mask: radial-gradient(closest-side, transparent 44%, #000 62%, #000 92%, transparent 100%);
        filter: blur(2px) saturate(1.2);
        animation: dq-aura-spin 9s linear infinite;
      }
      .dq-doll-aura[data-tone="mythic"] { --gear-tone: #ff7ad9; }
      .dq-doll-aura[data-tone="red"] { --gear-tone: #ff4d4d; animation-duration: 7s; }
      .dq-doll-aura[data-tone="ancient"] { --gear-tone: #ff8a3c; animation-duration: 6s; }
      .dq-doll-aura[data-tone="divine"] { --gear-tone: #b8f0ff; animation-duration: 5s; }
      .dq-doll-aura[data-tone="transcendent"] { --gear-tone: #ffe9a8; animation-duration: 4.2s; opacity: .95; }
      .dq-doll-sprite::after {
        content: ""; position: absolute; left: 10%; right: 10%; bottom: -2px; height: 6px;
        border-radius: 50%; background: rgba(0, 0, 0, .5); filter: blur(1px); z-index: -1;
      }
      .dq-doll-px { display: block; width: 100%; height: 100%; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, .5)); }
      .dq-doll-meta { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1px; font-size: 8.5px; line-height: 1.3; color: #d6d9ff; text-align: center; }
      .dq-doll-meta b { font-size: 10px; font-weight: 700; letter-spacing: .05em; color: #ffd76b; }
      .dq-doll-meta span { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .dq-item-px { display: block; width: 100%; height: 100%; }
      .dq-power-pop {
        position: absolute; right: 0; top: -15px; font-size: 9.5px; font-weight: 700;
        color: var(--dsw-alias-state-success-primary); pointer-events: none;
        animation: dq-rise-fade 2.4s ease-out 1 forwards;
      }
      .dq-hero-power.is-up { border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 48%, var(--dsw-alias-border-l1)); }
      .dq-chest-card { overflow: hidden; }
      .dq-chest-body { display: grid; grid-template-columns: 66px minmax(0, 1fr); gap: 13px; align-items: center; }
      .dq-chest-art {
        position: relative; width: 66px; height: 66px; border-radius: 14px; display: grid; place-items: center;
        color: var(--dsw-alias-state-warn-primary);
        border: 1px solid color-mix(in srgb, currentColor 30%, var(--dsw-alias-border-l1));
        background:
          radial-gradient(circle at 50% 35%, color-mix(in srgb, currentColor 20%, transparent), transparent 64%),
          var(--dsw-alias-bg-layer-2);
      }
      .dq-chest-art[data-tier="wood"] { color: var(--dsw-alias-state-idle-primary); }
      .dq-chest-art[data-tier="iron"] { color: var(--dsw-alias-state-success-primary); }
      .dq-chest-art[data-tier="gold"] { color: var(--dsw-alias-state-warn-primary); }
      .dq-chest-art[data-tier="astral"] { color: var(--dsw-alias-brand-primary); }
      .dq-chest-glyph { font-size: 26px; line-height: 1; }
      .dq-chest-count { position: absolute; right: 6px; bottom: 4px; font-size: 9px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-chest-progress-label { display: flex; justify-content: space-between; gap: 8px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-chest-meter { margin-top: 5px; height: 6px; }
      .dq-chest-meter > i { background: linear-gradient(90deg, var(--dsw-alias-state-warn-primary), var(--dsw-alias-brand-primary)); }
      .dq-chest-meta { display: flex; justify-content: space-between; gap: 8px; margin-top: 5px; font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-chest-last { margin-top: 8px; padding-top: 7px; border-top: 1px solid var(--dsw-alias-border-l1); font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-chest-last-label { color: var(--dsw-alias-label-primary); font-weight: 550; margin-right: 5px; }
      .dq-chest-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; border-top: 1px solid var(--dsw-alias-border-l1); margin-top: 12px; padding-top: 10px; }
      .dq-chest-stock { font-size: 10.5px; color: var(--dsw-alias-state-warn-primary); font-weight: 600; }
      .dq-boss-list { display: flex; flex-direction: column; gap: 2px; }
      .dq-boss-row {
        appearance: none; display: grid; grid-template-columns: 25px minmax(0, 1fr) auto; gap: 8px; align-items: center;
        border: 0; border-top: 1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 72%, transparent);
        background: transparent; color: var(--dsw-alias-label-primary); font: inherit; text-align: left;
        padding: 8px 0 7px; cursor: pointer; border-radius: 5px;
      }
      .dq-boss-row:first-child { border-top: 0; padding-top: 2px; }
      .dq-boss-row:hover { background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 55%, transparent); }
      .dq-boss-row-icon { color: var(--dsw-alias-state-error-primary); font-size: 13px; text-align: center; }
      .dq-boss-row-name { display: block; font-size: 11px; font-weight: 550; }
      .dq-boss-row-kind { display: block; font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-boss-row-hp { font-size: 9.5px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-boss-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(285px, 1fr)); gap: 14px; }
      .dq-boss-card.is-season-boss { border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 30%, var(--dsw-alias-border-l1)); background: linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-bg-layer-1) 94%, var(--dsw-alias-state-warn-primary) 6%), var(--dsw-alias-bg-layer-1)); }
      .dq-season-pass { border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 20%, var(--dsw-alias-border-l1)); }
      .dq-season-renown { text-align: right; font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-season-renown strong { display: block; font-size: 18px; color: var(--dsw-alias-state-warn-primary); font-weight: 650; font-variant-numeric: tabular-nums; }
      .dq-season-rank { display: flex; align-items: center; gap: 7px; margin-top: 8px; flex-wrap: wrap; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-season-rank-badge {
        --rank: var(--dsw-alias-label-secondary);
        display: inline-flex; align-items: center; padding: 1px 8px; border-radius: 999px;
        font-size: 9.5px; font-weight: 650; color: var(--rank);
        border: 1px solid color-mix(in srgb, var(--rank) 45%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, var(--rank) 10%, transparent);
      }
      .dq-season-rank[data-rank="bronze"] .dq-season-rank-badge { --rank: #d08a4e; }
      .dq-season-rank[data-rank="silver"] .dq-season-rank-badge { --rank: #c3ccdb; }
      .dq-season-rank[data-rank="gold"] .dq-season-rank-badge { --rank: var(--dsw-alias-state-warn-primary); }
      .dq-season-rank[data-rank="platinum"] .dq-season-rank-badge { --rank: var(--dsw-alias-brand-primary); }
      .dq-season-rank[data-rank="astral"] .dq-season-rank-badge { --rank: var(--dsw-alias-brand-primary); box-shadow: 0 0 12px color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, transparent); }
      .dq-season-rank[data-rank="legend"] .dq-season-rank-badge { --rank: var(--dsw-alias-state-warn-primary); box-shadow: 0 0 14px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 40%, transparent); }
      .dq-season-tier[data-current="true"] { background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 6%, transparent); border-radius: 9px; }
      .dq-bestiary-row { display: grid; grid-template-columns: 68px minmax(0, 1fr); gap: 10px; align-items: start; padding: 9px 0; border-top: 1px solid var(--dsw-alias-border-l1); }
      .dq-bestiary-row:first-of-type { border-top: 0; padding-top: 2px; }
      .dq-bestiary-kind { padding-top: 3px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-bestiary-list { display: flex; flex-wrap: wrap; gap: 6px; }
      .dq-bestiary-chip {
        display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 999px;
        font-size: 10px; color: var(--dsw-alias-label-secondary);
        border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2);
      }
      .dq-bestiary-chip[data-slain="true"] { color: var(--dsw-alias-label-primary); }
      .dq-bestiary-chip[data-slain="true"] b { font-size: 9px; font-weight: 600; color: var(--dsw-alias-state-success-primary); }
      .dq-bestiary-chip[data-active="true"] {
        color: var(--dsw-alias-state-error-primary);
        border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 42%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);
      }
      .dq-season-previous { margin-bottom: 10px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-season-track { display: flex; flex-direction: column; }
      .dq-season-tier { display: grid; grid-template-columns: 28px minmax(0, 1fr) auto; gap: 10px; align-items: center; padding: 9px 0; border-top: 1px solid var(--dsw-alias-border-l1); }
      .dq-season-tier:first-child { border-top: 0; padding-top: 2px; }
      .dq-season-tier-node {
        width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center;
        font-size: 10px; font-weight: 600; color: var(--dsw-alias-label-secondary);
        border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2);
      }
      .dq-season-tier-node[data-complete="true"] { color: var(--dsw-alias-state-warn-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 40%, var(--dsw-alias-border-l2)); }
      .dq-season-tier-node[data-claimed="true"] { color: var(--dsw-alias-state-success-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 40%, var(--dsw-alias-border-l2)); }
      .dq-season-tier-top { display: flex; justify-content: space-between; gap: 8px; font-size: 10px; }
      .dq-season-tier-name { font-weight: 600; }
      .dq-season-tier-target { color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
      .dq-season-meter { height: 4px; margin-top: 5px; }
      .dq-season-meter > i { background: linear-gradient(90deg, var(--dsw-alias-state-warn-primary), var(--dsw-alias-brand-primary)); }
      .dq-season-rewards { margin-top: 4px; font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-season-tier-action { min-width: 68px; text-align: right; }
      .dq-gear-power { text-align: right; }
      .dq-gear-power-label { display: block; font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-gear-power strong { font-size: 22px; color: var(--dsw-alias-brand-primary); font-variant-numeric: tabular-nums; line-height: 1.1; }
      .dq-gear-slots { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; }
      .dq-gear-slot { padding: 10px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1); background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 55%, transparent); min-width: 0; }
      .dq-gear-slot-label { display: flex; align-items: center; gap: 4px; font-size: 9px; color: var(--dsw-alias-label-secondary); }
      .dq-gear-slot-name { margin-top: 4px; font-size: 11px; font-weight: 550; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-gear-slot .dq-rarity { margin-top: 3px; font-size: 8px; }
      .dq-gear-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(245px, 1fr)); gap: 10px; }
      .dq-gear-item { display: grid; grid-template-columns: 32px minmax(0, 1fr) auto; gap: 9px; align-items: center; padding: 10px; border-radius: 10px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1); }
      .dq-gear-item[data-rarity="rare"] { border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 22%, var(--dsw-alias-border-l1)); }
      .dq-gear-item[data-rarity="epic"] { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 25%, var(--dsw-alias-border-l1)); }
      .dq-gear-item[data-rarity="legendary"] { border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 28%, var(--dsw-alias-border-l1)); }
      .dq-gear-item[data-rarity="mythic"] { border-color: color-mix(in srgb, #ff7ad9 34%, var(--dsw-alias-border-l1)); box-shadow: 0 0 14px color-mix(in srgb, #ff7ad9 12%, transparent); }
      .dq-gear-item-icon { width: 32px; height: 32px; padding: 4px; border-radius: 10px; display: grid; place-items: center; color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, var(--dsw-alias-bg-layer-2)); font-size: 14px; }
      .dq-gear-item-icon .dq-crest[data-size="mini"] { width: 24px; height: 24px; border-radius: 7px; }
      .dq-gear-item-icon .dq-crest[data-size="mini"] .dq-crest-level { font-size: 8px; }
      .dq-gear-item-icon .dq-crest[data-size="mini"] .dq-crest-ring { inset: 2px; border-radius: 5px; }
      .dq-gear-item-name { font-size: 11px; font-weight: 550; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-gear-item-meta { margin-top: 2px; font-size: 9px; color: var(--dsw-alias-label-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dq-rarity-common { color: var(--dsw-alias-state-idle-primary); }
      .dq-rarity-rare { color: var(--dsw-alias-state-success-primary); }
      .dq-rarity-epic { color: var(--dsw-alias-brand-primary); }
      .dq-rarity-legendary { color: var(--dsw-alias-state-warn-primary); }
      .dq-rarity-mythic { color: #ff7ad9; }
      .dq-rarity-red { color: #ff4d4d; text-shadow: 0 0 10px rgba(255, 77, 77, .55); }
      .dq-rarity-ancient { color: #ff8a3c; text-shadow: 0 0 10px rgba(255, 138, 60, .5); }
      .dq-rarity-divine { color: #eafcff; text-shadow: 0 0 6px rgba(255, 255, 255, .85), 0 0 16px rgba(184, 240, 255, .75); }
      .dq-rarity-transcendent {
        color: #fff6d2;
        text-shadow: 0 0 5px #fff, 0 0 12px rgba(255, 233, 168, .95), 0 0 26px rgba(255, 190, 80, .8);
        animation: dq-frame-pulse 3.2s ease-in-out infinite;
      }
      .dq-gear-slot[data-rarity="ancient"] { --slot-tone: #ff8a3c; }
      .dq-gear-slot[data-rarity="divine"] { --slot-tone: #b8f0ff; }
      .dq-doll-gear[data-rarity="ancient"] { --slot-tone: #ff8a3c; }
      .dq-doll-gear[data-rarity="divine"] { --slot-tone: #b8f0ff; }
      .dq-ach[data-rarity="ancient"] { --rarity: #ff8a3c; }
      .dq-ach[data-rarity="divine"] { --rarity: #b8f0ff; }
      .dq-enhance-row[data-rarity="ancient"] { --slot-tone: #ff8a3c; }
      .dq-enhance-row[data-rarity="divine"] { --slot-tone: #b8f0ff; }
      .dq-gear-item[data-rarity="ancient"], .dq-shop-card[data-rarity="ancient"], .dq-pick[data-rarity="ancient"] {
        border-color: color-mix(in srgb, #ff8a3c 46%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #ff8a3c 9%, var(--dsw-alias-bg-layer-1));
      }
      .dq-gear-item[data-rarity="divine"], .dq-shop-card[data-rarity="divine"], .dq-pick[data-rarity="divine"] {
        border-color: color-mix(in srgb, #b8f0ff 46%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #b8f0ff 9%, var(--dsw-alias-bg-layer-1));
      }
      .dq-pick[data-rarity="ancient"] .dq-pick-glyph { color: #ff8a3c; border-color: color-mix(in srgb, #ff8a3c 46%, var(--dsw-alias-border-l1)); box-shadow: 0 0 16px rgba(255, 138, 60, .32); }
      .dq-pick[data-rarity="divine"] .dq-pick-glyph { color: #b8f0ff; border-color: color-mix(in srgb, #b8f0ff 46%, var(--dsw-alias-border-l1)); box-shadow: 0 0 16px rgba(184, 240, 255, .32); }
      .dq-gear-slot[data-rarity="red"] { --slot-tone: #ff4d4d; }
      .dq-gear-item[data-rarity="red"], .dq-shop-card[data-rarity="red"], .dq-pick[data-rarity="red"] {
        border-color: color-mix(in srgb, #ff4d4d 46%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, #ff4d4d 9%, var(--dsw-alias-bg-layer-1));
      }
      .dq-pick[data-rarity="red"] .dq-pick-glyph {
        color: #ff4d4d;
        border-color: color-mix(in srgb, #ff4d4d 46%, var(--dsw-alias-border-l1));
        box-shadow: 0 0 16px rgba(255, 77, 77, .35);
      }
      [data-frame="f.crimson"] {
        --frame-color: #ff4d4d; --frame-width: 2px;
        --frame-glow: 0 0 0 2px color-mix(in srgb, #ff4d4d 34%, transparent), 0 0 28px color-mix(in srgb, #ff4d4d 52%, transparent);
      }
      ${BULK_FRAME_CSS}
      /* Higher rarity = more ornament on the ring. */
      [data-frarity="rare"] .dq-crest-ring { box-shadow: var(--frame-glow); }
      [data-frarity="epic"] .dq-crest-ring { box-shadow: var(--frame-glow); }
      [data-frarity="legendary"] .dq-crest-ring { box-shadow: var(--frame-glow); }
      [data-frarity="mythic"] .dq-crest-ring { box-shadow: var(--frame-glow); animation: dq-frame-pulse 3.6s ease-in-out infinite; }
      [data-frarity="red"] .dq-crest-ring { box-shadow: var(--frame-glow); animation: dq-frame-pulse 2.8s ease-in-out infinite; }
      [data-frarity="ancient"] .dq-crest-ring { box-shadow: var(--frame-glow); animation: dq-frame-pulse 2.2s ease-in-out infinite; }
      [data-frarity="ancient"] .dq-crest-ring::after {
        content: ""; position: absolute; inset: -4px; border-radius: inherit;
        border: 1px solid color-mix(in srgb, #ff8a3c 55%, transparent);
        animation: dq-frame-pulse 2.6s ease-in-out infinite;
        pointer-events: none;
      }
      [data-frarity="divine"] .dq-crest-ring { box-shadow: var(--frame-glow); }
      [data-frarity="divine"] .dq-crest-ring::after {
        content: ""; position: absolute; inset: -5px; border-radius: inherit;
        background: conic-gradient(from 0deg,
          transparent 0deg,
          color-mix(in srgb, #b8f0ff 85%, transparent) 40deg,
          transparent 90deg,
          color-mix(in srgb, #ffffff 70%, transparent) 180deg,
          transparent 240deg);
        filter: blur(2.5px);
        animation: dq-aura-spin 7s linear infinite;
        pointer-events: none;
      }
      @keyframes dq-frame-pulse {
        0%, 100% { opacity: .78; }
        50% { opacity: 1; }
      }
      /* Ten-star skin: a rotating band of light that no other frame has. */
      [data-frame="f.transcend"] {
        --frame-color: #ffe9a8; --frame-width: 3px;
        --frame-glow: 0 0 0 2px color-mix(in srgb, #ffe9a8 45%, transparent), 0 0 36px color-mix(in srgb, #ffd76b 62%, transparent);
      }
      [data-frame="f.transcend"] .dq-crest-ring { animation: dq-aura-spin 9s linear infinite; }
      [data-frame="f.transcend"] .dq-crest-ring::after {
        content: ""; position: absolute; inset: -6px; border-radius: inherit;
        background: conic-gradient(from 0deg,
          transparent 0deg,
          color-mix(in srgb, #ffe9a8 92%, transparent) 30deg,
          transparent 80deg,
          color-mix(in srgb, #ffffff 82%, transparent) 200deg,
          transparent 260deg);
        filter: blur(3px);
        animation: dq-aura-spin 6s linear infinite;
        pointer-events: none;
      }
      .dq-paragon[data-capped="true"] .dq-paragon-stars { color: #ffe9a8; text-shadow: 0 0 14px rgba(255, 233, 168, .8); }
      .dq-paragon-cap { margin-left: 4px; font-size: 9px; font-weight: 600; opacity: .82; }
      .dq-rebirth {
        position: relative; z-index: 1;
        display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        margin: 2px 0 6px; padding: 6px 10px; border-radius: 9px;
        border: 1px solid color-mix(in srgb, #ffe9a8 26%, var(--dsw-alias-border-l1));
        background: linear-gradient(100deg,
          color-mix(in srgb, #ffe9a8 10%, var(--dsw-alias-bg-layer-2)),
          color-mix(in srgb, #ff7ad9 8%, var(--dsw-alias-bg-layer-2)));
      }
      .dq-rebirth-badge {
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 10px; font-weight: 700; letter-spacing: .04em; color: #ffe9a8;
        text-shadow: 0 0 10px rgba(255, 233, 168, .5);
      }
      .dq-rebirth-bonus { font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-rebirth .dq-btn { margin-left: auto; font-size: 9.5px; padding: 3px 10px; }
      /* Pixel arena. The scene keeps its own dark palette so the sprites read
         the same in light and dark themes; all chrome around it uses tokens. */
      .dq-arena { overflow: hidden; }
      .dq-arena-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
      .dq-arena-tools { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .dq-arena-practice {
        appearance: none; display: inline-flex; align-items: center; gap: 4px;
        border: 1px solid var(--dsw-alias-border-l1); background: transparent; color: var(--dsw-alias-label-secondary);
        font: inherit; font-size: 10.5px; padding: 5px 10px; border-radius: 8px; cursor: pointer;
        transition: color .15s ease, border-color .15s ease;
      }
      .dq-arena-practice:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l2); }
      .dq-arena-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
      .dq-arena-targets { display: inline-flex; gap: 3px; padding: 3px; border-radius: 10px; background: var(--dsw-alias-bg-layer-2); border: 1px solid var(--dsw-alias-border-l1); }
      .dq-arena-target {
        appearance: none; border: 0; background: transparent; color: var(--dsw-alias-label-secondary);
        font: inherit; font-size: 10.5px; font-weight: 550; padding: 5px 10px; border-radius: 7px; cursor: pointer;
        transition: color .15s ease, background .15s ease;
      }
      .dq-arena-target:hover { color: var(--dsw-alias-label-primary); }
      .dq-arena-target[aria-selected="true"] { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); box-shadow: 0 1px 4px color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent); }
      .dq-arena-scene {
        position: relative; overflow: hidden; border-radius: 14px; min-height: 252px;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, var(--dsw-alias-border-l1));
        background: linear-gradient(180deg, #14111f 0%, #1b1630 54%, #241a2c 100%);
      }
      .dq-arena-sky {
        position: absolute; inset: 0; opacity: .6; animation: dq-twinkle 5.5s ease-in-out infinite;
        background-image:
          radial-gradient(1.5px 1.5px at 16% 24%, #cdd8ff 50%, transparent 51%),
          radial-gradient(1.5px 1.5px at 68% 14%, #ffe9b0 50%, transparent 51%),
          radial-gradient(1.5px 1.5px at 88% 36%, #b6f0ff 50%, transparent 51%),
          radial-gradient(1px 1px at 34% 12%, #ffffff 50%, transparent 51%),
          radial-gradient(1px 1px at 52% 30%, #ffffff 50%, transparent 51%),
          radial-gradient(1px 1px at 78% 8%, #ffffff 50%, transparent 51%),
          radial-gradient(1px 1px at 8% 46%, #ffffff 50%, transparent 51%);
      }
      .dq-arena-hud { position: absolute; top: 9px; left: 10px; right: 10px; z-index: 5; display: flex; align-items: center; justify-content: space-between; gap: 8px; pointer-events: none; }
      .dq-arena-chip {
        display: inline-flex; align-items: center; gap: 6px; max-width: 48%; min-width: 0;
        padding: 3px 9px 3px 4px; border-radius: 999px; font-size: 10px; color: #eef1ff;
        background: color-mix(in srgb, #0b0918 64%, transparent);
        border: 1px solid color-mix(in srgb, #ffffff 14%, transparent);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
      }
      .dq-arena-chip.boss { color: #ffd8c4; }
      .dq-arena-chip b { color: #ffffff; font-variant-numeric: tabular-nums; }
      .dq-arena-stage { position: absolute; inset: 0; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; align-items: end; gap: 6px; padding: 40px 6% 30px; }
      .dq-fighter { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; min-width: 0; }
      .dq-fighter-hero { justify-self: start; }
      .dq-fighter-boss { justify-self: end; }
      .dq-fighter-sprite { position: relative; z-index: 2; width: 118px; height: 133px; }
      .dq-fighter-hero .dq-fighter-sprite { width: 160px; height: 160px; }
      .dq-px { display: block; width: 100%; height: 100%; filter: drop-shadow(0 6px 10px rgba(0, 0, 0, .45)); }
      .dq-fighter-shadow { position: absolute; bottom: -5px; width: 66%; height: 7px; border-radius: 50%; background: rgba(0, 0, 0, .45); filter: blur(1px); }
      .dq-fighter-hero .dq-px { animation: dq-px-idle 2.6s steps(2, end) infinite; transform-origin: 50% 100%; }
      .dq-fighter-boss .dq-px { animation: dq-px-breathe 3.4s ease-in-out infinite; transform-origin: 50% 100%; }
      .dq-fighter-boss:not(.is-defeated) .dq-fighter-sprite { animation: dq-boss-roar 8.5s ease-in-out infinite; }
      .dq-fighter-hero { animation: dq-hero-strike .62s steps(6, end) 1; }
      .dq-fighter-hero.is-powered .dq-fighter-sprite::after {
        content: ""; position: absolute; inset: -6px; border-radius: 50%;
        border: 2px solid rgba(255, 214, 110, .55); animation: dq-power-ring 1.1s ease-out infinite;
      }
      .dq-fighter-boss.is-hit { animation: dq-boss-hurt .54s steps(3, end) 1; }
      .dq-fighter-boss.is-defeated .dq-px { animation: dq-defeat 1.1s ease-out 1 forwards; }
      .dq-arena-fx { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
      .dq-slash {
        position: absolute; left: 42%; top: 47%; width: 122px; height: 12px; border-radius: 999px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .95) 44%, rgba(255, 230, 160, .9) 56%, transparent);
        opacity: 0; animation: dq-slash-sweep .4s ease-out 1 forwards;
        filter: drop-shadow(0 0 7px rgba(255, 236, 180, .85));
      }
      .dq-impact { position: absolute; left: 60%; top: 48%; width: 0; height: 0; }
      .dq-impact > i {
        position: absolute; width: 5px; height: 5px; background: #ffe9b0; opacity: 0;
        box-shadow: 0 0 6px rgba(255, 233, 176, .9);
        animation: dq-spark .52s steps(4, end) 1 forwards;
      }
      .dq-dmg {
        position: absolute; left: 60%; top: 33%; opacity: 0;
        font: 700 20px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
        color: #fff3c4; text-shadow: 0 2px 0 #6b2a1f, 0 0 12px rgba(255, 180, 120, .6);
        animation: dq-dmg-float 1s ease-out 1 forwards; white-space: nowrap;
      }
      .dq-dmg.is-crit { font-size: 27px; color: #ffd76b; text-shadow: 0 2px 0 #7a1f1f, 0 0 18px rgba(255, 120, 90, .75); }
      .dq-arena-ground {
        position: absolute; left: 0; right: 0; bottom: 0; z-index: 1; height: 54px;
        border-top: 1px solid rgba(255, 255, 255, .09);
        background:
          repeating-linear-gradient(90deg, rgba(255, 255, 255, .05) 0 1px, transparent 1px 24px),
          linear-gradient(180deg, #2c2140, #171021);
      }
      .dq-arena-victory {
        position: absolute; left: 0; right: 0; top: 36%; z-index: 6; pointer-events: none;
        display: flex; flex-direction: column; align-items: center; gap: 4px;
        animation: dq-victory-in .75s cubic-bezier(.2, 1.3, .4, 1) 1;
      }
      .dq-arena-victory b {
        font: 800 24px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .28em;
        color: #ffe27a; text-shadow: 0 3px 0 #6b2a1f, 0 0 22px rgba(255, 200, 90, .55);
      }
      .dq-arena-victory span { font-size: 9.5px; letter-spacing: .16em; text-transform: uppercase; color: #ffd8c4; }
      .dq-arena-powerpop {
        position: absolute; right: 9%; bottom: 14px; z-index: 6; padding: 3px 9px; border-radius: 999px;
        font-size: 10.5px; font-weight: 650; color: #14111f; background: #ffd76b;
        box-shadow: 0 0 20px rgba(255, 215, 107, .55);
        animation: dq-rise-fade 1.8s ease-out 1 forwards;
      }
      .dq-arena-foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-top: 13px; flex-wrap: wrap; }
      .dq-arena-hp { flex: 1 1 220px; min-width: 0; }
      .dq-arena-hp-label { display: flex; justify-content: space-between; gap: 10px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-arena-meter { margin-top: 5px; height: 8px; }
      .dq-arena-meter > i { background: linear-gradient(90deg, var(--dsw-alias-state-error-primary), var(--dsw-alias-state-warn-primary)); }
      .dq-arena-hint { margin-top: 5px; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-arena-reward { flex: 0 1 260px; text-align: right; font-size: 9.5px; color: var(--dsw-alias-label-secondary); }
      .dq-arena-reward-hint { display: block; margin-top: 3px; opacity: .82; }
      .dq-hud.is-levelup { border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 58%, var(--dsw-alias-border-l1)); animation: dq-hud-pulse .9s ease-out 2; }
      .dq-hud.is-levelup .dq-crest { animation: dq-crest-up 1s cubic-bezier(.22, 1, .36, 1) 2; }
      .dq-celebrate { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: 24px; pointer-events: none; }
      .dq-celebrate::before {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: radial-gradient(circle at 50% 46%, color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, transparent), transparent 60%);
        animation: dq-fade-in .4s ease-out 1;
      }
      .dq-celebrate-card {
        pointer-events: auto; position: relative; z-index: 1; overflow: hidden;
        display: flex; flex-direction: column; align-items: center; gap: 5px;
        padding: 22px 30px 20px; border-radius: 20px;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 42%, var(--dsw-alias-border-l1));
        background: linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-bg-overlay) 96%, var(--dsw-alias-state-warn-primary) 4%), var(--dsw-alias-bg-overlay));
        box-shadow: 0 24px 60px color-mix(in srgb, var(--dsw-alias-label-primary) 32%, transparent);
        animation: dq-celebrate-in .55s cubic-bezier(.16, 1.2, .3, 1) 1;
      }
      .dq-celebrate-kicker { font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .38em; color: var(--dsw-alias-state-warn-primary); }
      .dq-celebrate-level { font: 800 62px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--dsw-alias-label-primary); text-shadow: 0 4px 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 40%, transparent); }
      .dq-celebrate-title { font-size: 13px; font-weight: 650; letter-spacing: .06em; }
      .dq-celebrate-sub { margin-bottom: 9px; font-size: 10.5px; color: var(--dsw-alias-label-secondary); text-align: center; }
      .dq-celebrate-burst { position: absolute; inset: 0; pointer-events: none; }
      .dq-celebrate-burst > i {
        position: absolute; left: 50%; top: 48%; width: 6px; height: 6px; opacity: 0;
        background: var(--dsw-alias-state-warn-primary); animation: dq-burst .95s ease-out .08s 1 forwards;
      }
      .dq-meter > i, .dq-bar > i, .dq-hud-meter > i, .dq-path-bar > i, .dq-season-meter > i {
        transition: width .65s cubic-bezier(.22, 1, .36, 1);
      }
      @keyframes dq-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes dq-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      @keyframes dq-pulse { 0%, 100% { opacity: .45; transform: scale(.85); } 50% { opacity: 1; transform: scale(1.15); } }
      @keyframes dq-frame-pop {
        0% { transform: scale(.86) rotate(-4deg); }
        55% { transform: scale(1.06) rotate(2deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      @keyframes dq-px-idle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      @keyframes dq-px-breathe { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-2px) scale(1.02); } }
      @keyframes dq-hero-strike {
        0% { transform: translateX(0); }
        18% { transform: translateX(-7px); }
        42% { transform: translateX(26px); }
        62% { transform: translateX(18px); }
        100% { transform: translateX(0); }
      }
      @keyframes dq-boss-hurt {
        0% { transform: translateX(0); }
        25% { transform: translateX(7px); }
        55% { transform: translateX(-4px); }
        100% { transform: translateX(0); }
      }
      @keyframes dq-slash-sweep {
        0% { opacity: 0; transform: rotate(-34deg) scaleX(.18); }
        30% { opacity: 1; transform: rotate(-34deg) scaleX(1); }
        100% { opacity: 0; transform: rotate(-34deg) scaleX(1.18) translateX(14px); }
      }
      @keyframes dq-spark {
        0% { opacity: 0; transform: rotate(var(--a)) translateY(-3px) scale(1); }
        30% { opacity: 1; }
        100% { opacity: 0; transform: rotate(var(--a)) translateY(-38px) scale(.35); }
      }
      @keyframes dq-dmg-float {
        0% { opacity: 0; transform: translateY(8px) scale(.7); }
        22% { opacity: 1; transform: translateY(0) scale(1.08); }
        60% { opacity: 1; transform: translateY(-16px) scale(1); }
        100% { opacity: 0; transform: translateY(-34px) scale(.96); }
      }
      @keyframes dq-victory-in {
        0% { opacity: 0; transform: translateY(14px) scale(.88); }
        60% { opacity: 1; transform: translateY(0) scale(1.04); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes dq-defeat {
        0% { opacity: 1; filter: none; transform: translateY(0) rotate(0deg); }
        100% { opacity: .3; filter: grayscale(.8); transform: translateY(8px) rotate(-7deg); }
      }
      @keyframes dq-power-ring {
        0% { opacity: .7; transform: scale(.86); }
        100% { opacity: 0; transform: scale(1.22); }
      }
      @keyframes dq-rise-fade {
        0% { opacity: 0; transform: translateY(6px); }
        18% { opacity: 1; transform: translateY(0); }
        72% { opacity: 1; transform: translateY(-3px); }
        100% { opacity: 0; transform: translateY(-12px); }
      }
      @keyframes dq-twinkle { 0%, 100% { opacity: .42; } 50% { opacity: .78; } }
      @keyframes dq-celebrate-in {
        0% { opacity: 0; transform: translateY(18px) scale(.92); }
        60% { opacity: 1; transform: translateY(0) scale(1.02); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes dq-burst {
        0% { opacity: 0; transform: rotate(var(--a)) translateY(-10px) scale(.4); }
        32% { opacity: .95; }
        100% { opacity: 0; transform: rotate(var(--a)) translateY(calc(-88px * var(--d))) scale(.7); }
      }
      @keyframes dq-fade-in { from { opacity: 0; } to { opacity: 1; } }
      @keyframes dq-hud-pulse {
        0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, transparent); }
        100% { box-shadow: 0 0 0 12px transparent; }
      }
      @keyframes dq-crest-up {
        0% { transform: scale(1); }
        38% { transform: scale(1.24); box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-state-warn-primary) 30%, transparent); }
        100% { transform: scale(1); }
      }
      @keyframes dq-boss-roar {
        0%, 84%, 100% { filter: none; transform: translateY(0); }
        88% { filter: drop-shadow(0 0 12px rgba(255, 120, 90, .75)) brightness(1.22); transform: translateY(-3px); }
        92% { filter: none; transform: translateY(0); }
      }
      @media (max-width: 980px) {
        .dq-overview { grid-template-columns: minmax(0, 1fr); }
        .dq-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 18px; }
        .dq-stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      }
      @media (max-width: 680px) {
        .dq-page { padding: 16px 16px 44px; }
        .dq-hero { padding: 18px; border-radius: 16px; }
        .dq-crest[data-size="lg"] { width: 64px; height: 64px; border-radius: 18px; }
        .dq-crest[data-size="lg"] .dq-crest-level { font-size: 24px; }
        .dq-crest-wrap { max-width: 96px; }
        .dq-frame-caption { font-size: 8.5px; }
        .dq-hero-name { font-size: 21px; }
        .dq-hero-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 13px; }
        .dq-hero-stat:nth-child(3) { border-left: 0; padding-left: 0; }
        .dq-hero-stat { padding: 0 12px; }
        .dq-tabs { margin-bottom: 13px; }
        .dq-card { padding: 14px; border-radius: 13px; }
        .dq-quest { grid-template-columns: 32px minmax(0, 1fr); }
        .dq-quest-icon { width: 32px; height: 32px; border-radius: 9px; }
        .dq-quest-side { grid-column: 2; justify-content: flex-start; margin-top: -2px; }
        .dq-quest-desc { white-space: normal; }
        .dq-stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .dq-ach-grid, .dq-shop-grid { grid-template-columns: minmax(0, 1fr); }
        .dq-boss-body { grid-template-columns: 64px minmax(0, 1fr); }
        .dq-boss-art { width: 64px; height: 64px; border-radius: 13px; }
        .dq-boss-pct { bottom: 4px; }
        .dq-hud-main { min-width: 96px; max-width: 128px; }
        .dq-hud-chips { gap: 6px; padding-left: 6px; }
        .dq-hud-optional { display: none; }
        .dq-toasts { right: 12px; bottom: 12px; }
        .dq-day-head { top: 48px; }
        .dq-gear-slots { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .dq-gear-body { grid-template-columns: 110px minmax(0, 1fr); gap: 10px; }
        .dq-doll { padding: 7px 5px 6px; }
        .dq-doll-sprite { width: 92px; height: 92px; }
        .dq-doll-meta { font-size: 8px; }
        .dq-doll-meta b { font-size: 9px; }
        .dq-gear-grid, .dq-boss-grid { grid-template-columns: minmax(0, 1fr); }
        .dq-season-tier { grid-template-columns: 25px minmax(0, 1fr); }
        .dq-season-tier-action { grid-column: 2; text-align: left; min-width: 0; }
        .dq-chest-body { grid-template-columns: 56px minmax(0, 1fr); }
        .dq-chest-art { width: 56px; height: 56px; border-radius: 12px; }
        .dq-chest-glyph { font-size: 22px; }
        .dq-hero-class { flex-wrap: wrap; }
        .dq-class-body { grid-template-columns: minmax(0, 1fr); gap: 10px; }
        .dq-radar-wrap { justify-items: center; }
        .dq-radar { width: 118px; height: 118px; }
        .dq-tier-item b { font-size: 6.5px; }
        .dq-class-levelring { width: 56px; height: 56px; }
        .dq-ring-value { font-size: 18px; }
        .dq-arena-scene { min-height: 206px; }
        .dq-arena-stage { padding: 42px 3% 26px; }
        .dq-fighter-sprite { width: 80px; height: 90px; }
        .dq-fighter-hero .dq-fighter-sprite { width: 112px; height: 112px; }
        .dq-slash { left: 36%; width: 92px; }
        .dq-dmg { left: 56%; font-size: 16px; }
        .dq-dmg.is-crit { font-size: 21px; }
        .dq-arena-victory b { font-size: 17px; letter-spacing: .18em; }
        .dq-arena-chip { font-size: 9px; max-width: 52%; padding-right: 7px; }
        .dq-arena-chip .dq-crest[data-size="hud"] { width: 22px; height: 22px; }
        .dq-arena-targets { width: 100%; justify-content: space-between; }
        .dq-arena-target { flex: 1; text-align: center; }
        .dq-picker-grid { grid-template-columns: repeat(auto-fill, minmax(142px, 1fr)); }
        .dq-celebrate-card { padding: 18px 22px 16px; }
        .dq-celebrate-level { font-size: 46px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dq-root *, .dq-hud, .dq-hud * { animation: none !important; transition: none !important; }
        /* The frame aura is the only decoration we keep: it is what tells the
           rarities apart at a glance. */
        .dq-root .dq-crest-aura { animation: dq-aura-spin 8s linear infinite !important; }
      }
      .dq-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
    `

    function interpolate(text, values) {
      if (!values) return text
      return String(text).replace(/\{(\w+)\}/g, (whole, key) => (
        Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : whole
      ))
    }

    function formatNumber(value, locale) {
      const number = Number(value) || 0
      try {
        return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : locale || 'en', { maximumFractionDigits: 0 }).format(number)
      } catch {
        return String(Math.round(number))
      }
    }

    function compactNumber(value, locale) {
      const number = Number(value) || 0
      if (number < 10000) return formatNumber(number, locale)
      try {
        return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : locale || 'en', { notation: 'compact', maximumFractionDigits: 1 }).format(number)
      } catch {
        return `${Math.round(number / 1000)}k`
      }
    }

    function formatDuration(ms, t) {
      const minutes = Math.max(0, Math.floor(Number(ms) / 60000))
      const days = Math.floor(minutes / 1440)
      const hours = Math.floor((minutes % 1440) / 60)
      const rest = minutes % 60
      if (days > 0) return t('time.remaining', { days, hours })
      return t('time.remainingShort', { hours, minutes: rest })
    }

    function formatTimeAgo(at, t) {
      const diff = Math.max(0, Date.now() - Number(at || 0))
      if (diff < 60000) return t('time.justNow')
      if (diff < 3600000) return t('time.minutesAgo', { n: Math.floor(diff / 60000) })
      if (diff < 86400000) return t('time.hoursAgo', { n: Math.floor(diff / 3600000) })
      return t('time.daysAgo', { n: Math.floor(diff / 86400000) })
    }

    function formatDateTime(at, locale) {
      try {
        return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale || 'en', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(Number(at)))
      } catch {
        return new Date(Number(at)).toLocaleString()
      }
    }

    function formatDay(at, t, locale) {
      const date = new Date(Number(at))
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (date.toDateString() === today.toDateString()) return t('time.today')
      if (date.toDateString() === yesterday.toDateString()) return t('time.yesterday')
      try {
        return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale || 'en', {
          month: 'long',
          day: 'numeric',
          weekday: 'short',
        }).format(date)
      } catch {
        return date.toDateString()
      }
    }

    function isoWeek(key) {
      const date = new Date(`${key}T12:00:00`)
      if (Number.isNaN(date.getTime())) return 1
      const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      const day = copy.getUTCDay() || 7
      copy.setUTCDate(copy.getUTCDate() + 4 - day)
      const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1))
      return Math.ceil((((copy - yearStart) / 86400000) + 1) / 7)
    }

    function prizeText(prize, t) {
      if (!prize) return t('common.none')
      if (prize.kind === 'coins') return t('lottery.prize.coins', { amount: prize.amount })
      if (prize.kind === 'xp') return t('lottery.prize.xp', { amount: prize.amount })
      if (prize.kind === 'title') return t('lottery.prize.title', { title: t(`title.${prize.title}.name`) })
      return t('common.none')
    }

    function activityMeta(entry, t) {
      if (!entry || typeof entry !== 'object') return { glyph: '·', text: t('activity.unknown'), className: '' }
      if (entry.kind === 'welcome') return { glyph: '✦', text: t('activity.welcome'), className: '' }
      if (entry.kind === 'tool') {
        const target = ['write', 'edit', 'apply_patch', 'read', 'read_image'].includes(entry.tool) ? entry.target : ''
        let text = target
          ? t('activity.toolTarget', { tool: entry.tool, target })
          : t('activity.tool', { tool: entry.tool })
        if (entry.lines > 0) text += t('activity.lines', { lines: entry.lines })
        return { glyph: '⚔', text, className: '' }
      }
      if (entry.kind === 'tool-error') {
        return { glyph: '!', text: t('activity.toolError', { tool: entry.tool || 'tool' }), className: 'is-error' }
      }
      if (entry.kind === 'turn') return { glyph: '➤', text: t('activity.turn', { turn: entry.turn }), className: '' }
      if (entry.kind === 'todo') return { glyph: '✓', text: t('activity.todo', { count: entry.count }), className: '' }
      if (entry.kind === 'workflow') {
        return { glyph: '⌬', text: t('activity.workflow', { name: entry.name || 'workflow' }), className: '' }
      }
      if (entry.kind === 'subagent') return { glyph: '♟', text: t('activity.subagent'), className: '' }
      if (entry.kind === 'achievement') {
        const name = t(`ach.${entry.achievement}.name`)
        return { glyph: '✦', text: t('activity.achievement', { name }), className: 'is-achievement' }
      }
      if (entry.kind === 'reward') {
        const source = t(`activity.source.${entry.source || 'daily'}`)
        return { glyph: '◈', text: t('activity.reward', { source }), className: '' }
      }
      if (entry.kind === 'purchase') {
        return { glyph: '◫', text: t('activity.purchase', { title: t(`title.${entry.title}.name`) }), className: '' }
      }
      if (entry.kind === 'purchase-gear') {
        return { glyph: '⚒', text: t('activity.purchase-gear', { gear: t(`gear.${entry.gear}.name`) }), className: '' }
      }
      if (entry.kind === 'chest') {
        const tier = t(`chest.tier.${entry.tier}`)
        const text = entry.gear
          ? t('activity.chestGear', { tier, gear: t(`gear.${entry.gear}.name`) })
          : t('activity.chest', { tier })
        return { glyph: '▣', text, className: entry.gear ? 'is-achievement' : '' }
      }
      if (entry.kind === 'season') {
        return { glyph: '❂', text: t('activity.season', { number: entry.number }), className: 'is-achievement' }
      }
      if (entry.kind === 'season-tier') {
        return { glyph: '❂', text: t('activity.season-tier'), className: '' }
      }
      if (entry.kind === 'lottery') {
        return { glyph: '✶', text: t('activity.lottery', { prize: prizeText(entry.prize, t) }), className: '' }
      }
      if (entry.kind === 'boss-defeat') {
        const name = t(`boss.${entry.bossId}.name`)
        return { glyph: '♛', text: t('activity.bossDefeat', { name }), className: 'is-achievement' }
      }
      if (entry.kind === 'paragon') {
        return { glyph: '★', text: t('activity.paragon', { stars: entry.stars }), className: 'is-achievement' }
      }
      if (entry.kind === 'enhance') {
        return { glyph: '⚡', text: t('activity.enhance', { gear: t(`gear.${entry.gear}.name`), level: entry.level }), className: 'is-achievement' }
      }
      return { glyph: '·', text: t('activity.unknown'), className: '' }
    }

    /**
     * What changed between two snapshots. Polling returns the same state most
     * of the time, so animations are driven by this diff instead of by a
     * timer: a level-up, a fresh hit on a boss, a new gear power, a new frame.
     */
    function diffSnapshots(previous, next) {
      const quiet = { token: '', levelUp: 0, powerUp: 0, frameChange: null, bossHits: [], bossDefeats: [] }
      if (!previous || !next || !previous.player || !next.player) return quiet
      const hits = []
      const defeats = []
      const pairs = [
        ['daily', previous.dailyBoss, next.dailyBoss],
        ['weekly', previous.weeklyBoss, next.weeklyBoss],
        ['season', previous.season && previous.season.boss, next.season && next.season.boss],
      ]
      for (const [kind, before, after] of pairs) {
        if (!before || !after || before.bossId !== after.bossId) continue
        const amount = Math.round(Number(after.damage || 0) - Number(before.damage || 0))
        if (amount > 0) hits.push({ kind, bossId: after.bossId, amount })
        if (after.defeated && !before.defeated) defeats.push(kind)
      }
      const levelUp = Math.max(0, Math.round(Number(next.player.level || 0) - Number(previous.player.level || 0)))
      const powerUp = Math.max(0, Math.round(Number(next.player.gearPower || 0) - Number(previous.player.gearPower || 0)))
      const frameChange = previous.player.equippedFrame !== next.player.equippedFrame
        ? String(next.player.equippedFrame || '')
        : null
      const token = `${hits.map(hit => `${hit.kind}:${hit.amount}`).join(',')}|${defeats.join(',')}|${levelUp}|${powerUp}|${frameChange || ''}`
      if (token === '||0|0|') return quiet
      return { token, levelUp, powerUp, frameChange, bossHits: hits, bossDefeats: defeats }
    }

    function createStore() {
      const API_PATH = API
      let snapshot = { status: 'loading', data: null, error: null, at: 0 }
      const listeners = new Set()
      let timer = null
      let refs = 0
      let epoch = 0
      let inflight = null
      let acting = false

      const publish = next => {
        snapshot = { prev: snapshot.data, ...next }
        listeners.forEach(listener => listener())
      }

      /**
       * Reads are allowed to fail; they are not allowed to hang. Without a
       * deadline a stuck Host leaves the panel's busy flag on forever, which
       * looks exactly like a frozen page.
       */
      const request = async (options = {}) => {
        const controller = typeof AbortController === 'function' ? new AbortController() : null
        const deadline = controller ? setTimeout(() => controller.abort(), 8000) : null
        try {
          return await fetch(API_PATH, controller ? { ...options, signal: controller.signal } : options)
        } finally {
          if (deadline) clearTimeout(deadline)
        }
      }

      const read = async () => {
        if (inflight || acting) return inflight
        const my = ++epoch
        inflight = (async () => {
          try {
            const response = await request({ cache: 'no-store', credentials: 'same-origin' })
            const data = await response.json()
            if (my !== epoch) return
            if (!response.ok || !data || !data.ok) throw new Error(data?.error || `HTTP ${response.status}`)
            publish({ status: 'ready', data, error: null, at: Date.now() })
          } catch (error) {
            if (my !== epoch) return
            publish({
              status: snapshot.data ? 'stale' : 'error',
              data: snapshot.data,
              error: error?.message || 'network-error',
              at: snapshot.at,
            })
          } finally {
            inflight = null
          }
        })()
        return inflight
      }

      const act = async (action, payload = {}) => {
        if (acting) throw new Error('action-in-flight')
        acting = true
        const my = ++epoch
        try {
          const response = await request({
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ action, ...payload }),
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data?.error || `HTTP ${response.status}`)
          if (my === epoch && data?.state) {
            publish({ status: 'ready', data: data.state, error: null, at: Date.now() })
          }
          return data
        } finally {
          acting = false
        }
      }

      const acquire = () => {
        refs += 1
        if (refs !== 1) return
        void read()
        timer = setInterval(() => {
          if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
          void read()
        }, 4000)
      }

      const release = () => {
        refs = Math.max(0, refs - 1)
        if (refs === 0 && timer) {
          clearInterval(timer)
          timer = null
        }
      }

      return {
        get: () => snapshot,
        subscribe: listener => {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
        acquire,
        release,
        refresh: read,
        act,
      }
    }

    function createUI(ctx) {
      const store = createStore()

      function useT() {
        const [, force] = React.useState(0)
        React.useEffect(() => ctx.locale.subscribe(() => force(value => value + 1)), [])
        return React.useMemo(() => {
          const bound = ctx.locale.bind('devquest')
          return (key, values) => interpolate(bound(key), values)
        }, [])
      }

      function localeTag() {
        const active = ctx.locale.getLocale().active
        return active === 'zh' ? 'zh-CN' : active || 'en'
      }

      function useSnapshot() {
        const [value, setValue] = React.useState(store.get())
        React.useEffect(() => {
          const unsubscribe = store.subscribe(() => setValue(store.get()))
          store.acquire()
          return () => {
            unsubscribe()
            store.release()
          }
        }, [])
        return value
      }

      function useTick(ms = 30000) {
        const [now, setNow] = React.useState(Date.now())
        React.useEffect(() => {
          const id = setInterval(() => setNow(Date.now()), ms)
          return () => clearInterval(id)
        }, [ms])
        return now
      }

      function useToasts() {
        const [items, setItems] = React.useState([])
        const timers = React.useRef([])
        const counter = React.useRef(1)
        React.useEffect(() => () => {
          timers.current.forEach(clearTimeout)
          timers.current = []
        }, [])
        const dismiss = id => setItems(current => current.filter(item => item.id !== id))
        const push = (text, tone = 'success') => {
          const id = counter.current++
          setItems(current => [...current, { id, text, tone }])
          const timer = setTimeout(() => {
            setItems(current => current.filter(item => item.id !== id))
          }, 4600)
          timers.current.push(timer)
        }
        return { items, push, dismiss }
      }

      function QuestMark({ size = 20, active = false }) {
        return h('svg', {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          'aria-hidden': true,
          style: { display: 'block', color: 'currentColor', opacity: active ? 1 : 0.78 },
        },
        h('path', {
          d: 'M12 2.7 20.6 7.5v9L12 21.3 3.4 16.5v-9L12 2.7Z',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'm12 6.3 4.9 5.7-4.9 5.7-4.9-5.7L12 6.3Z',
          fill: 'currentColor',
          opacity: 0.88,
        }),
        h('circle', { cx: 12, cy: 12, r: 1.5, fill: 'var(--dsw-alias-bg-base)' }))
      }

      function CoinIcon({ size = 11 }) {
        return h('svg', { width: size, height: size, viewBox: '0 0 12 12', 'aria-hidden': true, style: { display: 'block' } },
          h('circle', { cx: 6, cy: 6, r: 5, fill: 'none', stroke: 'currentColor', strokeWidth: 1.2 }),
          h('path', { d: 'M6 3.2 6.8 5l2 .3-1.45 1.4.35 2-1.7-.95-1.7.95.35-2L3.2 5.3l2-.3L6 3.2Z', fill: 'currentColor' }))
      }

      function FlameIcon({ size = 11 }) {
        return h('svg', { width: size, height: size, viewBox: '0 0 12 12', 'aria-hidden': true, style: { display: 'block' } },
          h('path', { d: 'M6.6 1.2c.3 2-1 2.5-1 4 0 .7.5 1.2 1.1 1.2.8 0 1.2-.6 1.2-1.4 1.4 1 2.1 2.2 2.1 3.5A3.6 3.6 0 0 1 6.4 12 3.7 3.7 0 0 1 2.6 8.2c0-1.6 1-3 2.5-4.1-.1 1 .2 1.6.8 1.9-.4-1.7.3-3.5 2.2-4.8h-.5Z', fill: 'currentColor' }))
      }

      function BossSigil({ size = 58 }) {
        return h('svg', { width: size, height: size, viewBox: '0 0 64 64', 'aria-hidden': true, style: { display: 'block' } },
          h('path', { d: 'M32 5 55 18v28L32 59 9 46V18L32 5Z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, opacity: 0.7 }),
          h('path', { d: 'M32 13 47 21.5v21L32 51 17 42.5v-21L32 13Z', fill: 'currentColor', opacity: 0.12 }),
          h('path', { d: 'M22 27.5 27 23v7.5M42 27.5 37 23v7.5', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' }),
          h('path', { d: 'M24 38c2.8 3.2 5.5 4.7 8 4.7s5.2-1.5 8-4.7', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }),
          h('path', { d: 'M29 34h6M32 31v6', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', opacity: 0.7 }),
          h('circle', { cx: 32, cy: 32, r: 27, fill: 'none', stroke: 'currentColor', strokeWidth: 0.8, strokeDasharray: '2 5', opacity: 0.4 }))
      }

      /**
       * Paints one string-grid sprite as one <rect> per horizontal run, so a
       * 14x16 hero costs a few dozen nodes instead of 224.
       */
      function PixelSprite({ rows, palette, className }) {
        const height = rows.length
        const width = rows[0] ? rows[0].length : 0
        const shapes = []
        for (let y = 0; y < height; y += 1) {
          const row = rows[y]
          let x = 0
          while (x < width) {
            const ch = row[x]
            let run = 1
            while (x + run < width && row[x + run] === ch) run += 1
            const fill = palette[ch]
            if (fill) shapes.push(h('rect', { key: `${y}:${x}`, x, y, width: run, height: 1, fill }))
            x += run
          }
        }
        return h('svg', {
          className,
          viewBox: `0 0 ${width} ${height}`,
          preserveAspectRatio: 'xMidYMax meet',
          shapeRendering: 'crispEdges',
          'aria-hidden': 'true',
          focusable: 'false',
        }, shapes)
      }

      function GearIcon({ id, slot, rarity }) {
        const shape = GEAR_ICON[id] || GEAR_ICON_FALLBACK[slot] || 'gem'
        const rows = PX_ITEM_ICONS[shape]
        if (!rows) return null
        const tone = GEAR_ICON_PALETTE[id] || rarity
        return h(PixelSprite, {
          rows,
          palette: PX_ICON_PALETTES[tone] || PX_ICON_PALETTES.common,
          className: 'dq-item-px',
        })
      }

      /**
       * The avatar with what is actually equipped: the armour picks one of
       * three silhouettes and recolours hood and chest, the charm becomes a
       * gem, the weapon is drawn beside the hand. Same figure everywhere.
       */
      // Painted busts are optional: set this to `${API}?asset=hero` to swap the
      // parametric pixel figure for a shipped illustration.
      const HERO_PORTRAIT = null

      // Vector silhouette: same skeleton as the pixel grid, but drawn with real
      // curves and gradients. Set to 'pixel' to fall back to the sprite.
      const HERO_ART = 'vector'

      function VectorHero({ gear, className = 'dq-figure' }) {
        const equipped = (gear && gear.equipped) || {}
        const items = (gear && gear.items) || []
        const armor = ARMOR_LOOK[equipped.armor] || ARMOR_LOOK['a.novice']
        const cut = ARMOR_CUT[equipped.armor] || 'coat'
        const weaponItem = items.find(item => item.id === equipped.weapon) || null
        const shape = (weaponItem && WEAPON_SHAPE[weaponItem.id]) || 'greatsword'
        const charmColor = CHARM_LOOK[equipped.charm] || null
        const tone = weaponItem ? (GEAR_ICON_PALETTE[weaponItem.id] || weaponItem.rarity) : 'common'
        const weapon = WEAPON_PALETTES[tone] || WEAPON_PALETTES.common
        const uid = `v-${equipped.armor || 'a'}-${equipped.weapon || 'w'}`
        const cx = 28
        const half = cut === 'plate' ? 15 : 13
        const waistHalf = cut === 'plate' ? 9.6 : 8.6
        const hood = armor.hood
        const chest = armor.chest
        const shade = armor.shade
        const boot = armor.boot
        const skin = '#f2c6a0'
        const skinShade = mixColor(skin, 0.8)
        const pants = mixColor(shade, 0.55)
        const outline = mixColor(shade, 0.42)
        const handX = cx + 14.2

        const torso = cut.skirt
          ? `M${cx - half} 23 Q${cx} 20.4 ${cx + half} 23 L${cx + waistHalf} 45 L${cx + 15} 58 Q${cx} 62 ${cx - 15} 58 L${cx - waistHalf} 45 Z`
          : `M${cx - half} 23 Q${cx} 20.4 ${cx + half} 23 L${cx + waistHalf} 45 Q${cx} 47.2 ${cx - waistHalf} 45 Z`

        return h('svg', {
          className: `${className} dq-vector-hero`,
          viewBox: '0 0 56 72',
          role: 'img',
          'aria-label': '',
        },
        h('defs', null,
          h('linearGradient', { id: `${uid}-armor`, x1: '0.1', y1: '0', x2: '0.9', y2: '1' },
            h('stop', { offset: '0%', stopColor: mixColor(chest, 1.2) }),
            h('stop', { offset: '45%', stopColor: chest }),
            h('stop', { offset: '100%', stopColor: shade })),
          h('linearGradient', { id: `${uid}-hood`, x1: '0', y1: '0', x2: '0.8', y2: '1' },
            h('stop', { offset: '0%', stopColor: mixColor(hood, 1.25) }),
            h('stop', { offset: '100%', stopColor: mixColor(hood, 0.7) })),
          h('linearGradient', { id: `${uid}-skin`, x1: '0', y1: '0', x2: '0.35', y2: '1' },
            h('stop', { offset: '0%', stopColor: mixColor(skin, 1.06) }),
            h('stop', { offset: '100%', stopColor: skinShade })),
          h('linearGradient', { id: `${uid}-blade`, x1: '0', y1: '0', x2: '1', y2: '0' },
            h('stop', { offset: '0%', stopColor: weapon[2] }),
            h('stop', { offset: '45%', stopColor: weapon[1] }),
            h('stop', { offset: '55%', stopColor: weapon[2] }),
            h('stop', { offset: '100%', stopColor: weapon[1] })),
          h('linearGradient', { id: `${uid}-cape`, x1: '0', y1: '0', x2: '0', y2: '1' },
            h('stop', { offset: '0%', stopColor: mixColor(shade, 0.9) }),
            h('stop', { offset: '100%', stopColor: mixColor(shade, 0.5) }))),

        cut.cape
          ? h('path', {
            d: `M${cx - half + 1} 22.5 Q${cx} 18.5 ${cx + half - 1} 22.5 L${cx + 17} 53 Q${cx} 59 ${cx - 17} 53 Z`,
            fill: `url(#${uid}-cape)`,
            stroke: mixColor(shade, 0.4),
            strokeWidth: 0.9,
          })
          : null,

        // legs and boots
        h('rect', { x: cx - 7.4, y: 47, width: 5.6, height: 15, rx: 2.2, fill: pants, stroke: mixColor(pants, 0.6), strokeWidth: 0.8 }),
        h('rect', { x: cx + 1.8, y: 47, width: 5.6, height: 15, rx: 2.2, fill: pants, stroke: mixColor(pants, 0.6), strokeWidth: 0.8 }),
        h('path', {
          d: `M${cx - 8} 60 h6.4 v5.4 q0 3 -3 3 h-2.6 q-2.4 0 -2.4 -2.4 v-2 q0 -3.4 1.6 -4 Z`,
          fill: boot, stroke: mixColor(boot, 0.5), strokeWidth: 0.8,
        }),
        h('path', {
          d: `M${cx + 1.6} 60 h6.4 q1.6 0.6 1.6 4 v2 q0 2.4 -2.4 2.4 h-2.6 q-3 0 -3 -3 Z`,
          fill: boot, stroke: mixColor(boot, 0.5), strokeWidth: 0.8,
        }),

        // arms, angled slightly outwards
        h('rect', {
          x: cx - half - 1.4, y: 23.5, width: 5, height: 20, rx: 2.5,
          fill: shade, stroke: mixColor(shade, 0.55), strokeWidth: 0.8,
          transform: `rotate(-3 ${cx - half + 1} 33)`,
        }),
        h('rect', {
          x: cx + half - 3.6, y: 23.5, width: 5, height: 20, rx: 2.5,
          fill: shade, stroke: mixColor(shade, 0.55), strokeWidth: 0.8,
          transform: `rotate(3 ${cx + half - 1} 33)`,
        }),

        // torso
        h('path', { d: torso, fill: `url(#${uid}-armor)`, stroke: outline, strokeWidth: 1 }),

        // neckline, chest seam and emblem
        h('path', { d: `M${cx - 5.4} 23.4 Q${cx} 27.6 ${cx + 5.4} 23.4`, fill: 'none', stroke: outline, strokeWidth: 1.1, strokeLinecap: 'round' }),
        h('path', { d: `M${cx - 5.6} 27 L${cx - 5.6} 43`, stroke: mixColor(shade, 0.7), strokeWidth: 0.8, opacity: 0.55 }),
        h('path', {
          d: `M${cx} 30.6 L${cx + 2.6} 33.6 L${cx} 36.6 L${cx - 2.6} 33.6 Z`,
          fill: cut.trim ? '#f2c14e' : mixColor(chest, 1.3),
          stroke: mixColor('#f2c14e', 0.6),
          strokeWidth: 0.6,
          opacity: 0.95,
        }),

        // belt
        h('rect', { x: cx - waistHalf - 0.8, y: 44.6, width: (waistHalf + 0.8) * 2, height: 3.4, rx: 1.1, fill: '#d9a441', stroke: '#8a621f', strokeWidth: 0.7 }),
        h('rect', { x: cx - 2, y: 45, width: 4, height: 2.6, rx: 0.6, fill: '#f6d585', stroke: '#8a621f', strokeWidth: 0.5 }),

        // hands
        h('circle', { cx: cx - half - 0.6, cy: 45, r: 2.2, fill: skin, stroke: skinShade, strokeWidth: 0.7 }),
        h('circle', { cx: handX, cy: 45, r: 2.2, fill: skin, stroke: skinShade, strokeWidth: 0.7 }),

        // neck
        h('rect', { x: cx - 1.5, y: 16.4, width: 3, height: 6.6, rx: 1.2, fill: skinShade }),

        // head
        h('path', {
          d: `M${cx - 7.6} 13.4 Q${cx - 7.6} 4.6 ${cx} 4.6 Q${cx + 7.6} 4.6 ${cx + 7.6} 13.4 L${cx + 7.6} 16.2 Q${cx + 5.6} 14.2 ${cx + 3.4} 14.2 L${cx - 3.4} 14.2 Q${cx - 5.6} 14.2 ${cx - 7.6} 16.2 Z`,
          fill: `url(#${uid}-hood)`,
          stroke: mixColor(hood, 0.5),
          strokeWidth: 0.9,
        }),
        h('ellipse', { cx, cy: 14.4, rx: 4.5, ry: 5.1, fill: `url(#${uid}-skin)` }),
        h('path', { d: `M${cx - 3.2} 12.2 q1.5 -0.9 3 -0.1`, fill: 'none', stroke: mixColor(hood, 0.55), strokeWidth: 0.85, strokeLinecap: 'round' }),
        h('path', { d: `M${cx + 0.2} 12.1 q1.5 -0.8 3 0.1`, fill: 'none', stroke: mixColor(hood, 0.55), strokeWidth: 0.85, strokeLinecap: 'round' }),
        h('ellipse', { cx: cx - 2, cy: 14.3, rx: 0.75, ry: 0.95, fill: '#2a1c33' }),
        h('ellipse', { cx: cx + 2, cy: 14.3, rx: 0.75, ry: 0.95, fill: '#2a1c33' }),
        h('path', { d: `M${cx} 15 l0.4 1.4`, stroke: skinShade, strokeWidth: 0.7, strokeLinecap: 'round', fill: 'none' }),
        h('path', { d: `M${cx - 1.3} 17.6 q1.3 0.9 2.6 0`, stroke: '#9c5240', strokeWidth: 0.8, fill: 'none', strokeLinecap: 'round' }),

        // weapon in the right hand
        h('g', { className: 'dq-vector-weapon' }, weaponNode(shape, handX, uid, weapon)),

        charmColor
          ? h('path', {
            d: `M${cx - 1.5} 39.6 L${cx} 38.2 L${cx + 1.5} 39.6 L${cx} 41 Z`,
            fill: charmColor,
            stroke: mixColor(charmColor, 0.55),
            strokeWidth: 0.6,
          })
          : null)
      }

      // Vector bosses: three silhouettes (imp, wraith, sovereign). Everything is
      // lifted a couple of stops so the creature reads against the dark arena.
      function VectorBoss({ kind, bossId, className = 'dq-px' }) {
        const accent = BOSS_PALETTE_ACCENT[bossId] || { h: '#4a3a6a', e: '#ff9a6b' }
        const body = mixColor(accent.h, 1.65)
        const shade = mixColor(accent.h, 1.05)
        const deep = mixColor(accent.h, 0.6)
        const light = accent.e
        const bone = '#e9dcc3'
        const uid = `b-${bossId || kind}`
        const eye = (cx, cy, r) => h('g', null,
          h('circle', { cx, cy, r: r * 3, fill: `url(#${uid}-glow)` }),
          h('circle', { cx, cy, r, fill: light }),
          h('circle', { cx: cx - r * 0.25, cy: cy - r * 0.3, r: r * 0.45, fill: '#ffffff' }))
        return h('svg', {
          className: `${className} dq-vector-boss`,
          viewBox: '0 0 56 72',
          role: 'img',
          'aria-label': '',
        },
        h('defs', null,
          h('linearGradient', { id: `${uid}-body`, x1: '0.2', y1: '0', x2: '0.8', y2: '1' },
            h('stop', { offset: '0%', stopColor: mixColor(body, 1.18) }),
            h('stop', { offset: '55%', stopColor: body }),
            h('stop', { offset: '100%', stopColor: shade })),
          h('linearGradient', { id: `${uid}-cape`, x1: '0', y1: '0', x2: '0', y2: '1' },
            h('stop', { offset: '0%', stopColor: mixColor(body, 0.95) }),
            h('stop', { offset: '100%', stopColor: deep })),
          h('radialGradient', { id: `${uid}-glow`, cx: '50%', cy: '50%', r: '50%' },
            h('stop', { offset: '0%', stopColor: light, stopOpacity: 0.85 }),
            h('stop', { offset: '40%', stopColor: light, stopOpacity: 0.35 }),
            h('stop', { offset: '100%', stopColor: light, stopOpacity: 0 }))),

        kind === 'season'
          ? h('g', null,
            h('circle', { cx: 28, cy: 18, r: 16, fill: 'none', stroke: light, strokeWidth: 0.9, opacity: 0.3 }),
            h('path', {
              d: 'M14 24 Q28 19 42 24 L49 60 Q28 71 7 60 Z',
              fill: `url(#${uid}-cape)`, stroke: deep, strokeWidth: 1,
            }),
            h('path', {
              d: 'M17 26 Q28 21.5 39 26 L42 56 Q28 63 14 56 Z',
              fill: `url(#${uid}-body)`, stroke: deep, strokeWidth: 1.1,
            }),
            h('path', { d: 'M22 29 Q28 26.5 34 29 L33 44 Q28 47 23 44 Z', fill: mixColor(body, 1.3), stroke: mixColor(body, 0.85), strokeWidth: 0.7 }),
            h('path', { d: 'M28 32 L30.6 36 L28 40 L25.4 36 Z', fill: light }),
            h('ellipse', { cx: 15.5, cy: 28, rx: 4.6, ry: 3.6, fill: mixColor(body, 1.22), stroke: deep, strokeWidth: 0.9 }),
            h('ellipse', { cx: 40.5, cy: 28, rx: 4.6, ry: 3.6, fill: mixColor(body, 1.22), stroke: deep, strokeWidth: 0.9 }),
            h('path', { d: 'M13 30 Q9 39 10 47', fill: 'none', stroke: mixColor(body, 1.1), strokeWidth: 5, strokeLinecap: 'round' }),
            h('path', { d: 'M43 30 Q47 39 46 47', fill: 'none', stroke: mixColor(body, 1.1), strokeWidth: 5, strokeLinecap: 'round' }),
            h('circle', { cx: 10, cy: 48.5, r: 3.2, fill: mixColor(body, 1.28), stroke: deep, strokeWidth: 0.9 }),
            h('circle', { cx: 46, cy: 48.5, r: 3.2, fill: mixColor(body, 1.28), stroke: deep, strokeWidth: 0.9 }),
            h('ellipse', { cx: 28, cy: 17.5, rx: 7.8, ry: 7.4, fill: `url(#${uid}-body)`, stroke: deep, strokeWidth: 1 }),
            h('path', { d: 'M20 11 L21.6 4 L25 8.6 L28 1.8 L31 8.6 L34.4 4 L36 11 Z', fill: '#f2c14e', stroke: '#8a621f', strokeWidth: 0.8 }),
            h('circle', { cx: 28, cy: 6.4, r: 1.2, fill: '#fff3c4' }),
            eye(24.4, 18, 1.7),
            eye(31.6, 18, 1.7),
            h('path', { d: 'M24.6 23 q3.4 2.2 6.8 0', fill: 'none', stroke: deep, strokeWidth: 1.2, strokeLinecap: 'round' }))
          : kind === 'weekly'
            ? h('g', null,
              h('path', {
                d: 'M28 5 Q42 10 41 28 L46 60 Q28 70 10 60 L15 28 Q14 10 28 5 Z',
                fill: `url(#${uid}-body)`, stroke: deep, strokeWidth: 1.1,
              }),
              h('path', { d: 'M28 8 Q39 12 38 27 Q28 34 18 27 Q17 12 28 8 Z', fill: deep, opacity: 0.92 }),
              h('path', { d: 'M17.6 27 Q28 34.5 38.4 27', fill: 'none', stroke: mixColor(body, 1.45), strokeWidth: 1.3, opacity: 0.8 }),
              eye(23, 21.6, 1.8),
              eye(33, 21.6, 1.8),
              h('path', { d: 'M28 35 L31.4 39.5 L28 44 L24.6 39.5 Z', fill: light, opacity: 0.55 }),
              h('path', { d: 'M15.6 33 Q9 44 11.4 52', fill: 'none', stroke: mixColor(body, 1.05), strokeWidth: 4.6, strokeLinecap: 'round' }),
              h('path', { d: 'M40.4 33 Q47 44 44.6 52', fill: 'none', stroke: mixColor(body, 1.05), strokeWidth: 4.6, strokeLinecap: 'round' }),
              h('path', { d: 'M11.4 52 l-2.6 4.4 M11.4 52 l0.4 5 M11.4 52 l2.8 4', stroke: bone, strokeWidth: 1.2, strokeLinecap: 'round' }),
              h('path', { d: 'M44.6 52 l2.6 4.4 M44.6 52 l-0.4 5 M44.6 52 l-2.8 4', stroke: bone, strokeWidth: 1.2, strokeLinecap: 'round' }),
              h('path', { d: 'M12 58 q4 4.4 8 1.2 q4 4.4 8 1.2 q4 4.4 8 1.2 q4 3.4 8 -1.2', fill: 'none', stroke: mixColor(body, 1.5), strokeWidth: 1.2, opacity: 0.6 }))
            : h('g', null,
              h('path', { d: 'M21.6 14 Q17.4 6 12.6 3.4 Q19.6 6.4 23.4 12.4 Z', fill: bone, stroke: '#a8977a', strokeWidth: 0.7 }),
              h('path', { d: 'M34.4 14 Q38.6 6 43.4 3.4 Q36.4 6.4 32.6 12.4 Z', fill: bone, stroke: '#a8977a', strokeWidth: 0.7 }),
              // body: shoulders then a belly
              h('path', {
                d: 'M18 29 Q28 25 38 29 Q42 42 39.5 55 Q28 62 16.5 55 Q14 42 18 29 Z',
                fill: `url(#${uid}-body)`, stroke: deep, strokeWidth: 1.2,
              }),
              h('ellipse', { cx: 28, cy: 45, rx: 8.4, ry: 7.4, fill: mixColor(body, 1.55), opacity: 0.55 }),
              h('ellipse', { cx: 28, cy: 19.4, rx: 8.6, ry: 8, fill: `url(#${uid}-body)`, stroke: deep, strokeWidth: 1.2 }),
              h('path', { d: 'M21.6 15.4 q6.4 -2.6 12.8 0', fill: 'none', stroke: deep, strokeWidth: 1.8, strokeLinecap: 'round' }),
              eye(24.2, 18.6, 1.9),
              eye(31.8, 18.6, 1.9),
              h('path', { d: 'M22 23.4 Q28 28.6 34 23.4 Q28 26.4 22 23.4 Z', fill: '#1a0f14', stroke: deep, strokeWidth: 0.6 }),
              h('path', { d: 'M24.4 24.6 l1.1 2 l1.1 -2 M27.8 25 l1.1 1.9 l1.1 -1.9', fill: '#ffffff', opacity: 0.9 }),
              h('path', { d: 'M17.6 31 Q12.4 40 13.6 49', fill: 'none', stroke: mixColor(body, 1.05), strokeWidth: 4.8, strokeLinecap: 'round' }),
              h('path', { d: 'M38.4 31 Q43.6 40 42.4 49', fill: 'none', stroke: mixColor(body, 1.05), strokeWidth: 4.8, strokeLinecap: 'round' }),
              h('path', { d: 'M13.6 49 l-2.8 4.4 M13.6 49 l0.2 5 M13.6 49 l3 4', stroke: bone, strokeWidth: 1.3, strokeLinecap: 'round' }),
              h('path', { d: 'M42.4 49 l2.8 4.4 M42.4 49 l-0.2 5 M42.4 49 l-3 4', stroke: bone, strokeWidth: 1.3, strokeLinecap: 'round' }),
              h('ellipse', { cx: 21.4, cy: 61, rx: 5.6, ry: 3.4, fill: mixColor(body, 1.1), stroke: deep, strokeWidth: 0.9 }),
              h('ellipse', { cx: 34.6, cy: 61, rx: 5.6, ry: 3.4, fill: mixColor(body, 1.1), stroke: deep, strokeWidth: 0.9 }),
              h('path', { d: 'M37.4 53 Q47 54 45.4 65 Q44 69 41 67', fill: 'none', stroke: mixColor(body, 1.05), strokeWidth: 2.8, strokeLinecap: 'round' }),
              h('path', { d: 'M41 67 l3.4 -1.6 l0.4 3.4 Z', fill: bone, opacity: 0.9 })))
      }

      function weaponNode(shape, handX, uid, weapon) {
        const guardY = 43.4
        const grip = h('rect', { x: handX - 1.1, y: guardY + 0.6, width: 2.2, height: 6.4, rx: 0.9, fill: weapon[3], stroke: mixColor(weapon[3], 0.5), strokeWidth: 0.6 })
        const pommel = h('circle', { cx: handX, cy: guardY + 7.6, r: 1.4, fill: weapon[1] })
        if (shape === 'bow') {
          return h('g', null,
            h('path', {
              d: `M${handX - 2.4} 16 Q${handX + 5} 35 ${handX - 2.4} 54`,
              fill: 'none', stroke: weapon[2], strokeWidth: 1.8, strokeLinecap: 'round',
            }),
            h('path', { d: `M${handX - 2.4} 16 L${handX - 2.4} 54`, stroke: '#eef2ff', strokeWidth: 0.5, opacity: 0.8 }))
        }
        if (shape === 'wrench') {
          return h('g', null,
            h('rect', { x: handX - 1, y: 24, width: 2, height: 20, rx: 1, fill: weapon[2], stroke: mixColor(weapon[2], 0.55), strokeWidth: 0.5 }),
            h('path', {
              d: `M${handX - 3.6} 21.4 q0 -3.2 3.6 -3.2 q3.6 0 3.6 3.2 l0 2.6 l-2.3 0 l0 -1.7 q-1.3 -0.6 -2.6 0 l0 1.7 l-2.3 0 Z`,
              fill: weapon[1], stroke: weapon[2], strokeWidth: 0.6,
            }))
        }
        if (shape === 'spear') {
          return h('g', null,
            h('rect', { x: handX - 0.9, y: 14, width: 1.8, height: 30, rx: 0.9, fill: weapon[3], stroke: mixColor(weapon[3], 0.55), strokeWidth: 0.5 }),
            h('path', {
              d: `M${handX} 4 L${handX + 2.2} 13 L${handX} 15.6 L${handX - 2.2} 13 Z`,
              fill: `url(#${uid}-blade)`, stroke: weapon[2], strokeWidth: 0.6,
            }),
            h('path', { d: `M${handX - 3.6} ${guardY + 1} h7.2`, stroke: weapon[3], strokeWidth: 1.2, strokeLinecap: 'round' }),
            grip, pommel)
        }
        if (shape === 'scythe') {
          return h('g', null,
            h('rect', { x: handX - 1, y: 12, width: 2.2, height: 38, rx: 1, fill: weapon[3], stroke: mixColor(weapon[3], 0.55), strokeWidth: 0.5 }),
            h('path', {
              d: `M${handX + 0.4} 13 q-13 0 -19 12 q11.5 -5.5 19 -3.2 Z`,
              fill: `url(#${uid}-blade)`, stroke: weapon[2], strokeWidth: 0.7,
            }),
            h('path', { d: `M${handX - 0.6} 14 q-9 2 -13 9`, fill: 'none', stroke: weapon[1], strokeWidth: 0.6, opacity: 0.7 }),
            h('circle', { cx: handX, cy: 51, r: 1.6, fill: weapon[1] }))
        }
        if (shape === 'staff') {
          return h('g', null,
            h('rect', { x: handX - 1, y: 16, width: 2.2, height: 35, rx: 1, fill: weapon[3], stroke: mixColor(weapon[3], 0.55), strokeWidth: 0.5 }),
            h('circle', { cx: handX, cy: 12, r: 4.8, fill: `url(#${uid}-blade)`, stroke: weapon[2], strokeWidth: 0.8 }),
            h('circle', { cx: handX, cy: 12, r: 2.1, fill: '#ffffff', opacity: 0.6 }),
            h('path', { d: `M${handX - 3.6} 16 h7.2`, stroke: weapon[3], strokeWidth: 1.1, strokeLinecap: 'round' }),
            h('circle', { cx: handX, cy: 51, r: 1.6, fill: weapon[1] }))
        }
        if (shape === 'twinblade') {
          return h('g', null,
            h('path', {
              d: `M${handX - 1.4} 45 L${handX - 9} 11 L${handX - 5.6} 10 L${handX + 1.4} 45 Z`,
              fill: `url(#${uid}-blade)`, stroke: weapon[2], strokeWidth: 0.6,
            }),
            h('path', {
              d: `M${handX + 1.4} 45 L${handX + 9} 11 L${handX + 5.6} 10 L${handX - 1.4} 45 Z`,
              fill: `url(#${uid}-blade)`, stroke: weapon[2], strokeWidth: 0.6,
            }),
            h('rect', { x: handX - 1.6, y: guardY, width: 3.2, height: 7, rx: 1.2, fill: weapon[3], stroke: mixColor(weapon[3], 0.5), strokeWidth: 0.5 }),
            h('circle', { cx: handX, cy: guardY + 7.8, r: 1.5, fill: weapon[1] }))
        }
        if (shape === 'dagger') {
          return h('g', null,
            h('path', {
              d: `M${handX} 31 L${handX + 1.9} 42.6 L${handX} 44.8 L${handX - 1.9} 42.6 Z`,
              fill: `url(#${uid}-blade)`, stroke: weapon[2], strokeWidth: 0.6,
            }),
            h('path', { d: `M${handX - 4} ${guardY + 0.4} h8`, stroke: weapon[3], strokeWidth: 1.3, strokeLinecap: 'round' }),
            grip, pommel)
        }
        return h('g', null,
          h('path', {
            d: `M${handX} 6 L${handX + 2.5} 42 L${handX} 44.6 L${handX - 2.5} 42 Z`,
            fill: `url(#${uid}-blade)`, stroke: weapon[2], strokeWidth: 0.7,
          }),
          h('path', { d: `M${handX} 10 L${handX} 41`, stroke: weapon[1], strokeWidth: 0.6, opacity: 0.8 }),
          h('path', { d: `M${handX - 5} ${guardY + 0.4} h10`, stroke: weapon[3], strokeWidth: 1.6, strokeLinecap: 'round' }),
          grip, pommel)
      }

      function HeroFigure({ gear, className = 'dq-figure' }) {
        if (HERO_ART === 'vector') return h(VectorHero, { gear, className })
        const equipped = (gear && gear.equipped) || {}
        const items = (gear && gear.items) || []
        const armor = ARMOR_LOOK[equipped.armor] || ARMOR_LOOK['a.novice']
        const cut = ARMOR_CUT[equipped.armor] || 'coat'
        const weaponItem = items.find(item => item.id === equipped.weapon) || null
        const shape = weaponItem ? WEAPON_SHAPE[weaponItem.id] : null
        const charmColor = CHARM_LOOK[equipped.charm] || null
        const portraitFailed = React.useState(false)
        const palette = {
          ...PX_HERO_PALETTE,
          h: armor.hood,
          H: mixColor(armor.hood, 0.7),
          m: armor.chest,
          M: armor.shade,
          C: mixColor(armor.shade, 0.72),
          b: armor.boot,
          B: mixColor(armor.boot, 1.45),
          S: mixColor('#f3c9a0', 0.82),
          ...(charmColor ? { 5: charmColor } : {}),
        }
        if (HERO_PORTRAIT && !portraitFailed[0]) {
          return h('img', {
            className: `${className} dq-portrait`,
            src: HERO_PORTRAIT,
            alt: '',
            draggable: false,
            onError: () => portraitFailed[1](true),
          })
        }
        const tone = weaponItem ? (GEAR_ICON_PALETTE[weaponItem.id] || weaponItem.rarity) : null
        return h(PixelSprite, {
          rows: renderFigure({ cut, weapon: shape, charm: Boolean(charmColor) }),
          palette: {
            ...palette,
            ...(tone ? (WEAPON_PALETTES[tone] || WEAPON_PALETTES.common) : {}),
          },
          className,
        })
      }

      function Crest({ level, frame, size = 'lg', label, percent, gems = 0 }) {
        const arcRadius = 43
        const circumference = 2 * Math.PI * arcRadius
        const ratio = typeof percent === 'number' ? Math.max(0, Math.min(100, percent)) / 100 : 0
        return h('span', {
          className: 'dq-crest',
          'data-frame': frame || 'f.novice',
          'data-frarity': FRAME_RARITY[frame || 'f.novice'] || 'common',
          'data-size': size,
          title: label,
        },
        typeof percent === 'number' && size === 'lg'
          ? h('svg', { className: 'dq-crest-arc', viewBox: '0 0 96 96', 'aria-hidden': 'true' },
            h('circle', { cx: 48, cy: 48, r: arcRadius, className: 'dq-crest-arc-track' }),
            h('circle', {
              cx: 48,
              cy: 48,
              r: arcRadius,
              className: 'dq-crest-arc-fill',
              strokeDasharray: circumference.toFixed(1),
              strokeDashoffset: (circumference * (1 - ratio)).toFixed(1),
              transform: 'rotate(-90 48 48)',
            }))
          : null,
        h('span', { className: 'dq-crest-halo', 'aria-hidden': 'true' }),
        h('span', { className: 'dq-crest-aura', 'aria-hidden': 'true' }),
        h('span', { className: 'dq-crest-ring', 'aria-hidden': 'true' }),
        h('span', { className: 'dq-crest-sheen', 'aria-hidden': 'true' }),
        h('span', { className: 'dq-crest-level' }, level),
        h('span', { className: 'dq-crest-label' }, 'LEVEL'),
        gems > 0
          ? h('span', {
            className: `dq-crest-gems${gems > GEM_SLOTS.length ? ' is-maxed' : ''}`,
            'aria-hidden': true,
            title: `×${gems}`,
          },
          GEM_SLOTS.slice(0, Math.min(GEM_SLOTS.length, gems)).map((slot, index) =>
            h('i', {
              key: index,
              className: 'dq-crest-gem',
              style: { left: `${slot.x}%`, top: `${slot.y}%` },
            })))
          : null)
      }

      /**
       * The pixel arena: the hero sprite is the player, the boss sprite is the
       * selected front, and damage comes from the snapshot diff, so every real
       * tool call, turn and cleared todo list lands a visible hit here.
       */
      function BattleArena({ data, t, locale, moments = {}, busy, onClaim }) {
        const [target, setTarget] = React.useState('weekly')
        const [strike, setStrike] = React.useState({ seq: 0, amount: 0, crit: false })
        const boss = target === 'daily' ? data.dailyBoss : target === 'season' ? data.season.boss : data.weeklyBoss
        const art = BOSS_ART[target] || BOSS_ART.weekly
        const palette = { ...art.palette, ...(BOSS_PALETTE_ACCENT[boss.bossId] || {}) }
        const percent = boss.maxHp ? Math.max(0, Math.min(100, Math.round((boss.hp / boss.maxHp) * 100))) : 0
        const hit = (moments.bossHits || []).find(item => item.kind === target)
        const reward = boss.reward || {}
        const player = data.player
        const pulseKey = `${target}:${moments.token}:${hit ? hit.amount : 0}`

        React.useEffect(() => {
          setStrike(current => ({
            seq: current.seq + 1,
            amount: hit ? hit.amount : 0,
            crit: Boolean(hit && hit.amount >= Math.max(40, boss.maxHp * 0.08)),
          }))
        }, [pulseKey])

        const claimKey = target === 'daily' ? 'claim-daily-boss' : target === 'season' ? 'claim-season-boss' : 'claim-boss'

        return h('section', { className: 'dq-card dq-arena dq-full', 'data-defeated': boss.defeated ? 'true' : 'false' },
          h('div', { className: 'dq-arena-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' },
                h('span', { className: 'dq-card-title-glyph' }, '⚔'),
                t('arena.title')),
              h('div', { className: 'dq-card-sub' }, t('arena.subtitle'))),
            h('div', { className: 'dq-arena-tools' },
              h('div', { className: 'dq-arena-targets', role: 'tablist', 'aria-label': t('arena.title') },
                ['daily', 'weekly', 'season'].map(kind => h('button', {
                  key: kind,
                  type: 'button',
                  role: 'tab',
                  className: 'dq-arena-target',
                  'aria-selected': target === kind,
                  onClick: () => setTarget(kind),
                }, t(`arena.target.${kind}`)))),
              h('button', {
                type: 'button',
                className: 'dq-arena-practice',
                title: t('arena.practiceHint'),
                onClick: () => setStrike(current => ({ seq: current.seq + 1, amount: 0, crit: false })),
              },
              h('span', { 'aria-hidden': true }, '⚔'),
              t('arena.practice')))),
          h('div', { className: 'dq-arena-scene' },
            h('div', { className: 'dq-arena-sky', 'aria-hidden': 'true' }),
            h('div', { className: 'dq-arena-hud' },
              h('span', { className: 'dq-arena-chip', 'aria-label': t('arena.you') },
                h(Crest, { level: player.level, frame: player.equippedFrame, size: 'hud', gems: player.rebirths || 0, label: t('hero.level', { level: player.level }) }),
                h('span', { className: 'dq-arena-name' }, player.name)),
              h('span', { className: 'dq-arena-chip boss' },
                h('span', { 'aria-hidden': true }, BOSS_META[boss.bossId]?.glyph || '♛'),
                t(`boss.${boss.bossId}.name`),
                h('b', null, `${percent}%`))),
            h('div', { className: 'dq-arena-stage' },
              h('div', { className: `dq-fighter dq-fighter-hero${moments.powerUp ? ' is-powered' : ''}`, key: `hero:${strike.seq}` },
                h('div', { className: 'dq-fighter-sprite' },
                  h(HeroFigure, { gear: data.gear, className: 'dq-px' })),
                h('span', { className: 'dq-fighter-shadow', 'aria-hidden': true })),
              h('div', { className: 'dq-arena-fx', 'aria-hidden': true },
                strike.amount > 0
                  ? h('span', { key: `dmg:${strike.seq}`, className: `dq-dmg${strike.crit ? ' is-crit' : ''}` }, `-${formatNumber(strike.amount, locale)}`)
                  : null,
                h('span', { key: `slash:${strike.seq}`, className: 'dq-slash' }),
                h('span', { key: `impact:${strike.seq}`, className: 'dq-impact' },
                  [0, 1, 2, 3, 4, 5].map(index => h('i', { key: index, style: { '--a': `${index * 60}deg` } })))),
              h('div', { className: `dq-fighter dq-fighter-boss${strike.amount > 0 ? ' is-hit' : ''}${boss.defeated ? ' is-defeated' : ''}`, key: `boss:${strike.seq}` },
                h('div', { className: 'dq-fighter-sprite' },
                  HERO_ART === 'vector'
                  ? h(VectorBoss, { kind: target, bossId: boss.bossId, className: 'dq-px' })
                  : h(PixelSprite, { rows: art.rows, palette, className: 'dq-px' })),
                h('span', { className: 'dq-fighter-shadow', 'aria-hidden': true })),
              h('div', { className: 'dq-arena-ground', 'aria-hidden': true })),
            boss.defeated
              ? h('div', { className: 'dq-arena-victory' },
                h('b', null, t('arena.victory')),
                h('span', null, t(`boss.${boss.bossId}.name`)))
              : null,
            moments.powerUp
              ? h('span', { key: `power:${moments.powerUp}`, className: 'dq-arena-powerpop' }, t('arena.powerSurge', { power: moments.powerUp }))
              : null),
          h('div', { className: 'dq-arena-foot' },
            h('div', { className: 'dq-arena-hp' },
              h('div', { className: 'dq-arena-hp-label' },
                h('span', null, t('arena.hp', { hp: formatNumber(boss.hp, locale), max: formatNumber(boss.maxHp, locale) })),
                h('span', null, t('boss.remaining', { time: formatDuration(boss.endsAt - Date.now(), t) }))),
              h('div', {
                className: 'dq-meter dq-arena-meter',
                role: 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': boss.maxHp,
                'aria-valuenow': boss.hp,
                'aria-label': t('arena.hp', { hp: boss.hp, max: boss.maxHp }),
              }, h('i', { style: { width: `${Math.max(boss.defeated ? 100 : 2, percent)}%` } })),
              h('div', { className: 'dq-arena-hint' }, boss.defeated ? t('arena.defeated') : t('arena.waiting'))),
            boss.defeated
              ? (boss.claimed
                ? h('span', { className: 'dq-status done' }, '✓ ', t('arena.claimed'))
                : h('button', { type: 'button', className: 'dq-btn primary lg', disabled: Boolean(busy), onClick: () => onClaim(target) },
                  busy === claimKey ? '…' : t('arena.claim')))
              : h('div', { className: 'dq-arena-reward' },
                h('span', null, t('boss.rewardLine', { xp: reward.xp || 0, coins: reward.coins || 0 })),
                h('span', { className: 'dq-arena-reward-hint' }, t('arena.hint')))))
      }

      function LevelUpCelebration({ level, gain, t, onClose }) {
        return h('div', { className: 'dq-celebrate', role: 'status', 'aria-live': 'polite' },
          h('div', { className: 'dq-celebrate-card' },
            h('div', { className: 'dq-celebrate-burst', 'aria-hidden': true },
              [0, 1, 2, 3, 4, 5, 6, 7].map(index => h('i', {
                key: index,
                style: { '--a': `${index * 45}deg`, '--d': index % 2 ? '1' : '.62' },
              }))),
            h('div', { className: 'dq-celebrate-kicker' }, t('levelup.kicker')),
            h('div', { className: 'dq-celebrate-level' }, level),
            h('div', { className: 'dq-celebrate-title' }, t('levelup.title')),
            h('div', { className: 'dq-celebrate-sub' }, t('levelup.sub', { gain })),
            h('button', { type: 'button', className: 'dq-btn primary lg', onClick: onClose }, t('levelup.close'))))
      }

      function Style() {
        return h('style', null, CSS)
      }

      function Page() {
        const snapshot = useSnapshot()
        const t = useT()
        const locale = localeTag()
        const now = useTick(30000)
        const [tab, setTab] = React.useState('overview')
        const [busy, setBusy] = React.useState(null)
        const [filter, setFilter] = React.useState('all')
        const { items: toasts, push, dismiss } = useToasts()
        const seen = React.useRef(null)
        const data = snapshot.data
        const moments = React.useMemo(() => diffSnapshots(snapshot.prev, data), [snapshot.prev, data])
        const [celebration, setCelebration] = React.useState(null)
        const [gearPicker, setGearPicker] = React.useState('weapon')

        React.useEffect(() => {
          if (!moments.levelUp) return
          setCelebration({ level: Number(data?.player?.level || 0), gain: moments.levelUp })
        }, [moments.token])

        React.useEffect(() => {
          if (!celebration) return
          const timer = setTimeout(() => setCelebration(null), 5200)
          return () => clearTimeout(timer)
        }, [celebration])

        React.useEffect(() => {
          if (!data?.player?.achievements) return
          const ids = Object.keys(data.player.achievements)
          if (seen.current === null) {
            seen.current = new Set(ids)
            return
          }
          const fresh = ids.filter(id => !seen.current.has(id))
          for (const id of fresh) {
            seen.current.add(id)
            push(t('toast.achievement', { name: t(`ach.${id}.name`) }), 'achievement')
          }
        }, [data?.player?.achievements])

        const runAction = async (key, action, payload = {}) => {
          if (busy) return false
          setBusy(key)
          try {
            const result = await store.act(action, payload)
            if (!result?.ok) {
              push(t(`toast.error.${result?.error || 'unknown'}`), 'error')
              return false
            }
            if (result.reward?.count) {
              push(t('toast.claimAll', result.reward), 'success')
            } else if (result.reward) {
              push(t('toast.reward', result.reward), 'success')
            }
            if (result.prize) {
              push(prizeText(result.prize, t), 'achievement')
            }
            if (action === 'open-chest' && result.chest) {
              const chest = result.chest
              const rewards = [
                t('chest.coins', { coins: chest.coins }),
                t('chest.xp', { xp: chest.xp }),
              ]
              if (chest.gear) rewards.push(t(`gear.${chest.gear}.name`))
              push(t('toast.chest', {
                tier: t(`chest.tier.${chest.tier}`),
                rewards: rewards.join(' · '),
              }), 'achievement')
            }
            if (action === 'claim-red-gear' && result.gear) {
              push(t('points.success', { name: t(`gear.${result.gear}.name`) }), 'achievement')
            }
            if (action === 'ascend-gear') {
              const gear = t(`gear.${result.id}.name`)
              push(result.success
                ? t('ascend.success', { name: gear })
                : t('ascend.fail', { cost: formatNumber(result.cost || 0, locale) }),
              result.success ? 'achievement' : 'error')
            }
            if (action === 'rebirth' && result.ok) {
              push(t('rebirth.done', {
                lives: result.lives,
                coins: formatNumber(result.coins || 0, locale),
                damage: result.bonus ? result.bonus.damage : 0,
                xp: result.bonus ? result.bonus.xp : 0,
              }), 'achievement')
            }
            if (action === 'synthesize-gear' && result.gained) {
              const parts = [t('synth.result', { name: t(`gear.${result.gained}.name`) })]
              if (result.refund > 0) parts.push(t('synth.refund', { coins: formatNumber(result.refund, locale) }))
              push(parts.join(' · '), 'achievement')
            }
            return true
          } catch (error) {
            push(t(error?.message === 'action-in-flight' ? 'toast.error.unknown' : 'toast.error.network'), 'error')
            return false
          } finally {
            setBusy(null)
          }
        }

        const onRename = async name => {
          const ok = await runAction('rename', 'rename', { name })
          if (ok) push(t('toast.titleChanged'), 'success')
          return ok
        }

        const onClaimBoss = kind => {
          const action = kind === 'daily' ? 'claim-daily-boss' : kind === 'season' ? 'claim-season-boss' : 'claim-boss'
          return runAction(action, action)
        }

        const onOpenFrames = () => {
          setTab('gear')
          setGearPicker('frame')
        }

        if (!data || !data.gear || !data.chests || !data.season || !data.weeklyBoss) {
          return h(React.Fragment, null,
            h(Style),
            h('div', { className: 'dq-root' },
              h('div', { className: 'dq-page' },
                h('div', { className: 'dq-loading' },
                  h('div', { className: 'dq-skeleton dq-loading-line' }),
                  h('div', { className: 'dq-skeleton dq-loading-block' }),
                  h('div', { className: 'dq-loading', style: { padding: 0, alignItems: 'center', color: 'var(--dsw-alias-label-secondary)' } }, snapshot.status === 'error' ? t('page.error') : t('page.loading')),
                  snapshot.status === 'error' ? h('button', { type: 'button', className: 'dq-btn', onClick: () => store.refresh() }, t('page.retry')) : null))))
        }

        const claimable = [
          ...data.daily.challenges,
          ...data.weekly.challenges,
        ].filter(item => item.complete && !item.claimed).length
          + [data.dailyBoss, data.weeklyBoss, data.season.boss].filter(boss => boss.defeated && !boss.claimed).length
          + data.season.tiers.filter(tier => tier.complete && !tier.claimed).length

        const tabLabels = {
          overview: t('tab.overview'),
          quests: t('tab.quests'),
          gear: t('tab.gear'),
          bosses: t('tab.bosses'),
          achievements: t('tab.achievements'),
          shop: t('tab.shop'),
          chronicle: t('tab.chronicle'),
        }

        return h(React.Fragment, null,
          h(Style),
          h('div', { className: 'dq-root' },
            h('div', { className: 'dq-page' },
              h('header', { className: 'dq-topbar' },
                h('div', { className: 'dq-brandline' },
                  h('div', { className: 'dq-brandmark' }, h(QuestMark, { size: 24, active: true })),
                  h('div', null,
                    h('div', { className: 'dq-kicker' }, t('page.eyebrow')),
                    h('div', { className: 'dq-brandtitle' }, t('page.title')))),
                h('div', { className: 'dq-actions' },
                  h('button', { type: 'button', className: 'dq-back', onClick: () => ctx.layout.selectPanel(null) }, `← ${t('page.back')}`))),
              snapshot.status === 'stale' ? h('div', { className: 'dq-offline' }, h('span', null, '●'), t('page.offline')) : null,
              h(Hero, {
                data,
                t,
                locale,
                busy,
                moments,
                onRename,
                onOpenFrames,
                onRebirth: () => runAction('rebirth', 'rebirth'),
              }),
              h('nav', { className: 'dq-tabs', role: 'tablist', 'aria-label': t('nav.subtitle') },
                TABS.map(item => h('button', {
                  key: item.id,
                  type: 'button',
                  role: 'tab',
                  'aria-selected': tab === item.id,
                  tabIndex: tab === item.id ? 0 : -1,
                  className: 'dq-tab',
                  onClick: () => setTab(item.id),
                },
                h('span', { className: 'dq-tab-glyph', 'aria-hidden': true }, item.glyph),
                tabLabels[item.id]))),
              tab === 'overview' ? h(Overview, {
                data,
                t,
                locale,
                now,
                busy,
                claimable,
                moments,
                onTab: setTab,
                onClaim: (period, id) => runAction(`claim:${period}:${id}`, 'claim-challenge', { period, id }),
                onLottery: () => runAction('lottery', 'lottery'),
                onOpenChest: () => runAction('open-chest', 'open-chest'),
                onClaimBoss,
                onClaimAll: () => runAction('claim-all', 'claim-all'),
              }) : null,
              tab === 'quests' ? h(QuestsTab, {
                data,
                t,
                locale,
                now,
                busy,
                claimable,
                onClaim: (period, id) => runAction(`claim:${period}:${id}`, 'claim-challenge', { period, id }),
                onClaimAll: () => runAction('claim-all', 'claim-all'),
                onClaimBoss: () => runAction('claim-boss', 'claim-boss'),
              }) : null,
              tab === 'gear' ? h(GearTab, {
                data,
                t,
                locale,
                busy,
                picker: gearPicker,
                setPicker: setGearPicker,
                onOpenChest: () => runAction('open-chest', 'open-chest'),
                onEquipGear: id => runAction(`equip-gear:${id}`, 'equip-gear', { id }).then(ok => {
                  if (ok) push(t('gear.equipSuccess', { name: t(`gear.${id}.name`) }), 'success')
                  return ok
                }),
                onEnhance: id => runAction(`enhance:${id}`, 'enhance-gear', { id }).then(ok => {
                  if (ok) push(t('enhance.success', { name: t(`gear.${id}.name`) }), 'success')
                  return ok
                }),
                onAscend: id => runAction(`ascend:${id}`, 'ascend-gear', { id }),
                onSynthesize: (rarity, slot) => runAction(`synth:${slot}:${rarity}`, 'synthesize-gear', { rarity, slot }).then(ok => {
                  if (ok) setGearPicker(slot)
                  return ok
                }),
              }) : null,
              tab === 'bosses' ? h(BossesTab, {
                data,
                t,
                locale,
                now,
                busy,
                moments,
                onClaimDaily: () => runAction('claim-daily-boss', 'claim-daily-boss'),
                onClaimWeekly: () => runAction('claim-boss', 'claim-boss'),
                onClaimSeason: () => runAction('claim-season-boss', 'claim-season-boss'),
                onClaimTier: id => runAction(`season-tier:${id}`, 'claim-season-tier', { id }),
                onClaimBoss,
              }) : null,
              tab === 'achievements' ? h(AchievementsTab, {
                data,
                t,
                locale,
                busy,
                filter,
                setFilter,
                onClaimRed: () => runAction('claim-red', 'claim-red-gear'),
              }) : null,
              tab === 'shop' ? h(ShopTab, {
                data,
                t,
                locale,
                busy,
                onBuy: id => runAction(`buy:${id}`, 'buy-title', { id }).then(ok => {
                  if (ok) push(t('shop.buySuccess', { title: t(`title.${id}.name`) }), 'success')
                  return ok
                }),
                onEquip: id => runAction(`equip:${id}`, 'equip-title', { id }).then(ok => {
                  if (ok) push(t('shop.equipSuccess', { title: t(`title.${id}.name`) }), 'success')
                  return ok
                }),
                onBuyGear: id => runAction(`buy-gear:${id}`, 'buy-gear', { id }).then(ok => {
                  if (ok) push(t('toast.gearBought', { name: t(`gear.${id}.name`) }), 'success')
                  return ok
                }),
                onEquipGear: id => runAction(`equip-gear:${id}`, 'equip-gear', { id }).then(ok => {
                  if (ok) push(t('gear.equipSuccess', { name: t(`gear.${id}.name`) }), 'success')
                  return ok
                }),
                onBuyChest: tier => runAction(`buy-chest:${tier}`, 'buy-chest', { tier }).then(ok => {
                  if (ok) push(t('toast.chestBought', { tier: t(`chest.tier.${tier}`) }), 'success')
                  return ok
                }),
              }) : null,
              tab === 'chronicle' ? h(ChronicleTab, { data, t, locale, now }) : null,
              celebration ? h(LevelUpCelebration, {
                level: celebration.level,
                gain: celebration.gain,
                t,
                onClose: () => setCelebration(null),
              }) : null,
              h(ToastStack, { items: toasts, dismiss }))))
      }

      function Hero({ data, t, locale, busy, moments = {}, onRename, onOpenFrames, onRebirth }) {
        const player = data.player
        const [editing, setEditing] = React.useState(false)
        const [draft, setDraft] = React.useState(player.name)
        const inputRef = React.useRef(null)
        const title = t(`title.${player.equippedTitle}.name`)
        const classMeta = CLASS_META[player.class.id] || CLASS_META.novice

        React.useEffect(() => {
          if (!editing) setDraft(player.name)
        }, [player.name, editing])
        React.useEffect(() => {
          if (editing && inputRef.current) inputRef.current.focus()
        }, [editing])

        const commit = async () => {
          const name = draft.trim()
          if (!name || name.length > 20) return
          const ok = await onRename(name)
          if (ok) setEditing(false)
        }

        const [rebirthArmed, setRebirthArmed] = React.useState(false)
        const rebirthReady = player.level >= player.maxLevel && player.paragon && player.paragon.capped

        return h('section', { className: 'dq-hero', 'data-frame': player.equippedFrame || 'f.novice', 'data-frarity': FRAME_RARITY[player.equippedFrame || 'f.novice'] || 'common' },
          h('div', { className: 'dq-hero-grid' },
            h('div', { className: 'dq-hero-identity' },
              h('div', { className: 'dq-crest-wrap' },
                h(Crest, {
                  key: player.equippedFrame || 'f.novice',
                  level: player.level,
                  frame: player.equippedFrame,
                  percent: player.xpPercent,
                  gems: player.rebirths || 0,
                  label: `${t('hero.level', { level: player.level })} · ${t(`gear.${player.equippedFrame}.name`)}`,
                }),
                h('button', {
                  type: 'button',
                  className: 'dq-frame-caption',
                  title: t('gear.frameChange'),
                  onClick: onOpenFrames,
                },
                h('span', { 'aria-hidden': true }, GEAR_SLOT_META.frame.glyph),
                t(`gear.${player.equippedFrame}.name`))),
              h('div', { className: 'dq-hero-copy' },
                editing
                  ? h('div', { className: 'dq-rename' },
                    h('input', {
                      ref: inputRef,
                      className: 'dq-name-input',
                      value: draft,
                      maxLength: 20,
                      'aria-label': t('page.editName'),
                      onChange: event => setDraft(event.target.value),
                      onKeyDown: event => {
                        if (event.key === 'Enter') commit()
                        if (event.key === 'Escape') setEditing(false)
                      },
                    }),
                    h('button', { type: 'button', className: 'dq-btn primary', disabled: Boolean(busy), onClick: commit }, t('page.renameSave')),
                    h('button', { type: 'button', className: 'dq-btn ghost', onClick: () => setEditing(false) }, t('page.renameCancel')))
                  : h('div', { className: 'dq-name-row' },
                    h('div', { className: 'dq-hero-name', title: player.name }, player.name),
                    h('button', {
                      type: 'button',
                      className: 'dq-icon-btn',
                      title: t('page.editName'),
                      'aria-label': t('page.editName'),
                      onClick: () => setEditing(true),
                    }, '✎')),
                h('div', { className: 'dq-title-pill' },
                  h('span', { className: 'dq-title-spark', 'aria-hidden': true }, '✦'),
                  h('span', null, title)),
                h('div', { className: 'dq-hero-class' },
                  h('span', { className: 'dq-chip dq-chip-class' },
                    h('span', { 'aria-hidden': true }, classMeta.glyph),
                    h('b', null, t(`class.${player.class.id}.name`)),
                    h('span', { className: 'dq-chip-tier' }, t(`class.tier.${player.class.tier}`))),
                  h('span', { className: 'dq-chip dq-chip-season' },
                    h('span', { 'aria-hidden': true }, SEASON_THEME_META[data.season.theme]?.glyph || '✦'),
                    t('season.label', {
                      number: data.season.number,
                      theme: t(`season.theme.${data.season.theme}`),
                    })),
                  h('span', { className: `dq-chip dq-chip-power${moments.powerUp ? ' is-up' : ''}` },
                    h('span', { 'aria-hidden': true }, '⚔'),
                    t('hero.gearPower', { power: player.gearPower }),
                    moments.powerUp
                      ? h('span', { key: `pw:${moments.powerUp}`, className: 'dq-power-pop' }, `+${moments.powerUp}`)
                      : null)))),
            player.rebirth && player.rebirth.lives > 0 || rebirthReady
              ? h('div', { className: 'dq-rebirth' },
                h('span', { className: 'dq-rebirth-badge' },
                  h('span', { 'aria-hidden': true }, '⟳'),
                  t('rebirth.lives', { lives: player.rebirth ? player.rebirth.lives : 0 })),
                player.rebirth && player.rebirth.lives > 0
                  ? h('span', { className: 'dq-rebirth-bonus' },
                    t('rebirth.bonus', {
                      damage: player.rebirth.damage,
                      xp: player.rebirth.xp,
                    }))
                  : null,
                rebirthReady
                  ? h('button', {
                    type: 'button',
                    className: `dq-btn ${rebirthArmed ? 'primary' : 'ghost'}`,
                    disabled: Boolean(busy),
                    onClick: () => {
                      if (!rebirthArmed) {
                        setRebirthArmed(true)
                        return
                      }
                      setRebirthArmed(false)
                      onRebirth()
                    },
                  }, rebirthArmed ? t('rebirth.confirm') : t('rebirth.ready'))
                  : null)
              : null,
            h('div', { className: 'dq-hero-progress' },
              h('div', { className: 'dq-progress-top' },
                h('span', { className: 'dq-progress-label' }, t('hero.xp', { current: formatNumber(player.xpIntoLevel, locale), next: formatNumber(player.xpForNext, locale) })),
                h('span', { className: 'dq-progress-value' }, `${player.xpPercent}%`)),
              h('div', {
                className: 'dq-meter',
                role: 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': player.xpPercent,
                'aria-label': t('hero.xp', { current: player.xpIntoLevel, next: player.xpForNext }),
              }, h('i', { style: { width: `${Math.max(2, Math.min(100, player.xpPercent))}%` } })),
              h('div', { className: 'dq-progress-foot' },
                h('span', null, player.level >= (player.maxLevel || 60)
                  ? t('paragon.toNext', { xp: formatNumber(Math.max(0, player.xpForNext - player.xpIntoLevel), locale) })
                  : t('hero.toNext', { xp: formatNumber(Math.max(0, player.xpForNext - player.xpIntoLevel), locale) })),
                h('span', null, player.level >= (player.maxLevel || 60)
                  ? t('hero.maxLevel')
                  : t('hero.level', { level: player.level })))),
            player.paragon && player.paragon.stars > 0
              ? h('div', { className: 'dq-paragon', 'data-capped': player.paragon.capped ? 'true' : 'false' },
                h('span', { className: 'dq-paragon-stars', 'aria-label': t('paragon.stars', { stars: player.paragon.stars }) },
                  '★'.repeat(player.paragon.stars),
                  h('span', { className: 'dq-paragon-cap' }, ` ${player.paragon.stars}/${player.paragon.max || 10}`)),
                h('span', { className: 'dq-paragon-label' },
                  player.paragon.capped
                    ? t('paragon.peak')
                    : t('paragon.line', { stars: player.paragon.stars, coins: formatNumber(300 + (player.paragon.stars + 1) * 100, locale) })))
              : null,
            h('div', { className: 'dq-hero-stats' },
              h(HeroStat, { label: t('hero.coins'), value: formatNumber(player.coins, locale), glyph: h(CoinIcon, { size: 11 }) }),
              h(HeroStat, { label: t('hero.streak'), value: t('hero.streakValue', { days: player.streak }), glyph: h(FlameIcon, { size: 11 }) }),
              h(HeroStat, { label: t('hero.achievements'), value: t('hero.achievementValue', { unlocked: player.unlockedCount, total: player.totalAchievements }), glyph: h('span', { 'aria-hidden': true }, '✦') }),
              h(HeroStat, { label: t('hero.chests'), value: t('hero.chestValue', { count: data.chests.count }), glyph: h('span', { 'aria-hidden': true }, '▣') }))))
      }

      function HeroStat({ label, value, glyph }) {
        return h('div', { className: 'dq-hero-stat' },
          h('div', { className: 'dq-hero-stat-label' }, glyph, h('span', null, label)),
          h('div', { className: 'dq-hero-stat-value' }, value))
      }

      function Overview({ data, t, locale, now, busy, claimable, moments, onTab, onClaim, onLottery, onOpenChest, onClaimBoss, onClaimAll }) {
        const player = data.player
        const completed = data.daily.challenges.filter(item => item.claimed).length
        const latest = Object.entries(player.achievements)
          .sort((left, right) => Number(right[1]?.at || 0) - Number(left[1]?.at || 0))
          .slice(0, 3)
        const dailyRows = data.daily.challenges.map(challenge => h(QuestRow, {
          key: challenge.id,
          challenge,
          period: 'daily',
          t,
          busy,
          onClaim,
        }))
        const recentCards = latest.map(([id, value]) => {
          const meta = ACHIEVEMENT_BY_ID[id] || { rarity: 'common', glyph: '✦' }
          return h('div', { key: id, className: 'dq-ach', 'data-rarity': meta.rarity, style: { minHeight: 112 } },
            h('div', { className: 'dq-ach-top' },
              h('div', { className: 'dq-ach-icon' }, meta.glyph),
              h('div', null,
                h('div', { className: 'dq-ach-name' }, t(`ach.${id}.name`)),
                h('div', { className: 'dq-rarity' }, t(`ach.rarity.${meta.rarity}`)))),
            h('div', { className: 'dq-ach-desc' }, t(`ach.${id}.desc`)),
            h('div', { className: 'dq-ach-foot' },
              h('span', null, t('ach.unlockedAt', { time: formatDateTime(value?.at, locale) }))))
        })

        return h('div', { className: 'dq-overview' },
          h(BattleArena, { data, t, locale, moments, busy, onClaim: onClaimBoss }),
          h('div', { className: 'dq-stack' },
            h('section', { className: 'dq-card' },
              h('div', { className: 'dq-card-head' },
                h('div', null,
                  h('div', { className: 'dq-card-title' },
                    h('span', { className: 'dq-card-title-glyph' }, '⚑'),
                    t('overview.quests')),
                  h('div', { className: 'dq-card-sub' }, t('overview.questsHint'))),
                h('div', { className: 'dq-actions' },
                  claimable ? h('button', { type: 'button', className: 'dq-btn primary', disabled: Boolean(busy), onClick: onClaimAll }, t('quests.claimAll')) : null,
                  h('button', { type: 'button', className: 'dq-text-btn', onClick: () => onTab('quests') }, t('overview.openQuests')))),
              h('div', { className: 'dq-card-sub', style: { marginBottom: 7 } },
                t('overview.progress', { done: completed, total: data.daily.challenges.length })),
              h('div', { className: 'dq-quest-list' }, dailyRows)),
            h('section', { className: 'dq-card' },
              h('div', { className: 'dq-card-head' },
                h('div', null,
                  h('div', { className: 'dq-card-title' },
                    h('span', { className: 'dq-card-title-glyph' }, '≡'),
                    t('overview.activity')),
                  h('div', { className: 'dq-card-sub' }, t('overview.activityHint'))),
                h('button', { type: 'button', className: 'dq-text-btn', onClick: () => onTab('chronicle') }, t('overview.openChronicle'))),
              data.activity.length
                ? h('div', { className: 'dq-activity' }, data.activity.slice(0, 6).map(entry => h(ActivityRow, { key: entry.id, entry, t, locale })))
                : h('div', { className: 'dq-empty' }, t('overview.emptyActivity'))),
            h('section', { className: 'dq-card' },
              h('div', { className: 'dq-card-head' },
                h('div', null,
                  h('div', { className: 'dq-card-title' },
                    h('span', { className: 'dq-card-title-glyph' }, '♟'),
                    t('overview.party')),
                  h('div', { className: 'dq-card-sub' }, t('overview.partyHint')))),
              data.party.length
                ? h('div', { className: 'dq-party' }, data.party.map(member => h(PartyRow, { key: member.id, member, t, locale })))
                : h('div', { className: 'dq-empty' }, t('overview.partyEmpty'))),
            h('section', { className: 'dq-card' },
              h('div', { className: 'dq-card-head' },
                h('div', null,
                  h('div', { className: 'dq-card-title' },
                    h('span', { className: 'dq-card-title-glyph' }, '✦'),
                    t('overview.recentAchievements')))),
              recentCards.length ? h('div', { className: 'dq-ach-grid' }, recentCards) : h('div', { className: 'dq-empty' }, t('overview.noAchievements')))),
          h('aside', { className: 'dq-stack' },
            h(ClassCard, { player, t }),
            h(ChestCard, { data, t, locale, busy, onOpenChest, compact: true }),
            h(BossOverviewCard, { data, t, now, onOpenBosses: () => onTab('bosses') }),
            h(LotteryCard, { data, t, busy, onLottery }),
            h('section', { className: 'dq-card' },
              h('div', { className: 'dq-card-head' },
                h('div', null,
                  h('div', { className: 'dq-card-title' },
                    h('span', { className: 'dq-card-title-glyph' }, '◫'),
                    t('overview.stats')))),
              h(StatsGrid, { stats: player.stats, t, locale }))))
      }

      function QuestsTab({ data, t, locale, now, busy, claimable, onClaim, onClaimAll, onClaimBoss }) {
        return h('div', { className: 'dq-stack' },
          h('div', { className: 'dq-actions', style: { justifyContent: 'flex-end' } },
            h('div', { style: { marginRight: 'auto', color: 'var(--dsw-alias-label-secondary)', fontSize: 11 } },
              data.daily.challenges.filter(item => item.complete && !item.claimed).length + data.weekly.challenges.filter(item => item.complete && !item.claimed).length
                ? t('quests.complete')
                : t('quests.incomplete')),
            claimable ? h('button', { type: 'button', className: 'dq-btn primary lg', disabled: Boolean(busy), onClick: onClaimAll }, t('quests.claimAll')) : null),
          h(SeasonCard, { kind: 'daily', season: data.daily, t, locale, now, busy, onClaim }),
          h(SeasonCard, { kind: 'weekly', season: data.weekly, t, locale, now, busy, onClaim }))
      }

      function SeasonCard({ kind, season, t, locale, now, busy, onClaim }) {
        const completed = season.challenges.filter(item => item.claimed).length
        return h('section', { className: 'dq-card' },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' }, h('span', { className: 'dq-card-title-glyph' }, kind === 'daily' ? '☀' : '♛'), t(`quests.${kind}`)),
              h('div', { className: 'dq-card-sub' }, t(`quests.${kind}Hint`, { time: formatDuration(season.endsAt - now, t) }))),
            h('span', { className: 'dq-chip xp' }, t('overview.progress', { done: completed, total: season.challenges.length }))),
          h('div', { className: 'dq-quest-list' },
            season.challenges.map(challenge => h(QuestRow, {
              key: challenge.id,
              challenge,
              period: kind,
              t,
              busy,
              onClaim,
            }))))
      }

      function QuestRow({ challenge, period, t, busy, onClaim }) {
        const progress = challenge.claimed ? challenge.target : Math.min(challenge.progress, challenge.target)
        const percent = Math.max(0, Math.min(100, (progress / challenge.target) * 100))
        const claimKey = `claim:${period}:${challenge.id}`
        return h('div', { className: `dq-quest${challenge.claimed ? ' is-claimed' : ''}` },
          h('div', { className: 'dq-quest-icon', 'aria-hidden': true }, CHALLENGE_GLYPHS[challenge.id] || '◇'),
          h('div', { className: 'dq-quest-main' },
            h('div', { className: 'dq-quest-top' },
              h('span', { className: 'dq-quest-name' }, t(`q.${challenge.id}.name`)),
              h('span', { className: 'dq-chip xp' }, `+${challenge.xp} XP`),
              h('span', { className: 'dq-chip coins' }, `+${challenge.coins}`)),
            h('div', { className: 'dq-quest-desc' }, t(`q.${challenge.id}.desc`, { target: challenge.target })),
            h('div', { className: 'dq-quest-progress' },
              h('div', {
                className: 'dq-bar',
                role: 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': challenge.target,
                'aria-valuenow': progress,
                'aria-label': `${t(`q.${challenge.id}.name`)} ${progress}/${challenge.target}`,
              }, h('i', { style: { width: `${percent}%` } })),
              h('span', { className: 'dq-count' }, t('quests.progress', { current: progress, target: challenge.target })))),
          h('div', { className: 'dq-quest-side' },
            challenge.claimed
              ? h('span', { className: 'dq-status done' }, '✓ ', t('quests.claimed'))
              : challenge.complete
                ? h('button', {
                  type: 'button',
                  className: 'dq-btn primary',
                  disabled: Boolean(busy),
                  onClick: () => onClaim(period, challenge.id),
                }, busy === claimKey ? '…' : t('quests.claim'))
                : h('span', { className: 'dq-status' }, t('quests.incomplete'))))
      }

      function BossCard({ kind, boss, t, now, busy, onClaim }) {
        const meta = BOSS_META[boss.bossId] || BOSS_META.ashen
        const percent = boss.maxHp ? Math.round((boss.hp / boss.maxHp) * 100) : 0
        const busyKey = kind === 'daily' ? 'claim-daily-boss' : kind === 'season' ? 'claim-season-boss' : 'claim-boss'
        const reward = boss.reward || {}
        const rewardExtras = []
        if (reward.chest) rewardExtras.push(t(`chest.tier.${reward.chest}`))
        if (reward.gear) rewardExtras.push(t(`gear.${reward.gear}.name`))
        if (reward.frame) rewardExtras.push(t(`gear.${reward.frame}.name`))
        if (reward.title) rewardExtras.push(t(`title.${reward.title}.name`))
        return h('section', { className: `dq-card dq-boss-card${kind === 'season' ? ' is-season-boss' : ''}` },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' },
                h('span', { className: 'dq-card-title-glyph' }, meta.glyph),
                t(`boss.kind.${kind}`)),
              h('div', { className: 'dq-card-sub' },
                t(`boss.kindHint.${kind}`),
                ' · ',
                t('boss.remaining', { time: formatDuration(boss.endsAt - now, t) }))),
            h('span', { className: `dq-chip${boss.defeated ? '' : ' xp'}` }, boss.defeated ? t('boss.defeated') : t('boss.alive'))),
          h('div', { className: 'dq-boss-body' },
            h('div', { className: `dq-boss-art${boss.defeated ? ' is-defeated' : ''}` },
              h(BossSigil, { size: 54 }),
              h('span', { className: 'dq-boss-pct' }, `${percent}%`)),
            h('div', null,
              h('div', { className: 'dq-boss-name' }, t(`boss.${boss.bossId}.name`)),
              h('div', { className: 'dq-boss-lore' }, t(`boss.${boss.bossId}.lore`)),
              h('div', {
                className: `dq-meter dq-boss-hp${boss.defeated ? ' is-defeated' : ''}`,
                role: 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': boss.maxHp,
                'aria-valuenow': boss.hp,
                'aria-label': t('boss.hp', { hp: boss.hp, max: boss.maxHp }),
              }, h('i', { style: { width: `${Math.max(boss.defeated ? 100 : 2, percent)}%` } })),
              h('div', { className: 'dq-boss-meta' },
                h('span', null, t('boss.hp', { hp: formatNumber(boss.hp, localeTag()), max: formatNumber(boss.maxHp, localeTag()) })),
                h('span', null, t('boss.damage', { damage: formatNumber(boss.damage, localeTag()) }))))),
          h('div', { className: 'dq-boss-foot' },
            h('div', { className: 'dq-boss-reward' },
              h('b', null, t('boss.rewardLine', { xp: reward.xp || 0, coins: reward.coins || 0 })),
              rewardExtras.length ? ` · ${rewardExtras.join(' · ')}` : ''),
            boss.defeated
              ? (boss.claimed
                ? h('span', { className: 'dq-status done' }, '✓ ', t('boss.claimed'))
                : h('button', { type: 'button', className: 'dq-btn primary', disabled: Boolean(busy), onClick: onClaim }, busy === busyKey ? '…' : t('boss.claim')))
              : h('span', { className: 'dq-status' }, t('boss.alive'))))
      }

      function BossOverviewCard({ data, t, now, onOpenBosses }) {
        const bosses = [
          ['daily', data.dailyBoss],
          ['weekly', data.weeklyBoss],
          ['season', data.season.boss],
        ]
        return h('section', { className: 'dq-card' },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' },
                h('span', { className: 'dq-card-title-glyph' }, '♛'),
                t('overview.bosses')),
              h('div', { className: 'dq-card-sub' }, t('overview.bossesHint'))),
            h('button', { type: 'button', className: 'dq-text-btn', onClick: onOpenBosses }, t('overview.openBosses'))),
          h('div', { className: 'dq-boss-list' },
            bosses.map(([kind, boss]) => {
              const percent = boss.maxHp ? Math.round((boss.hp / boss.maxHp) * 100) : 0
              return h('button', {
                key: kind,
                type: 'button',
                className: 'dq-boss-row',
                onClick: onOpenBosses,
              },
              h('span', { className: 'dq-boss-row-icon', 'aria-hidden': true }, BOSS_META[boss.bossId]?.glyph || '♛'),
              h('span', { className: 'dq-boss-row-main' },
                h('span', { className: 'dq-boss-row-name' }, t(`boss.${boss.bossId}.name`)),
                h('span', { className: 'dq-boss-row-kind' }, t(`boss.kind.${kind}`))),
              h('span', { className: 'dq-boss-row-hp' }, boss.defeated ? t('boss.defeated') : `${percent}%`))
            })))
      }

      function ChestCard({ data, t, locale, busy, onOpenChest, compact = false }) {
        const chests = data.chests
        const percent = Math.min(100, Math.round((chests.progress / chests.perChest) * 100))
        const tier = chests.nextTier
        const last = chests.last
        return h('section', { className: 'dq-card dq-chest-card' },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' },
                h('span', { className: 'dq-card-title-glyph' }, '▣'),
                t('chest.title')),
              h('div', { className: 'dq-card-sub' }, t('chest.subtitle', { lines: chests.perChest })))),
          h('div', { className: 'dq-chest-body' },
            h('div', { className: 'dq-chest-art', 'data-tier': tier },
              h('span', { className: 'dq-chest-glyph', 'aria-hidden': true }, CHEST_META[tier]?.glyph || '▣'),
              h('span', { className: 'dq-chest-count' }, `×${chests.count}`)),
            h('div', { className: 'dq-chest-main' },
              h('div', { className: 'dq-chest-progress-label' },
                h('span', null, t('chest.progress', { current: formatNumber(chests.progress, locale), next: formatNumber(chests.perChest, locale) })),
                h('span', null, t('chest.next', { tier: t(`chest.tier.${tier}`) }))),
              h('div', { className: 'dq-meter dq-chest-meter', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': chests.perChest, 'aria-valuenow': chests.progress, 'aria-label': t('chest.progress', { current: chests.progress, next: chests.perChest }) },
                h('i', { style: { width: `${Math.max(2, percent)}%` } })),
              h('div', { className: 'dq-chest-meta' },
                h('span', null, t('chest.totalLines', { lines: formatNumber(chests.totalLines, locale) })),
                h('span', null, t('chest.opened', { count: chests.opened }))),
              compact ? null : (last
                ? h('div', { className: 'dq-chest-last' },
                  h('span', { className: 'dq-chest-last-label' }, t('chest.last')),
                  h('span', null, t(`chest.tier.${last.tier}`), ' · ', t('chest.coins', { coins: last.coins }), ' · ', t('chest.xp', { xp: last.xp })))
                : null))),
          h('div', { className: 'dq-chest-foot' },
            h('span', { className: 'dq-chest-stock' }, t('chest.count', { count: chests.count })),
            h('button', {
              type: 'button',
              className: 'dq-btn primary',
              disabled: Boolean(busy) || chests.count < 1,
              onClick: onOpenChest,
            }, busy === 'open-chest' ? '…' : t('chest.open'))))
      }

      function GearTab({ data, t, locale, busy, picker, setPicker, onOpenChest, onEquipGear, onEnhance, onAscend, onSynthesize }) {
        const gear = data.gear
        const player = data.player
        const itemById = Object.fromEntries(gear.items.map(item => [item.id, item]))
        const [synthSlot, setSynthSlot] = React.useState('weapon')
        const owned = gear.items.filter(item => item.owned)
        const slots = ['weapon', 'armor', 'charm', 'frame']
        const active = slots.includes(picker) ? picker : 'weapon'
        const options = gear.items.filter(item => item.slot === active)
        return h('div', { className: 'dq-stack' },
          h('section', { className: 'dq-card' },
            h('div', { className: 'dq-card-head' },
              h('div', null,
                h('div', { className: 'dq-card-title' },
                  h('span', { className: 'dq-card-title-glyph' }, '⚒'),
                  t('gear.title')),
                h('div', { className: 'dq-card-sub' }, t('gear.subtitle'))),
              h('div', { className: 'dq-gear-power' },
                h('span', { className: 'dq-gear-power-label' }, t('gear.power')),
                h('strong', null, formatNumber(gear.power, locale)))),
            h('div', { className: 'dq-gear-body' },
              h('div', {
                className: 'dq-doll',
                'data-frame': player.equippedFrame || 'f.novice',
                'data-frarity': FRAME_RARITY[player.equippedFrame || 'f.novice'] || 'common',
                'data-weapon': itemById[gear.equipped.weapon]?.rarity || 'common',
                'data-armor': itemById[gear.equipped.armor]?.rarity || 'common',
                style: { '--armor-tone': (ARMOR_LOOK[gear.equipped.armor] || ARMOR_LOOK['a.novice']).chest },
                title: t(`gear.${player.equippedFrame || 'f.novice'}.name`),
              },
              h('span', { className: 'dq-doll-ring', 'aria-hidden': true }),
              h('span', {
                className: 'dq-doll-aura',
                'data-tone': (() => {
                  const equipped = ['weapon', 'armor', 'charm', 'frame']
                    .map(slot => itemById[gear.equipped[slot]])
                    .filter(Boolean)
                  return equipped.reduce((best, item) =>
                    (RARITY_ORDER[item.rarity] || 0) > (RARITY_ORDER[best] || 0) ? item.rarity : best, 'common')
                })(),
                'aria-hidden': true,
              }),
              h('div', { className: 'dq-doll-sprite' },
                h(HeroFigure, { gear: data.gear, className: 'dq-doll-px' })),
              h('div', { className: 'dq-doll-loadout' },
                slots.map(slot => {
                  const item = itemById[gear.equipped[slot]]
                  if (!item) return null
                  return h('span', {
                    key: slot,
                    className: 'dq-doll-gear',
                    'data-rarity': item.rarity,
                    title: `${t(`gear.${slot}`)} · ${t(`gear.${item.id}.name`)}`,
                  },
                  slot === 'frame'
                    ? h(Crest, { level: player.level, frame: gear.equipped.frame, size: 'mini', gems: player.rebirths || 0 })
                    : h(GearIcon, { id: item.id, slot: item.slot, rarity: item.rarity }))
                })),
              h('span', { className: 'dq-doll-meta' },
                h('b', null, `Lv.${player.level}`),
                h('span', null, t(`gear.${player.equippedFrame || 'f.novice'}.name`)))),
              h('div', { className: 'dq-gear-slots' },
                slots.map(slot => {
                const item = itemById[gear.equipped[slot]]
                const meta = GEAR_SLOT_META[slot]
                return h('button', {
                  key: slot,
                  type: 'button',
                  className: `dq-gear-slot${active === slot ? ' is-open' : ''}`,
                  'data-slot': slot,
                  'data-rarity': item?.rarity || 'common',
                  'data-signature': item?.signature ? 'true' : 'false',
                  'aria-expanded': active === slot,
                  'aria-label': t('gear.changeSlot', { slot: t(`gear.${slot}`) }),
                  onClick: () => setPicker(slot),
                },
                h('span', { className: 'dq-gear-slot-icon', 'aria-hidden': true },
                  slot === 'frame'
                    ? h(Crest, { level: player.level, frame: gear.equipped.frame, size: 'mini' })
                    : item
                      ? h(GearIcon, { id: item.id, slot: item.slot, rarity: item.rarity })
                      : h('span', { className: 'dq-slot-empty' }, meta.glyph)),
                h('span', { className: 'dq-gear-slot-text' },
                  h('span', { className: 'dq-gear-slot-label' }, t(`gear.${slot}`)),
                  h('span', { className: 'dq-gear-slot-name' },
                    item ? t(`gear.${item.id}.name`) : t('gear.empty'),
                    item?.signature ? h('b', { className: 'dq-sig', 'aria-hidden': true }, '★') : null),
                  h('span', { className: `dq-rarity dq-rarity-${item?.rarity || 'common'}` },
                    item ? t(`ach.rarity.${item.rarity}`) : '—'),
                  h('span', { className: 'dq-gear-slot-edit' }, t('gear.change'))))
              }))),
            h('div', { className: 'dq-enhance' },
              h('div', { className: 'dq-enhance-head' },
                h('span', { className: 'dq-enhance-title' }, h('span', { 'aria-hidden': true }, '⚡'), t('enhance.title')),
                h('span', { className: 'dq-enhance-hint' }, t('enhance.hint', { max: gear.enhanceMax || 10 }))),
              ['weapon', 'armor', 'charm'].map(slot => {
                const item = itemById[gear.equipped[slot]]
                if (!item) return null
                const maxed = item.enhance >= (gear.enhanceMax || 100)
                return h('div', { key: slot, className: 'dq-enhance-row', 'data-rarity': item.rarity },
                  h('span', { className: 'dq-enhance-name' },
                    t(`gear.${item.id}.name`),
                    h('b', { className: 'dq-enhance-level' }, `+${item.enhance || 0}`),
                    item.ascend ? h('b', { className: 'dq-enhance-ascend' }, t('ascend.short', { tier: item.ascend })) : null),
                  h('span', { className: 'dq-enhance-power' }, formatNumber(item.powerNow ?? item.power, locale)),
                  h('button', {
                    type: 'button',
                    className: 'dq-btn ghost',
                    title: maxed ? t('enhance.max') : t('enhance.button', { cost: formatNumber(item.enhanceCost || 0, locale) }),
                    disabled: Boolean(busy) || maxed || player.coins < (item.enhanceCost || 0),
                    onClick: () => onEnhance(item.id),
                  }, maxed ? t('enhance.max') : `⚡ ${formatNumber(item.enhanceCost || 0, locale)}`),
                  h('button', {
                    type: 'button',
                    className: 'dq-btn ghost dq-ascend-btn',
                    title: !item.ascendCost
                      ? t('ascend.max')
                      : t('ascend.button', { cost: formatNumber(item.ascendCost, locale), rate: item.ascendRate }),
                    disabled: Boolean(busy) || !item.ascendCost || player.coins < (item.ascendCost || 0),
                    onClick: () => onAscend(item.id),
                  }, !item.ascendCost ? '—' : `✦ ${item.ascendRate}%`))
              }))),
            h('div', { className: 'dq-enhance dq-synth' },
              h('div', { className: 'dq-enhance-head' },
                h('span', { className: 'dq-enhance-title' }, h('span', { 'aria-hidden': true }, '⚗'), t('synth.title')),
                h('span', { className: 'dq-enhance-hint' }, t('synth.hint'))),
              h('div', { className: 'dq-synth-tabs' },
                ['weapon', 'armor', 'charm', 'frame'].map(slot => h('button', {
                  key: slot,
                  type: 'button',
                  className: `dq-synth-tab${synthSlot === slot ? ' is-active' : ''}`,
                  onClick: () => setSynthSlot(slot),
                }, t(`gear.${slot}`)))),
              (() => {
                const pools = new Map()
                for (const item of gear.items) {
                  if (!item.owned || item.slot !== synthSlot) continue
                  const entry = pools.get(item.rarity) || { rarity: item.rarity, total: 0, pieces: 0 }
                  entry.total += item.count || 1
                  entry.pieces += 1
                  pools.set(item.rarity, entry)
                }
                const rows = [...pools.values()]
                  .sort((left, right) => (RARITY_ORDER[right.rarity] || 0) - (RARITY_ORDER[left.rarity] || 0))
                if (!rows.length) return h('div', { className: 'dq-synth-empty' }, t('synth.none'))
                return rows.map(row => h('div', { key: row.rarity, className: 'dq-enhance-row', 'data-rarity': row.rarity },
                  h('span', { className: 'dq-enhance-name' },
                    t(`ach.rarity.${row.rarity}`),
                    h('b', { className: 'dq-enhance-level' }, ` ×${row.total}`),
                    h('span', { className: 'dq-enhance-pieces' }, t('synth.pieces', { pieces: row.pieces }))),
                  h('span', { className: 'dq-enhance-power' },
                    NEXT_RARITY[row.rarity]
                      ? t('synth.next', { rarity: t(`ach.rarity.${NEXT_RARITY[row.rarity]}`), slot: t(`gear.${synthSlot}`) })
                      : t('synth.top')),
                  h('button', {
                    type: 'button',
                    className: 'dq-btn ghost',
                    disabled: Boolean(busy) || row.total < 5 || !NEXT_RARITY[row.rarity],
                    onClick: () => onSynthesize(row.rarity, synthSlot),
                  }, t('synth.button', { count: 5 }))))
              })(),
            h('div', { className: 'dq-picker' },
              h('div', { className: 'dq-picker-head' },
                h('span', { className: 'dq-picker-title' }, t('gear.pickTitle', { slot: t(`gear.${active}`) })),
                h('span', { className: 'dq-picker-hint' }, active === 'frame' ? t('gear.frameHint') : t('gear.pickHint'))),
              h('div', { className: 'dq-picker-grid' },
                options.map(item => h('button', {
                  key: item.id,
                  type: 'button',
                  className: 'dq-pick',
                  'data-rarity': item.rarity,
                  'data-equipped': item.equipped ? 'true' : 'false',
                  'aria-pressed': item.equipped,
                  disabled: !item.owned || Boolean(busy),
                  title: item.owned ? t(`gear.${item.id}.name`) : t('gear.pickLocked'),
                  onClick: () => {
                    if (!item.owned || item.equipped) return
                    onEquipGear(item.id)
                  },
                },
                item.slot === 'frame'
                  ? h(Crest, { level: player.level, frame: item.id, size: 'mini' })
                  : h('span', { className: 'dq-pick-glyph', 'aria-hidden': true },
                    h(GearIcon, { id: item.id, slot: item.slot, rarity: item.rarity })),
                h('span', { className: 'dq-pick-main' },
                  h('span', { className: 'dq-pick-name' },
                    t(`gear.${item.id}.name`),
                    item.owned && item.count > 1 ? h('b', { className: 'dq-pick-count' }, ` ×${item.count}`) : null),
                  h('span', { className: 'dq-pick-meta' },
                    h('span', { className: `dq-pick-rarity dq-rarity-${item.rarity}` }, t(`ach.rarity.${item.rarity}`)),
                    item.owned
                      ? (item.power ? ` · ${t('gear.powerBonus', { power: item.power })}` : ` · ${t('gear.cosmetic')}`)
                      : ` · ${t('gear.pickLocked')}`)),
                item.equipped ? h('span', { className: 'dq-pick-badge' }, '✓', t('gear.equipped')) : null))))),
          h(ChestCard, { data, t, locale, busy, onOpenChest }),
          h('section', { className: 'dq-card' },
            h('div', { className: 'dq-card-head' },
              h('div', null,
                h('div', { className: 'dq-card-title' },
                  h('span', { className: 'dq-card-title-glyph' }, '▣'),
                  t('gear.inventory')),
                h('div', { className: 'dq-card-sub' }, t('gear.inventoryHint')))),
            h('div', { className: 'dq-gear-grid' },
              owned.map(item => h('div', { key: item.id, className: 'dq-gear-item', 'data-rarity': item.rarity },
                h('div', { className: 'dq-gear-item-icon', 'aria-hidden': true },
                  item.slot === 'frame'
                    ? h(Crest, { level: player.level, frame: item.id, size: 'mini' })
                    : h(GearIcon, { id: item.id, slot: item.slot, rarity: item.rarity })),
                h('div', { className: 'dq-gear-item-main' },
                  h('div', { className: 'dq-gear-item-name' }, t(`gear.${item.id}.name`)),
                  h('div', { className: 'dq-gear-item-meta' },
                    t(`gear.${item.slot}`),
                    item.power ? ` · ${t('gear.powerBonus', { power: item.power })}` : '',
                    ' · ',
                    t(`ach.rarity.${item.rarity}`))),
                item.equipped
                  ? h('span', { className: 'dq-status done' }, '✓ ', t('gear.equipped'))
                  : h('button', { type: 'button', className: 'dq-btn', disabled: Boolean(busy), onClick: () => onEquipGear(item.id) }, t('gear.equip'))))))
        )
      }

      function BestiaryCard({ data, t }) {
        const pools = data.bossPools || {}
        const kinds = data.bossKinds || {}
        const active = {
          daily: data.dailyBoss.bossId,
          weekly: data.weeklyBoss.bossId,
          season: data.season.boss.bossId,
        }
        const all = ['daily', 'weekly', 'season']
        const total = all.reduce((sum, kind) => sum + (pools[kind] || []).length, 0)
        const slain = all.reduce((sum, kind) => sum + (pools[kind] || []).filter(id => kinds[id]).length, 0)
        return h('section', { className: 'dq-card dq-bestiary' },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' },
                h('span', { className: 'dq-card-title-glyph' }, '☠'),
                t('bestiary.title')),
              h('div', { className: 'dq-card-sub' }, t('bestiary.subtitle', { total, slain })))),
          all.map(kind => h('div', { key: kind, className: 'dq-bestiary-row' },
            h('span', { className: 'dq-bestiary-kind' }, t(`boss.kind.${kind}`)),
            h('div', { className: 'dq-bestiary-list' },
              (pools[kind] || []).map(id => h('span', {
                key: id,
                className: 'dq-bestiary-chip',
                'data-active': active[kind] === id ? 'true' : 'false',
                'data-slain': kinds[id] ? 'true' : 'false',
                title: t(`boss.${id}.lore`),
              },
              h('span', { 'aria-hidden': true }, BOSS_META[id]?.glyph || '♛'),
              t(`boss.${id}.name`),
              kinds[id] ? h('b', null, `×${kinds[id]}`) : null))))))
      }

      function StoryCard({ story, t, locale }) {
        if (!story) return null
        return h('section', { className: 'dq-card dq-story' },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' }, h('span', { className: 'dq-card-title-glyph' }, '⚔'), t('story.title')),
              h('div', { className: 'dq-card-sub' }, t('story.hint'))),
            h('span', { className: 'dq-story-stage' }, t('story.stage', { stage: story.stage }))),
          h('div', { className: 'dq-story-body' },
            h('span', { className: 'dq-story-boss' },
              h('span', { 'aria-hidden': true }, BOSS_META[story.bossId]?.glyph || '☠'),
              t(`boss.${story.bossId}.name`)),
            h('span', { className: 'dq-story-hp' },
              `${formatNumber(story.hp, locale)} / ${formatNumber(story.maxHp, locale)}`),
            h('div', { className: 'dq-story-meter' }, h('i', { style: { width: `${Math.max(0, Math.min(100, story.percent))}%` } })),
            h('div', { className: 'dq-story-foot' },
              h('span', null, t('story.reward', {
                coins: formatNumber(story.reward.coins, locale),
                xp: formatNumber(story.reward.xp, locale),
              })),
              h('span', null, t('story.next', {
                stage: story.next.stage,
                name: t(`boss.${story.next.bossId}.name`),
                hp: formatNumber(story.next.maxHp, locale),
              })))))
      }

      function BossesTab({ data, t, locale, now, busy, moments, onClaimDaily, onClaimWeekly, onClaimSeason, onClaimTier, onClaimBoss }) {
        const season = data.season
        return h('div', { className: 'dq-stack' },
          h(BattleArena, { data, t, locale, moments, busy, onClaim: onClaimBoss }),
          h('div', { className: 'dq-actions', style: { justifyContent: 'space-between', flexWrap: 'wrap' } },
            h('div', null,
              h('div', { className: 'dq-card-title' }, h('span', { className: 'dq-card-title-glyph' }, '♛'), t('boss.title')),
              h('div', { className: 'dq-card-sub' }, t('boss.subtitle'))),
            h('span', { className: 'dq-chip xp' }, t('season.label', { number: season.number, theme: t(`season.theme.${season.theme}`) }))),
          h('div', { className: 'dq-boss-grid' },
            h(BossCard, { kind: 'daily', boss: data.dailyBoss, t, now, busy, onClaim: onClaimDaily }),
            h(BossCard, { kind: 'weekly', boss: data.weeklyBoss, t, now, busy, onClaim: onClaimWeekly }),
            h(BossCard, { kind: 'season', boss: season.boss, t, now, busy, onClaim: onClaimSeason })),
          h(StoryCard, { story: data.story, t, locale }),
          h(BestiaryCard, { data, t }),
          h(SeasonPassCard, { season, t, locale, now, busy, onClaimTier }))
      }

      function SeasonPassCard({ season, t, locale, now, busy, onClaimTier }) {
        const rank = season.rank || { id: 'bronze', at: 0, next: null }
        const claimed = season.tiers.filter(tier => tier.claimed).length
        const rankGap = rank.next ? Math.max(0, rank.next.at - season.renown) : 0
        return h('section', { className: 'dq-card dq-season-pass' },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' },
                h('span', { className: 'dq-card-title-glyph' }, SEASON_THEME_META[season.theme]?.glyph || '✦'),
                t('season.pass')),
              h('div', { className: 'dq-card-sub' },
                t('season.remaining', { time: formatDuration(season.endsAt - now, t) }),
                ' · ',
                t('season.tierCount', { claimed, total: season.tiers.length }),
                season.previous ? ` · ${t('season.previous')}` : ''),
              h('div', { className: 'dq-season-rank', 'data-rank': rank.id },
                h('span', { className: 'dq-season-rank-label' }, t('season.rankLabel')),
                h('span', { className: 'dq-season-rank-badge' }, t(`season.rank.${rank.id}`)),
                h('span', { className: 'dq-season-rank-next' },
                  rank.next
                    ? t('season.rankNext', { rank: t(`season.rank.${rank.next.id}`), renown: formatNumber(rankGap, locale) })
                    : t('season.rankMax')))),
            h('div', { className: 'dq-season-renown' },
              h('span', null, t('season.renown')),
              h('strong', null, formatNumber(season.renown, locale)))),
          season.previous
            ? h('div', { className: 'dq-season-previous' },
              t('season.previousLine', {
                number: season.previous.number,
                theme: t(`season.theme.${season.previous.theme}`),
                renown: formatNumber(season.previous.renown, locale),
              }))
            : null,
          h('div', { className: 'dq-season-track' },
            season.tiers.map((tier, index) => {
              const percent = Math.min(100, Math.round((tier.progress / tier.target) * 100))
              const rewards = [`+${tier.xp} XP`, `+${tier.coins}`]
              if (tier.chest) {
                const count = Math.max(1, Number(tier.chestCount) || 1)
                rewards.push(`${t(`chest.tier.${tier.chest}`)}${count > 1 ? ` ×${count}` : ''}`)
              }
              if (tier.frame) rewards.push(t(`gear.${tier.frame}.name`))
              if (tier.gear) rewards.push(t(`gear.${tier.gear}.name`))
              if (tier.title) rewards.push(t(`title.${tier.title}.name`))
              return h('div', { key: tier.id, className: 'dq-season-tier', 'data-current': !tier.claimed && tier.complete ? 'true' : 'false' },
                h('div', { className: 'dq-season-tier-node', 'data-complete': tier.complete, 'data-claimed': tier.claimed },
                  h('span', null, index + 1)),
                h('div', { className: 'dq-season-tier-main' },
                  h('div', { className: 'dq-season-tier-top' },
                    h('span', { className: 'dq-season-tier-name' }, t('season.tier', { n: index + 1 })),
                    h('span', { className: 'dq-season-tier-target' }, t('season.progress', { current: formatNumber(tier.progress, locale), target: formatNumber(tier.target, locale) }))),
                  h('div', { className: 'dq-meter dq-season-meter' }, h('i', { style: { width: `${Math.max(2, percent)}%` } })),
                  h('div', { className: 'dq-season-rewards' }, rewards.join(' · '))),
                h('div', { className: 'dq-season-tier-action' },
                  tier.claimed
                    ? h('span', { className: 'dq-status done' }, '✓ ', t('season.claimed'))
                    : tier.complete
                      ? h('button', { type: 'button', className: 'dq-btn primary', disabled: Boolean(busy), onClick: () => onClaimTier(tier.id) }, busy === `season-tier:${tier.id}` ? '…' : t('season.claim'))
                      : h('span', { className: 'dq-status' }, t('season.locked'))))
            })))
      }

      function LotteryCard({ data, t, busy, onLottery }) {
        const lottery = data.lottery
        return h('section', { className: 'dq-card dq-lottery' },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' }, h('span', { className: 'dq-card-title-glyph' }, '✶'), t('lottery.title')),
              h('div', { className: 'dq-card-sub' }, t('lottery.subtitle')))),
          lottery.last
            ? h('div', { className: 'dq-lottery-result' }, h('span', { 'aria-hidden': true }, '✦'), h('div', null, h('div', { style: { fontSize: 10, color: 'var(--dsw-alias-label-secondary)' } }, t('lottery.result')), h('div', { style: { fontWeight: 600 } }, prizeText(lottery.last.prize, t))))
            : null,
          h('div', { className: 'dq-lottery-actions' },
            h('button', {
              type: 'button',
              className: `dq-btn ${lottery.available ? 'primary' : 'ghost'} lg`,
              disabled: !lottery.available || Boolean(busy),
              onClick: onLottery,
            }, busy === 'lottery' ? '…' : lottery.available ? t('lottery.button') : t('lottery.again')),
            h('span', { className: 'dq-lottery-note' }, lottery.available ? t('lottery.available') : t('lottery.resets', { time: formatDuration(lottery.resetsAt - Date.now(), t) }))))
      }

      const CLASS_TONE = {
        novice: '#b9a6ff',
        ranger: '#4fd1c5',
        artificer: '#f2c14e',
        scholar: '#7f9dff',
        commander: '#b07fff',
        debugger: '#6fd6a0',
      }
      const CLASS_TIER_NAMES = ['seed', 'walker', 'expert', 'master', 'grandmaster', 'legend', 'mythic', 'eternal']
      const NEXT_RARITY = { common: 'rare', rare: 'epic', epic: 'legendary', legendary: 'mythic', mythic: 'red', red: 'ancient', ancient: 'divine' }
      // Each rung gets its own colour so the ladder reads as a progression
      // rather than six identical dots.
      const CLASS_TIER_TONES = ['#6fd6a0', '#4fd1c5', '#7f9dff', '#b07fff', '#ff9a6b', '#f2c14e', '#ff7ad9', '#7cf0ff']

      function ClassCard({ player, t }) {
        const info = player.class
        const meta = CLASS_META[info.id] || CLASS_META.novice
        const scores = info.scores || {}
        const max = Math.max(1, ...Object.values(scores))
        const total = Math.max(1, CLASS_PATH_ORDER.reduce((sum, path) => sum + (scores[path] || 0), 0))
        const leader = CLASS_PATH_ORDER.reduce((best, path) => ((scores[path] || 0) > (scores[best] || 0) ? path : best), CLASS_PATH_ORDER[0])
        const tone = CLASS_TONE[info.id] || CLASS_TONE.scholar
        const tierTone = CLASS_TIER_TONES[info.tier] || CLASS_TIER_TONES[0]
        // Log scale: mastery is extremely lopsided (100k vs 2k), and both the
        // radar and the bars would collapse to a single spike on a linear one.
        const scale = value => Math.log1p(Math.max(0, value)) / Math.log1p(max)

        // Radar geometry: five axes, square-root radial scale so a runaway
        // leader does not flatten the other four onto the centre.
        const size = 132
        const mid = size / 2
        const radius = 47
        const angleFor = index => (Math.PI * 2 * index) / CLASS_PATH_ORDER.length - Math.PI / 2
        const at = (index, ratio) => {
          const angle = angleFor(index)
          return [mid + Math.cos(angle) * radius * ratio, mid + Math.sin(angle) * radius * ratio]
        }
        const ringPoints = ratio => CLASS_PATH_ORDER.map((_, index) => at(index, ratio).map(value => value.toFixed(1)).join(',')).join(' ')
        const shapePoints = CLASS_PATH_ORDER.map((path, index) => at(index, scale(scores[path] || 0)).map(value => value.toFixed(1)).join(',')).join(' ')

        return h('section', { className: 'dq-card dq-classcard', style: { '--class-tone': tone, '--tier-tone': tierTone } },
          h('div', { className: 'dq-card-head' },
            h('div', null,
              h('div', { className: 'dq-card-title' }, h('span', { className: 'dq-card-title-glyph' }, '✦'), t('class.title')),
              h('div', { className: 'dq-card-sub' }, t('overview.classHint')))),
          h('div', { className: 'dq-class-head' },
            h('div', { className: 'dq-class-glyph', 'data-path': info.id }, meta.glyph),
            h('div', { className: 'dq-class-copy' },
              h('div', { className: 'dq-class-name' },
                h('span', { className: 'dq-class-tiertext' }, t(`class.tier.${info.tier}`)),
                t(`class.${info.id}.name`)),
              h('div', { className: 'dq-tier-rail' },
                CLASS_TIER_NAMES.map((tier, index) => h('span', {
                  key: tier,
                  className: 'dq-tier-item',
                  'data-state': index < info.tier ? 'done' : index === info.tier ? 'current' : 'next',
                  style: { '--tier-color': CLASS_TIER_TONES[index] },
                },
                h('i', { className: 'dq-tier-node', 'aria-hidden': true }),
                h('b', null, t(`class.tier.${index}`))))),
              h('div', {
                className: 'dq-classbar',
                role: 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': info.percent,
                'aria-label': t('class.level', { level: info.level }),
              }, h('i', { style: { width: `${Math.max(3, Math.min(100, info.percent))}%` } })),
              h('div', { className: 'dq-classbar-foot' },
                h('span', null, t('class.toNextLevel', {
                  level: info.level + 1,
                  xp: formatNumber(Math.max(0, info.xpForNext - info.xpIntoLevel), localeTag()),
                })),
                info.nextTier
                  ? h('span', null, t('class.toNextTier', {
                    tier: t(`class.tier.${info.nextTier.tier}`),
                    xp: formatNumber(info.nextTier.need, localeTag()),
                  }))
                  : h('span', null, t('class.maxTier')),
                h('span', { className: 'dq-class-bonus' },
                  h('span', { 'aria-hidden': true }, '⚔'),
                  t('class.bonusShort', { percent: info.damageBonus || 0 })))),
            h('div', { className: 'dq-class-levelring' },
              h('svg', { viewBox: '0 0 64 64', className: 'dq-ring', 'aria-hidden': true },
                h('circle', { cx: 32, cy: 32, r: 26, className: 'dq-ring-track' }),
                h('circle', {
                  cx: 32,
                  cy: 32,
                  r: 26,
                  className: 'dq-ring-fill',
                  strokeDasharray: (2 * Math.PI * 26).toFixed(1),
                  strokeDashoffset: (2 * Math.PI * 26 * (1 - Math.max(0, Math.min(100, info.percent || 0)) / 100)).toFixed(1),
                  transform: 'rotate(-90 32 32)',
                })),
              h('span', { className: 'dq-ring-value' }, info.level),
              h('span', { className: 'dq-ring-label' }, 'LV'))),
          h('div', { className: 'dq-class-desc' }, t(`class.${info.id}.desc`)),
          h('div', { className: 'dq-class-body' },
            h('div', { className: 'dq-radar-wrap' },
              h('svg', {
                className: 'dq-radar',
                viewBox: `0 0 ${size} ${size}`,
                role: 'img',
                'aria-label': t('class.radarLabel'),
              },
              h('defs', null,
                h('radialGradient', { id: 'dqRadarFill', cx: '50%', cy: '50%', r: '50%' },
                  h('stop', { offset: '0%', stopColor: tone, stopOpacity: 0.62 }),
                  h('stop', { offset: '100%', stopColor: tone, stopOpacity: 0.1 }))),
              [0.34, 0.67, 1].map((ratio, index) => h('polygon', {
                key: `ring:${index}`,
                points: ringPoints(ratio),
                className: 'dq-radar-ring',
              })),
              CLASS_PATH_ORDER.map((path, index) => {
                const [x, y] = at(index, 1)
                return h('line', { key: `axis:${path}`, x1: mid, y1: mid, x2: x.toFixed(1), y2: y.toFixed(1), className: 'dq-radar-axis' })
              }),
              h('polygon', { points: shapePoints, className: 'dq-radar-shape', fill: 'url(#dqRadarFill)', stroke: tone }),
              CLASS_PATH_ORDER.map((path, index) => {
                const [x, y] = at(index, Math.max(0.05, scale(scores[path] || 0)))
                return h('circle', {
                  key: `dot:${path}`,
                  cx: x.toFixed(1),
                  cy: y.toFixed(1),
                  r: path === leader ? 3.4 : 2.4,
                  className: `dq-radar-dot${path === leader ? ' is-leader' : ''}`,
                  style: { fill: CLASS_TONE[path] },
                })
              })),
              h('span', { className: 'dq-radar-major' }, h('i', { 'aria-hidden': true }, '★'), t(`class.path.${leader}`))),
            h('div', { className: 'dq-paths' },
              CLASS_PATH_ORDER.map(path => {
                const score = scores[path] || 0
                const share = Math.round((score / total) * 100)
                return h('div', {
                  key: path,
                  className: `dq-path${path === info.id ? ' is-current' : ''}${path === leader && score > 0 ? ' is-leader' : ''}`,
                  'data-path': path,
                  title: `${t(`class.path.${path}`)} · ${formatNumber(score, localeTag())} — ${t(`class.path.${path}.hint`)}`,
                },
                h('span', { className: 'dq-path-name' },
                  h('span', { className: 'dq-path-dot', 'aria-hidden': true }),
                  t(`class.path.${path}`),
                  path === leader && score > 0 ? h('b', { className: 'dq-path-major' }, t('class.major')) : null),
                // Square-root scale: mastery is very lopsided, and a linear bar
                // leaves every secondary path invisible.
                h('div', { className: 'dq-path-bar' }, h('i', { style: { width: `${Math.max(5, Math.round(scale(score) * 100))}%` } })),
                h('span', { className: 'dq-path-score' }, formatNumber(score, localeTag())),
                h('span', { className: 'dq-path-share' }, `${share}%`))
              }))))
      }

      function StatsGrid({ stats, t, locale }) {
        const entries = [
          ['turns', stats.turns],
          ['tools', stats.tools],
          ['writes', stats.writes],
          ['lines', stats.lines],
          ['reads', stats.reads],
          ['searches', stats.searches],
          ['todos', stats.todos],
          ['chestsOpened', stats.chestsOpened],
          ['subagents', stats.subagents],
          ['workflows', stats.workflows],
          ['shellRuns', stats.shellRuns],
          ['tokens', stats.tokens],
          ['toolErrors', stats.toolErrors],
          ['daysActive', stats.daysActive],
        ]
        return h('div', { className: 'dq-stats-grid' },
          entries.map(([key, value]) => h('div', { key, className: 'dq-stat' },
            h('div', { className: 'dq-stat-label' }, t(`stat.${key}`)),
            h('div', { className: 'dq-stat-value' }, key === 'tokens' ? compactNumber(value, locale) : formatNumber(value, locale)))))
      }

      function PartyRow({ member, t, locale }) {
        const short = String(member.id || '').slice(-4).toUpperCase() || '0000'
        return h('div', { className: 'dq-party-row' },
          h('div', { className: 'dq-avatar', 'aria-hidden': true }, member.subagent ? '♟' : '◆'),
          h('div', { style: { minWidth: 0 } },
            h('div', { className: 'dq-party-name' },
              member.active ? h('span', { className: 'dq-live', title: t('party.active') }) : null,
              h('span', null, t(member.subagent ? 'party.subagent' : 'party.agent', { id: short }))),
            h('div', { className: 'dq-party-meta' }, t('party.tools', { tools: member.tools }), ' · ', t('party.turns', { turns: member.turns })),),
          h('span', { className: 'dq-party-xp' }, t('party.xp', { xp: formatNumber(member.xp, locale) })))
      }

      function ActivityRow({ entry, t, locale, hideTime = false }) {
        const meta = activityMeta(entry, t)
        const xp = Number(entry.xp || 0)
        const coins = Number(entry.coins || 0)
        const spent = Number(entry.spentCoins || 0)
        const gain = xp && coins
          ? `+${xp} XP · +${coins}`
          : xp
            ? `+${xp} XP`
            : coins
              ? `+${coins}`
              : spent
                ? `−${spent}`
                : ''
        return h('div', { className: `dq-activity-row ${meta.className}` },
          h('div', { className: 'dq-activity-dot', 'aria-hidden': true }, meta.glyph),
          h('div', null,
            h('div', { className: 'dq-activity-text' }, meta.text),
            hideTime ? null : h('div', { className: 'dq-activity-time' }, formatTimeAgo(entry.at, t))),
          gain ? h('div', { className: `dq-activity-gain${coins || spent ? ' coins' : ''}` }, gain) : h('span'))
      }

      function AchievementsTab({ data, t, locale, filter, setFilter, busy, onClaimRed }) {
        const unlocked = data.player.achievements
        const total = data.player.totalAchievements
        const count = Object.keys(unlocked).length
        const points = data.gear?.points || { total: 0, spent: 0, available: 0, cost: 45 }
        const redOwned = (data.gear?.redIds || []).filter(id => (data.gear?.owned || []).includes(id)).length
        const redTotal = (data.gear?.redIds || []).length
        const canClaim = points.available >= points.cost && redOwned < redTotal
        const items = ACHIEVEMENT_META.filter(item => filter === 'all' || (filter === 'unlocked' ? unlocked[item.id] : !unlocked[item.id]))
        const percent = total ? Math.round((count / total) * 100) : 0
        const filters = ['all', 'unlocked', 'locked'].map(id => h('button', {
          key: id,
          type: 'button',
          className: 'dq-filter',
          'aria-pressed': filter === id,
          onClick: () => setFilter(id),
        }, t(`ach.filter.${id}`)))
        const cards = items.map(item => {
          const value = unlocked[item.id]
          return h('div', {
            key: item.id,
            className: `dq-ach${value ? '' : ' is-locked'}`,
            'data-rarity': item.rarity,
          },
          h('div', { className: 'dq-ach-top' },
            h('div', { className: 'dq-ach-icon' }, item.glyph),
            h('div', { style: { minWidth: 0 } },
              h('div', { className: 'dq-ach-name' }, t(`ach.${item.id}.name`)),
              h('div', { className: 'dq-rarity' }, t(`ach.rarity.${item.rarity}`)))),
          h('div', { className: 'dq-ach-desc' }, t(`ach.${item.id}.desc`)),
          h('div', { className: 'dq-ach-foot' },
            value ? h('span', { className: 'dq-ach-date' }, t('ach.unlockedAt', { time: formatDateTime(value.at, locale) })) : h('span', null, t('ach.locked')),
            h('span', { className: 'dq-ach-reward' }, t('ach.reward', { coins: data.player.achievementRewards?.[item.id] || 0 }))))
        })
        return h('div', { className: 'dq-stack' },
          h('section', { className: 'dq-card' },
            h('div', { className: 'dq-card-head' },
              h('div', null,
                h('div', { className: 'dq-card-title' },
                  h('span', { className: 'dq-card-title-glyph' }, '✦'),
                  t('ach.title')),
                h('div', { className: 'dq-card-sub' }, t('ach.subtitle', { unlocked: count, total }))),
              h('div', { className: 'dq-filters', role: 'group', 'aria-label': t('ach.title') }, filters)),
            h('div', {
              className: 'dq-meter',
              role: 'progressbar',
              'aria-valuemin': 0,
              'aria-valuemax': 100,
              'aria-valuenow': percent,
              'aria-label': t('ach.subtitle', { unlocked: count, total }),
            }, h('i', { style: { width: `${Math.max(2, percent)}%` } })),
            h('div', { className: 'dq-points' },
              h('div', { className: 'dq-points-info' },
                h('span', { className: 'dq-points-label' }, h('span', { 'aria-hidden': true }, '◈'), t('points.title')),
                h('span', { className: 'dq-points-value' },
                  formatNumber(points.available, locale),
                  h('span', { className: 'dq-points-total' }, ` / ${formatNumber(points.total, locale)}`))),
              h('span', { className: 'dq-points-hint' }, t('points.hint', { owned: redOwned, total: redTotal })),
              h('button', {
                type: 'button',
                className: 'dq-btn primary',
                disabled: Boolean(busy) || !canClaim,
                onClick: onClaimRed,
              }, redOwned >= redTotal ? t('points.allOwned') : t('points.exchange', { cost: points.cost })),
              h('div', { className: 'dq-red-set' },
                (data.gear?.redIds || []).map(id => {
                  const own = (data.gear?.owned || []).includes(id)
                  return h('span', {
                    key: id,
                    className: 'dq-red-chip',
                    'data-owned': own ? 'true' : 'false',
                    title: own ? t(`gear.${id}.name`) : t('points.locked'),
                  }, own ? t(`gear.${id}.name`) : '???')
                })))),
          h('div', { className: 'dq-ach-grid' }, cards))
      }

      function ShopTab({ data, t, locale, busy, onBuy, onEquip, onBuyGear, onEquipGear, onBuyChest }) {
        const player = data.player
        const ownedTitles = player.ownedTitles || []
        const inventory = ownedTitles.map(id => h('button', {
          key: id,
          type: 'button',
          className: 'dq-inv',
          'aria-pressed': player.equippedTitle === id,
          disabled: Boolean(busy),
          onClick: () => onEquip(id),
        }, h('span', { 'aria-hidden': true }, TITLE_META[id]?.glyph || '✦'), t(`title.${id}.name`)))
        const cards = data.shop.map(item => {
          const title = t(`title.${item.id}.name`)
          return h('div', { key: item.id, className: 'dq-shop-card', 'data-rarity': item.rarity },
            h('div', { className: 'dq-plaque' },
              h('div', { className: 'dq-plaque-name' }, title),
              h('div', { className: 'dq-plaque-rarity' }, t(`ach.rarity.${item.rarity}`))),
            h('div', { className: 'dq-shop-desc' }, t(`title.${item.id}.desc`)),
            h('div', { className: 'dq-shop-foot' },
              h('span', { className: 'dq-price' }, item.owned ? t('shop.owned') : t('shop.price', { coins: formatNumber(item.price, locale) })),
              item.equipped
                ? h('span', { className: 'dq-status done' }, '✓ ', t('shop.equipped'))
                : item.owned
                  ? h('button', { type: 'button', className: 'dq-btn', disabled: Boolean(busy), onClick: () => onEquip(item.id) }, t('shop.equip'))
                  : h('button', {
                    type: 'button',
                    className: 'dq-btn primary',
                    disabled: Boolean(busy) || player.coins < item.price,
                    title: player.coins < item.price ? t('shop.insufficient') : undefined,
                    onClick: () => onBuy(item.id),
                  }, busy === `buy:${item.id}` ? '…' : t('shop.buy'))))
        })
        const gearCards = data.gear.shop.map(item => h('div', { key: item.id, className: 'dq-shop-card', 'data-rarity': item.rarity },
          h('div', { className: 'dq-plaque' },
            h('div', { className: 'dq-plaque-name' }, t(`gear.${item.id}.name`)),
            h('div', { className: 'dq-plaque-rarity' },
              t(`gear.${item.slot}`),
              ' · ',
              t(`ach.rarity.${item.rarity}`))),
          h('div', { className: 'dq-shop-desc' }, t(`gear.${item.id}.desc`)),
          h('div', { className: 'dq-shop-foot' },
            h('span', { className: 'dq-price' }, item.owned ? t('gear.owned') : t('shop.price', { coins: formatNumber(item.price, locale) })),
            item.equipped
              ? h('span', { className: 'dq-status done' }, '✓ ', t('gear.equipped'))
              : item.owned
                ? h('button', {
                  type: 'button',
                  className: 'dq-btn',
                  disabled: Boolean(busy),
                  onClick: () => onEquipGear(item.id),
                }, busy === `equip-gear:${item.id}` ? '…' : t('gear.equip'))
                : h('button', {
                  type: 'button',
                  className: 'dq-btn primary',
                  disabled: Boolean(busy) || player.coins < item.price,
                  title: player.coins < item.price ? t('shop.insufficient') : undefined,
                  onClick: () => onBuyGear(item.id),
                }, busy === `buy-gear:${item.id}` ? '…' : t('gear.buy')))))
        const chestCards = (data.shopChests || []).map(entry => {
          const blocked = entry.full || !entry.affordable
          return h('div', { key: entry.tier, className: 'dq-shop-card', 'data-rarity': CHEST_SHOP_RARITY[entry.tier] || 'common' },
            h('div', { className: 'dq-supply-head' },
              h('span', { className: 'dq-chest-art is-mini', 'data-tier': entry.tier, 'aria-hidden': true },
                h('span', { className: 'dq-chest-glyph' }, CHEST_META[entry.tier]?.glyph || '▣')),
              h('div', null,
                h('div', { className: 'dq-plaque-name' }, t(`chest.tier.${entry.tier}`)),
                h('div', { className: 'dq-shop-desc' }, t('chest.subtitle', { lines: data.chests.perChest })))),
            h('div', { className: 'dq-shop-foot' },
              h('span', { className: 'dq-price' }, t('shop.price', { coins: formatNumber(entry.price, locale) })),
              h('button', {
                type: 'button',
                className: 'dq-btn primary',
                disabled: Boolean(busy) || blocked,
                title: entry.full ? t('shop.chestFull') : !entry.affordable ? t('shop.insufficient') : undefined,
                onClick: () => onBuyChest(entry.tier),
              }, busy === `buy-chest:${entry.tier}` ? '…' : entry.full ? t('shop.chestFull') : t('shop.buyChest'))))
        })
        return h('div', { className: 'dq-stack' },
          h('section', { className: 'dq-card' },
            h('div', { className: 'dq-card-head' },
              h('div', null,
                h('div', { className: 'dq-card-title' },
                  h('span', { className: 'dq-card-title-glyph' }, '◈'),
                  t('shop.title')),
                h('div', { className: 'dq-card-sub' }, t('shop.subtitle'))),
              h('span', { className: 'dq-chip coins' },
                h(CoinIcon, { size: 10 }),
                t('shop.balance'),
                ' ',
                formatNumber(player.coins, locale))),
            h('div', { style: { fontSize: 10, color: 'var(--dsw-alias-label-secondary)', marginBottom: 2 } }, t('shop.inventoryHint')),
            h('div', { className: 'dq-inventory' }, inventory)),
          h('div', { className: 'dq-shop-grid' }, cards),
          chestCards.length
            ? h('section', { className: 'dq-card' },
              h('div', { className: 'dq-card-head' },
                h('div', null,
                  h('div', { className: 'dq-card-title' },
                    h('span', { className: 'dq-card-title-glyph' }, '▣'),
                    t('shop.supply')),
                  h('div', { className: 'dq-card-sub' }, t('shop.supplyHint')))),
              h('div', { className: 'dq-shop-grid' }, chestCards))
            : null,
          h('section', { className: 'dq-card' },
            h('div', { className: 'dq-card-head' },
              h('div', null,
                h('div', { className: 'dq-card-title' },
                  h('span', { className: 'dq-card-title-glyph' }, '⚒'),
                  t('shop.gear')),
                h('div', { className: 'dq-card-sub' }, t('shop.gearHint')))),
            h('div', { className: 'dq-shop-grid' }, gearCards)))
      }

      function ChronicleTab({ data, t, locale }) {
        const groups = []
        for (const entry of data.activity) {
          const day = formatDay(entry.at, t, locale)
          const last = groups[groups.length - 1]
          if (!last || last.day !== day) groups.push({ day, entries: [entry] })
          else last.entries.push(entry)
        }
        const entries = groups.length
          ? groups.map(group => h('div', { key: group.day },
            h('div', { className: 'dq-day-head' }, group.day),
            group.entries.map(entry => h(ActivityRow, { key: entry.id, entry, t, locale }))))
          : h('div', { className: 'dq-empty' }, t('activity.empty'))
        return h('div', { className: 'dq-stack' },
          h('section', { className: 'dq-card' },
            h('div', { className: 'dq-card-head' },
              h('div', null,
                h('div', { className: 'dq-card-title' },
                  h('span', { className: 'dq-card-title-glyph' }, '≡'),
                  t('activity.title')),
                h('div', { className: 'dq-card-sub' }, t('activity.subtitle')))),
            entries))
      }

      function ToastStack({ items, dismiss }) {
        if (!items.length) return null
        return h('div', { className: 'dq-toasts', role: 'status', 'aria-live': 'polite' },
          items.map(item => h('div', { key: item.id, className: `dq-toast ${item.tone || ''}` },
            h('span', { className: 'dq-toast-glyph', 'aria-hidden': true }, item.tone === 'achievement' ? '✦' : item.tone === 'error' ? '!' : '✓'),
            h('span', { style: { flex: 1 } }, item.text),
            h('button', {
              type: 'button',
              className: 'dq-icon-btn',
              'aria-label': 'Dismiss',
              onClick: () => dismiss(item.id),
              style: { width: 18, height: 18, fontSize: 10 },
            }, '×'))))
      }

      function Hud() {
        const snapshot = useSnapshot()
        const t = useT()
        const layout = ctx.layout
        const data = snapshot.data
        const moments = React.useMemo(() => diffSnapshots(snapshot.prev, data), [snapshot.prev, data])
        const pillRef = React.useRef(null)
        const dragRef = React.useRef(null)
        const suppressClick = React.useRef(false)
        const [pos, setPos] = React.useState(() => {
          let fallback = { x: 24, y: 24 }
          try {
            const width = typeof window === 'undefined' ? 1200 : window.innerWidth
            const height = typeof window === 'undefined' ? 800 : window.innerHeight
            fallback = { x: Math.max(12, width - 108), y: Math.max(12, height - 108) }
            const raw = window.localStorage.getItem('devquest:hud-pos')
            const stored = raw ? JSON.parse(raw) : null
            if (Number.isFinite(stored?.x) && Number.isFinite(stored?.y)) {
              return { x: Math.round(stored.x), y: Math.round(stored.y) }
            }
          } catch {
            // Blocked storage or bad JSON: the default corner is fine.
          }
          return fallback
        })
        const ready = Boolean(data)

        const persist = next => {
          try {
            window.localStorage.setItem('devquest:hud-pos', JSON.stringify({ x: Math.round(next.x), y: Math.round(next.y) }))
          } catch {
            // Storage is optional.
          }
        }

        React.useEffect(() => {
          if (!ready) return
          const pill = pillRef.current
          if (!pill) return
          const clamp = () => {
            const maxX = Math.max(8, window.innerWidth - pill.offsetWidth - 8)
            const maxY = Math.max(8, window.innerHeight - pill.offsetHeight - 8)
            setPos(current => {
              const next = { x: Math.min(maxX, Math.max(8, current.x)), y: Math.min(maxY, Math.max(8, current.y)) }
              return next.x === current.x && next.y === current.y ? current : next
            })
          }
          clamp()
          window.addEventListener('resize', clamp)
          return () => window.removeEventListener('resize', clamp)
        }, [ready])

        const onPointerDown = event => {
          if (typeof event.button === 'number' && event.button !== 0) return
          dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: pos.x,
            originY: pos.y,
            moved: false,
          }
          try {
            event.currentTarget.setPointerCapture(event.pointerId)
          } catch {
            // Pointer capture is best effort; the pill still tracks inside itself.
          }
        }

        const onPointerMove = event => {
          const drag = dragRef.current
          if (!drag || drag.pointerId !== event.pointerId) return
          const deltaX = event.clientX - drag.startX
          const deltaY = event.clientY - drag.startY
          if (!drag.moved && Math.abs(deltaX) + Math.abs(deltaY) < 4) return
          drag.moved = true
          suppressClick.current = true
          const pill = pillRef.current
          const maxX = Math.max(8, window.innerWidth - (pill ? pill.offsetWidth : 0) - 8)
          const maxY = Math.max(8, window.innerHeight - (pill ? pill.offsetHeight : 0) - 8)
          setPos({
            x: Math.min(maxX, Math.max(8, Math.round(drag.originX + deltaX))),
            y: Math.min(maxY, Math.max(8, Math.round(drag.originY + deltaY))),
          })
        }

        const onPointerUp = event => {
          const drag = dragRef.current
          if (!drag) return
          dragRef.current = null
          try {
            event.currentTarget.releasePointerCapture(event.pointerId)
          } catch {
            // Already released.
          }
          if (drag.moved) {
            persist(pos)
            setTimeout(() => { suppressClick.current = false }, 400)
          }
        }

        const onPillClick = () => {
          if (suppressClick.current) {
            suppressClick.current = false
            return
          }
          try {
            layout.selectPanel('devquest')
          } catch {
            // The main panel can still be opening during a hot reload.
          }
        }

        const resetPosition = event => {
          event.preventDefault()
          event.stopPropagation()
          const pill = pillRef.current
          const next = {
            x: Math.max(12, window.innerWidth - (pill ? pill.offsetWidth : 94) - 14),
            y: Math.max(12, window.innerHeight - (pill ? pill.offsetHeight : 94) - 14),
          }
          setPos(next)
          persist(next)
        }

        if (!data || !data.gear || !data.chests || !data.season || !data.weeklyBoss) {
          if (snapshot.status === 'loading') {
            return h(React.Fragment, null, h(Style),
              h('div', { className: 'dq-hud-float', style: { left: `${pos.x}px`, top: `${pos.y}px` } },
                h('div', { className: 'dq-hud', style: { cursor: 'default' } }, h('span', { className: 'dq-hud-error' }, t('hud.loading')))))
          }
          return h(React.Fragment, null, h(Style),
            h('div', { className: 'dq-hud-float', style: { left: `${pos.x}px`, top: `${pos.y}px` } },
              h('div', { className: 'dq-hud' }, h('span', { className: 'dq-hud-error' }, t('hud.error')))))
        }
        const player = data.player
        const dailyDone = data.daily.challenges.filter(item => item.claimed).length
        const claimable = data.daily.challenges.some(item => item.complete && !item.claimed)
          || data.weekly.challenges.some(item => item.complete && !item.claimed)
          || [data.dailyBoss, data.weeklyBoss, data.season.boss].some(boss => boss.defeated && !boss.claimed)
          || data.season.tiers.some(tier => tier.complete && !tier.claimed)
        return h(React.Fragment, null,
          h(Style),
          h('div', {
            className: 'dq-hud-float',
            style: { left: `${pos.x}px`, top: `${pos.y}px` },
            'data-side': pos.x < 260 ? 'right' : 'left',
            'data-vside': pos.y < 150 ? 'below' : 'above',
          },
            h('button', {
              ref: pillRef,
              type: 'button',
              className: `dq-hud dq-hud-card${moments.levelUp ? ' is-levelup' : ''}`,
              'data-frarity': FRAME_RARITY[player.equippedFrame || 'f.novice'] || 'common',
              title: t('hud.open'),
              'aria-label': t('hud.open'),
              onPointerDown,
              onPointerMove,
              onPointerUp,
              onPointerCancel: onPointerUp,
              onClick: onPillClick,
            },
            h('span', { className: 'dq-hud-frame', 'data-frame': player.equippedFrame || 'f.novice', 'data-frarity': FRAME_RARITY[player.equippedFrame || 'f.novice'] || 'common' },
              h('span', { className: 'dq-hud-ring', 'aria-hidden': true }),
              h(HeroFigure, { gear: data.gear, className: 'dq-hud-hero' }),
              player.rebirths > 0
                ? h('span', {
                  className: `dq-crest-gems dq-hud-gems${player.rebirths > GEM_SLOTS.length ? ' is-maxed' : ''}`,
                  'aria-hidden': true,
                  title: t('rebirth.lives', { lives: player.rebirths }),
                },
                GEM_SLOTS.slice(0, Math.min(GEM_SLOTS.length, player.rebirths)).map((slot, index) =>
                  h('i', { key: index, className: 'dq-crest-gem', style: { left: `${slot.x}%`, top: `${slot.y}%` } })))
                : null),
            h('span', { className: 'dq-hud-badge' }, player.level),
            player.paragon && player.paragon.stars > 0
              ? h('span', {
                className: 'dq-hud-stars',
                title: t('paragon.stars', { stars: player.paragon.stars }),
                'aria-label': t('paragon.stars', { stars: player.paragon.stars }),
              }, '★')
              : null,
            claimable ? h('span', { className: 'dq-hud-claim', 'aria-hidden': true }) : null,
            h('span', { className: 'dq-hud-xpbar', 'aria-hidden': true },
              h('i', { style: { width: `${Math.max(3, Math.min(100, player.xpPercent))}%` } })),
            h('span', {
              className: 'dq-hud-grip',
              'aria-hidden': true,
              title: `${t('hud.move')} · ${t('hud.reset')}`,
              onClick: event => event.stopPropagation(),
              onDoubleClick: resetPosition,
            }, '⠿'),
            h('span', { className: 'dq-hud-pop' },
              h('span', { className: 'dq-hud-pop-top' },
                h('span', { className: 'dq-hud-pop-name' }, player.name),
                h('span', { className: 'dq-hud-lv' }, t('hud.level', { level: player.level }))),
              h('span', { className: 'dq-hud-pop-xp' }, t('hud.xp', { current: player.xpIntoLevel, next: player.xpForNext })),
              h('span', { className: 'dq-hud-pop-chips' },
                h('span', { className: 'dq-hud-chip' }, h(CoinIcon, { size: 9 }), t('hud.coins', { coins: compactNumber(player.coins, localeTag()) })),
                h('span', { className: 'dq-hud-chip' }, h(FlameIcon, { size: 9 }), t('hud.streak', { days: player.streak })),
                h('span', { className: 'dq-hud-chip' }, '▣ ', data.chests.count),
                h('span', { className: 'dq-hud-chip' }, t('hud.quests', { done: dailyDone, total: data.daily.challenges.length })))))))
      }

      return { Page, Hud, SidebarIcon: QuestMark }
    }

    return {
      inject: ['slots', 'locale', 'layout'],
      apply(ctx) {
        const t = (key, values) => interpolate(ctx.locale.bind('devquest')(key), values)
        ctx.effect(() => ctx.locale.register('devquest', 'zh', ZH), 'devquest: Chinese copy')
        ctx.effect(() => ctx.locale.register('devquest', 'en', EN), 'devquest: English copy')
        const ui = createUI(ctx)
        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: 'devquest',
        }, ui.Page))
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: 'devquest',
          order: 20,
          label: () => t('nav.title'),
        }, ui.SidebarIcon))
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'devquest',
          order: 5,
          label: () => t('nav.title'),
        }, ui.Hud))
      },
    }
  },
})
