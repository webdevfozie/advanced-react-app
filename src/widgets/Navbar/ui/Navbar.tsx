import { classNames } from 'shared/lib/classNames/classNames'
import {
  memo, useCallback, useMemo, useState,
} from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useSelector } from 'react-redux'
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)

  const onClose = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])
  const openModal = useCallback(() => setIsAuthModalOpen(true), [])

  const authData = useSelector(getUserAuthData)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          title={t('Advanced React App')}
          className={cls.logo}
        />
        <AppLink
          to={RoutePath[AppRoutes.ARTICLE_CREATE]}
          underline={false}
        >
          <Button
            theme={ButtonTheme.OUTLINE_INVERTED}
          >
            {t('Создать новую статью')}
          </Button>
        </AppLink>
        <Dropdown
          className={cls.dropdown}
          items={[
            ...(isAdminPanelAvailable
              ? [{
                content: t('Админ'),
                href: RoutePath[AppRoutes.ADMIN_PANEL],
              }]
              : []
            ),
            {
              content: t('Выйти'),
              onClick: onLogout,
            },
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id,
            },
          ]}
          trigger={<Avatar size={35} src={authData.avatar} />}
          direction="bottom-right"
        />
      </header>
    )
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.dropdown}>
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
