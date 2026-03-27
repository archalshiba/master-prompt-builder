# User Instructions: How to Use These Files in Google Antigravity + OpenCode

## Overview
This package transforms your simple idea into a structured **Master Prompt system** for Vibe Coding tools like Google Antigravity and OpenCode. It bridges the gap between beginner ideas and production-ready specs, ensuring agents maintain context, avoid drift, and produce scalable code.

## Step-by-Step Setup in Google Antigravity
1. **Create New Project**:
   - Open Antigravity IDE.
   - Create a new workspace/folder (e.g., `master-prompt-builder`).
   - Paste all files from this package into the root (`user_instructions.md`, `agent_instructions.md`, `PRD.md`, `plan.md`, `tasks.yaml`, `master_prompt.md`, `execution_trace.md`).

2. **Open Terminal & Launch OpenCode**:
   ```
   opencode --project . --system-prompt-file master_prompt.md
   ```
   - Or if CLI supports: `opencode init-from-spec PRD.md plan.md tasks.yaml`.

3. **Initial Agent Boot**:
   - Tell OpenCode: "Read agent_instructions.md, PRD.md, plan.md. Initialize execution_trace.md. Start with Task T01 from tasks.yaml."
   - You MUST read `agent_instructions.md` BEFORE any task.

4. **Workflow Loop**:
   - Agent executes one task at a time (from `tasks.yaml`).
   - After each task: Agent appends to `execution_trace.md` (summary, decisions, changes).
   - If you add changes: Update PRD.md/plan.md first, then re-run relevant tasks.
   - Review `execution_trace.md` to maintain context across sessions.

## Best Practices
- **Avoid Free-Form Prompts**: Always reference files (e.g., "Implement T02 per PRD.md").
- **Context Management**: Feed `execution_trace.md` + relevant task prompt to prevent hallucinations.
- **Token Limits**: Tasks are small; run sequentially.
- **Debugging**: If drift occurs, reset with: "Re-read all .md files and execution_trace.md."
- **Export**: Once built, zip workspace for deployment.

## Tool-Specific Tips
- **Antigravity**: Drop files into workspace; use @mention for agents referencing `master_prompt.md`.
- **OpenCode CLI**: `opencode exec-task T03 --context execution_trace.md PRD.md`.
- **Cursor/Windsurf Fallback**: Copy `master_prompt.md` to `.cursorrules`.

For issues, update your idea in PRD.md and regenerate via this tool.