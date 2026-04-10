import { CritiqueItem, RefinementOption, GeneratedOutputs } from './store';
import { CRITIC_PROMPT, REFINER_PROMPT, SPEC_GENERATOR_PROMPT, REVIEWER_PROMPT } from './prompts/agent-prompts';

const GEMINI_MODEL = 'gemini-2.0-flash';

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured. Please add to Vercel environment variables.');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', response.status, errorText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  if (!text) {
    throw new Error('Empty response from Gemini API');
  }
  
  return text;
}

function parseJSONResponse<T>(text: string): T {
  const jsonMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1] || jsonMatch[0]);
  }
  return JSON.parse(text);
}

export async function runCriticAgent(idea: string): Promise<CritiqueItem[]> {
  const prompt = CRITIC_PROMPT.replace('{idea}', idea);
  
  if (!process.env.GEMINI_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    return [
      { id: 'comp-1', type: 'competitor', title: 'Product A', description: 'Market leader with strong brand recognition. Consider focusing on a different segment or unique angle.' },
      { id: 'comp-2', type: 'competitor', title: 'Product B', description: 'Open-source alternative with loyal community. Technical users may prefer this.' },
      { id: 'comp-3', type: 'competitor', title: 'Product C', description: 'Recently launched with modern UI. May be moving fast.' },
      { id: 'risk-1', type: 'risk', title: 'Market Saturation', description: 'Similar products exist. Clear differentiation is essential for success.' },
      { id: 'risk-2', type: 'risk', title: 'User Acquisition', description: 'Standing out requires strong positioning and marketing strategy.' },
      { id: 'strength-1', type: 'strength', title: 'Unique Approach', description: 'Structured Vibe Coding workflow could attract users frustrated with existing tools.' },
    ];
  }

  try {
    const response = await callGemini(prompt);
    return parseJSONResponse<CritiqueItem[]>(response);
  } catch (error) {
    console.error('Critic agent failed:', error);
    throw error;
  }
}

export async function runRefinerAgent(
  idea: string,
  critique: CritiqueItem[]
): Promise<Partial<RefinementOption>> {
  const prompt = REFINER_PROMPT
    .replace('{idea}', idea)
    .replace('{critique}', JSON.stringify(critique, null, 2));
    
  if (!process.env.GEMINI_API_KEY) {
    await new Promise((r) => setTimeout(r, 300));
    return {
      techStack: ['Next.js', 'TypeScript', 'Tailwind'],
      complexity: 'medium',
      niche: 'Vibe Coding / AI-assisted development tools',
      targetAudience: ['Beginner makers', 'Non-technical entrepreneurs'],
    };
  }

  try {
    const response = await callGemini(prompt);
    return parseJSONResponse<Partial<RefinementOption>>(response);
  } catch (error) {
    console.error('Refiner agent failed:', error);
    throw error;
  }
}

export async function runSpecGenerator(
  idea: string,
  refinements: RefinementOption
): Promise<GeneratedOutputs> {
  const prompt = SPEC_GENERATOR_PROMPT
    .replace('{idea}', idea)
    .replace('{techStack}', refinements.techStack.join(', '))
    .replace('{complexity}', refinements.complexity)
    .replace('{targetAudience}', refinements.targetAudience.join(', '))
    .replace('{niche}', refinements.niche);
    
  if (!process.env.GEMINI_API_KEY) {
    await new Promise((r) => setTimeout(r, 800));
    return {
      masterPrompt: `# Master Prompt: ${idea}\n\n## Overview\nBuild a modern web application using ${refinements.techStack.join(', ')}.\n\n## Requirements\n- Complexity: ${refinements.complexity}\n- Target: ${refinements.targetAudience.join(', ')}`,
      prd: `# Product Requirements Document\n\n## ${idea}\n\n## Problem Statement\n[Auto-generated based on user input]\n\n## Key Features\n- Core feature set for MVP\n- User-friendly interface\n- Scalable architecture`,
      plan: `# Technical Plan\n\n## Architecture\n- Frontend: ${refinements.techStack.filter(t => ['Next.js', 'React', 'Vue'].includes(t)).join(', ') || 'Next.js'}\n- Styling: Tailwind CSS\n- Complexity: ${refinements.complexity}`,
      tasks: `tasks:\n  - id: T01\n    title: Project Setup\n    depends_on: []\n    description: Initialize project with ${refinements.techStack[0] || 'Next.js'}\n  - id: T02\n    title: Core Features\n    depends_on: [T01]\n    description: Implement main functionality\n  - id: T03\n    title: Testing & Polish\n    depends_on: [T02]\n    description: Add tests and final touches`,
      agentInstructions: `# Agent Instructions\n\n## Role\nSenior Full-Stack Developer\n\n## Tech Stack\n${refinements.techStack.join(', ')}\n\n## Guidelines\n- Follow best practices\n- Write clean, maintainable code\n- Include tests`,
      userInstructions: `# User Instructions\n\n## Prerequisites\n- Node.js 18+\n- npm or yarn\n\n## Getting Started\n1. \`npm install\`\n2. \`npm run dev\`\n3. Open http://localhost:3000`,
    };
  }

  try {
    const response = await callGemini(prompt);
    return parseJSONResponse<GeneratedOutputs>(response);
  } catch (error) {
    console.error('Spec generator failed:', error);
    throw error;
  }
}

export async function runReviewerAgent(outputs: GeneratedOutputs): Promise<{issues: Array<{type: string; severity: string; message: string}>; score: number; recommendations: string[]}> {
  const prompt = REVIEWER_PROMPT.replace('{outputs}', JSON.stringify(outputs, null, 2));
  
  if (!process.env.GEMINI_API_KEY) {
    await new Promise((r) => setTimeout(r, 400));
    return {
      issues: [],
      score: 85,
      recommendations: [
        'Consider adding more specific acceptance criteria to tasks',
        'Review complexity level matches actual requirements',
      ],
    };
  }

  try {
    const response = await callGemini(prompt);
    return parseJSONResponse(response);
  } catch (error) {
    console.error('Reviewer agent failed:', error);
    throw error;
  }
}

export async function runFullPipeline(idea: string): Promise<{outputs: GeneratedOutputs; critique: CritiqueItem[]; refinements: Partial<RefinementOption>; review?: {score: number; issues: unknown[]}}> {
  const critique = await runCriticAgent(idea);
  const refinements = await runRefinerAgent(idea, critique);
  const outputs = await runSpecGenerator(idea, refinements as RefinementOption);
  const review = await runReviewerAgent(outputs);
  
  return { outputs, critique, refinements, review };
}
