import { classNames } from 'shared/lib/classNames/classNames'
import { ChangeEvent, InputHTMLAttributes, memo } from 'react'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps{
  className?: string,
  value?: string,
  onChange?: (value: string) => void,
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    ...otherProps
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <input
      className={classNames(cls.input, {}, [className])}
      type={type}
      value={value}
      onChange={onChangeHandler}
      {...otherProps}
    />
  )
})
