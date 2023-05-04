import { classNames, Mods } from 'shared/lib/classNames/classNames'
import React, { ReactNode } from 'react'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string,
  children?: ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  lazy?: boolean
}

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    lazy,
    onClose,
  } = props

  const {
    isClosing, close, isMounted,
  } = useModal({
    animationDelay: 400,
    onClose,
    isOpen,
  })

  if (lazy && !isMounted) {
    return null
  }

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls['is-closing']]: isClosing,
  }

  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [className])}>
        <Overlay onClick={close} />
        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}
