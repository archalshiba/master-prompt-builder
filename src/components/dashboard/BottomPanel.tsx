"use client";

import React from "react";
import { GitBranch, Minus, Square, X, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
export interface TraceStep {
  id: string;
  label: string;
  status: "completed" | "active" | "pending";
  duration?: string;
}

interface BottomPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  steps: TraceStep[];
  onStepChange: (steps: TraceStep[]) => void;
}

export function BottomPanel({ isOpen, onToggle, steps, onStepChange }: BottomPanelProps) {
  const activeStep = steps.find((s) => s.status === "active");
  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  const stepIcons: Record<TraceStep["status"], string> = {
    completed: "✓",
    active: "●",
    pending: "○",
  };

  return (
    <div className={`
      bg-[#12121a] border-t border-[#2a2a3a] transition-all duration-300 ease-out
      ${isOpen ? "h-64" : "h-10"}
    `}>
      {/* Panel Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-[#2a2a3a] shrink-0">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-zinc-400">Execution Trace</span>
          {activeStep && (
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
              {activeStep.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Progress */}
          <div className="w-24 h-1.5 bg-[#1a1a24] rounded-full overflow-hidden mr-3">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Window Controls */}
          <button
            onClick={onToggle}
            className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:text-white hover:bg-[#1a1a24] transition-all"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <button className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:text-white hover:bg-[#1a1a24] transition-all" aria-label="Minimize">
            <Minus className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:text-white hover:bg-[#1a1a24] transition-all" aria-label="Maximize">
            <Square className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Panel Content */}
      {isOpen && (
        <div className="h-[calc(100%-40px)] flex flex-col p-4 gap-4 overflow-hidden">
          {/* Timeline */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-2">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${step.status === "completed" 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : step.status === "active"
                      ? "bg-cyan-500/20 text-cyan-400 animate-pulse"
                      : "bg-[#1a1a24] text-zinc-600"
                    }
                  `}>
                    {stepIcons[step.status]}
                  </div>
                  <div className="flex flex-col">
                    <span className={`
                      text-xs font-medium
                      ${step.status === "pending" ? "text-zinc-600" : "text-zinc-300"}
                    `}>
                      {step.label}
                    </span>
                    {step.duration && step.status !== "pending" && (
                      <span className="text-[10px] text-zinc-500">{step.duration}</span>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-12 h-0.5 rounded-full mx-1
                    ${step.status === "completed" ? "bg-emerald-500/50" : "bg-[#2a2a3a]"}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Details Row */}
          <div className="flex-1 flex gap-4 overflow-hidden">
            {/* Step Details */}
            <div className="flex-1 bg-[#1a1a24] rounded-lg border border-[#2a2a3a] p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Current Step</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                    {activeStep?.label || "Idle"}
                  </span>
                </div>
                <span className="text-xs text-zinc-500">
                  {activeStep?.duration || "—"}
                </span>
              </div>
              
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <span>Model: gpt-4o-mini</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Processing: &quot;{activeStep?.status === "active" ? "Generating refined output..." : "Waiting..."}&quot;</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Tokens: 234/1,234 (19%)</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                  <span>Progress</span>
                  <span>19%</span>
                </div>
                <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-500" style={{ width: "19%" }} />
                </div>
              </div>
            </div>

            {/* Token Stats */}
            <div className="w-48 bg-[#1a1a24] rounded-lg border border-[#2a2a3a] p-4 flex flex-col">
              <span className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Cost Estimate</span>
              
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">This step</span>
                  <span className="text-xs font-mono text-cyan-400">$0.00234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Total</span>
                  <span className="text-xs font-mono text-violet-400">$0.00891</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Est. remaining</span>
                  <span className="text-xs font-mono text-zinc-500">$0.00300</span>
                </div>
              </div>

              <button className="mt-4 w-full py-2 rounded-lg bg-[#0a0a0f] border border-[#2a2a3a] text-xs text-zinc-500 hover:text-white hover:border-red-500/50 transition-all flex items-center justify-center gap-2">
                <Trash2 className="w-3.5 h-3.5" />
                Clear Trace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
