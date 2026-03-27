# Master Prompt Builder Dashboard

A Vibe Coding "command center" that helps non-technical users transform vague app ideas into structured Master Prompts + comprehensive specs.

## Overview

This tool bridges the gap from "vague idea" → "production-ready prompt package" via AI agents + an interactive dashboard.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **API Layer**: tRPC
- **Database**: PostgreSQL (via Prisma/Supabase)
- **LLM Integration**: LiteLLM (Claude/Gemini ready)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and navigate to `/dashboard`.

## Features (MVP)

- [x] Idea input with auto-critique
- [x] Multi-agent pipeline (Critic → Refiner → Spec Generator → Reviewer)
- [x] Dashboard UI with 4 panels (Left: Idea/Critique, Center: Refinements, Right: Outputs, Bottom: Trace)
- [ ] Real LLM integration
- [ ] Export package (ZIP download)
- [ ] User authentication
- [ ] Arabic/English i18n

## Project Structure

```
src/
├── app/
│   ├── dashboard/     # Main dashboard page
│   └── page.tsx       # Redirects to dashboard
├── components/
│   └── panels/        # UI panel components
├── lib/
│   ├── agents.ts      # Multi-agent pipeline (mock)
│   └── store.ts       # Zustand state management
prisma/
└── schema.prisma      # Database schema
```

## Documentation

- [PRD.md](./PRD.md) - Product Requirements Document
- [plan.md](./plan.md) - Technical Implementation Plan
- [tasks.yaml](./tasks.yaml) - Sequential Build Tasks
- [agent_instructions.md](./agent_instructions.md) - Agent Core Rules
- [execution_trace.md](./execution_trace.md) - Build Log

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
DATABASE_URL="postgresql://..."
GEMINI_API_KEY="..."  # Coming soon
```

## Tasks Progress

- [x] T01 - Project Setup & Boilerplate
- [ ] T02 - Core UI Components (Panels)
- [ ] T03 - Backend API Endpoints
- [ ] T04 - Agents Pipeline (LangGraph)
- [ ] T05 - Outputs Generation & Export
- [ ] T06 - Trace Integration, Auth, Polish

## License

MIT
