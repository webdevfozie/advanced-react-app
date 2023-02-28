import { classNames } from 'shared/lib/classNames/classNames'
import React, {
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react'
import { Portal } from 'shared/ui/Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string,
  children?: ReactNode,
  isOpen?: boolean,
  onClose: () => void,
}

const ANIMATION_DELAY = 400

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props

  const [isClosing, setIsClosing] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls['is-closing']]: isClosing,
  }

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timeoutRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onContentClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
  }

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keyup', onKeyUp)
    }

    return () => {
      clearTimeout(timeoutRef.current)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [isOpen, onKeyUp])

  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [className])}>
        <div
          onClick={closeHandler}
          className={cls.overlay}
        >
          <div
            onClick={onContentClick}
            className={cls.content}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
