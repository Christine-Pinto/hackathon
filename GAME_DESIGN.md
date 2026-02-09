# EmojiHunt

A daily "Where's Waldo" browser game with emoji. Find the target emoji hidden in a grid of visually similar distractors. One puzzle per day, same for everyone.

## Core Concept

- A grid of visually similar emoji fills the screen
- One target emoji is hidden among them
- Player taps/clicks to find it
- Fewer hints + faster time = better score
- Daily puzzle (fixed) + Practice mode (random)

## Gameplay

### Daily Challenge
- 1 puzzle per day, identical for all players (seeded by date)
- Target emoji shown at the top: "Find the 🐙"
- Grid filled with distractors from the same visual family (e.g., 🦑🦐🦀🦞🐡🐠🦈)
- Player scans the grid and taps the target
- Timer runs from grid reveal to correct tap
- Score = stars based on hints used (0 hints = 5 stars, 4 hints = 1 star)
- Daily reset at midnight UTC

### Wrong Taps
- Tapping a wrong emoji = brief red flash + shake on that cell
- Each wrong tap adds +3 seconds to your displayed time
- Prevents brute-force tapping (penalty stacks up fast)
- Wrong tap count is tracked and shown in results

### Hint System
Each hint costs 1 star:
1. **Hint 1:** Grey out the wrong half of the grid (left/right or top/bottom)
2. **Hint 2:** Narrow to the correct quadrant
3. **Hint 3:** Highlight the correct row band (3 rows)
4. **Hint 4:** Highlight a small region around the target (3x3 area)

### Practice Mode
- Random target + grid each time
- No limit on plays
- Not shareable -- keeps daily challenge special

## Scoring

### Stars (primary metric)
- ⭐⭐⭐⭐⭐ = 0 hints used
- ⭐⭐⭐⭐☆ = 1 hint used
- ⭐⭐⭐☆☆ = 2 hints used
- ⭐⭐☆☆☆ = 3 hints used
- ⭐☆☆☆☆ = 4 hints used

### Time (secondary metric)
- Displayed as total seconds (includes +3s wrong tap penalties)
- Used as tiebreaker bragging rights, not part of star rating

---

## Results Modal (The Viral Engine)

Full-screen modal that appears after finding the target. This is the most important screen -- it's what people screenshot and share.

### Layout (top to bottom)

```
┌─────────────────────────────┐
│                             │
│     "Byakugan activated!"   │  ← Punny title
│                             │
│       ⭐⭐⭐⭐⭐            │  ← Star rating (large)
│                             │
│     🐙 found in 3.2s       │  ← Target + time
│       0 hints, 1 miss       │  ← Stats line
│                             │
│      ⬛⬛⬛⬛⬛             │
│      ⬛⬛⬛⬛⬛             │  ← Mini hunt map
│      ⬛⬛🎯⬛⬛             │     (the shareable visual)
│      ⬛⬛⬛⬛⬛             │
│      ⬛⬛⬛⬛⬛             │
│                             │
│     [ 📋 Copy Results ]     │  ← Copies text version
│     [ 📸 Share Image  ]     │  ← Downloads/shares image
│                             │
│     🔥 3 day streak         │  ← Streak counter
│                             │
│   Next puzzle in 04:32:17   │  ← Countdown
│                             │
│      [ Practice Mode ]      │
│                             │
└─────────────────────────────┘
```

### The Mini Hunt Map (Shareable Visual)

The actual grid (12x12) is compressed into a 5x5 mini map representing zones.
Each zone shows what happened there:

- ⬛ = untouched zone (you didn't need help here)
- 🟨 = zone revealed by hints
- 🟥 = zone where you had wrong taps
- 🎯 = zone where target was found

This creates a unique visual fingerprint for each player's experience.

**Zero hints (flex):**
```
⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛
⬛⬛🎯⬛⬛
⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛
```

**Struggled (relatable):**
```
⬛🟥⬛⬛⬛
⬛⬛⬛🟥⬛
🟨🟨⬛⬛⬛
🟨🎯⬛⬛⬛
⬛⬛⬛⬛⬛
```

### Clipboard Text Format

When "Copy Results" is tapped, this is what gets pasted:

```
🔍 EmojiHunt #42

⬛⬛⬛⬛⬛
⬛⬛⬛⬛⬛
⬛🟨🟨⬛⬛
⬛🟨🎯⬛⬛
⬛⬛⬛⬛⬛

⭐⭐⭐⭐☆ 4.2s
emojihunt.io
```

Works everywhere: Twitter, Discord, WhatsApp, Slack. The grid is the hook.

### Share Image

"Share Image" generates a styled canvas/image of the results modal.
Uses the same dark theme as the app. Optimized for:
- Instagram Stories (1080x1920 aspect ratio option)
- Twitter/X posts (1200x675)
- General share (square)

### Punny Titles (Auto-Rotated)

Titles are selected automatically: `titles[starCount][dayNumber % titles[starCount].length]`
No manual work. Here's the pool:

**5 stars (0 hints):**
- "Byakugan activated!"
- "Observation Haki: MAXED"
- "You have Eagle Vision"
- "Main character energy"
- "Built different"
- "No hints? Nani?!"
- "Ultra Instinct unlocked"
- "The One from the Matrix"

**4 stars (1 hint):**
- "Almost went Ultra Instinct"
- "Just a small power-up needed"
- "A-rank hunter"
- "One hint? Still goated"
- "Scouter says... impressive"

**3 stars (2 hints):**
- "ENHANCE! ...ok one more ENHANCE!"
- "B-rank but still vibing"
- "The clues were... helpful"
- "Mid-game power boost"
- "Side character arc complete"

**2 stars (3 hints):**
- "It's dangerous to go alone"
- "You need a bigger minimap"
- "GPS: recalculating..."
- "Have you tried wearing glasses?"

**1 star (4 hints):**
- "!! (MGS alert sound)"
- "Task failed successfully"
- "NPC energy but you made it"
- "The real treasure was the hints"

---

## Emoji Families (Puzzle Pool)

Themed distractor pools with a single target. Difficulty controlled by visual similarity.

Difficulty guide:
- **Easy:** Emoji are visually distinct, target stands out with a scan
- **Medium:** Same category, need to look carefully
- **Hard:** Very similar shapes/colors, requires focus

| # | Theme | Target | Distractor Pool | Difficulty |
|---|-------|--------|-----------------|------------|
| 1 | Sea Creatures | 🐙 | 🦑🦐🦀🦞🐡🐠🦈🐟🦭 | Medium |
| 2 | Bugs & Critters | 🐛 | 🐜🦗🕷️🦎🐊🐸🐍🦂🪲 | Medium |
| 3 | Weapons (RPG) | 🗡️ | 🔪🪓🏹🔫🪃🛡️⚔️🪄💣 | Easy |
| 4 | Space | 🛸 | 🚀🌍🌙☄️🪐🌌🔭🛰️👽 | Easy |
| 5 | Effects | ⚡ | 💫✨🌟💥🔥❄️🌪️💨🫧 | Medium |
| 6 | Villains | 👾 | 🤖💀👹👻🎃🧟🦹😈🥷 | Medium |
| 7 | Japanese Food | 🍙 | 🍣🍱🍜🍛🍡🍘🥟🍤🫕 | Hard |
| 8 | Animals | 🦊 | 🐺🐶🐱🦁🐯🐻🐼🐨🦝 | Medium |
| 9 | Tech | 🖥️ | 💻🖨️⌨️🖱️📱💾📀🕹️🔌 | Easy |
| 10 | Magic | 🔮 | 🪄✨🧿🎱💎🌀🎭🪬🧙 | Medium |
| 11 | Music | 🎸 | 🎹🥁🎺🎻🪘🎷🪗🎤🎵 | Easy |
| 12 | Sports | ⚽ | 🏀🏈⚾🎾🏐🏓🏒🥊🏋️ | Easy |
| 13 | Hearts | 💜 | ❤️🧡💛💚💙🩷🤎🖤🩶 | Hard |
| 14 | Vehicles | 🏎️ | 🚗🚕🚙🚌🚎🏍️🚐🚓🚑 | Hard |
| 15 | Weather | 🌩️ | ☀️🌤️⛅🌦️🌧️❄️🌪️🌫️🌈 | Medium |
| 16 | Plants | 🌵 | 🌲🌳🌴🎋🌿☘️🍀🎍🪴 | Medium |
| 17 | Cat Faces | 😼 | 😺😸😹😻😽🙀😿😾🐱 | Hard |
| 18 | Hands | 🤙 | 👋✋🖐️🖖👌🤌🤏✌️🤞 | Hard |
| 19 | Fruit | 🍑 | 🍎🍐🍊🍋🍇🍓🍒🥭🍌 | Easy |
| 20 | Drinks | 🧋 | ☕🍵🥤🍶🍺🍷🥃🧃🍹 | Medium |
| 21 | Books | 📕 | 📗📘📙📓📔📒📖📚📑 | Hard |
| 22 | Monkeys | 🙈 | 🙉🙊🐵🐒🦍🦧🐵🙉🙊 | Medium |
| 23 | Sweets | 🍩 | 🍪🍰🧁🍫🍬🍭🎂🥧🍦 | Easy |
| 24 | Balls | 🎱 | ⚽🏀🏈⚾🎾🏐🥎🏉🪀 | Medium |
| 25 | Trains | 🚄 | 🚂🚃🚅🚆🚇🚈🚉🚊🚝 | Hard |
| 26 | Dragons & Dinos | 🐲 | 🐉🦕🦖🐊🦎🐍🐸🦴🔥 | Medium |
| 27 | Hats & Crowns | 👑 | 🎩🧢⛑️🪖🎓👒🤠💂🎪 | Medium |
| 28 | Tools | 🔧 | 🔨⛏️🪛🪚🔩⚙️🗜️🪝🧲 | Medium |
| 29 | Spooky | 👻 | 💀☠️🎃👹👺😈🧟🦇🕸️ | Medium |
| 30 | Ocean | 🐋 | 🐳🐬🦈🐟🐠🐡🦐🦭🪸 | Medium |

30 families = 30 days of unique daily content before cycling.
Adding more families is trivial: just append to the array, no code changes needed.

### Difficulty Distribution
- Easy: 7 days (warm start, weekends)
- Medium: 16 days (the sweet spot)
- Hard: 7 days (challenge days)

---

## Grid Configuration

### Responsive Grid Sizing
Mobile screens can't fit 15x15 comfortably (cells would be ~23px).

| Screen Width | Grid Size | Cell Size | Total Emoji |
|-------------|-----------|-----------|-------------|
| < 480px (phone) | 10x10 | ~35px | 100 |
| 480-768px (tablet) | 12x12 | ~35px | 144 |
| > 768px (desktop) | 15x15 | ~33px | 225 |

- Same daily target + same seed = same target position relative to grid
- Grid scales but the puzzle is equivalent across devices
- Target placed at random position (seeded by date for daily)
- Distractors fill remaining cells randomly from the family pool
- Target appears exactly ONCE

---

## Visual Style

### Theme: Dark Mode (non-negotiable for this audience)

```
Background:      #0a0a0f (near black)
Card/Surface:    #161622 (dark navy)
Card border:     #1e1e3a (subtle purple-grey)
Accent primary:  #a855f7 (purple, buttons and highlights)
Accent glow:     #c084fc (lighter purple, hover states)
Success:         #22c55e (green, correct find)
Error:           #ef4444 (red, wrong tap flash)
Hint zone:       #eab308 (yellow/amber, hint overlays)
Text primary:    #f0f0f0 (off-white)
Text secondary:  #888899 (muted)
Stars:           #fbbf24 (gold)
```

### Font
- Inter or system sans-serif (clean, modern, fast to load)
- Emoji rendered at native system size (no custom emoji font)

### Grid Style
- Dark card with subtle border
- Emoji cells with very subtle grid lines (1px #1e1e3a)
- On hover/tap: cell briefly lights up
- Wrong tap: red flash + shake animation
- Correct tap: green pulse + emoji scales up
- Hint zones: amber/yellow semi-transparent overlay on greyed-out areas

### Animations (subtle, not distracting)
- Grid entrance: emoji fade in with slight stagger (fast, ~300ms total)
- Wrong tap: cell shakes horizontally (200ms)
- Correct find: target emoji scales up + green ring pulse
- Hint reveal: smooth fade of overlay zones
- Results modal: slides up from bottom
- Stars: pop in one by one (like Duolingo)
- Confetti: on 5-star result only (using canvas-confetti library)

### Sound Effects (optional, off by default)
- Tap: soft click
- Wrong tap: subtle buzz
- Correct: satisfying chime
- Hint: whoosh
- Toggle in settings -- respects user preference

---

## Stats Page (Accessed from Results Modal or Header)

Like Wordle's stats popup:

```
┌─────────────────────────────┐
│         Your Stats          │
│                             │
│  Played  Win%  Streak  Best │
│    12    100%    12     12  │
│                             │
│  Star Distribution          │
│  ⭐⭐⭐⭐⭐  ████████  6  │
│  ⭐⭐⭐⭐☆  ████      3  │
│  ⭐⭐⭐☆☆  ██        2  │
│  ⭐⭐☆☆☆  █         1  │
│  ⭐☆☆☆☆              0  │
│                             │
│  Best Time: 1.8s            │
│  Avg Time:  5.4s            │
│                             │
└─────────────────────────────┘
```

Stored in LocalStorage. No account needed.

---

## Tech Stack

- **HTML5 + CSS3 + Vanilla JavaScript**
- Single page, no framework, no build step
- No backend, no database, no API calls
- Hosted on **GitHub Pages** (free)
- External dependencies: canvas-confetti (CDN, ~3kb)
- Daily puzzle seeded: `Math.floor(Date.now() / 86400000) % families.length`
- LocalStorage for: completion status, streak, stats, settings

---

## UI Screens

### 1. Welcome / How to Play
- Game title "EmojiHunt" with magnifying glass emoji
- Dark themed card with 3-4 simple rules with icons
- "Play Today's Puzzle" button (purple, prominent)
- "Practice Mode" link (subtle, secondary)
- Only shown on first visit (then goes straight to game)

### 2. Game Screen
- **Top bar:** Target emoji display ("Find: 🐙"), timer, hint button with star cost
- **Center:** Emoji grid (responsive, see grid config above)
- **Bottom:** Stars remaining indicator (⭐⭐⭐⭐⭐ dimming as hints used)
- Minimal UI -- the grid is the focus

### 3. Results Modal (see detailed section above)

### 4. Stats Popup (see detailed section above)

---

## Edge Cases & Details

### Already Played Today
- If player returns after completing daily, show results modal with their score
- "You already found today's emoji!" with their stats
- Practice mode still available

### Streak Rules
- Streak increments when you complete a daily puzzle
- Streak resets if you miss a calendar day (UTC)
- Streak stored in LocalStorage with last-played date

### Timezone
- Daily reset at midnight UTC
- Countdown timer on results screen shows time until next UTC midnight

### Cross-Platform Emoji Rendering
- Emoji look different on iOS vs Android vs Windows
- Not a gameplay issue: target and grid render on same device
- Could look slightly different in screenshots across platforms (acceptable)

### Open Graph / Meta Tags
- Title: "EmojiHunt - Daily Emoji Search"
- Description: "Find the hidden emoji. One puzzle per day."
- OG image: pre-made branded image with sample grid
- This makes shared links look good on social platforms

---

## MVP Scope (Hackathon Build)

What to build first (in priority order):
1. Game grid + tap detection + target finding
2. Daily seed + emoji families (at least 10)
3. Timer + star scoring
4. Hint system (4 levels)
5. Results modal with copy-to-clipboard share
6. LocalStorage (prevent replay, streak)
7. Welcome screen / how to play
8. Practice mode
9. Stats page
10. Share image generation
11. Sound effects
12. Confetti / polish animations
