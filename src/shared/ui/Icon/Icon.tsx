import { ReactNode } from 'react'
import cls from './Icon.module.scss'

export enum IconSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

interface IconProps {
  children?: ReactNode,
  size?: IconSize
}

export const Icon = ({ children, size = IconSize.M }: IconProps) => (
  <i className={cls[size]}>
    {children}
  </i>
)
