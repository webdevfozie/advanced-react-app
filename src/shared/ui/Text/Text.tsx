import { classNames } from 'shared/lib/classNames/classNames'
import { memo, ReactNode } from 'react'
import cls from './Text.module.scss'

export enum TextTheme {
  PRIMARY= 'primary',
  ERROR= 'error'
}

interface TextProps {
  className?: string,
  children?: ReactNode,
  title?: string,
  theme?: TextTheme,
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    children,
    title,
    theme = TextTheme.PRIMARY,
  } = props

  return (
    <div className={classNames(cls.text, {}, [className, cls[theme]])}>
      {title && <h3 className={cls.title}>{title}</h3>}
      {children && <p className={cls.text}>{children}</p>}
    </div>
  )
})
