'use client';

import { useAppStore } from '@/lib/store';

const OUTPUT_TABS = ['Master Prompt', 'PRD', 'Plan', 'Tasks', 'Agent Instructions'];

export default function RightPreview() {
  const { outputs } = useAppStore();

  if (!outputs) {
    return (
      <div className="w-1/3 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Outputs Preview</h2>
        <div className="flex items-center justify-center h-64 border rounded-lg bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No outputs generated yet</p>
        </div>
      </div>
    );
  }

  const outputMap: Record<string, string> = {
    'Master Prompt': outputs.masterPrompt,
    'PRD': outputs.prd,
    'Plan': outputs.plan,
    'Tasks': outputs.tasks,
    'Agent Instructions': outputs.agentInstructions,
  };

  return (
    <div className="w-1/3 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Outputs Preview</h2>
      <div className="space-y-4">
        {OUTPUT_TABS.map((tab) => (
          <div key={tab} className="border rounded-lg dark:border-zinc-700 overflow-hidden">
            <div className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border-b dark:border-zinc-700">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{tab}</span>
            </div>
            <pre className="p-3 text-xs overflow-x-auto bg-white dark:bg-zinc-900 max-h-48 overflow-y-auto whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
              {outputMap[tab]}
            </pre>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        Export Package (Coming Soon)
      </button>
    </div>
  );
}
