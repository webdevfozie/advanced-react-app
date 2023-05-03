import { memo, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import cls from './Drawer.module.scss'

interface DrawerProps {
  className?: string,
  children: ReactNode,
  isOpen?: boolean,
  onClose?: () => void
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
  } = props

  return (
    <Portal>
      <div
        className={classNames(cls.drawer, {
          [cls.opened]: isOpen,
        }, [className])}
      >
        <Overlay onClick={onClose} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
})
