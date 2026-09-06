import { useCallback, useRef, useState } from 'react'
import {
  getHistory,
  writePersistedHistory,
  upsertHistoryEntry,
} from '../lib/history'
import { canUseLocalStorage } from '../lib/storage'
import type { GhostCartHistoryEntry } from '../types/history'

export function useHistory() {
  const [entries, setEntries] = useState<GhostCartHistoryEntry[]>(getHistory)
  const current = useRef(entries)
  const [storageAvailable, setStorageAvailable] = useState(canUseLocalStorage)
  const saveEntry = useCallback((entry: GhostCartHistoryEntry): boolean => {
    const next = upsertHistoryEntry(current.current, entry)
    const persisted = writePersistedHistory(next)
    current.current = next
    setEntries(next)
    setStorageAvailable(persisted)
    return persisted
  }, [])
  const clear = useCallback(() => {
    const persisted = writePersistedHistory([])
    current.current = []
    setEntries([])
    setStorageAvailable(persisted)
  }, [])
  return { entries, saveEntry, clear, storageAvailable }
}
