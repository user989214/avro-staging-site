"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type ThemeMode = "default" | "zero-proof"

interface ThemeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "default",
  setMode: () => {},
})

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [mode, setMode] = useState<ThemeMode>("default")

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const { mode } = useContext(ThemeContext)
  return mode
}

export function useSetThemeMode() {
  const { setMode } = useContext(ThemeContext)
  return setMode
}

// Hook to set theme mode on mount and reset on unmount
export function usePageTheme(mode: ThemeMode) {
  const setMode = useSetThemeMode()

  useEffect(() => {
    setMode(mode)
    return () => setMode("default")
  }, [mode, setMode])
}
