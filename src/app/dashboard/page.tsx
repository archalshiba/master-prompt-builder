"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import type { RefinementOption } from "@/lib/store";
import { trpc } from "@/trpc/client";
import { LeftPanel } from "@/components/dashboard/LeftPanel";
import { CenterPanel } from "@/components/dashboard/CenterPanel";
import { RightPanel } from "@/components/dashboard/RightPanel";
import { BottomPanel } from "@/components/dashboard/BottomPanel";
import { Loader2, Sparkles, Wand2, Moon, Sun, User, LayoutDashboard, FileText, History, Settings } from "lucide-react";

export default function DashboardV2() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeOutputTab, setActiveOutputTab] = useState<"prompt" | "prd" | "plan" | "tasks">("prompt");
  
  const { idea, isLoading, setCritique, setRefinements, setOutputs, addTraceEntry, setLoading, critique, refinements, outputs, trace } = useAppStore();

  const critiqueMutation = trpc.critique.useMutation({
    onSuccess: (data) => {
      setCritique(data.critique);
      addTraceEntry({ action: "critique", inputs: { idea }, outputs: { critique: data.critique } });
    },
    onError: (error) => {
      console.error("Critique failed:", error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const refineMutation = trpc.refine.useMutation({
    onSuccess: (data) => {
      setRefinements(data.refinements);
      addTraceEntry({ action: "refine", inputs: { idea }, outputs: { refinements: data.refinements } });
    },
    onError: (error) => {
      console.error("Refine failed:", error);
    },
  });

  const generateMutation = trpc.generate.useMutation({
    onSuccess: (data) => {
      setOutputs(data.outputs);
      addTraceEntry({ action: "generate", inputs: { idea }, outputs: data.outputs as unknown as Record<string, unknown> });
    },
    onError: (error) => {
      console.error("Generation failed:", error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCritique = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    addTraceEntry({ action: "critique", inputs: { idea }, outputs: {} });
    critiqueMutation.mutate({ idea });
    refineMutation.mutate({ idea, critique: [] });
  };

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    const currentRefinements = useAppStore.getState().refinements;
    setLoading(true);
    addTraceEntry({ action: "generate", inputs: { idea, refinements: currentRefinements }, outputs: {} });
    generateMutation.mutate({ idea, refinements: currentRefinements });
  };

  const isMutating = critiqueMutation.isPending || refineMutation.isPending || generateMutation.isPending;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Convert trace entries to steps for BottomPanel
  const traceSteps = trace.length > 0 
    ? trace.map((entry, i) => ({
        id: entry.action,
        label: entry.action.charAt(0).toUpperCase() + entry.action.slice(1),
        status: i === trace.length - 1 ? "active" as const : "completed" as const,
      }))
    : [
        { id: "parse", label: "Parse", status: "completed" as const, duration: "0.1s" },
        { id: "critique", label: "Critique", status: "completed" as const, duration: "1.2s" },
        { id: "refine", label: "Refine", status: "completed" as const, duration: "0.8s" },
        { id: "generate", label: "Generate", status: "active" as const, duration: "2.3s" },
        { id: "format", label: "Format", status: "pending" as const },
        { id: "done", label: "Done", status: "pending" as const },
      ];

  // Map outputs to the format expected by RightPanel
  const outputContent: Record<"prompt" | "prd" | "plan" | "tasks", string> = {
    prompt: outputs?.masterPrompt || "# Master Prompt\n\nYour refined prompt will appear here...",
    prd: outputs?.prd || "# Product Requirements Document\n\nPRD content will appear here...",
    plan: outputs?.plan || "# Implementation Plan\n\nPlan content will appear here...",
    tasks: outputs?.tasks || "# Tasks\n\nTask list will appear here...",
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-[#0a0a0f]">
        <header className="h-14 bg-[#12121a] border-b border-[#2a2a3a] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              PromptForge
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCritique}
              disabled={isMutating || !idea.trim()}
              className="p-2 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-lg disabled:opacity-50"
            >
              {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleGenerate}
              disabled={isMutating || !idea.trim()}
              className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg disabled:opacity-50"
            >
              {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          <LeftPanel
            idea={idea}
            onIdeaChange={(v) => useAppStore.setState({ idea: v })}
            critiques={critique}
            onGenerateCritique={handleCritique}
            isGenerating={isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0a0a0f] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-[#12121a] border-b border-[#2a2a3a] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            PromptForge
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-[#1a1a24] text-white" 
                    : "text-zinc-400 hover:text-white hover:bg-[#1a1a24]/50"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-9 h-9 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#3a3a4a] transition-all duration-200"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#12121a] flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <LeftPanel
          idea={idea}
          onIdeaChange={(v) => useAppStore.setState({ idea: v })}
          critiques={critique}
          onGenerateCritique={handleCritique}
          isGenerating={isLoading}
        />

        {/* Center Panel */}
        <CenterPanel
          refinements={refinements}
          onRefinementChange={(key, value) => {
            const updates = typeof key === 'string' ? { [key]: value } : key;
            setRefinements(updates as Partial<RefinementOption>);
          }}
        />

        {/* Right Panel */}
        {isRightPanelOpen && (
          <RightPanel
            activeTab={activeOutputTab}
            onTabChange={setActiveOutputTab}
            outputs={outputContent}
          />
        )}
      </div>

      {/* Bottom Panel */}
      <BottomPanel
        isOpen={isBottomPanelOpen}
        onToggle={() => setIsBottomPanelOpen(!isBottomPanelOpen)}
        steps={traceSteps}
        onStepChange={() => {}}
      />
    </div>
  );
}
