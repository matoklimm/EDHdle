# EDHdle 🧙‍♂️

**A daily Magic: The Gathering guessing game for Commander players**

🌐 **Live:** https://edhdle.net

EDHdle is a daily MTG guessing game inspired by games like *Wordle*, *Pokedle*, and *Loldle* —
but fully focused on **Commander / EDH**.

Every day, a new puzzle is generated.
Your goal: **figure out the hidden cards using structured game knowledge, in various game modes.**

---

## 🎮 Game Modes

EDHdle currently features multiple daily game modes, all sharing the same core architecture but differing in how information is revealed:

- **Staple Mode**
  Guess a popular EDH staple (among the "Top Cards" category from [EDHREC](https://edhrec.com)) using metadata like colors, CMC, types, and keywords.

- **Commander Mode**
  Guess a hidden Commander (among the "Top Commanders" category from [EDHREC](https://edhrec.com)) based on structural hints and gameplay-related attributes.

- **Card (Blurred Art) Mode**
  Guess the card while the artwork starts blurred and gradually reveals itself.

- **Oracle Mode**
  Guess the card based primarily on its **oracle text and core mechanics**, rather than visuals.

Each mode resets **daily at UTC midnight**.

---

## 🧠 Core Design Philosophy

EDHdle is designed around a few key principles:

- **Deterministic daily puzzles**
  Every player gets the *same card each day*, without storing the solution on the server.

- **No accounts, no tracking**
  Progress is stored locally. No login, no backend, no user data.

- **Readable, calm UI**
  Designed for repeated daily play without visual fatigue.

---

## 🏗 Architecture Overview

EDHdle is built with **modern Angular (v21+)** and uses a **Signals-first architecture**.

### Project structure

```
src/app
├── components/ # Reusable UI components
├── core/
│ ├── cache/ # Local persistence (guesses, progress)
│ ├── models/ # Card, Guess, and domain models
│ └── services/ # Game logic & mode-specific services
├── pages/ # Route-level pages
```

---

## ♟ Game Logic Architecture

### BaseGameService

All game modes are built on top of a shared abstract base class:

```ts
export abstract class BaseGameService implements GameService {
    ...
}

export interface GameService {
  readonly guesses: Signal<Guess[]>;
  readonly cards: Signal<Card[]>;
  readonly target: Signal<Card | null>;
  readonly yesterdayTarget: Signal<Card | null>;
  readonly isGameWon: Signal<boolean>;
  readonly guessedNames: Signal<string[]>;

  submitGuess(cardName: string): void;
}
```
**Responsibilities:**
- Daily deterministic card selection (seeded shuffle)
- Guess tracking via Angular Signals
- Win-state detection
- Yesterday’s card calculation
- Shared mechanics across all modes

**Concrete implementations:**

- `StapleGameService`
- `CommanderGameService`
- `CardGameService`
- `OracleGameService`

Each service overrides **only what makes the mode unique**.
Which is for the most part, which data should be loaded and which key we use to persist data in the LocalStorage.

## Why this matters

- 🧩 Game logic is fully encapsulated
- 🔁 UI components are mode-agnostic
- 🧪 Easy to add new game modes
- ❌ No duplicated logic between modes

---

## ⚡ Signals-first & Zoneless-friendly

EDHdle uses **Angular Signals** as the primary reactive primitive:

- `signal()`
- `computed()`
- immutable state updates

There is **no global state library** and **no RxJS-based state management**.

The app is designed to be:

- compatible with zoneless Angular
- performant by default
- predictable in change detection

---

## 🧩 UI Composition

### GameShell

A shared layout shell responsible for:

- input area
- main game content
- meta information (yesterday’s card)
- victory overlays

Game pages project content via `ng-content`, keeping layout and logic clearly separated.

### Notable components

- **guess-input** – search & submit guesses
- **guess-history / guess-history-small** – visual feedback tables
- **guess-hint** – conditional hint rendering
- **victory** – end-of-game overlay
- **next-puzzle-display** – daily reset indicator

---

## 💾 Persistence & Caching

- All progress is stored locally
- No backend required
- Daily keys are derived from the UTC date
- Caches are namespaced per game mode

This enables:

- instant reloads
- offline-friendly behavior
- zero server infrastructure

---

## 🚀 Deployment

EDHdle is a **fully static Angular build**, deployed via **Cloudflare Pages**.

Optimizations include:

- AVIF images for backgrounds and icons
- aggressive asset compression
- automatic gzip and brotli compression via Cloudflare
- no runtime backend dependencies

---

## 🛠 Tech Stack

- Angular 21+
- TypeScript
- Angular Signals
- CSS (custom, no framework)
- Cloudflare Pages
- Modern image formats (AVIF)

---

## ✨ Notable Design Decisions

- **No external UI framework**
  Full control over game-specific layout and animations

- **Fixed column widths, variable row heights**
  Stable table layout even with many tags

- **Deterministic daily logic without server state**
  Simple, fair, and scalable

---

## 🧑‍💻 A personal note from the author

I don’t consider myself a frontend expert.

I worked professionally with Angular for about three months several years ago and otherwise only touched frontend sporadically for small features.
This project was a deep dive back into modern Angular, Signals, layouting, animations, and UI polish.

If you spot areas that could be improved — **architecturally, visually, or ergonomically** —
I’m genuinely happy to hear about them.

I’m here to learn, and I’m already very happy that it turned out well 🙂

---

## 📅 Future Ideas

- Additional game modes
- Shareable results (emoji-style summaries)
- Accessibility improvements
- Optional difficulty toggles

---

## 📜 Disclaimer

EDHdle is unofficial Fan Content permitted under the Fan Content Policy.
Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast.
©Wizards of the Coast LLC.
If you need more information regarding the legal policy, please refer to the [official Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy)
---

## ❤️ Credits

Built with love for the Commander community.
Designed to be played once a day — and looked forward to tomorrow.
