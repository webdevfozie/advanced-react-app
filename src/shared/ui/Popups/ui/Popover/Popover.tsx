import { memo, ReactNode } from 'react'
import { Popover as HPopover } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Direction } from '@/shared/types/ui'
import popupCls from '../../styles/popup.module.scss'
import cls from './Popover.module.scss'

interface PopoverProps {
  className?: string,
  direction?: Direction
  trigger: ReactNode,
  children: ReactNode,
}

export const Popover = memo((props: PopoverProps) => {
  const {
    className,
    trigger,
    direction = 'bottom-left',
    children,
  } = props

  return (
    <HPopover className={classNames('', {}, [className, popupCls.popup])}>
      <HPopover.Button className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(popupCls.menu, {}, [cls.panel, popupCls[direction]])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  )
})
