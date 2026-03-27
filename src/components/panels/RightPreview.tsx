'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { FileText, Download, Copy, Check, BookOpen, ListTodo, Code2, Bot, UserCheck } from 'lucide-react';

const OUTPUT_TABS = [
  { id: 'masterPrompt', label: 'Master Prompt', icon: Code2, color: 'blue' },
  { id: 'prd', label: 'PRD', icon: BookOpen, color: 'purple' },
  { id: 'plan', label: 'Plan', icon: ListTodo, color: 'amber' },
  { id: 'tasks', label: 'Tasks', icon: ListTodo, color: 'emerald' },
  { id: 'agentInstructions', label: 'Agent Instructions', icon: Bot, color: 'rose' },
  { id: 'userInstructions', label: 'User Instructions', icon: UserCheck, color: 'cyan' },
];

export default function RightPreview() {
  const { outputs } = useAppStore();
  const [activeOutput, setActiveOutput] = useState('masterPrompt');
  const [copied, setCopied] = useState(false);

  const outputMap: Record<string, string> = outputs
    ? {
        masterPrompt: outputs.masterPrompt,
        prd: outputs.prd,
        plan: outputs.plan,
        tasks: outputs.tasks,
        agentInstructions: outputs.agentInstructions,
        userInstructions: outputs.userInstructions,
      }
    : {};

  const handleCopy = async () => {
    if (outputMap[activeOutput]) {
      await navigator.clipboard.writeText(outputMap[activeOutput]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!outputs) {
    return (
      <div className="w-full lg:w-1/3 h-full p-4 lg:p-6 overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-zinc-500" />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Outputs Preview</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl bg-white dark:bg-zinc-800">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-zinc-400" />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-xs">
            No outputs generated yet. Enter your idea and click "Analyze Idea" to start.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/3 h-full flex flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-500" />
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Outputs</h2>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      <div className="flex gap-1 p-2 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        {OUTPUT_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveOutput(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeOutput === tab.id
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{tab.label}</span>
            <span className="md:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {outputMap[activeOutput]?.length || 0} chars
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-4 text-sm font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {outputMap[activeOutput] || 'No content'}
        </pre>
      </div>
    </div>
  );
}
