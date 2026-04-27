# Ravioli (Infoskjerm)

Ravioli is a digital information display for [Online](https://online.ntnu.no/), the student organization at NTNU. It runs on a wall-mounted screen in room A4 and rotates through live content - upcoming events, Slack memes and blasts, YouTube videos, seasonal pages, and more.

[Live display](https://infoskjerm-online.vercel.app/)

---

## How it works

The app is a full-screen React SPA that cycles through a set of **pages**. Each page has two properties:

- **`duration`** - how many seconds the page stays on screen
- **`priority`** - a function that returns a number; higher = shown more often

The scheduler converts priorities into probabilities and picks the next page randomly, weighted by those probabilities. This means a priority of `4` is twice as likely to appear as a priority of `2`. A priority of `0` means the page is never shown.

Priority functions are called at selection time, so they can depend on the current date and time. This is how seasonal pages work - they return a non-zero value only during their season.

```ts
// Example: only show during Christmas season (Oct 1 – Dec 24)
priority: () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), 9, 1);
  const end   = new Date(today.getFullYear(), 11, 24);
  return start <= today && today <= end ? 1 : 0;
}
```

The header shows a countdown bar for the current page.

**Dev tricks:**

- `←` / `→` arrow keys - step through pages sequentially
- Click the pie/progress indicator in the header - jump to a random page picked by the scheduler
- Click the Online logo or the clock in the header - toggle between light and dark mode

---

## Repository structure

```plaintext
infoskjerm/
├── frontend/   # React + Vite app (the display itself)
└── backend/    # Express API (Slack proxy, event data, etc.)
```

---

## Frontend

### Tech stack

| Tool                   | Purpose                      |
| ---------------------- | ---------------------------- |
| React + TypeScript     | UI framework                 |
| Vite                   | Build tool and dev server    |
| TanStack React Query   | Data fetching and caching    |
| Tailwind CSS           | Styling                      |
| Framer Motion          | Animations                   |

### Frontend setup

```bash
cd frontend
npm install
cp .env.template .env
```

Edit `.env` and fill in the values (see [Environment variables](#environment-variables) below).

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | Yes | Set to `development`. Hides the cursor in production. |
| `VITE_VIDEO_API_KEY` | No | YouTube Data API v3 key. Only required if you want `VideoPage` to work. Get one at [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com). |
| `VITE_BACKEND_URL` | Yes | URL to the backend. Use `https://infoskjerm-backend-appkom.vercel.app` for the live backend, or `http://localhost:3000` if running it locally. |

### Pages

All pages live in [frontend/src/components/pages/](frontend/src/components/pages/). Some examples:

| Page        | What it shows                                   | Notes                     |
| ----------- | ----------------------------------------------- | ------------------------- |
| `EventsPage`| Next 8 upcoming events from Online              | Refetches every 5 min     |
| `SlackPage` | Recent Slack memes (left) + text blasts (right) | Refetches every 15–60 min |

Pages marked `fullScreen: true` hide the header bar.

### Adding a new page

1. Create `frontend/src/components/pages/MyPage.tsx` and export a React component.
2. Import it in [frontend/src/components/pages/MainPage.tsx](frontend/src/components/pages/MainPage.tsx).
3. Add an entry to the `pageSpecifications` array:

```ts
{
  component: <MyPage />,
  duration: 30,           // seconds to display
  priority: () => 1,      // relative weight; use a function for time-based logic
  fullScreen: true,       // optional: hides the header bar
}
```

### Data fetching

API files are in [frontend/src/api/](frontend/src/api/). Each file exports a fetcher function used by React Query hooks inside the relevant page component. Cache times and refetch intervals are set per-query.

### Routes

| Path | Component | Purpose |
| --- | --- | --- |
| `/` | `MainPage` | The main rotating display |
| `/online-appen` | `AppRedirect` | Used for the QR code on `OnlineAppBlastPage` - detects whether the scanning device is Android or iOS and redirects to the appropriate app store |

---

## Backend

The backend is an Express API that acts as a proxy and content aggregator. It pulls messages and media from specific Slack channels, processes and stores them in Supabase (PostgreSQL + file storage), and exposes read-only endpoints for the frontend. It also fetches event data from the Online API.

A cron job runs hourly (7am–9pm UTC) to keep content fresh by polling Slack for new messages.

### Backend tech stack

| Tool                  | Purpose                              |
| --------------------- | ------------------------------------ |
| Express + TypeScript  | HTTP server                          |
| Supabase              | PostgreSQL database + file storage   |
| Slack Web API         | Source of memes, blasts, and media   |
| node-cron / Vercel    | Scheduled Slack polling              |

### Backend setup

```bash
cd backend
npm install
cp .env.template .env
```

Edit `.env` and fill in the values (see [Backend environment variables](#backend-environment-variables) below).

```bash
npm run dev
```

The server runs at `http://localhost:3000` by default.

### Backend environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `SLACK_TOKEN` | Yes | Slack Bot User OAuth Token (`xoxb-…`). Used to fetch messages and media from Slack channels. |
| `SUPABASE_URL` | Yes | Supabase project URL. Found in your Supabase project settings. |
| `SUPABASE_SERVICE_KEY` | Yes | Supabase service role key. Grants admin access to the database and storage. |
| `SUPABASE_CONNECTION_STRING` | Yes | PostgreSQL connection string from Supabase. Used for direct database queries. |
| `CRON_SECRET` | Yes | Bearer token that protects the `/cron` endpoint. Set to any secret string. |
| `NODE_ENV` | No | Set to `development` locally. |

### Endpoints

| Endpoint | Description |
| --- | --- |
| `GET /latest-memes` | Returns the latest memes from the `#memeogvinogklinoggrin2` Slack channel. Query params: `count` (1–10), `type` (`image` or `video`). |
| `GET /latest-blasts` | Returns the latest text blasts from the korktavla, online, utveksling, and kontoret channels. Query param: `count` (1–10). |
| `GET /movember` | Returns Movember media from a given cutoff date. Query param: `date` (ISO 8601). |
| `GET /events` | Fetches upcoming events from the Online API (no auth required). |
| `GET /cron` | Internal - triggers a Slack poll and stores new media. Protected by `CRON_SECRET` bearer token. Called automatically by Vercel on a schedule. |

### Media pipeline

When the cron job runs, the backend:

1. Fetches new messages from monitored Slack channels
2. Downloads any attached images or videos using the Slack bot token
3. Compresses images with Sharp (resizes to max 1920px wide, 80% JPEG quality)
4. Uploads processed files to Supabase Storage under `media/{channelName}/{fileId}-{fileName}`
5. Upserts metadata (author, reactions, timestamp, public URL) into the `MediaFiles` table

---

## Slack bot

The backend fetches data from the Slack API using a Slack bot. This bot has been added to the relevant channels in the Online Slack workspace (e.g. `#memeogvinogklinoggrin2`, `#korktavla`, etc.), which gives it read access to those channels.

For details on setting up a Slack bot and scopes, refer to the [Slack API documentation](https://api.slack.com/).

The bot's OAuth token (`SLACK_TOKEN`) can be retrieved from the Notion-page.

---

## YouTube API key

`VITE_VIDEO_API_KEY` is a Google Cloud API key with access to the **YouTube Data API v3**.

To get one:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com).
2. Enable the **YouTube Data API v3** for your project.
3. Create an API key under **Credentials**.

---

## Creating QR codes

Many QR code generators do not encode the destination URL directly into the QR code. Instead they redirect through their own service, which often imposes a time limit or paywall before the code stops working.

Use [qrcode-monkey.com](https://www.qrcode-monkey.com/) to generate QR codes that link directly to the target URL with no intermediary — and with good visual customization options.

**Tip:** QR codes with shorter content (shorter URLs) produce fewer dots, which makes them look cleaner and more visually pleasing on screen. Prefer short URLs where possible.

---

## Daily page refresh

The app automatically reloads itself once per day at `03:00` to pick up any newly deployed code. This is controlled by the `REFRESH_TIME` constant in [frontend/src/components/header/Header.tsx](frontend/src/components/header/Header.tsx).

---

## Hardware setup

The infoskjerm runs on a **Windows laptop** connected to the TV via an HDMI cable.

**TV:** Philips 50'' LED Ambilight TV
