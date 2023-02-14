import { classNames } from 'shared/lib/classNames/classNames'
import { ButtonHTMLAttributes, FC } from 'react'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    children,
    className,
    theme,
    ...otherProps
  } = props

  return (
    <button
      type="button"
      className={classNames(cls.button, {}, [className, cls[theme]])}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </button>
  )
}
