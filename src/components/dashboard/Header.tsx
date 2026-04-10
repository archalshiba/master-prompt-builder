"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Moon, 
  Sun, 
  User,
  LayoutDashboard,
  FileText,
  History,
  Settings
} from "lucide-react";

export function Header() {
  const [isDark, setIsDark] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="h-14 bg-[#12121a] border-b border-[#2a2a3a] flex items-center justify-between px-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          PromptForge
        </span>
      </div>

      {/* Navigation */}
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
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 rounded-lg bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#3a3a4a] transition-all duration-200"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-[2px]">
          <div className="w-full h-full rounded-full bg-[#12121a] flex items-center justify-center">
            <User className="w-4 h-4 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
