# 🏏 CricGeek — Next-Gen Cricket Hub

**CricGeek** is a high-octane, athletic sports web application engineered with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It connects directly to the companion **[Cricket-Api](https://github.com/Abhip32/Cricket-Api)** to deliver real-time ball-by-ball updates, live match scorecards, player impact analytics (MVP), Cricbuzz photo galleries, tournament schedules, official ICC rankings, and breaking news.

![CricGeek Home Showcase](screenshots/a-home.png)

---

## 📸 Application Showcase & Screenshots

### 🏠 Match Center & Fixtures
| Home Dashboard | Live Match Center (2-Col Layout) | Completed Fixtures & Results |
|:---:|:---:|:---:|
| ![Home Dashboard](screenshots/a-home.png) | ![Live Match Center](screenshots/matches.png) | ![Recent Results](screenshots/matches-recent.png) |

### 📊 Scorecard Tabs & In-Depth Analytics
| Scorecard: Batting & Bowling Breakdown | Scorecard: MVP & Player Impact Leaderboard | Scorecard: Ball-by-Ball Commentary & Over Timeline |
|:---:|:---:|:---:|
| ![Interactive Scorecard](screenshots/scorecard.png) | ![MVP & Player Impact](screenshots/scorecard-mvp.png) | ![Commentary](screenshots/scorecard-commentary.png) |

### 📋 Match Info, Tournament Schedules & Photo Galleries
| Scorecard: Match Info & Playing XI | Tournament Schedule & Fixtures | Cricbuzz High-Res Photo Galleries |
|:---:|:---:|:---:|
| ![Match Info & Squads](screenshots/scorecard-info.png) | ![Tournament Schedule](screenshots/schedule.png) | ![Photo Galleries](screenshots/photos.png) |

### 🏆 Official ICC Rankings
| Official ICC Team Rankings | ICC Player Rankings (Batting / Bowling / All-Rounder) | Upcoming Fixtures (ESPN Powered) |
|:---:|:---:|:---:|
| ![ICC Team Rankings](screenshots/rankings.png) | ![ICC Player Rankings](screenshots/rankings-players.png) | ![Upcoming Matches](screenshots/matches-upcoming.png) |

---

## ✨ Features & Architecture Highlights

### 🔴 1. The Alchemists Athletic Red & White Theme
- **Theme & Palette**: High-contrast athletic sports portal design inspired by Dan Fisher's *The Alchemists* — vibrant sports crimson (`#DC2626`), pure white cards (`#FFFFFF`), subtle slate borders (`#E2E8F0`), and dark charcoal typography.
- **Montserrat Sports Typography**: Headings, navigation bars, widget titles, and team badges render in bold uppercase **Montserrat** (`font-heading font-black uppercase tracking-wider`).
- **Tabular Statistics Alignment**: Monospace tabular numerals (`font-mono tabular-nums`) across all batting, bowling, commentary, and points tables.
- **Clean 2-Column Match Grid**: Engineered with an athletic 2-column layout (`grid-cols-1 md:grid-cols-2`) that prevents header truncation while keeping team names and match scores prominent and legible.

### 👤 2. Deep Player Profile Dossier Modal
- **Universal Player Inspection**: Click any cricketer across Batting tables, Bowling tables, Playing XI squads, Bench reserves, or Player of the Match / MVP chips to instantly open their deep dossier modal.
- **Rich Athlete Dossier**: Features verified player headshots, team affiliation crests, playing role, batting style, bowling style, age, date of birth, and direct link to official career records.
- **Auto-Resolution Engine**: Connects to `/player/:id` when numeric athlete ID is present, and gracefully resolves through `/player/search` by player name when needed.

### 🤝 3. Algorithmic Innings Partnerships Hydration
- **Real Batsman Names & Contributions**: Eliminates raw API placeholders ("Batter 1 / Batter 2 0 runs") by algorithmically cross-referencing batting order positions and Fall of Wickets dismissal logs.
- **Compact Dual-Bar Stand Rows**: Sleek proportional wicket stands displaying exact runs scored and balls faced for both partners at every wicket.

### 🏆 4. Tournament Standings & Points Tables (`/matches?tab=standings`)
- **Multi-League Switcher**: Browse points tables across all active tournaments and domestic series (WBBL, Sheffield Shield, The Ford Trophy, CWC Challenge League, etc.).
- **Playoff Qualification Indicators**: Clear visual indicators denoting Top 2 Semi-Final / Qualifier 1 spots and Top 4 Eliminator spots.
- **Full Metric Breakdown**: Displays `POS`, `TEAM`, `P` (Played), `W` (Won), `L` (Lost), `NR` (No Result / Tied), `NRR` (Net Run Rate), and `PTS` (highlighted points badge).

### 📱 5. Mobile-First Responsive Controls
- **Segmented Pill Navigation**: Replaced clunky mobile `<select>` dropdowns with responsive, horizontal scrolling segmented pill tabs (`Live Matches`, `Recent Results`, `Upcoming Fixtures`, `Points Table`).
- **Unified Card Controls**: Removed cluttered breadcrumbs. The back navigation (`ArrowLeft`) and instant manual refresh (`RefreshCw`) are cleanly built directly into the header banner of the match summary card (`MiniScoreCard`).
- **Zero Auto-Polling Overhead**: No background CPU drain or unwanted refetch spikes (`refetchInterval: false`, `refetchOnWindowFocus: false`). Users enjoy instant on-demand manual refreshing whenever desired.

### 📊 6. Complete Scorecard Suite (All Tabs)
- **Scorecard Tab**: Full batting innings with player dismissal methods, runs, balls, 4s, 6s, and strike rates (with 50s/100s milestones), plus bowling tables with overs, maidens, runs, wickets, and economy rates.
- **MVP & Player Impact Tab**: Proprietary impact algorithm evaluating runs scored, strike-rate bonuses, wickets taken, economy rewards, and maiden bonuses. Features a top-3 podium (🥇, 🥈, 🥉) and rated player leaderboard.
- **Commentary Tab**: Redesigned timeline spine with ball outcome pills (`W` in red, `4` in blue, `6` in purple), bowler-to-batter matchup headlines, over summary strips, and instant filter pills (`All Balls`, `Wickets`, `Boundaries`).
- **Match Info & Squads Tab**: Venue information, series details, toss report, match status, and official playing XI lineups with Captain (`(c)`) and Wicketkeeper (`(wk)`) badges.

### 📸 7. Cricbuzz Photo Galleries (`/photos`)
- Sourced directly from Cricbuzz photo galleries.
- High-resolution photography (`750x422`) with album collections, individual gallery views, photo counts, and descriptive photo captions.

### 📅 8. Fixtures & Tournament Schedule
- **Upcoming Matches**: Powered by official fixtures API, ensuring complete match details and hiding premature scorecard links.
- **Tournament Schedule**: Dedicated tournament schedule endpoint (`/schedule`) categorized by International, Domestic, and T20 Leagues with live search filters.

### 🏆 9. Official ICC Rankings
- Toggles between Team Rankings and Player Rankings (Batting, Bowling, All-rounders) across **Test**, **ODI**, and **T20I**.
- Properly renders player names, ratings, nationalities, and headshots with podium styling.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20 & v22)
- **Cricket-Api** backend running on port `8000`

### 2. Start Backend API
```bash
cd Cricket-Api
npm install
npm start
# Backend starts at http://localhost:8000
```

### 3. Start CricGeek Frontend
```bash
cd CricGeek
npm install
npm run dev
# Frontend starts at http://localhost:3000
```

### 4. Production Build
```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism and athletic sports utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Source**: [Cricket-Api](https://github.com/Abhip32/Cricket-Api) Express & Puppeteer scraper

---

## 📁 Project Structure

```
CricGeek/
├── screenshots/                  # High-resolution application screenshots
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global Root Layout with athletic theme
│   │   ├── page.tsx              # Home Dashboard with carousel & news desk
│   │   ├── matches/              # Live, Recent, and Upcoming matches
│   │   ├── scorecard/            # Scorecard tabs (Batting, MVP, Commentary, Squads)
│   │   ├── rankings/             # Official ICC Team & Player leaderboards
│   │   ├── schedule/             # Dedicated tournament schedule & calendar
│   │   └── photos/               # Cricbuzz photo galleries & albums
│   ├── components/
│   │   ├── common/               # Navbar, Footer, ImageWithFallback, Skeletons
│   │   ├── home/                 # MatchCarouselCard, NewsSection
│   │   ├── matches/              # MatchCard (2-col grid, free flags)
│   │   ├── scorecard/            # MiniScoreCard, ScorecardTab, MvpTab, CommentaryTab, SquadsTab
│   │   └── rankings/             # RankingPodium, RankingsTable
│   ├── hooks/
│   │   └── useCricketQueries.ts  # TanStack React Query hooks (zero auto-poll)
│   ├── services/
│   │   └── api.ts                # API client with data normalizers
│   └── types/
│       ├── match.ts              # Match, Series, Scorecard, and Commentary types
│       └── news.ts               # News article types
├── public/                       # Static public assets
└── package.json                  # Dependencies & scripts
```

---

## 👨‍💻 Author

Created & Maintained by **[Abhip32](https://github.com/Abhip32)**
