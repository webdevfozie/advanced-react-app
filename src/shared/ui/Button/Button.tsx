import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import cls from './Button.module.scss'

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  OUTLINE_INVERTED = 'outline-inverted',
  OUTLINE_WARNING = 'outline-warning',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background-inverted',
}

export enum ButtonSize {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  theme?: ButtonTheme,
  square?: boolean,
  size?: ButtonSize,
  children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    className,
    theme = ButtonTheme.OUTLINE,
    square,
    size = ButtonSize.M,
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.square]: square,
  }

  return (
    <button
      type="button"
      className={classNames(cls.button, mods, [className, cls[theme], cls[size]])}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </button>
  )
})
