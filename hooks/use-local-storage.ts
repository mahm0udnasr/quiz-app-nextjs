"use client"

import { useState, useCallback } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue
      }
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error("Error saving to localStorage:", error)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue] as const
}
