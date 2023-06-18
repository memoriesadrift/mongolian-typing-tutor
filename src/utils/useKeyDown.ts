import { useEffect } from 'react'

export type UseKeyDownCallbackParams = {
  key: string
}

export const useKeyDown = (
  callback: (params: UseKeyDownCallbackParams) => void
) => {
  const onKeyDown = (event: KeyboardEvent) => {
    // Disregard held keys
    if (event.repeat) {
      return
    }

    if (['Shift'].some((keyToIgnore) => event.key === keyToIgnore)) {
      return
    }

    callback({ key: event.key })
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])
}
