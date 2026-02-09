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

### Hint System
Each hint costs 1 star:
1. **Hint 1:** Grey out the wrong half of the grid
2. **Hint 2:** Narrow to the correct quadrant
3. **Hint 3:** Highlight the correct row
4. **Hint 4:** Highlight a small region around the target

### Practice Mode
- Random target + grid each time
- No limit on plays
- Score not shareable (or marked as "practice")

## Scoring & Sharing

### Score Components
- Stars: 5 (no hints) to 1 (4 hints)
- Time: displayed but stars are the primary metric

### Shareable Result
```
🔍 EmojiHunt #42 ⭐⭐⭐⭐⭐
Found in 3.2s with 0 hints!
emojihunt.github.io
```

## Emoji Families (Puzzle Pool)

Themed distractor pools with a single target. Difficulty controlled by visual similarity.

| Theme | Target (example) | Distractor Pool |
|-------|-----------------|-----------------|
| Sea Creatures | 🐙 | 🦑🦐🦀🦞🐡🐠🦈🐟🦭 |
| Bugs & Critters | 🐛 | 🐜🦗🕷️🦎🐊🐸🐍🦂🪲 |
| Weapons (RPG) | 🗡️ | 🔪🪓🏹🔫🪃🛡️⚔️🪄💣 |
| Space | 🛸 | 🚀🌍🌙⭐💫☄️🪐🌌🔭 |
| Effects | ⚡ | 💫✨🌟💥🔥❄️🌈🌪️💨 |
| Faces (Villains) | 👾 | 🤖💀👹👻🎃🧟🦹😈🥷 |
| Food (Japanese) | 🍙 | 🍣🍱🍜🍛🍡🍘🥟🍤🫕 |
| Animals | 🦊 | 🐺🐶🐱🦁🐯🐻🐼🐨🦝 |
| Tech Vibes | 🖥️ | 💻🖨️⌨️🖱️📱💾📀🕹️🔌 |
| Magic | 🔮 | 🪄✨🧿🎱💎🌀🎭🪬🧙 |
| Music | 🎸 | 🎹🥁🎺🎻🪘🎷🪗🎤🎵 |
| Sports | ⚽ | 🏀🏈⚾🎾🏐🏓🏒🥊🏋️ |
| Hearts | 💜 | ❤️🧡💛💚💙🩷🤎🖤🩶 |
| Vehicles | 🏎️ | 🚗🚕🚙🚌🚎🏍️🚐🚓🚑 |
| Weather | 🌩️ | ☀️🌤️⛅🌦️🌧️❄️🌪️🌫️🌈 |
| Plants | 🌵 | 🌲🌳🌴🎋🌿☘️🍀🎍🪴 |
| Cats | 😼 | 😺😸😹😻😽🙀😿😾🐱 |
| Hands | 🤙 | 👋✋🖐️🖖👌🤌🤏✌️🤞 |
| Flags | 🏴‍☠️ | 🏁🚩🎌🏳️🏴🎏🏳️‍🌈🏳️‍⚧️🚩 |
| Buildings | 🏯 | 🏠🏡🏢🏣🏤🏥🏦🏨🏩 |

Target: 30+ families for 30 days of daily content.

## Grid Configuration

| Difficulty | Grid Size | Total Emoji | Applied In |
|-----------|-----------|-------------|------------|
| Default | 15x15 | 225 | Daily challenge |
| Easy | 10x10 | 100 | Practice option |
| Hard | 20x20 | 400 | Practice option |

- Target placed at random position (seeded by date for daily)
- Distractors fill remaining cells randomly from the family pool
- Target appears exactly ONCE

## Tech Stack

- **HTML5 + CSS3 + Vanilla JavaScript**
- Single page, no framework
- No backend, no database
- Hosted on **GitHub Pages**
- Daily puzzle seeded by `Math.floor(Date.now() / 86400000) % families.length`
- LocalStorage for:
  - Today's completion status (prevent replay)
  - Streak counter
  - Best time history

## UI Screens

### 1. Welcome / How to Play
- Game title + emoji animation
- Simple rules (3-4 bullet points)
- "Play Today's Puzzle" button
- "Practice Mode" button

### 2. Game Screen
- Top bar: target emoji display ("Find: 🐙"), timer, hint button
- Center: emoji grid (scrollable on mobile, fit-to-screen on desktop)
- Bottom: hint cost indicator (stars remaining)

### 3. Result Screen
- Success animation (confetti for 5 stars)
- Stars earned + time
- Share button (copies to clipboard)
- "Practice Mode" link
- Streak display
- Countdown to next daily puzzle

## Mobile Considerations
- Touch-friendly grid cells (minimum 32px tap targets)
- Pinch-to-zoom on grid
- Responsive grid sizing
- Full-screen feel (minimal chrome)
