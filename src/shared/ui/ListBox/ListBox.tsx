import { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import { HStack } from '../Stack'
import { Button } from '../Button/Button'
import cls from './ListBox.module.scss'
import { Direction } from '../../types/ui'

interface ListBoxItem {
  value: string,
  content: ReactNode,
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[],
  className?: string,
  value?: string,
  defaultValue?: string,
  label?: string,
  onChange: <T extends string>(value: T) => void,
  readonly?: boolean,
  direction?: Direction
}

export function ListBox(props: ListBoxProps) {
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
        className={classNames(cls.listBox, {}, [className])}
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
          className={classNames(cls.options, {}, [cls[direction]])}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [cls.active]: active,
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
