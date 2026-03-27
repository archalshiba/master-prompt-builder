'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { trpc } from '@/trpc/client';
import LeftPanel from '@/components/panels/LeftPanel';
import CenterTabs from '@/components/panels/CenterTabs';
import RightPreview from '@/components/panels/RightPreview';
import BottomTrace from '@/components/panels/BottomTrace';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'refine' | 'settings'>('refine');
  const [mobilePanel, setMobilePanel] = useState<'left' | 'center' | 'right' | 'trace'>('left');
  const [isMobile, setIsMobile] = useState(false);
  const { idea, isLoading, setCritique, setRefinements, setOutputs, addTraceEntry, setLoading } = useAppStore();

  const critiqueMutation = trpc.critique.useMutation({
    onSuccess: (data) => {
      setCritique(data.critique);
      addTraceEntry({ action: 'critique', inputs: { idea }, outputs: { critique: data.critique } });
    },
    onError: (error) => {
      console.error('Critique failed:', error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const refineMutation = trpc.refine.useMutation({
    onSuccess: (data) => {
      setRefinements(data.refinements);
      addTraceEntry({ action: 'refine', inputs: { idea }, outputs: { refinements: data.refinements } });
    },
    onError: (error) => {
      console.error('Refine failed:', error);
    },
  });

  const generateMutation = trpc.generate.useMutation({
    onSuccess: (data) => {
      setOutputs(data.outputs);
      addTraceEntry({ action: 'generate', inputs: { idea }, outputs: data.outputs as unknown as Record<string, unknown> });
    },
    onError: (error) => {
      console.error('Generation failed:', error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCritique = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    addTraceEntry({ action: 'critique', inputs: { idea }, outputs: {} });
    critiqueMutation.mutate({ idea });
    refineMutation.mutate({ idea, critique: [] });
  };

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    const refinements = useAppStore.getState().refinements;
    setLoading(true);
    addTraceEntry({ action: 'generate', inputs: { idea, refinements }, outputs: {} });
    generateMutation.mutate({ idea, refinements });
  };

  const isMutating = critiqueMutation.isPending || refineMutation.isPending || generateMutation.isPending;

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b dark:bg-zinc-900 dark:border-zinc-800">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Prompt Builder</h1>
          <div className="flex gap-2">
            <button
              onClick={handleCritique}
              disabled={isMutating || !idea.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              title="Analyze"
            >
              {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleGenerate}
              disabled={isMutating || !idea.trim()}
              className="p-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
              title="Generate"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="flex border-b dark:border-zinc-700 bg-white dark:bg-zinc-900">
            {(['left', 'center', 'right', 'trace'] as const).map((panel) => (
              <button
                key={panel}
                onClick={() => setMobilePanel(panel)}
                className={`flex-1 py-2 text-xs font-medium capitalize ${
                  mobilePanel === panel
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {panel}
              </button>
            ))}
          </div>
          <div className="h-full overflow-y-auto">
            {mobilePanel === 'left' && <LeftPanel />}
            {mobilePanel === 'center' && <CenterTabs activeTab={activeTab} setActiveTab={setActiveTab} />}
            {mobilePanel === 'right' && <RightPreview />}
            {mobilePanel === 'trace' && <BottomTrace />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Master Prompt Builder</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Vibe Coding Command Center</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCritique}
            disabled={isMutating || !idea.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            Analyze Idea
          </button>
          <button
            onClick={handleGenerate}
            disabled={isMutating || !idea.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate
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
