"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { 
  Sparkles, 
  Moon, 
  Sun, 
  User,
  LayoutDashboard,
  FileText,
  History,
  Settings,
  LogIn
} from "lucide-react";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const isDark = theme === "dark";

  return (
    <header className="h-14 bg-white dark:bg-[#12121a] border-b border-zinc-200 dark:border-[#2a2a3a] flex items-center justify-between px-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
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
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative
                ${isActive 
                  ? "bg-violet-500/10 text-violet-600 dark:bg-[#1a1a24] dark:text-white" 
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-[#1a1a24]/50"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-[#1a1a24] border border-zinc-200 dark:border-[#2a2a3a] flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:border-[#3a3a4a] transition-all duration-200"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Login Button */}
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <LogIn className="w-4 h-4" />
          Login
        </Link>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-[2px]">
          <div className="w-full h-full rounded-full bg-white dark:bg-[#12121a] flex items-center justify-center">
            <User className="w-4 h-4 text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
