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

interface TextProps {
  className?: string,
  children?: ReactNode,
  title?: string,
  theme?: TextTheme,
  align?: TextAlign
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    children,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
  } = props

  return (
    <div className={classNames(cls.text, {}, [className, cls[theme], cls[align]])}>
      {title && <h3 className={cls.title}>{title}</h3>}
      {children && <p className={cls.text}>{children}</p>}
    </div>
  )
})
