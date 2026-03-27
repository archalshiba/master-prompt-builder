import { CritiqueItem, RefinementOption, GeneratedOutputs } from './store';

export async function runCriticAgent(idea: string): Promise<CritiqueItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    {
      id: 'comp-1',
      type: 'competitor',
      title: 'Similar Product A',
      description: 'Established competitor with 50k+ users. Consider differentiation.',
    },
    {
      id: 'comp-2',
      type: 'competitor',
      title: 'Similar Product B',
      description: 'Open source alternative. May attract technical users.',
    },
    {
      id: 'comp-3',
      type: 'competitor',
      title: 'Similar Product C',
      description: 'New entrant with AI features. Fast moving.',
    },
    {
      id: 'risk-1',
      type: 'risk',
      title: 'Market Saturation',
      description: 'Similar apps exist. Focus on specific niche.',
    },
    {
      id: 'risk-2',
      type: 'risk',
      title: 'Token Limits',
      description: 'Complex projects may hit context limits in AI tools.',
    },
    {
      id: 'strength-1',
      type: 'strength',
      title: 'Unique Value',
      description: 'Structured approach to prompt engineering is novel.',
    },
  ];
}

export async function runRefinerAgent(
  idea: string,
  critique: CritiqueItem[]
): Promise<Partial<RefinementOption>> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    techStack: ['Next.js', 'TypeScript', 'Tailwind'],
    complexity: 'medium',
    niche: 'Vibe Coding / AI-assisted development',
    targetAudience: ['Beginner makers', 'Non-technical entrepreneurs'],
  };
}

export async function runSpecGenerator(
  idea: string,
  refinements: RefinementOption
): Promise<GeneratedOutputs> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  return {
    masterPrompt: `# Master Prompt: ${idea}\n\n## Overview\nStructured prompt for building this application.\n\n## Requirements\n- Tech Stack: ${refinements.techStack.join(', ')}\n- Complexity: ${refinements.complexity}\n- Target: ${refinements.targetAudience.join(', ')}`,
    prd: `# Product Requirements Document\n\n## ${idea}\n\n## Problem Statement\n[Auto-generated based on user input]\n\n## Key Features\n- Feature 1\n- Feature 2\n- Feature 3`,
    plan: `# Technical Plan\n\n## Architecture\n- Frontend: Next.js\n- Backend: API routes\n- Styling: Tailwind CSS`,
    tasks: `tasks:\n  - id: CUSTOM-01\n    title: Initial setup\n    depends_on: []\n    description: Setup project structure`,
    agentInstructions: `# Agent Instructions\n\n## Role\nSenior Full-Stack Developer\n\n## Guidelines\n- Follow best practices\n- Write clean code\n- Add tests`,
    userInstructions: `# User Instructions\n\n## Getting Started\n1. Run npm install\n2. Run npm run dev\n3. Open http://localhost:3000`,
  };
}

export async function runReviewerAgent(outputs: GeneratedOutputs): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  const issues: string[] = [];
  
  if (outputs.masterPrompt.length < 100) {
    issues.push('Master prompt seems too short');
  }
  
  return issues;
}

export async function runFullPipeline(idea: string): Promise<GeneratedOutputs> {
  const critique = await runCriticAgent(idea);
  const refinements = await runRefinerAgent(idea, critique);
  const outputs = await runSpecGenerator(idea, refinements as RefinementOption);
  const issues = await runReviewerAgent(outputs);
  
  if (issues.length > 0) {
    console.warn('Reviewer issues:', issues);
  }
  
  return outputs;
}
