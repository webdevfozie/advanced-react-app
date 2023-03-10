import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { memo, useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { loginActions } from '../../model/slice/LoginSlice'
import { getLoginState } from '../../model/selectors/getLoginState'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string,
}

export const LoginForm = memo((props: LoginFormProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, password, username])

  return (
    <div className={classNames(cls.loginForm, {}, [className])}>
      <Text title={t('Авторизация')} />
      <Text theme={TextTheme.ERROR}>{error}</Text>
      <Input
        placeholder={t('Введите логин')}
        autoFocus
        value={username}
        onChange={onChangeUsername}
      />
      <Input
        placeholder={t('Введите пароль')}
        value={password}
        onChange={onChangePassword}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  )
})
