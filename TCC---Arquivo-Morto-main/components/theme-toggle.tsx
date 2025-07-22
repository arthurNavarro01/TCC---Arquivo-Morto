"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 transition-all duration-700 ease-in-out dark:bg-slate-800/80 dark:border-slate-600/50 dark:hover:bg-slate-700/80 dark:text-slate-200 bg-white/90 border-gray-200/80 hover:bg-gray-50/90 text-gray-700 backdrop-blur-sm"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-700 ease-in-out dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-700 ease-in-out dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
