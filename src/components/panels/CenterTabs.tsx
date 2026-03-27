'use client';

import { useAppStore } from '@/lib/store';

interface CenterTabsProps {
  activeTab: 'refine' | 'settings';
  setActiveTab: (tab: 'refine' | 'settings') => void;
}

const TECH_OPTIONS = ['Next.js', 'React', 'Vue', 'Svelte', 'Node.js', 'Python', 'TypeScript', 'Go'];
const COMPLEXITY_OPTIONS = [
  { value: 'simple', label: 'Simple', description: 'MVP, basic features' },
  { value: 'medium', label: 'Medium', description: 'Core features, some complexity' },
  { value: 'advanced', label: 'Advanced', description: 'Full-featured, production-ready' },
];
const AUDIENCE_OPTIONS = ['Beginner makers', 'Non-technical entrepreneurs', 'Junior devs', 'Small teams', 'Enterprises'];

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
    <div className="w-1/3 p-4 border-r dark:border-zinc-800 overflow-y-auto">
      <div className="flex border-b dark:border-zinc-700 mb-4">
        <button
          onClick={() => setActiveTab('refine')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'refine'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Refine
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'settings'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Settings
        </button>
      </div>

      {activeTab === 'refine' ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-zinc-50">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTechStack(tech)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    refinements.techStack.includes(tech)
                      ? 'bg-blue-100 border-blue-600 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-300'
                      : 'bg-white border-zinc-300 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-zinc-50">Complexity</h3>
            <div className="space-y-2">
              {COMPLEXITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRefinements({ complexity: opt.value as 'simple' | 'medium' | 'advanced' })}
                  className={`w-full p-3 text-left rounded-lg border ${
                    refinements.complexity === opt.value
                      ? 'bg-blue-50 border-blue-600 dark:bg-blue-900/50 dark:border-blue-400'
                      : 'bg-white border-zinc-300 dark:bg-zinc-800 dark:border-zinc-600'
                  }`}
                >
                  <div className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{opt.label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{opt.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-zinc-50">Target Audience</h3>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_OPTIONS.map((audience) => (
                <button
                  key={audience}
                  onClick={() => toggleAudience(audience)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    refinements.targetAudience.includes(audience)
                      ? 'bg-purple-100 border-purple-600 text-purple-700 dark:bg-purple-900 dark:border-purple-400 dark:text-purple-300'
                      : 'bg-white border-zinc-300 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-300'
                  }`}
                >
                  {audience}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Settings panel coming soon...</p>
        </div>
      )}
    </div>
  );
}
