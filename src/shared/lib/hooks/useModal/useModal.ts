import {
  MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react'

interface UseModalProps {
  animationDelay?: number,
  onClose?: () => void,
  isOpen?: boolean,
}

export function useModal({
  animationDelay = 300,
  onClose,
  isOpen,
}: UseModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timeoutRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timeoutRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, animationDelay)
    }
  }, [animationDelay, onClose])

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close()
    }
  }, [close])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keyup', onKeyUp)
    }

    return () => {
      clearTimeout(timeoutRef.current)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [isOpen, onKeyUp])

  return {
    close,
    isClosing,
    isMounted,
  }
}
