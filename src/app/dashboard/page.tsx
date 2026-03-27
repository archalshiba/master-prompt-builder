'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { runCriticAgent, runRefinerAgent, runSpecGenerator } from '@/lib/agents';
import LeftPanel from '@/components/panels/LeftPanel';
import CenterTabs from '@/components/panels/CenterTabs';
import RightPreview from '@/components/panels/RightPreview';
import BottomTrace from '@/components/panels/BottomTrace';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'refine' | 'settings'>('refine');
  const { idea, critique, refinements, outputs, isLoading, setIdea, setCritique, setRefinements, setOutputs, addTraceEntry, setLoading } = useAppStore();

  const handleCritique = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    addTraceEntry({ action: 'critique', inputs: { idea }, outputs: {} });
    
    try {
      const critiqueResult = await runCriticAgent(idea);
      setCritique(critiqueResult);
      addTraceEntry({ action: 'critique', inputs: { idea }, outputs: { critique: critiqueResult } });
      
      const refinementResult = await runRefinerAgent(idea, critiqueResult);
      setRefinements(refinementResult);
      addTraceEntry({ action: 'refine', inputs: { idea, critique: critiqueResult }, outputs: { refinements: refinementResult } });
    } catch (error) {
      console.error('Critique failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    addTraceEntry({ action: 'generate', inputs: { idea, refinements }, outputs: {} });
    
    try {
      const outputsResult = await runSpecGenerator(idea, refinements);
      setOutputs(outputsResult);
      addTraceEntry({ action: 'generate', inputs: { idea, refinements }, outputs: outputsResult as unknown as Record<string, unknown> });
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-zinc-900 dark:border-zinc-800">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Master Prompt Builder</h1>
        <div className="flex gap-2">
          <button
            onClick={handleCritique}
            disabled={isLoading || !idea.trim()}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Idea
          </button>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !idea.trim()}
            className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Outputs
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />
        <CenterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <RightPreview />
      </div>

      <BottomTrace />
    </div>
  );
}
