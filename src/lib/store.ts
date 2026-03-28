import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface AppVersion {
  id: string;
  name: string;
  timestamp: string;
  outputs: GeneratedOutputs | null;
}

interface AppState {
  idea: string;
  critique: CritiqueItem[];
  refinements: RefinementOption;
  outputs: GeneratedOutputs | null;
  trace: ExecutionTraceEntry[];
  versions: AppVersion[];
  isLoading: boolean;
  language: 'en' | 'ar';
  
  setIdea: (idea: string) => void;
  setCritique: (critique: CritiqueItem[]) => void;
  setRefinements: (refinements: Partial<RefinementOption>) => void;
  setOutputs: (outputs: GeneratedOutputs) => void;
  addTraceEntry: (entry: Omit<ExecutionTraceEntry, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  saveVersion: (name: string) => void;
  loadVersion: (id: string) => void;
  setLanguage: (lang: 'en' | 'ar') => void;
  reset: () => void;
}

const initialRefinements: RefinementOption = {
  techStack: [],
  complexity: 'medium',
  niche: '',
  targetAudience: [],
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      idea: '',
      critique: [],
      refinements: initialRefinements,
      outputs: null,
      trace: [],
      versions: [],
      isLoading: false,
      language: 'en',

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
      saveVersion: (name) =>
        set((state) => ({
          versions: [
            ...state.versions,
            {
              id: `version-${Date.now()}`,
              name,
              timestamp: new Date().toISOString(),
              outputs: state.outputs,
            },
          ],
        })),
      loadVersion: (id) => {
        const version = get().versions.find((v) => v.id === id);
        if (version) {
          set({
            outputs: version.outputs,
            idea: '',
            critique: [],
            trace: [],
          });
        }
      },
      setLanguage: (language) => set({ language }),
      reset: () =>
        set({
          idea: '',
          critique: [],
          refinements: initialRefinements,
          outputs: null,
          trace: [],
          isLoading: false,
        }),
    }),
    {
      name: 'master-prompt-builder-storage',
      partialize: (state) => ({
        idea: state.idea,
        refinements: state.refinements,
        versions: state.versions,
        language: state.language,
      }),
    }
  )
);
