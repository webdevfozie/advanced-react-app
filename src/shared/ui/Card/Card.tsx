import { HTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string,
  children: ReactNode,
  fullWidth?: boolean
}

export const Card = (props: CardProps) => {
  const {
    className,
    children,
    fullWidth = false,
    ...otherProps
  } = props

  return (
    <div
      className={classNames(cls.card, {
        [cls.fullWidth]: fullWidth,
      }, [className])}
      {...otherProps}
    >
      {children}
    </div>
  )
}
