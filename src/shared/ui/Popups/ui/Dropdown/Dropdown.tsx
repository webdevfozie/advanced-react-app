import { Menu } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '../../../AppLink/AppLink'
import popupCls from '../../styles/popup.module.scss'
import { Direction } from '../../../../types/ui'

interface DropdownItem {
  disabled?: boolean
  content: ReactNode,
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[],
  trigger: ReactNode,
  direction?: Direction
}

export function Dropdown(props: DropdownProps) {
  const {
    className,
    items,
    trigger,
    direction = 'bottom-left',
  } = props
  return (
    <Menu as="div" className={classNames(popupCls.popup, {}, [className])}>
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(popupCls.menu, {}, [popupCls[direction]])}>
        {items.map((item) => {
          const content = ({ active }: {active: boolean}) => (
            <button
              type="button"
              onClick={item.onClick}
              className={classNames(popupCls.item, {
                [popupCls.active]: active,
              })}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} key={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item as={Fragment} key={JSON.stringify(item.content)} disabled={item.disabled}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
