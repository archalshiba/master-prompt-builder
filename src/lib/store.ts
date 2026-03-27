import { create } from 'zustand';

export interface CritiqueItem {
  id: string;
  type: 'competitor' | 'risk' | 'strength';
  title: string;
  description: string;
}

export interface RefinementOption {
  techStack: string[];
  complexity: 'simple' | 'medium' | 'advanced';
  niche: string;
  targetAudience: string[];
}

export interface GeneratedOutputs {
  masterPrompt: string;
  prd: string;
  plan: string;
  tasks: string;
  agentInstructions: string;
  userInstructions: string;
}

export interface ExecutionTraceEntry {
  id: string;
  timestamp: string;
  action: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
}

interface AppState {
  idea: string;
  critique: CritiqueItem[];
  refinements: RefinementOption;
  outputs: GeneratedOutputs | null;
  trace: ExecutionTraceEntry[];
  isLoading: boolean;
  
  setIdea: (idea: string) => void;
  setCritique: (critique: CritiqueItem[]) => void;
  setRefinements: (refinements: Partial<RefinementOption>) => void;
  setOutputs: (outputs: GeneratedOutputs) => void;
  addTraceEntry: (entry: Omit<ExecutionTraceEntry, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialRefinements: RefinementOption = {
  techStack: [],
  complexity: 'medium',
  niche: '',
  targetAudience: [],
};

export const useAppStore = create<AppState>((set) => ({
  idea: '',
  critique: [],
  refinements: initialRefinements,
  outputs: null,
  trace: [],
  isLoading: false,

  setIdea: (idea) => set({ idea }),
  setCritique: (critique) => set({ critique }),
  setRefinements: (refinements) =>
    set((state) => ({ refinements: { ...state.refinements, ...refinements } })),
  setOutputs: (outputs) => set({ outputs }),
  addTraceEntry: (entry) =>
    set((state) => ({
      trace: [
        ...state.trace,
        {
          ...entry,
          id: `trace-${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
      ],
    })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () =>
    set({
      idea: '',
      critique: [],
      refinements: initialRefinements,
      outputs: null,
      trace: [],
      isLoading: false,
    }),
}));
