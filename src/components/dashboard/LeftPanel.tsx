"use client";

import React from "react";
import { 
  Lightbulb, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Loader2
} from "lucide-react";
import type { CritiqueItem as StoreCritiqueItem } from "@/lib/store";

interface CritiqueItem {
  type: "risk" | "strength" | "competitor";
  text: string;
}

interface LeftPanelProps {
  idea: string;
  onIdeaChange: (value: string) => void;
  critiques: StoreCritiqueItem[];
  onGenerateCritique: () => void;
  isGenerating: boolean;
}

function convertCritiques(items: StoreCritiqueItem[]): CritiqueItem[] {
  return items.map((item) => ({
    type: item.type,
    text: item.description || item.title,
  }));
}

const MAX_CHARS = 500;

const critiqueIcons = {
  risk: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  strength: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  competitor: { icon: Target, color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/30" },
};

const critiqueLabels = {
  risk: "Risk",
  strength: "Strength",
  competitor: "Competitor",
};

export function LeftPanel({ 
  idea, 
  onIdeaChange, 
  critiques, 
  onGenerateCritique,
  isGenerating 
}: LeftPanelProps) {
  const charCount = idea.length;
  const convertedCritiques = convertCritiques(critiques);
  const isNearLimit = charCount >= 450;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="w-80 bg-[#12121a] border-r border-[#2a2a3a] flex flex-col shrink-0">
      {/* Panel Header */}
      <div className="p-4 border-b border-[#2a2a3a]">
        <div className="flex items-center gap-2 text-zinc-400">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium">Your Idea</span>
          <span className={`ml-auto text-xs ${isOverLimit ? "text-red-500" : isNearLimit ? "text-amber-500" : "text-zinc-500"}`}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      </div>

      {/* Idea Input */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <textarea
          value={idea}
          onChange={(e) => onIdeaChange(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Describe your prompt idea here..."
          className="w-full h-40 bg-[#1a1a24] border border-[#2a2a3a] rounded-lg p-3 text-sm text-white placeholder-zinc-500 resize-none focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
        />

        {/* Generate Button */}
        <button
          onClick={onGenerateCritique}
          disabled={!idea.trim() || isGenerating}
          className={`
            w-full py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200
            ${idea.trim() && !isGenerating
              ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:brightness-110 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-[#2a2a3a] text-zinc-500 cursor-not-allowed"
            }
          `}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Critique
            </>
          )}
        </button>
      </div>

      {/* Critique Section */}
      {convertedCritiques.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 pt-0">
          <div className="flex items-center gap-3 py-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2a2a3a] to-transparent" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">AI Critique</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2a2a3a] to-transparent" />
          </div>

          <div className="space-y-3">
            {convertedCritiques.map((critique, index) => {
              const config = critiqueIcons[critique.type];
              const Icon = config.icon;
              
              return (
                <div
                  key={index}
                  className={`
                    p-3 rounded-lg border ${config.bg} ${config.border}
                    animate-in fade-in slide-in-from-top-2 duration-300
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex items-center gap-2 mb-1.5 ${config.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {critiqueLabels[critique.type]}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {critique.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
