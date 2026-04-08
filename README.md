<div align="center">
  <img src="/public/main.svg" alt="ElevateAI Logo" width="300" height="300" />
  <h1>ElevateAI</h1>
  <p><strong>Your Personal AI Meeting Assistant — Real-time video conversations with intelligent AI agents.</strong></p>

  <p>
    <a href="https://elevateai-five.vercel.app/">Live Demo</a> &middot;
    <a href="#features">Features</a> &middot;
    <a href="#tech-stack">Tech Stack</a> &middot;
    <a href="#getting-started">Getting Started</a>
  </p>
</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Webhooks](#webhooks)
- [Background Jobs](#background-jobs)
- [Authentication](#authentication)
- [Premium & Billing](#premium--billing)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

ElevateAI is a full-stack SaaS platform that enables users to create custom AI agents and have real-time video meetings with them. Each meeting is automatically transcribed, recorded, and summarized by AI. After a meeting ends, users can continue chatting with the agent about the meeting content through an integrated chat interface.

The platform is built on **Next.js 16** with the App Router, uses **tRPC** for end-to-end type-safe APIs, **Stream IO** for real-time video/chat, and **OpenAI's GPT-4o & Realtime API** for intelligent conversations — both voice-based (during calls) and text-based (post-meeting chat).

---

## Live Demo

> **[https://elevateai-five.vercel.app/](https://elevateai-five.vercel.app/)**

---

## Features

### AI Agents
- **Create Custom Agents** — Define personalized AI agents with a name and custom behavioral instructions.
- **Manage Agents** — Full CRUD operations: create, view, edit, and delete agents from a dedicated dashboard.
- **Per-Agent Meeting Tracking** — View how many meetings each agent has participated in.
- **DiceBear Avatars** — Each agent is assigned a unique `botttsNeutral` avatar generated via DiceBear.

### Real-Time Video Meetings
- **One-on-One AI Video Calls** — Start a video call with any of your AI agents via Stream Video SDK.
- **Pre-Call Lobby** — Preview your camera and microphone settings before joining the call.
- **OpenAI Realtime Voice** — The AI agent speaks to you in real-time using the OpenAI Realtime API with Whisper transcription and server-side Voice Activity Detection (VAD).
- **Auto-Transcription** — Every call is automatically transcribed (language: English, mode: `auto-on`).
- **Auto-Recording** — Calls are recorded at 1080p quality automatically.
- **Closed Captions** — Live closed captions are enabled by default during calls.

### Post-Meeting Intelligence
- **AI-Powered Summaries** — After a meeting ends, the transcript is processed by GPT-4o via Inngest background jobs to generate a structured markdown summary with an Overview and timestamped Notes sections.
- **Full Transcript Viewer** — Browse the complete meeting transcript with speaker identification and avatars.
- **Post-Meeting Chat** — Continue the conversation with the AI agent in a text-based chat powered by Stream Chat. The agent has full context of the meeting summary and responds using GPT-4o.
- **Recording Playback** — Access and watch the full meeting recording.

### Meeting Management
- **Meeting Lifecycle** — Meetings progress through 5 statuses: `upcoming` → `active` → `processing` → `completed` (or `cancelled`).
- **Advanced Filtering** — Filter meetings by status, agent, or search by name.
- **Paginated Lists** — Server-side pagination with configurable page sizes (1–100 items per page).
- **Meeting Duration** — Automatically calculated from `startedAt` and `endedAt` timestamps.

### Dashboard
- **Sidebar Navigation** — Collapsible sidebar with links to Agents, Meetings, and Upgrade pages.
- **Command Palette** — Global search/command dialog for quick navigation.
- **Trial Usage Indicator** — Visual indicator showing free-tier usage limits.
- **User Profile Menu** — Dropdown with session info and sign-out functionality.
- **Responsive Design** — Fully responsive layout that works on desktop and mobile devices.

### Authentication
- **Email & Password** — Traditional email/password sign-up and sign-in.
- **GitHub OAuth** — One-click sign-in with GitHub.
- **Google OAuth** — One-click sign-in with Google.
- **Session Management** — Secure session handling with IP address and user-agent tracking.

### Premium & Billing
- **Freemium Model** — Free tier limited to **1 agent** and **6 meetings**.
- **Polar.sh Integration** — Subscription management, checkout, and customer portal via Polar.
- **Premium Gating** — Automatic enforcement of free-tier limits at the tRPC middleware level.
- **Upgrade Page** — Dedicated page showing available subscription products.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, React Compiler enabled) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| **Runtime** | [React 19.2](https://react.dev/) with Server Components |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (New York style) with [Radix UI](https://www.radix-ui.com/) primitives |
| **Icons** | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Database** | [Neon](https://neon.tech/) (Serverless PostgreSQL) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) + [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) (Email/Password, GitHub, Google) |
| **API Layer** | [tRPC v11](https://trpc.io/) (end-to-end type safety) |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query/latest) |
| **Real-Time Video** | [Stream Video React SDK](https://getstream.io/video/) + [Stream Node SDK](https://getstream.io/) |
| **Real-Time Chat** | [Stream Chat React](https://getstream.io/chat/) + [Stream Chat SDK](https://getstream.io/) |
| **AI (Voice)** | [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime) via [@stream-io/openai-realtime-api](https://www.npmjs.com/package/@stream-io/openai-realtime-api) |
| **AI (Text)** | [OpenAI GPT-4o](https://platform.openai.com/docs/models/gpt-4o) via [openai SDK v6](https://www.npmjs.com/package/openai) |
| **AI (Summaries)** | [Inngest Agent Kit](https://www.inngest.com/docs/agent-kit) with GPT-4o |
| **Background Jobs** | [Inngest](https://www.inngest.com/) (event-driven serverless functions) |
| **Billing** | [Polar.sh](https://polar.sh/) (subscriptions, checkout, customer portal) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| **URL State** | [nuqs](https://nuqs.47ng.com/) (type-safe URL search params) |
| **Tables** | [TanStack Table v8](https://tanstack.com/table/latest) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Avatars** | [DiceBear](https://www.dicebear.com/) (`botttsNeutral` for agents, `initials` for users) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) (toast notifications) |
| **Markdown** | [react-markdown](https://github.com/remarkjs/react-markdown) |
| **Resizable Panels** | [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                         │
│                                                                  │
│  Next.js App Router (RSC + Client Components)                    │
│  ├── Landing Page (/)                                            │
│  ├── Auth Pages (/auth/sign-in, /auth/sign-up)                  │
│  ├── Dashboard (/(dashboard)/agents, /meetings, /upgrade)        │
│  └── Call Page (/call/[meetingId])                               │
│       ├── Stream Video SDK (WebRTC)                              │
│       └── Stream Chat SDK (WebSocket)                            │
├──────────────────────────────────────────────────────────────────┤
│                          API Layer                                │
│                                                                  │
│  tRPC Router (/api/trpc/[trpc])                                  │
│  ├── agents.*    (CRUD + pagination + search)                    │
│  ├── meetings.*  (CRUD + pagination + filtering + tokens)        │
│  └── premium.*   (subscriptions + usage + products)              │
│                                                                  │
│  Better Auth (/api/auth/[...all])                                │
│  ├── Email/Password, GitHub OAuth, Google OAuth                  │
│  └── Polar.sh plugin (checkout, portal)                          │
│                                                                  │
│  Webhook Handler (/api/webhook)                                  │
│  ├── call.session_started    → Activate meeting + connect OpenAI │
│  ├── call.session_participant_left → End call                    │
│  ├── call.session_ended      → Mark as processing                │
│  ├── call.transcription_ready → Save URL + trigger summary       │
│  ├── call.recording_ready    → Save recording URL                │
│  └── message.new            → AI chat response (GPT-4o)          │
│                                                                  │
│  Inngest (/api/inngest)                                          │
│  └── meetings/processing → Summarize transcript with GPT-4o      │
├──────────────────────────────────────────────────────────────────┤
│                        Data Layer                                 │
│                                                                  │
│  Neon PostgreSQL                                                 │
│  ├── user           (id, name, email, image, ...)                │
│  ├── session        (id, token, userId, expiresAt, ...)          │
│  ├── account        (id, providerId, userId, tokens, ...)        │
│  ├── verification   (id, identifier, value, expiresAt)           │
│  ├── agents         (id, name, description, instructions, ...)   │
│  └── meetings       (id, name, status, agentId, summary, ...)    │
├──────────────────────────────────────────────────────────────────┤
│                      External Services                            │
│                                                                  │
│  Stream IO          → Video calls, chat, transcription, recording│
│  OpenAI             → Realtime voice AI + GPT-4o text + Whisper  │
│  Polar.sh           → Subscription billing & customer portal     │
│  Inngest            → Background job processing                  │
│  DiceBear           → Avatar generation                          │
└──────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
elevateai/
├── public/                          # Static assets
│   ├── logo.svg                     # App logo
│   ├── cancelled.svg                # Meeting status illustration
│   ├── empty.svg                    # Empty state illustration
│   ├── processing.svg               # Processing state illustration
│   └── upcoming.svg                 # Upcoming state illustration
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (dashboard)/             # Dashboard route group (with sidebar layout)
│   │   │   ├── agents/              # /agents — Agent list & detail pages
│   │   │   ├── meetings/            # /meetings — Meeting list & detail pages
│   │   │   ├── upgrade/             # /upgrade — Premium subscription page
│   │   │   └── layout.tsx           # Dashboard layout (sidebar + navbar)
│   │   ├── api/
│   │   │   ├── auth/[...all]/       # Better Auth catch-all API route
│   │   │   ├── inngest/             # Inngest webhook endpoint
│   │   │   ├── trpc/[trpc]/         # tRPC catch-all API handler
│   │   │   └── webhook/             # Stream IO & Chat webhook handler
│   │   ├── auth/                    # Authentication pages
│   │   │   ├── sign-in/             # Sign-in page
│   │   │   ├── sign-up/             # Sign-up page
│   │   │   └── layout.tsx           # Auth layout
│   │   ├── call/                    # Video call pages
│   │   │   ├── [meetingId]/         # Dynamic call route
│   │   │   └── layout.tsx           # Call layout
│   │   ├── globals.css              # Global styles & CSS variables (light/dark)
│   │   ├── layout.tsx               # Root layout (TRPCProvider, NuqsAdapter, Toaster)
│   │   └── page.tsx                 # Landing page (/)
│   │
│   ├── components/                  # Shared components
│   │   ├── ui/                      # 53 shadcn/ui components
│   │   ├── command-select.tsx       # Command palette select
│   │   ├── data-pagination.tsx      # Reusable pagination component
│   │   ├── data-table.tsx           # Reusable data table component
│   │   ├── empty-state.tsx          # Empty state placeholder
│   │   ├── error-state.tsx          # Error state placeholder
│   │   ├── generated-avatar.tsx     # DiceBear avatar component
│   │   ├── loading-state.tsx        # Loading state placeholder
│   │   └── responsive-dialog.tsx    # Dialog (desktop) / Drawer (mobile)
│   │
│   ├── db/                          # Database
│   │   ├── index.ts                 # Drizzle client (Neon HTTP driver)
│   │   └── schema.ts               # Database schema (6 tables + 1 enum)
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-confirm.tsx          # Confirmation dialog hook
│   │   └── use-mobile.ts           # Mobile breakpoint detection
│   │
│   ├── inngest/                     # Background job processing
│   │   ├── client.ts               # Inngest client instance
│   │   └── functions.ts            # Meeting transcript summarization function
│   │
│   ├── lib/                         # Shared utilities & service clients
│   │   ├── auth.ts                  # Better Auth server config
│   │   ├── auth-client.ts          # Better Auth client config
│   │   ├── avatar.tsx              # DiceBear avatar URI generator
│   │   ├── polar.ts                # Polar.sh SDK client
│   │   ├── stream-chat.tsx         # Stream Chat server client
│   │   ├── stream-video.ts         # Stream Video server client
│   │   └── utils.ts                # General utilities (cn, etc.)
│   │
│   ├── modules/                     # Feature modules (domain-driven)
│   │   ├── agents/                  # Agents module
│   │   │   ├── hooks/              # Agent-specific hooks
│   │   │   ├── server/             # tRPC router (procedures.ts)
│   │   │   ├── ui/
│   │   │   │   ├── components/     # Agent form, columns, dialogs, filters
│   │   │   │   └── views/          # Agent list view, agent detail view
│   │   │   ├── params.ts           # URL search param definitions
│   │   │   ├── schemas.ts          # Zod validation schemas
│   │   │   └── types.ts            # TypeScript types (inferred from tRPC)
│   │   │
│   │   ├── auth/                    # Auth module
│   │   │   └── views/              # Sign-in view, sign-up view
│   │   │
│   │   ├── call/                    # Call module
│   │   │   └── ui/
│   │   │       ├── components/     # CallProvider, CallConnect, CallLobby,
│   │   │       │                   # CallActive, CallEnded, CallUI
│   │   │       └── views/          # CallView
│   │   │
│   │   ├── dashboard/               # Dashboard module
│   │   │   └── ui/
│   │   │       └── components/     # Sidebar, Navbar, Command, UserButton, Trial
│   │   │
│   │   ├── home/                    # Home/landing module
│   │   │   └── ui/                 # Home page components
│   │   │
│   │   ├── meetings/                # Meetings module
│   │   │   ├── hooks/              # Meeting-specific hooks
│   │   │   ├── server/             # tRPC router (procedures.ts)
│   │   │   ├── ui/
│   │   │   │   ├── components/     # Meeting form, columns, dialogs, filters,
│   │   │   │   │                   # status states, transcript, chat
│   │   │   │   └── views/          # Meeting list view, meeting detail view
│   │   │   ├── params.ts           # URL search param definitions
│   │   │   ├── schemas.ts          # Zod validation schemas
│   │   │   └── types.ts            # TypeScript types + MeetingStatus enum
│   │   │
│   │   └── premium/                 # Premium/billing module
│   │       ├── server/             # tRPC router (procedures.ts)
│   │       ├── ui/
│   │       │   ├── components/     # Pricing components
│   │       │   └── views/          # Upgrade view
│   │       └── constants.ts        # Free tier limits (1 agent, 6 meetings)
│   │
│   ├── trpc/                        # tRPC configuration
│   │   ├── client.tsx              # tRPC React client + QueryClient provider
│   │   ├── init.ts                 # tRPC initialization, base/protected/premium procedures
│   │   ├── query-client.ts         # TanStack QueryClient factory
│   │   ├── routers/
│   │   │   └── _app.ts            # Root app router (agents + meetings + premium)
│   │   └── server.tsx              # tRPC server caller
│   │
│   └── constants.ts                 # App-wide constants (pagination defaults)
│
├── drizzle.config.ts                # Drizzle Kit configuration
├── next.config.ts                   # Next.js config (React Compiler enabled)
├── components.json                  # shadcn/ui configuration (New York style)
├── tsconfig.json                    # TypeScript config (strict, path aliases)
├── postcss.config.mjs               # PostCSS config
├── eslint.config.mjs                # ESLint config
├── package.json                     # Dependencies & scripts
└── package-lock.json                # Lockfile
```

---

## Database Schema

The database runs on **Neon (Serverless PostgreSQL)** and is managed via **Drizzle ORM**. There are 6 tables and 1 custom enum.

### `meeting_status` (Enum)

| Value | Description |
|---|---|
| `upcoming` | Meeting has been created but not yet started |
| `active` | Meeting is currently in progress |
| `processing` | Meeting has ended, transcript is being summarized |
| `completed` | Summary is generated and meeting is finalized |
| `cancelled` | Meeting was cancelled |

### `user`

| Column | Type | Description |
|---|---|---|
| `id` | `text` (PK) | Unique user identifier |
| `name` | `text` | User's display name |
| `email` | `text` (unique) | User's email address |
| `email_verified` | `boolean` | Whether email is verified |
| `image` | `text` | Profile image URL |
| `created_at` | `timestamp` | Account creation time |
| `updated_at` | `timestamp` | Last update time |

### `session`

| Column | Type | Description |
|---|---|---|
| `id` | `text` (PK) | Session identifier |
| `token` | `text` (unique) | Session token |
| `user_id` | `text` (FK → user) | Owner of the session |
| `expires_at` | `timestamp` | Session expiry time |
| `ip_address` | `text` | Client IP address |
| `user_agent` | `text` | Client user agent string |
| `created_at` | `timestamp` | Session creation time |
| `updated_at` | `timestamp` | Last update time |

### `account`

| Column | Type | Description |
|---|---|---|
| `id` | `text` (PK) | Account identifier |
| `account_id` | `text` | External provider account ID |
| `provider_id` | `text` | Auth provider (github, google, credential) |
| `user_id` | `text` (FK → user) | Owner of the account |
| `access_token` | `text` | OAuth access token |
| `refresh_token` | `text` | OAuth refresh token |
| `id_token` | `text` | OAuth ID token |
| `scope` | `text` | Token scope |
| `password` | `text` | Hashed password (for email/password) |
| `created_at` | `timestamp` | Account creation time |
| `updated_at` | `timestamp` | Last update time |

### `verification`

| Column | Type | Description |
|---|---|---|
| `id` | `text` (PK) | Verification identifier |
| `identifier` | `text` | Verification target (e.g. email) |
| `value` | `text` | Verification token/code |
| `expires_at` | `timestamp` | Expiry time |
| `created_at` | `timestamp` | Creation time |
| `updated_at` | `timestamp` | Last update time |

### `agents`

| Column | Type | Description |
|---|---|---|
| `id` | `text` (PK, nanoid) | Unique agent identifier |
| `name` | `text` | Agent display name |
| `description` | `text` | Optional agent description |
| `user_id` | `text` (FK → user) | Creator/owner of the agent |
| `instructions` | `text` | System prompt / behavioral instructions for the AI |
| `created_at` | `timestamp` | Agent creation time |
| `updated_at` | `timestamp` | Last update time |

### `meetings`

| Column | Type | Description |
|---|---|---|
| `id` | `text` (PK, nanoid) | Unique meeting identifier |
| `name` | `text` | Meeting title |
| `user_id` | `text` (FK → user) | Meeting owner |
| `agent_id` | `text` (FK → agents) | AI agent assigned to the meeting |
| `status` | `meeting_status` | Current meeting lifecycle status |
| `started_at` | `timestamp` | When the call actually started |
| `ended_at` | `timestamp` | When the call ended |
| `transcript_url` | `text` | URL to the JSONL transcript file |
| `recording_url` | `text` | URL to the video recording |
| `summary` | `text` | AI-generated meeting summary (markdown) |
| `created_at` | `timestamp` | Meeting creation time |
| `updated_at` | `timestamp` | Last update time |

### Entity Relationship Diagram

```
user (1) ──────── (*) session
  │
  ├── (1) ──────── (*) account
  │
  ├── (1) ──────── (*) verification
  │
  ├── (1) ──────── (*) agents
  │                      │
  │                      └── (1) ──────── (*) meetings
  │
  └── (1) ──────── (*) meetings
```

---

## API Reference

All API routes are served via **tRPC v11** at `/api/trpc/[trpc]`. The router is split into three sub-routers:

### Agents Router (`trpc.agents.*`)

| Procedure | Type | Auth | Description |
|---|---|---|---|
| `agents.create` | Mutation | Premium | Create a new agent (name + instructions). Enforces free-tier limit. |
| `agents.getOne` | Query | Protected | Get a single agent by ID (includes meeting count). |
| `agents.getMany` | Query | Protected | List agents with pagination and search. |
| `agents.update` | Mutation | Protected | Update agent name and/or instructions. |
| `agents.remove` | Mutation | Protected | Delete an agent (cascades to associated meetings). |

### Meetings Router (`trpc.meetings.*`)

| Procedure | Type | Auth | Description |
|---|---|---|---|
| `meetings.create` | Mutation | Premium | Create a meeting + Stream Video call (with auto-transcription & recording). Enforces free-tier limit. |
| `meetings.getOne` | Query | Protected | Get a single meeting by ID (includes agent data & computed duration). |
| `meetings.getMany` | Query | Protected | List meetings with pagination, search, status filter, and agent filter. |
| `meetings.update` | Mutation | Protected | Update meeting details. |
| `meetings.remove` | Mutation | Protected | Delete a meeting. |
| `meetings.generateToken` | Mutation | Protected | Generate a Stream Video user token (valid for 1 hour). |
| `meetings.generateChatToken` | Mutation | Protected | Generate a Stream Chat user token. |
| `meetings.getTranscript` | Query | Protected | Fetch and parse the JSONL transcript with speaker identification. |

### Premium Router (`trpc.premium.*`)

| Procedure | Type | Auth | Description |
|---|---|---|---|
| `premium.getProducts` | Query | Protected | List available subscription products from Polar.sh. |
| `premium.getCurrentSubscription` | Query | Protected | Get the user's active subscription details. |
| `premium.getFreeUsage` | Query | Protected | Get current usage counts for free-tier users (meetings + agents). |

### Auth Middleware

| Middleware | Description |
|---|---|
| `protectedProcedure` | Verifies the user session via Better Auth. Rejects with `UNAUTHORIZED` if not authenticated. |
| `premiumProcedure("agents" \| "meetings")` | Extends `protectedProcedure`. Checks Polar.sh subscription status and enforces free-tier limits (1 agent, 6 meetings). Rejects with `FORBIDDEN` if limit reached. |

---

## Webhooks

The app exposes a single webhook endpoint at `POST /api/webhook` that handles events from both **Stream Video** and **Stream Chat**. All requests are verified via HMAC signature validation.

### Stream Video Events

| Event | Action |
|---|---|
| `call.session_started` | Sets meeting status to `active`, records `startedAt`, connects the AI agent to the call via OpenAI Realtime API (voice: `alloy`, VAD: `server_vad`, transcription: `whisper-1`). |
| `call.session_participant_left` | Ends the call via Stream Video SDK. |
| `call.session_ended` | Sets meeting status to `processing`, records `endedAt`. |
| `call.transcription_ready` | Saves the transcript URL, triggers the Inngest `meetings/processing` background job. |
| `call.recording_ready` | Saves the recording URL to the meeting record. |

### Stream Chat Events

| Event | Action |
|---|---|
| `message.new` | For completed meetings: retrieves the meeting summary and agent instructions, builds a conversation context from the last 5 messages, generates a GPT-4o response, and sends it as the agent in the chat channel. |

---

## Background Jobs

Background processing is handled by **Inngest** (event-driven serverless functions).

### `meetings/processing`

Triggered when a transcript becomes available after a meeting ends.

**Pipeline:**
1. **Fetch Transcript** — Downloads the JSONL transcript from the Stream-provided URL.
2. **Parse Transcript** — Parses the JSONL into structured `StreamTranscriptItem` objects.
3. **Add Speakers** — Resolves `speaker_id` values to user/agent names from the database.
4. **Summarize** — Sends the enriched transcript to GPT-4o via Inngest Agent Kit with a structured prompt that produces markdown with `### Overview` and `### Notes` sections.
5. **Save Summary** — Updates the meeting record with the generated summary and sets status to `completed`.

---

## Authentication

Authentication is powered by **Better Auth** with the following configuration:

- **Providers:** Email/Password, GitHub OAuth, Google OAuth
- **Database Adapter:** Drizzle ORM (PostgreSQL)
- **Session Storage:** Database-backed sessions with token, IP, and user-agent tracking
- **Trusted Origins:** `http://localhost:3000`, `https://elevateai-five.vercel.app`
- **Plugins:** Polar.sh integration (auto-creates Polar customer on sign-up, checkout flow, customer portal)

### Client-Side Auth

The auth client is created via `better-auth/react` with the Polar client plugin, providing React hooks like `useSession()` for client components.

---

## Premium & Billing

Billing is managed through **Polar.sh** (sandbox environment).

### Free Tier Limits

| Resource | Limit |
|---|---|
| Agents | 1 |
| Meetings | 6 |

### Premium Features
- **Unlimited agents**
- **Unlimited meetings**
- Managed via `premiumProcedure` tRPC middleware that checks the user's active Polar.sh subscription before allowing resource creation.

### Billing Flow
1. User visits `/upgrade` page
2. Available products are fetched from Polar.sh
3. User initiates checkout (authenticated users only)
4. On success, redirected back to `/upgrade`
5. Polar.sh customer portal available for subscription management

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# ─── Database ───────────────────────────────────────────────
DATABASE_URL=                    # Neon PostgreSQL connection string

# ─── Authentication ─────────────────────────────────────────
BETTER_AUTH_URL=                 # Base URL for Better Auth (e.g. http://localhost:3000)

# ─── GitHub OAuth ───────────────────────────────────────────
GITHUB_CLIENT_ID=                # GitHub OAuth App client ID
GITHUB_CLIENT_SECRET=            # GitHub OAuth App client secret

# ─── Google OAuth ───────────────────────────────────────────
GOOGLE_CLIENT_ID=                # Google OAuth client ID
GOOGLE_CLIENT_SECRET=            # Google OAuth client secret

# ─── Polar.sh (Billing) ────────────────────────────────────
POLAR_ACCESS_TOKEN=              # Polar.sh API access token

# ─── Stream Chat ────────────────────────────────────────────
NEXT_PUBLIC_STREAM_CHAT_API_KEY= # Stream Chat public API key (exposed to client)
STREAM_CHAT_SECRET_KEY=          # Stream Chat secret key (server-only)

# ─── Stream Video ───────────────────────────────────────────
NEXT_PUBLIC_STREAM_VIDEO_API_KEY= # Stream Video public API key (exposed to client)
STREAM_VIDEO_SECRET_KEY=          # Stream Video secret key (server-only)

# ─── OpenAI ─────────────────────────────────────────────────
OPENAI_API_KEY=                  # OpenAI API key (GPT-4o + Realtime API)
```

### External Service Setup

| Service | Setup URL | Notes |
|---|---|---|
| **Neon** | [neon.tech](https://neon.tech/) | Create a PostgreSQL database, copy the connection string |
| **GitHub OAuth** | [GitHub Developer Settings](https://github.com/settings/developers) | Create an OAuth App, set callback to `{BETTER_AUTH_URL}/api/auth/callback/github` |
| **Google OAuth** | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) | Create OAuth 2.0 credentials, set redirect URI to `{BETTER_AUTH_URL}/api/auth/callback/google` |
| **Stream** | [getstream.io](https://getstream.io/) | Create an app, enable Video & Chat, configure webhooks to point to `{YOUR_DOMAIN}/api/webhook` |
| **Polar.sh** | [polar.sh](https://polar.sh/) | Create an organization, set up products, get API access token |
| **OpenAI** | [platform.openai.com](https://platform.openai.com/) | Generate an API key with access to GPT-4o and Realtime API |
| **Inngest** | [inngest.com](https://www.inngest.com/) | Sign up and connect — the app auto-registers functions at `/api/inngest` |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm**, **yarn**, **pnpm**, or **bun**
- A **Neon** PostgreSQL database
- API keys for **Stream IO**, **OpenAI**, **Polar.sh**, **GitHub OAuth**, and **Google OAuth**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/elevateai.git
cd elevateai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your actual values (see Environment Variables section)

# 4. Push the database schema to Neon
npm run db:push

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Webhook Development (Local)

For local development, you need to expose your local server to receive Stream webhooks. The project includes an ngrok script:

```bash
# Start ngrok tunnel (requires ngrok installed and configured)
npm run dev:webhook
```

Configure your Stream Dashboard to send webhooks to the ngrok URL + `/api/webhook`.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start the Next.js development server (webpack mode) |
| `build` | `npm run build` | Build the production application |
| `start` | `npm run start` | Start the production server |
| `lint` | `npm run lint` | Run ESLint |
| `db:push` | `npm run db:push` | Push Drizzle schema changes to the database |
| `db:studio` | `npm run db:studio` | Open Drizzle Studio (database GUI) |
| `dev:webhook` | `npm run dev:webhook` | Start ngrok tunnel for webhook development |

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Add all environment variables in the Vercel project settings
4. Deploy

Vercel will automatically detect Next.js and configure the build.

### Post-Deployment Checklist

- [ ] Add your production URL to `trustedOrigins` in `src/lib/auth.ts`
- [ ] Set `BETTER_AUTH_URL` to your production URL
- [ ] Update Stream Dashboard webhook URL to `https://your-domain.com/api/webhook`
- [ ] Update GitHub OAuth callback URL to `https://your-domain.com/api/auth/callback/github`
- [ ] Update Google OAuth redirect URI to `https://your-domain.com/api/auth/callback/google`
- [ ] Connect Inngest to your production deployment
- [ ] Switch Polar.sh from `sandbox` to `production` in `src/lib/polar.ts` if going live

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is private and not currently licensed for public distribution.
