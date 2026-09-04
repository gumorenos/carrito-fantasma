import { useCallback, useEffect, useState } from 'react'
import { addHistoryEntry, clearHistory as clearPersistedHistory, getHistory, writePersistedHistory } from '../lib/history'
import { canUseLocalStorage } from '../lib/storage'
import type { GhostCartHistoryEntry } from '../types/history'

export function useHistory() {
  const [entries, setEntries] = useState<GhostCartHistoryEntry[]>(getHistory)
  const [storageAvailable] = useState(canUseLocalStorage)

  useEffect(() => {
    writePersistedHistory(entries)
  }, [entries])

  const saveEntry = useCallback((entry: GhostCartHistoryEntry) => {
    setEntries((current) => addHistoryEntry(current, entry))
  }, [])

  const clear = useCallback(() => {
    setEntries([])
    clearPersistedHistory()
  }, [])

  return { entries, saveEntry, clear, storageAvailable }
}
