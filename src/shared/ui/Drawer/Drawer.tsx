import { memo, ReactNode } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import cls from './Drawer.module.scss'

interface DrawerProps {
  className?: string,
  children: ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  lazy?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
    lazy,
  } = props

  const {
    isClosing,
    close,
    isMounted,
  } = useModal({
    animationDelay: 400,
    onClose,
    isOpen,
  })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls['is-closing']]: isClosing,
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div
        className={classNames(cls.drawer, mods, [className])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
})
