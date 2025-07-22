"use client"

import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <div className="flex items-center justify-end p-4 bg-white/95 dark:bg-slate-900/95 border-b border-gray-200/80 dark:border-slate-700/50 transition-all duration-700 ease-in-out backdrop-blur-sm">
      <ThemeToggle />
    </div>
  )
}
