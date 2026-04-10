"use client";

import React from "react";
import { Settings, ChevronDown } from "lucide-react";
import type { RefinementOption } from "@/lib/store";

interface CenterPanelProps {
  refinements: RefinementOption;
  onRefinementChange: (key: keyof RefinementOption, value: string | string[] | 'simple' | 'medium' | 'advanced') => void;
}

const techStackOptions = [
  "React + TypeScript",
  "Next.js + Tailwind",
  "Vue + Pinia",
  "Angular + RxJS",
  "SvelteKit",
  "Python + FastAPI",
  "Node.js + Express",
  "Go + Gin",
];

const audienceOptions = [
  "Developers",
  "Designers",
  "Product Managers",
  "Data Scientists",
  "Business Analysts",
  "Students",
  "Non-Technical Users",
];

const complexityOptions: { value: RefinementOption["complexity"]; label: string }[] = [
  { value: "simple", label: "Simple" },
  { value: "medium", label: "Medium" },
  { value: "advanced", label: "Advanced" },
];

function CustomSelect({ 
  value, 
  options, 
  onChange,
  multiple = false
}: { 
  value: string | string[]; 
  options: string[]; 
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
}) {
  const selectedValue = Array.isArray(value) ? value[0] || "" : value;
  
  return (
    <div className="relative">
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[#1a1a24] border border-[#2a2a3a] rounded-lg px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#1a1a24]">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
    </div>
  );
}

function RadioGroup<T extends string>({ 
  value, 
  options, 
  onChange 
}: { 
  value: T; 
  options: { value: T; label: string }[]; 
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <input
              type="radio"
              name={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <div className={`
              w-4 h-4 rounded-full border-2 transition-all duration-200
              ${value === option.value 
                ? "border-violet-500 bg-gradient-to-br from-violet-500 to-cyan-500" 
                : "border-[#3a3a4a] group-hover:border-zinc-500"
              }
            `}>
              {value === option.value && (
                <div className="absolute inset-[3px] rounded-full bg-white" />
              )}
            </div>
          </div>
          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function MultiSelect({ 
  values, 
  options, 
  onChange 
}: { 
  values: string[]; 
  options: string[]; 
  onChange: (values: string[]) => void;
}) {
  const toggleOption = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggleOption(option)}
              className="sr-only"
            />
            <div className={`
              w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200
              ${values.includes(option)
                ? "border-violet-500 bg-gradient-to-br from-violet-500 to-cyan-500"
                : "border-[#3a3a4a] bg-[#1a1a24] group-hover:border-zinc-500"
              }
            `}>
              {values.includes(option) && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}

function Section({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
        {title}
      </label>
      {children}
    </div>
  );
}

export function CenterPanel({ refinements, onRefinementChange }: CenterPanelProps) {
  return (
    <div className="flex-1 bg-[#0a0a0f] border-r border-[#2a2a3a] overflow-y-auto">
      {/* Panel Header */}
      <div className="sticky top-0 z-10 p-4 border-b border-[#2a2a3a] bg-[#0a0a0f]/95 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Refinements</span>
        </div>
      </div>

      {/* Options */}
      <div className="p-4 space-y-6">
        {/* Row 1: Tech Stack + Audience */}
        <div className="grid grid-cols-2 gap-4">
          <Section title="Tech Stack">
            <MultiSelect
              values={refinements.techStack}
              options={techStackOptions}
              onChange={(v) => onRefinementChange("techStack", v)}
            />
          </Section>
          <Section title="Audience">
            <MultiSelect
              values={refinements.targetAudience}
              options={audienceOptions}
              onChange={(v) => onRefinementChange("targetAudience", v)}
            />
          </Section>
        </div>

        {/* Row 2: Complexity */}
        <div className="grid grid-cols-2 gap-4">
          <Section title="Complexity">
            <RadioGroup
              value={refinements.complexity}
              options={complexityOptions}
              onChange={(v) => onRefinementChange("complexity", v)}
            />
          </Section>
          <Section title="Niche">
            <CustomSelect
              value={refinements.niche}
              options={["General", "AI/ML", "Web3", "SaaS", "E-commerce", "Fintech", "HealthTech"]}
              onChange={(v) => onRefinementChange("niche", v)}
            />
          </Section>
        </div>

        {/* Visual Separator */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2a2a3a] to-transparent" />
          <span className="text-xs text-zinc-600">Refinements affect all outputs</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2a2a3a] to-transparent" />
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Technical Docs", emoji: "📚" },
              { label: "API Design", emoji: "🔌" },
              { label: "User Guide", emoji: "👤" },
              { label: "Code Review", emoji: "👀" },
            ].map((preset) => (
              <button
                key={preset.label}
                className="px-3 py-1.5 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] text-xs text-zinc-400 hover:text-white hover:border-violet-500/50 transition-all duration-200"
              >
                {preset.emoji} {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
