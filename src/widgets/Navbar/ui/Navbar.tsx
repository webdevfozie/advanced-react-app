import { classNames } from 'shared/lib/classNames/classNames'
import { Icon } from 'shared/ui/Icon/Icon'
import { memo, useCallback, useState } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const onClose = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])
  const openModal = useCallback(() => setIsAuthModalOpen(true), [])
  const authData = useSelector(getUserAuthData)
  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <div className={cls.links}>
          <Button
            onClick={onLogout}
            theme={ButtonTheme.OUTLINE_INVERTED}
          >
            <Icon>🔓</Icon>
            &nbsp;
            {t('Выйти')}
          </Button>
        </div>
      </header>
    )
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <Button
          onClick={openModal}
          theme={ButtonTheme.OUTLINE_INVERTED}
        >
          <Icon>🔐</Icon>
          &nbsp;
          {t('Войти')}
        </Button>
      </div>
      <LoginModal isOpen={isAuthModalOpen} onClose={onClose} />
    </header>
  )
})
