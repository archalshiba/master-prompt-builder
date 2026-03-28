# Master Prompt Builder Dashboard

A Vibe Coding "command center" that helps non-technical users transform vague app ideas into structured Master Prompts + comprehensive specs.

## Overview

This tool bridges the gap from "vague idea" → "production-ready prompt package" via AI agents + an interactive dashboard.

## Features (MVP)

- [x] Idea input with AI-powered critique
- [x] Multi-agent pipeline (Critic → Refiner → Spec Generator → Reviewer)
- [x] Dashboard UI with 4 panels (Idea/Critique, Refinements, Outputs, Trace)
- [x] Real LLM integration with Gemini API
- [x] Export package (ZIP download with all 6 files)
- [x] State persistence (localStorage)
- [ ] User authentication (Supabase - ready to configure)
- [ ] Arabic/English i18n (translations ready)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **State Management**: Zustand (with persistence)
- **API Layer**: tRPC
- **LLM**: Gemini API (gemini-1.5-flash)
- **Database**: Supabase (ready to configure)
- **Auth**: Supabase Auth (ready to configure)

## Quick Start

```bash
# 1. Clone and install
npm install

# 2. Add your Gemini API key to .env.local
echo "GEMINI_API_KEY=your_key_here" > .env.local

# 3. Run development server
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Environment Variables

```bash
# Required for LLM (get from https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key

# Optional - for database persistence
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy!

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed guide.

### Supabase Setup

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for database configuration.

## Project Structure

```
src/
├── app/
│   ├── api/trpc/     # tRPC API routes
│   ├── dashboard/    # Main dashboard page
│   └── page.tsx     # Redirects to dashboard
├── components/
│   └── panels/       # UI panel components
├── lib/
│   ├── llm-service.ts      # Gemini API integration
│   ├── prompts/           # Agent prompt templates
│   ├── store.ts           # Zustand state (persisted)
│   ├── supabase.ts        # Supabase client
│   └── i18n.ts            # Translations (en/ar)
├── server/
│   ├── router.ts          # tRPC router
│   └── trpc.ts           # tRPC setup
└── trpc/
    ├── client.ts          # tRPC React client
    └── provider.tsx       # tRPC provider
```

## Generated Output Package

The tool generates 6 files ready for Vibe Coding:

1. **master_prompt.md** - Comprehensive prompt for AI coding assistants
2. **PRD.md** - Product Requirements Document
3. **plan.md** - Technical Plan
4. **tasks.yaml** - Sequential build tasks
5. **agent_instructions.md** - Guidelines for AI agents
6. **user_instructions.md** - Setup and usage guide

## Documentation

- [PRD.md](./PRD.md) - Product Requirements Document
- [plan.md](./plan.md) - Technical Implementation Plan
- [tasks.yaml](./tasks.yaml) - Sequential Build Tasks
- [agent_instructions.md](./agent_instructions.md) - Agent Core Rules
- [execution_trace.md](./execution_trace.md) - Build Log
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Deployment Guide
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database Setup

## Tasks Progress

- [x] T01 - Project Setup & Boilerplate
- [x] T02 - Core UI Components (Panels)
- [x] T03 - Backend API Endpoints
- [x] T04 - Agents Pipeline (Gemini LLM)
- [x] T05 - Outputs Generation & Export
- [x] T06 - Trace Integration, Auth, Polish

## License

MIT
