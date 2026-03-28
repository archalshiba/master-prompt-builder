'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { FileText, Download, Copy, Check, BookOpen, ListTodo, Code2, Bot, UserCheck, Loader2, Archive } from 'lucide-react';
import JSZip from 'jszip';

const OUTPUT_TABS = [
  { id: 'masterPrompt', label: 'Master Prompt', icon: Code2, color: 'blue', filename: 'master_prompt.md' },
  { id: 'prd', label: 'PRD', icon: BookOpen, color: 'purple', filename: 'PRD.md' },
  { id: 'plan', label: 'Plan', icon: ListTodo, color: 'amber', filename: 'plan.md' },
  { id: 'tasks', label: 'Tasks', icon: ListTodo, color: 'emerald', filename: 'tasks.yaml' },
  { id: 'agentInstructions', label: 'Agent', icon: Bot, color: 'rose', filename: 'agent_instructions.md' },
  { id: 'userInstructions', label: 'User', icon: UserCheck, color: 'cyan', filename: 'user_instructions.md' },
];

export default function RightPreview() {
  const { outputs, idea } = useAppStore();
  const [activeOutput, setActiveOutput] = useState('masterPrompt');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

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

  const handleExport = async () => {
    if (!outputs) return;
    
    setExporting(true);
    try {
      const zip = new JSZip();
      
      zip.file('master_prompt.md', outputs.masterPrompt);
      zip.file('PRD.md', outputs.prd);
      zip.file('plan.md', outputs.plan);
      zip.file('tasks.yaml', outputs.tasks);
      zip.file('agent_instructions.md', outputs.agentInstructions);
      zip.file('user_instructions.md', outputs.userInstructions);
      
      const sanitizedIdea = idea
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 50) || 'project';
      
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sanitizedIdea}-prompt-package.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
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
            No outputs generated yet. Enter your idea and click &quot;Analyze Idea&quot; to start.
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
        <button
          onClick={handleExport}
          disabled={exporting || !outputs}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {exporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Exporting...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </>
          )}
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
            <span className="md:hidden">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {outputMap[activeOutput]?.length || 0} chars
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {OUTPUT_TABS.find(t => t.id === activeOutput)?.filename}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-4 text-sm font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[calc(100vh-400px)]">
          {outputMap[activeOutput] || 'No content'}
        </pre>
      </div>

      <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Archive className="w-4 h-4" />
          <span>Package includes {OUTPUT_TABS.length} files ready for download</span>
        </div>
      </div>
    </div>
  );
}
