# EmojiHunt

A daily "Where's Waldo" browser game with emoji. Find the target emoji hidden in a grid of visually similar distractors. One puzzle per day, same for everyone.

## Core Concept

- A 12x12 grid of visually similar emoji fills the screen
- One target emoji is hidden among them
- Player taps/clicks to find it
- Fewer hints + faster time = better score
- Daily puzzle (fixed) + Practice mode (random)

## Gameplay

### Daily Challenge
- 1 puzzle per day, identical for all players (seeded by date)
- Target emoji shown at the top: "Find the 🐙"
- 12x12 grid (144 cells) filled with distractors from the same visual family
- Player scans the grid and taps the target
- Timer runs from grid reveal to correct tap
- Score = stars based on hints used (0 hints = 5 stars, 4 hints = 1 star)
- Daily reset at midnight UTC

### Wrong Taps
- Tapping a wrong emoji = brief red flash + shake on that cell
- Each wrong tap adds +3 seconds to your displayed time
- Prevents brute-force tapping (penalty stacks up fast)
- Wrong tap count is tracked and shown in results
- Wrong taps are recorded as ❌ in the shareable journey line

### Hint System (Fade-Out)
Each hint costs 1 star. Hints make chunks of wrong emoji fade to low opacity,
progressively narrowing the visible field:

1. **Hint 1:** ~50% of wrong cells fade out (~71 removed)
2. **Hint 2:** ~50% of remaining wrong cells fade out (~36 removed)
3. **Hint 3:** ~50% of remaining wrong cells fade out (~18 removed)
4. **Hint 4:** Almost all wrong cells gone, only target + ~3-4 distractors remain

Implementation: randomly select cells to fade (seeded, so same for everyone on daily).
Faded cells get `opacity: 0.1` with a smooth 300ms CSS transition.
The visual effect is satisfying -- grid gets sparser, target becomes more obvious.

### Celebration Moment
When the player taps the correct emoji:
1. Timer stops immediately
2. Found emoji scales up 2x with a green glow ring (400ms)
3. Grid fades slightly behind (opacity 0.3)
4. Brief pause (~1.2 seconds) for the dopamine hit
5. Results modal slides up from bottom

### Practice Mode
- Random target + grid each time (uses Math.random, not seeded)
- No limit on plays
- Not shareable -- keeps daily challenge special
- Result screen shows: stars + time + "Play Again" button (no journey, no streak, no copy)

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

Full-screen modal that appears after the celebration moment.
This is the most important screen -- it's what people screenshot and share.

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
│     ❌❌💡🎯               │  ← Journey line
│                             │
│     [ 📋 Copy Results ]     │  ← Copies text version
│                             │
│     🔥 3 day streak         │  ← Streak counter
│                             │
│   Next puzzle in 04:32:17   │  ← Countdown
│                             │
│      [ Practice Mode ]      │
│                             │
└─────────────────────────────┘
```

### The Journey Line (Shareable Visual)

A sequence of emoji showing every action the player took, in order:

- ❌ = wrong tap
- 💡 = used a hint
- 🎯 = found the target (always last)

This tells the story of your hunt in a single line.

**Perfect find (instant flex):**
```
🎯
```

**Quick with one hint:**
```
💡🎯
```

**Struggled (relatable, creates conversation):**
```
❌❌❌💡❌💡💡🎯
```

**Why this works for virality:**
- The LENGTH of the line IS the story -- short = flex, long = struggle
- Easy to compare in group chats ("yours is so long lol")
- Creates conversation ("why did you need 3 hints on that one?!")
- Trivial to generate in code (just push to an array)
- Fits in a tweet, Discord message, WhatsApp -- anywhere

### Clipboard Text Format

When "Copy Results" is tapped, this is what gets pasted:

```
🔍 EmojiHunt #42 🐙
❌❌💡🎯
⭐⭐⭐⭐☆ 4.2s
emojihunt.io
```

Compact, readable, works everywhere. The journey line is the hook.

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
| 13 | Faces | 🥸 | 😎🤓🧐🤠🥳🤩😏🫠🤭 | Medium |
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
- Medium: 17 days (the sweet spot)
- Hard: 6 days (challenge days)

---

## Grid Configuration

### Fixed 12x12 Grid (All Devices)
Everyone plays the same 12x12 grid (144 cells). This ensures scores are
directly comparable across devices -- no asterisks needed.

- **Mobile (~375px wide):** cells are ~29px each (tight but tappable)
- **Tablet (~768px wide):** cells are ~35px each (comfortable)
- **Desktop (500px container):** cells are ~38px each (spacious)

Grid is contained in a max-width container and centers on screen.
On mobile, the grid takes full width minus small padding.

- Target placed at random position (seeded by date for daily)
- Distractors fill remaining cells randomly from the family pool
- Target appears exactly ONCE
- Same seed = same grid layout for all players on the same day

### Seeded Random Number Generator
A simple deterministic RNG (e.g., mulberry32) seeded by day number ensures:
- Same puzzle for all players on the same day
- Family selection is shuffled via RNG (not simple modulo -- avoids predictable order)
- Same target position, same distractor placement
- Same cells fade in the same order when hints are used
- Practice mode uses `Math.random()` (non-deterministic, different each play)

### Puzzle Numbering
- Define a LAUNCH_DATE constant (e.g., "2026-02-10")
- Puzzle number = days since LAUNCH_DATE + 1
- So launch day = EmojiHunt #1, next day = #2, etc.
- Used in the shareable text: "🔍 EmojiHunt #42 🐙"

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
Hint fade:       cells go to opacity 0.1 (ghost out, not removed)
Text primary:    #f0f0f0 (off-white)
Text secondary:  #888899 (muted)
Stars:           #fbbf24 (gold)
```

### Font
- Inter or system sans-serif (clean, modern, fast to load)
- Emoji rendered at native system size (no custom emoji font)

### Grid Style
- Dark card with subtle border and slight border-radius
- Emoji cells with very subtle grid lines (1px #1e1e3a)
- On hover/tap: cell briefly lights up
- Wrong tap: red flash + shake animation
- Correct tap: green pulse + emoji scales up 2x
- Faded cells (from hints): opacity 0.1 with 300ms transition

### Animations (subtle, not distracting)
- Grid entrance: emoji fade in with slight stagger (fast, ~300ms total)
- Wrong tap: cell shakes horizontally (200ms)
- Correct find: target emoji scales up 2x + green ring pulse (400ms)
- Grid dims behind found emoji (opacity 0.3)
- Hint fade: smooth opacity transition on affected cells (300ms)
- Results modal: slides up from bottom after 1.2s celebration pause
- Stars: pop in one by one (like Duolingo)
- Confetti: on 5-star result only (using canvas-confetti library)
- Respects `prefers-reduced-motion`: skip stagger, reduce transitions

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
- Seeded RNG (mulberry32 or similar) for deterministic daily puzzles
- LocalStorage for: completion status, streak, stats, settings

### File Structure
```
/
├── index.html      ← Main page (structure + meta tags)
├── style.css       ← All styles
└── game.js         ← All logic + emoji family data + punny titles
```

Three files, no build step. Deploy by pushing to GitHub Pages.

### LocalStorage Schema
```json
{
  "emojihunt_today": {
    "date": "2026-02-09",
    "puzzleNumber": 42,
    "stars": 4,
    "time": 4.2,
    "journey": ["❌", "❌", "💡", "🎯"],
    "hintsUsed": 1,
    "wrongTaps": 2,
    "familyTarget": "🐙"
  },
  "emojihunt_stats": {
    "played": 12,
    "distribution": [0, 1, 2, 3, 6],
    "currentStreak": 12,
    "maxStreak": 12,
    "bestTime": 1.8,
    "totalTime": 64.8,
    "lastPlayedDate": "2026-02-09"
  },
  "emojihunt_settings": {
    "sound": false,
    "hasSeenWelcome": true
  }
}
```

---

## UI Screens

### 1. Welcome / How to Play
- Game title "EmojiHunt" with magnifying glass emoji
- Dark themed card with 3-4 simple rules with icons
- "Play Today's Puzzle" button (purple, prominent)
- "Practice Mode" link (subtle, secondary)
- Only shown on first visit (then goes straight to game)

### 2. Game Screen
- **Header:** Game title (small) + stats icon (📊) + help icon (❓)
- **Top bar:** Target emoji display ("Find: 🐙"), timer, hint button with star cost
- **Center:** 12x12 emoji grid (centered, full width on mobile)
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
- Full result stored in LocalStorage (stars, time, journey, date)

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

### Interaction Details
- Faded cells (from hints) are non-interactive: tapping them is a no-op (no wrong tap penalty)
- Grid uses `touch-action: manipulation` to prevent double-tap zoom on mobile
- Hint button shows remaining cost: "💡 Hint (-1⭐)" and disables after all 4 used
- After 4 hints used, hint button greys out

### Accessibility
- Respects `prefers-reduced-motion` for animations
- Grid cells have sufficient tap target size (29px minimum)
- Game is visual by nature; no meaningful screen reader adaptation
- Replaced Hearts family (color-only distinction) with Faces family (shape distinction)

### Open Graph / Meta Tags
- Title: "EmojiHunt - Daily Emoji Search"
- Description: "Find the hidden emoji. One puzzle per day."
- OG image: pre-made branded image with sample grid
- This makes shared links look good on social platforms

---

## MVP Scope (Hackathon Build)

What to build first (in priority order):

### P0 -- Core Game (must have)
1. Game grid (12x12) + tap detection + target finding
2. All 30 emoji families in data
3. Seeded RNG for deterministic daily puzzle
4. Timer + star scoring
5. Hint system (fade-out, 4 levels)
6. Celebration moment (scale up + pause)
7. Results modal with journey line + copy-to-clipboard
8. LocalStorage (prevent replay, store results)

### P1 -- Complete Experience
9. Welcome screen / how to play (first visit only)
10. Practice mode
11. Streak tracking + display
12. Countdown to next puzzle
13. Stats page

### P2 -- Polish
14. Confetti on 5-star result
15. Sound effects (off by default)
16. Open Graph meta tags
17. Smooth animations + prefers-reduced-motion

### Cut from MVP (build later if time)
- Share image generation (multi-format canvas export)
- Leaderboard / social features
- Custom themes
