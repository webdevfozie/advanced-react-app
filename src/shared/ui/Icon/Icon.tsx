import { HTMLAttributes, ReactNode } from 'react'
import cls from './Icon.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

export enum IconSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

interface IconProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode,
  className?: string,
  size?: IconSize
}

export const Icon = ({
  children,
  size = IconSize.M,
  className,
  ...otherProps
}: IconProps) => (
  <i
    className={classNames(cls[size], {}, [className])}
    {...otherProps}
  >
    {children}
  </i>
)
