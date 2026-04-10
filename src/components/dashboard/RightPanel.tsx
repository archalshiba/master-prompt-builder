"use client";

import React from "react";
import { FileText, ListChecks, Map, Code, Copy, Download, Share2 } from "lucide-react";
export interface OutputTab {
  id: "prompt" | "prd" | "plan" | "tasks";
  label: string;
  content: string;
}

interface RightPanelProps {
  activeTab: OutputTab["id"];
  onTabChange: (tab: OutputTab["id"]) => void;
  outputs: Record<OutputTab["id"], string>;
}

const tabs: { id: OutputTab["id"]; label: string; icon: React.ElementType }[] = [
  { id: "prompt", label: "Master Prompt", icon: Code },
  { id: "prd", label: "PRD", icon: FileText },
  { id: "plan", label: "Plan", icon: Map },
  { id: "tasks", label: "Tasks", icon: ListChecks },
];

export function RightPanel({ activeTab, onTabChange, outputs }: RightPanelProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputs[activeTab]);
  };

  const handleExport = () => {
    const blob = new Blob([outputs[activeTab]], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}-output.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculate stats
  const tokenCount = outputs[activeTab].split(/\s+/).length * 1.3; // rough estimate
  const charCount = outputs[activeTab].length;
  const sectionCount = outputs[activeTab].split(/^#+\s+/).length - 1;

  return (
    <div className="w-[420px] bg-[#12121a] flex flex-col shrink-0">
      {/* Panel Header */}
      <div className="p-4 border-b border-[#2a2a3a]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Output Preview</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] text-xs text-zinc-400 hover:text-white hover:border-[#3a3a4a] transition-all duration-200"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] text-xs text-zinc-400 hover:text-white hover:border-[#3a3a4a] transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button
              className="w-8 h-8 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#3a3a4a] transition-all duration-200"
              aria-label="Share"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#1a1a24] rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                  ${isActive
                    ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-[#0a0a0f] rounded-lg border border-[#2a2a3a] p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
              {outputs[activeTab]}
            </pre>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="p-4 pt-0">
          <div className="bg-[#1a1a24] rounded-lg px-4 py-3 border border-[#2a2a3a]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>~{Math.round(tokenCount)} tokens</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <span>~${(tokenCount * 0.00001).toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{sectionCount} sections</span>
                </div>
              </div>
              <div className="text-zinc-500">
                {charCount.toLocaleString()} chars
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
