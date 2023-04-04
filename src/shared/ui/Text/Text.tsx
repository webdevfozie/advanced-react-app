import { classNames } from 'shared/lib/classNames/classNames'
import { memo, ReactNode } from 'react'
import cls from './Text.module.scss'

export enum TextTheme {
  PRIMARY= 'primary',
  ERROR= 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  CENTER = 'center',
  LEFT = 'left',
}

export enum TextSize {
  M = 'size-m',
  L = 'size-l',
}

interface TextProps {
  className?: string,
  children?: ReactNode,
  title?: string,
  theme?: TextTheme,
  align?: TextAlign,
  size?: TextSize
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    children,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
  } = props

  const additionalClasses = [
    className,
    cls[theme],
    cls[align],
    cls[size],
  ]

  return (
    <div className={classNames(cls.text, undefined, additionalClasses)}>
      {title && <h3 className={cls.title}>{title}</h3>}
      {children && <p className={cls.text}>{children}</p>}
    </div>
  )
})
