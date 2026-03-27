'use client';

import { useAppStore } from '@/lib/store';
import { Building2, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';

export default function LeftPanel() {
  const { idea, setIdea, critique } = useAppStore();

  const getCritiqueIcon = (type: string) => {
    switch (type) {
      case 'competitor': return <Building2 className="w-4 h-4 text-amber-600" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'strength': return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      default: return <Lightbulb className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'competitor': return 'border-l-amber-500';
      case 'risk': return 'border-l-red-500';
      case 'strength': return 'border-l-emerald-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <div className="w-full lg:w-1/3 h-full p-4 lg:p-6 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
          <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Your Idea</h2>
      </div>
      
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder={`Describe your app idea here...

Example: A habit tracker for remote workers with team challenges, social accountability, and progress visualization`}
        className="w-full h-40 p-4 text-sm border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
      />
      
      <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span>{idea.length}</span>
        <span>/</span>
        <span>2000 chars</span>
        {idea.length > 1800 && (
          <span className="text-amber-600 dark:text-amber-400"> - Consider shortening</span>
        )}
      </div>
      
      {critique.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-4 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
            Analysis Results
            <span className="text-zinc-400 font-normal">({critique.length} insights)</span>
          </h3>
          <div className="space-y-3">
            {critique.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 border-l-4 ${getBorderColor(item.type)}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getCritiqueIcon(item.type)}
                  <span className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{item.title}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
