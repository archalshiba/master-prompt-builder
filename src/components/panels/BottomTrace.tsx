'use client';

import { useAppStore } from '@/lib/store';

export default function BottomTrace() {
  const { trace } = useAppStore();

  return (
    <div className="h-48 border-t dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col">
      <div className="px-4 py-2 border-b dark:border-zinc-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Execution Trace</h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{trace.length} entries</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {trace.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No actions yet. Start by analyzing your idea.</p>
        ) : (
          <div className="space-y-2">
            {trace.map((entry) => (
              <div key={entry.id} className="text-xs font-mono p-2 bg-zinc-50 dark:bg-zinc-800 rounded">
                <span className="text-zinc-400">[{new Date(entry.timestamp).toLocaleTimeString()}]</span>{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">{entry.action}</span>
                {entry.outputs && Object.keys(entry.outputs).length > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400"> ✓</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
