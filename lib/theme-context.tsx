"use client"

import { createContext, useContext, ReactNode } from "react"

type ThemeMode = "default" | "zero-proof"

const ThemeContext = createContext<ThemeMode>("default")

export function ThemeProvider({
  mode,
  children,
}: {
  mode: ThemeMode
  children: ReactNode
}) {
  return <ThemeContext.Provider value={mode}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  return useContext(ThemeContext)
}
