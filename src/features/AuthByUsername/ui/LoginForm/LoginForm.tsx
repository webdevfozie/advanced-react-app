import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string,
}

export const LoginForm = (props: LoginFormProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.loginForm, {}, [className])}>
      <Input placeholder={t('Введите логин')} autoFocus />
      <Input placeholder={t('Введите пароль')} />
      <Button theme={ButtonTheme.OUTLINE}>{t('Войти')}</Button>
    </div>
  )
}
