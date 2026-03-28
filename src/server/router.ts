import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { RefinementOption } from '@/lib/store';
import { runCriticAgent, runRefinerAgent, runSpecGenerator, runReviewerAgent } from '@/lib/llm-service';

export const appRouter = router({
  critique: publicProcedure
    .input(z.object({ idea: z.string().min(1).max(2000) }))
    .mutation(async ({ input }) => {
      const critique = await runCriticAgent(input.idea);
      return { critique };
    }),

  refine: publicProcedure
    .input(z.object({ idea: z.string(), critique: z.array(z.any()) }))
    .mutation(async ({ input }) => {
      const refinements = await runRefinerAgent(input.idea, input.critique);
      return { refinements };
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
      const refinements: RefinementOption = {
        techStack: input.refinements.techStack,
        complexity: input.refinements.complexity,
        niche: input.refinements.niche,
        targetAudience: input.refinements.targetAudience,
      };
      
      const outputs = await runSpecGenerator(input.idea, refinements);
      const review = await runReviewerAgent(outputs);
      
      return { outputs, review };
    }),

  generateAll: publicProcedure
    .input(z.object({ idea: z.string().min(1).max(2000) }))
    .mutation(async ({ input }) => {
      const critique = await runCriticAgent(input.idea);
      const refinements = await runRefinerAgent(input.idea, critique);
      const outputs = await runSpecGenerator(input.idea, refinements as RefinementOption);
      const review = await runReviewerAgent(outputs);
      
      return { 
        critique, 
        refinements, 
        outputs, 
        review 
      };
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
    .mutation(async () => {
      return { 
        success: true, 
        message: 'Package ready for download',
      };
    }),
});

export type AppRouter = typeof appRouter;
