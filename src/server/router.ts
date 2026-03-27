import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { CritiqueItem, RefinementOption, GeneratedOutputs } from '@/lib/store';

const mockCritique: CritiqueItem[] = [
  { id: 'comp-1', type: 'competitor', title: 'Similar Product A', description: 'Established competitor with 50k+ users. Consider differentiation.' },
  { id: 'comp-2', type: 'competitor', title: 'Similar Product B', description: 'Open source alternative. May attract technical users.' },
  { id: 'comp-3', type: 'competitor', title: 'Similar Product C', description: 'New entrant with AI features. Fast moving.' },
  { id: 'risk-1', type: 'risk', title: 'Market Saturation', description: 'Similar apps exist. Focus on specific niche.' },
  { id: 'risk-2', type: 'risk', title: 'Token Limits', description: 'Complex projects may hit context limits in AI tools.' },
  { id: 'strength-1', type: 'strength', title: 'Unique Value', description: 'Structured approach to prompt engineering is novel.' },
];

const mockRefinements: Partial<RefinementOption> = {
  techStack: ['Next.js', 'TypeScript', 'Tailwind'],
  complexity: 'medium',
  niche: 'Vibe Coding / AI-assisted development',
  targetAudience: ['Beginner makers', 'Non-technical entrepreneurs'],
};

const mockOutputs: GeneratedOutputs = {
  masterPrompt: `# Master Prompt\n\nDetailed prompt for building the application based on user specifications.`,
  prd: `# Product Requirements Document\n\n## Overview\nDetailed PRD based on user input.`,
  plan: `# Technical Plan\n\n## Architecture\n- Frontend: Next.js\n- Backend: API routes\n- Styling: Tailwind CSS`,
  tasks: `tasks:\n  - id: CUSTOM-01\n    title: Initial setup\n    depends_on: []\n    description: Setup project structure`,
  agentInstructions: `# Agent Instructions\n\n## Role\nSenior Full-Stack Developer\n\n## Guidelines\n- Follow best practices\n- Write clean code\n- Add tests`,
  userInstructions: `# User Instructions\n\n## Getting Started\n1. Run npm install\n2. Run npm run dev\n3. Open http://localhost:3000`,
};

export const appRouter = router({
  critique: publicProcedure
    .input(z.object({ idea: z.string().min(1).max(2000) }))
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { critique: mockCritique };
    }),

  refine: publicProcedure
    .input(z.object({ idea: z.string(), critique: z.array(z.any()) }))
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { refinements: mockRefinements };
    }),

  generate: publicProcedure
    .input(z.object({
      idea: z.string(),
      refinements: z.object({
        techStack: z.array(z.string()),
        complexity: z.enum(['simple', 'medium', 'advanced']),
        niche: z.string(),
        targetAudience: z.array(z.string()),
      }),
    }))
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const outputs: GeneratedOutputs = {
        masterPrompt: `# Master Prompt: ${input.idea}\n\n## Overview\nStructured prompt for building this application.\n\n## Tech Stack\n${input.refinements.techStack.join(', ')}\n\n## Complexity\n${input.refinements.complexity}\n\n## Target Audience\n${input.refinements.targetAudience.join(', ')}`,
        prd: `# Product Requirements Document\n\n## ${input.idea}\n\n## Problem Statement\n[Auto-generated based on user input]\n\n## Key Features\n- Feature 1\n- Feature 2\n- Feature 3`,
        plan: `# Technical Plan\n\n## Architecture\n- Frontend: ${input.refinements.techStack.filter(t => ['Next.js', 'React', 'Vue', 'Svelte'].includes(t)).join(', ') || 'Next.js'}\n- Backend: API routes\n- Styling: Tailwind CSS\n\n## Complexity: ${input.refinements.complexity}`,
        tasks: `tasks:\n  - id: CUSTOM-01\n    title: Initial setup\n    depends_on: []\n    description: Setup project structure\n  - id: CUSTOM-02\n    title: Core features\n    depends_on: [CUSTOM-01]\n    description: Implement core functionality\n  - id: CUSTOM-03\n    title: Testing\n    depends_on: [CUSTOM-02]\n    description: Add tests and polish`,
        agentInstructions: `# Agent Instructions\n\n## Role\nSenior Full-Stack Developer\n\n## Tech Stack\n${input.refinements.techStack.join(', ')}\n\n## Complexity Target\n${input.refinements.complexity}\n\n## Guidelines\n- Follow best practices\n- Write clean, maintainable code\n- Add tests`,
        userInstructions: `# User Instructions\n\n## Prerequisites\n- Node.js 18+\n- npm or yarn\n\n## Getting Started\n1. Run \`npm install\`\n2. Run \`npm run dev\`\n3. Open http://localhost:3000`,
      };
      
      return { outputs };
    }),

  export: publicProcedure
    .input(z.object({
      outputs: z.object({
        masterPrompt: z.string(),
        prd: z.string(),
        plan: z.string(),
        tasks: z.string(),
        agentInstructions: z.string(),
        userInstructions: z.string(),
      }),
    }))
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { 
        success: true, 
        message: 'Package ready for download',
        files: Object.keys(input.outputs).length 
      };
    }),
});

export type AppRouter = typeof appRouter;
