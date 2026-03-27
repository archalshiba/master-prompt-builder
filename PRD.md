# PRD: Master Prompt Builder Dashboard

## 1. Problem Statement
Non-technical users have simple app ideas but struggle with Vibe Coding tools (Antigravity, OpenCode) due to poor prompts, context loss, token limits, and hallucinations in complex projects. Existing tools assume coding knowledge; beginners need a "command center" to refine ideas into structured Master Prompts + specs.

**Gap Filled**: Bridge from "vague idea" ? "production-ready prompt package" via AI agents + interactive dashboard.

## 2. Target Users
- **Primary**: Beginner makers, entrepreneurs, non-devs (idea ? MVP).
- **Secondary**: Junior devs learning prompt engineering.
- **Personas**:
  | Persona | Needs | Pain Points |
  |---------|-------|-------------|
  | Ahmed (Entrepreneur, Yemen) | Fast MVP from idea | Can't write detailed specs; context drifts in Antigravity |
  | Sarah (Student) | Learn Vibe Coding | Overwhelmed by token limits/hallucinations |
  | Team Lead | Scale prototypes | Maintain context across agent sessions |

## 3. Key Features (MVP Scope)
- **Idea Input**: Textarea + auto-critique (competitors, failure risks).
- **Multi-Agent Pipeline**:
  1. Critic Agent: Market analysis, 3 competitors, 10yr viability risks.
  2. Refiner Agent: Suggestions (dropdowns/toggles) for pivots/improvements.
  3. Spec Generator: Build PRD/plan/tasks/master_prompt.
  4. Reviewer: Final audit.
- **Dashboard UI** (\"Operations Room\"):
  - Left: Idea + Critique panel.
  - Center: Refinement options (dropdowns: tech stack, complexity, niche).
  - Right: Outputs preview (editable MD/YAML).
  - Bottom: Trace/versions.
- **Outputs Package** (Large, detailed):
  - master_prompt.md, PRD.md, plan.md, tasks.yaml, agent_instructions.md, execution_trace.md, user_instructions.md.
- **Export**: Copy/Zip/Download for Antigravity/OpenCode.

**Out of Scope (MVP)**: Real-time LLM integration (use external APIs), mobile app, advanced auth.

## 4. Non-Functional Requirements
- **Performance**: <2s agent responses; handle 10k+ word outputs.
- **Security**: Sanitize inputs; no code exec in frontend.
- **Scalability**: Serverless backend; 100 concurrent users.
- **Accessibility**: Arabic/English; responsive design.
- **Tech Constraints**: Next.js frontend, Node/Supabase backend, LLM via LiteLLM (Claude/Gemini).

## 5. Success Metrics
- User: 80% convert idea to outputs in <10min.
- Outputs: Prompts >5k words, structured, hallucination-free.
- Retention: 50% users build MVP in Antigravity post-export.

## 6. Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| LLM Hallucinations | Multi-agent review + fixed templates |
| Context Drift | execution_trace.md updates |
| Cost Overruns | Task chunking + cheap models for critique |
| Market Saturation | Focus on Vibe Coding niche (Antigravity-specific) |

