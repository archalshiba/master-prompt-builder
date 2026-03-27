# Technical Plan: Master Prompt Builder

## High-Level Architecture
Monolithic full-stack app ? Microservices if scaled.

```
Frontend (Next.js 15) ?? API (Node/Express) ?? LLM Gateway (LiteLLM)
                          ?
                     Storage (Supabase/Postgres + Vector DB)
```

## Components Breakdown
1. **Frontend Dashboard** (React/Next.js + Tailwind/Shadcn):
   - Pages: /dashboard (main ops room).
   - State: Zustand (idea, critique, refinements, outputs).
   - UI: 
     - Left Panel: Idea textarea + Critique cards.
     - Center: Tabs (Refine: dropdowns for tech/complexity; Settings).
     - Right: Ace Editor previews for outputs.
     - Bottom: Trace viewer (editable MD).

2. **Backend API** (Node/Express + tRPC):
   - Endpoints:
     | Endpoint | Purpose | Agents Called |
     |----------|---------|---------------|
     | /critique | Analyze idea | Critic Agent |
     | /refine | Generate suggestions | Refiner Agent |
     | /generate | Build outputs | Spec + Reviewer |
     | /export | Zip package | N/A |
   - Auth: Clerk/Supabase Auth.

3. **Agents Layer** (LangGraph/CrewAI):
   - Pipeline: Critic ? Refiner ? Spec ? Reviewer.
   - Prompts: Stored in /prompts/ folder (meta-prompts).
   - Models: Claude-3.5 for generation; Gemini-1.5-flash for critique.

4. **Data Flow**:
   ```
   User Idea ? Critic (search competitors) ? Suggestions (dropdown data)
              ?
   User Selections ? Spec Gen (templates + LLM) ? Outputs (MD/YAML)
              ?
   Reviewer Audit ? Editable Previews ? Export Zip
   ```

5. **Storage**:
   - Postgres: Users, Sessions, Traces.
   - Vector DB (pgvector): Idea embeddings for similar suggestions.

6. **Deployment**:
   - Vercel (Frontend/API).
   - Supabase (DB).
   - LLM: External APIs.

7. **Tech Stack Decision Matrix**
   | Category | Choice | Why |
   |----------|--------|-----|
   | Frontend | Next.js + Shadcn | Responsive dashboard, SSR for SEO |
   | Backend | Node/tRPC | Type-safe, fast prototyping |
   | Agents | LangGraph | Pipeline control, memory |
   | DB | Supabase | Instant setup, auth+vector |
   | Styling | Tailwind | Rapid UI for dropdowns/panels |

## Implementation Phases
- Phase 1: UI skeleton + mock agents.
- Phase 2: Integrate LLM pipeline.
- Phase 3: Outputs generation + export.
- Phase 4: Polish (i18n Arabic, tests).

