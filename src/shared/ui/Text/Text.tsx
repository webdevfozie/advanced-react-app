import { classNames } from 'shared/lib/classNames/classNames'
import { memo, ReactNode } from 'react'
import cls from './Text.module.scss'

export enum TextTheme {
  PRIMARY= 'primary',
  ERROR= 'error',
  INVERTED= 'inverted'
}

export enum TextAlign {
  RIGHT = 'right',
  CENTER = 'center',
  LEFT = 'left',
}

export enum TextSize {
  S = 'size-s',
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

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
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

  const HeaderTag = mapSizeToHeaderTag[size]

  return (
    <div className={classNames(cls.text, undefined, additionalClasses)}>
      {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
      {children && <p className={cls.text}>{children}</p>}
    </div>
  )
})
