import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { useCallback } from 'react'
import cls from './Code.module.scss'

interface CodeProps {
  className?: string,
  text: string
}

export const Code = (props: CodeProps) => {
  const {
    className,
    text,
  } = props

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.code, {}, [className])}>
      <Button onClick={copy} className={cls.copyButton} theme={ButtonTheme.CLEAR}>
        <Icon>📑</Icon>
      </Button>
      <code>{text}</code>
    </pre>
  )
}
