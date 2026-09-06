import { useState } from 'react'
function read(key: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === 'string').slice(0, 100)
      : []
  } catch {
    return []
  }
}
export function usePreferences(key: string) {
  const [values, setValues] = useState<string[]>(() => read(key))
  function save(next: string[]) {
    setValues(next)
    try {
      localStorage.setItem(key, JSON.stringify(next))
    } catch {
      /* Preferences remain usable in memory. */
    }
  }
  return {
    values,
    toggle: (id: string) =>
      save(
        values.includes(id)
          ? values.filter((value) => value !== id)
          : [...values, id],
      ),
    visit: (id: string) =>
      save([id, ...values.filter((value) => value !== id)].slice(0, 20)),
  }
}
