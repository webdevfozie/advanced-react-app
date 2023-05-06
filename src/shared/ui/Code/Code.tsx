import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '../Button/Button'
import { Icon } from '../Icon/Icon'
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

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
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
