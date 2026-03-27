'use client';

import { useAppStore } from '@/lib/store';

export default function LeftPanel() {
  const { idea, setIdea, critique } = useAppStore();

  const getCritiqueIcon = (type: string) => {
    switch (type) {
      case 'competitor': return '🏢';
      case 'risk': return '⚠️';
      case 'strength': return '💪';
      default: return '📌';
    }
  };

  return (
    <div className="w-1/3 p-4 border-r dark:border-zinc-800 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Your Idea</h2>
      
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your app idea... (e.g., 'A habit tracker for remote workers with team challenges')"
        className="w-full h-48 p-3 text-sm border rounded-lg bg-white dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-50 resize-none"
      />
      
      {critique.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-3 text-zinc-900 dark:text-zinc-50">Analysis</h3>
          <div className="space-y-3">
            {critique.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-white dark:bg-zinc-900 border dark:border-zinc-700"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{getCritiqueIcon(item.type)}</span>
                  <span className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{item.title}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
