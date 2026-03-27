'use client';

import { useAppStore } from '@/lib/store';
import { Check, Code, Users, Settings, Palette } from 'lucide-react';

interface CenterTabsProps {
  activeTab: 'refine' | 'settings';
  setActiveTab: (tab: 'refine' | 'settings') => void;
}

const TECH_OPTIONS = [
  { value: 'Next.js', icon: '⚡' },
  { value: 'React', icon: '⚛️' },
  { value: 'Vue', icon: '💚' },
  { value: 'Svelte', icon: '🔥' },
  { value: 'Node.js', icon: '🟢' },
  { value: 'Python', icon: '🐍' },
  { value: 'TypeScript', icon: '📘' },
  { value: 'Go', icon: '🐹' },
];

const COMPLEXITY_OPTIONS = [
  { value: 'simple', label: 'Simple MVP', description: 'Basic features, single user, quick launch' },
  { value: 'medium', label: 'Medium', description: 'Core features, user accounts, database' },
  { value: 'advanced', label: 'Advanced', description: 'Full-featured, auth, payments, scaling' },
];

const AUDIENCE_OPTIONS = [
  'Beginner makers',
  'Non-technical entrepreneurs',
  'Junior devs',
  'Small teams',
  'Enterprises',
];

export default function CenterTabs({ activeTab, setActiveTab }: CenterTabsProps) {
  const { refinements, setRefinements } = useAppStore();

  const toggleTechStack = (tech: string) => {
    const current = refinements.techStack;
    const updated = current.includes(tech) ? current.filter((t) => t !== tech) : [...current, tech];
    setRefinements({ techStack: updated });
  };

  const toggleAudience = (audience: string) => {
    const current = refinements.targetAudience;
    const updated = current.includes(audience) ? current.filter((a) => a !== audience) : [...current, audience];
    setRefinements({ targetAudience: updated });
  };

  return (
    <div className="w-full lg:w-1/3 h-full p-4 lg:p-6 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto bg-white dark:bg-zinc-900">
      <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-6">
        <button
          onClick={() => setActiveTab('refine')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'refine'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <Code className="w-4 h-4" />
          Refine
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'settings'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {activeTab === 'refine' ? (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs">T</span>
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {TECH_OPTIONS.map((tech) => (
                <button
                  key={tech.value}
                  onClick={() => toggleTechStack(tech.value)}
                  className={`flex items-center gap-2 p-3 text-sm rounded-xl border transition-all ${
                    refinements.techStack.includes(tech.value)
                      ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-500 text-purple-700 dark:text-purple-300 shadow-sm'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <span>{tech.icon}</span>
                  <span className="font-medium">{tech.value}</span>
                  {refinements.techStack.includes(tech.value) && (
                    <Check className="w-4 h-4 ml-auto text-purple-600 dark:text-purple-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 text-xs">C</span>
              Complexity Level
            </h3>
            <div className="space-y-2">
              {COMPLEXITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRefinements({ complexity: opt.value as 'simple' | 'medium' | 'advanced' })}
                  className={`w-full p-4 text-left rounded-xl border transition-all ${
                    refinements.complexity === opt.value
                      ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-500 shadow-sm'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{opt.label}</span>
                    {refinements.complexity === opt.value && (
                      <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{opt.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs">
                <Users className="w-3 h-3" />
              </span>
              Target Audience
            </h3>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_OPTIONS.map((audience) => (
                <button
                  key={audience}
                  onClick={() => toggleAudience(audience)}
                  className={`px-3 py-2 text-sm rounded-full border transition-all ${
                    refinements.targetAudience.includes(audience)
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  {audience}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3 mb-3">
              <Palette className="w-5 h-5 text-zinc-500" />
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">Appearance</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Dark mode and custom themes coming soon</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="w-5 h-5 text-zinc-500" />
              <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">Advanced Settings</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">API configuration and preferences coming in T06</p>
          </div>
        </div>
      )}
    </div>
  );
}
