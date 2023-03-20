import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { ChangeEvent, InputHTMLAttributes, memo } from 'react'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps{
  className?: string,
  value?: string | number,
  onChange?: (value: string) => void,
  readonly?: boolean,
  placeholder?: string
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    readonly,
    placeholder,
    ...otherProps
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const mods: Mods = {
    [cls.readonly]: readonly,
  }

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classNames(cls.input, mods, [className])}>
      <span>
        {placeholder}
        :&nbsp;
      </span>

      <input
        type={type}
        value={value}
        onChange={onChangeHandler}
        readOnly={readonly}
        {...otherProps}
      />
    </label>
  )
})
