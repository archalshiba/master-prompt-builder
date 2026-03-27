'use client';

import { useAppStore } from '@/lib/store';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function BottomTrace() {
  const { trace } = useAppStore();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all ${expanded ? 'h-72' : 'h-32'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-2 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Execution Trace</h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">({trace.length} entries)</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        )}
      </button>
      
      <div className="p-4 overflow-y-auto h-full">
        {trace.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-zinc-400" />
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No actions yet. Start by analyzing your idea.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {trace.slice(expanded ? 0 : -3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
              >
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono whitespace-nowrap">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded">
                  {entry.action}
                </span>
                {entry.outputs && Object.keys(entry.outputs).length > 0 && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Complete
                  </span>
                )}
              </div>
            ))}
            {!expanded && trace.length > 3 && (
              <p className="text-xs text-center text-zinc-400 dark:text-zinc-500 pt-2">
                + {trace.length - 3} more entries. Click to expand.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
