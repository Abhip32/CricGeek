# 🏏 CricGeek — Next-Gen Cricket Hub

**CricGeek** is a high-octane, luxury sports web application engineered with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It connects to the companion [Cricket-Api](https://github.com/Abhip32/Cricket-Api) to deliver real-time ball-by-ball updates, live match scorecards, upcoming tournament schedules, ICC player and team rankings, and breaking news.

---

## ✨ Features & Modern Architecture

- **⚡ Dark Luxury Sports Aesthetic**: Designed with an immersive stadium night theme (`#070B14`), ambient stadium lights, glassmorphism panels, and smooth Framer Motion micro-interactions.
- **🔴 Real-Time Live Match Center**: Live match status with sonar ping animations, live scores, overs, run rates, targets, and one-click scorecard transitions.
- **📊 Interactive Scorecards**: Comprehensive innings breakdowns featuring:
  - **Batting**: Batter dismissals, runs, balls, 4s, 6s, and strike rates with milestone highlights (50s/100s).
  - **Bowling**: Overs, maidens, runs conceded, wickets, economy rates, wides, and no-balls.
  - **Match Info**: Venue, series, toss, and official match status.
  - **Squads & Commentary**: Playing XI lineups and ball-by-ball commentary streams.
- **🏆 Official ICC Rankings**:
  - Teams & Players toggle across **Test**, **ODI**, and **T20I** formats.
  - Dedicated **Podium View** (🥇, 🥈, 🥉) with custom medal glow styling.
  - Searchable full leaderboard with ratings, points, and country flags.
- **📅 Tournament Schedule & Fixtures**:
  - Fixtures grouped by date with dynamic team flags, start times, and venue info.
  - Live search filter by team name, tournament series, or venue.
- **📰 Breaking News Desk**:
  - Magazine-style 2-column news grid with publication times, authors, and zoom hover effects.
- **🛡️ Resilient Skeletons & Fallback UIs**:
  - Shimmer skeleton loaders across all views prevent layout shifts.
  - Auto-recovering team flag images with country initials fallbacks.
  - Friendly empty states with instant retry buttons.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22)
- **Cricket-Api** backend running on port `8000`

### 2. Start the Backend API
In a separate terminal:
```bash
cd Cricket-Api
npm install
node index.js
# Backend starts at http://localhost:8000
```

### 3. Start CricGeek Frontend
In the CricGeek directory:
```bash
cd CricGeek
npm install
npm run dev
# Frontend starts at http://localhost:3000
```

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Source**: [Cricket-Api](https://github.com/Abhip32/Cricket-Api) Express & Puppeteer scraper

---

## 👨‍💻 Author

Created & Maintained by [Abhip32](https://github.com/Abhip32)
