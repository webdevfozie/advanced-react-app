import { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '../../../Stack'
import { Button } from '../../../Button/Button'
import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'
import { Direction } from '../../../../types/ui'

interface ListBoxItem<T extends string> {
  value: T,
  content: ReactNode,
  disabled?: boolean
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[],
  className?: string,
  value?: T,
  defaultValue?: string,
  label?: string,
  onChange: (value: T) => void,
  readonly?: boolean,
  direction?: Direction
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    label,
    direction = 'bottom',
  } = props

  return (
    <HStack gap={8}>
      { label && <div className={cls.label}>{label}</div> }
      <HListBox
        value={value}
        onChange={onChange}
        as="div"
        className={classNames(popupCls.popup, {}, [className])}
        disabled={readonly}
      >
        <HListBox.Button
          as={Fragment}
        >
          <Button>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(popupCls.menu, {}, [cls[direction]])}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value as T}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(popupCls.item, {
                    [popupCls.active]: active,
                    [cls.selected]: selected,
                  }, [])}
                >
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
