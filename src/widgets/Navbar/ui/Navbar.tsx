import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback, useState } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig'
import { HStack } from 'shared/ui/Stack'
import { NotificationButton } from 'features/NotificationButton'
import { AvatarDropdown } from 'features/AvatarDropdown'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string,
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])
  const openModal = useCallback(() => setIsAuthModalOpen(true), [])

  const authData = useSelector(getUserAuthData)

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
        <HStack
          gap={16}
          className={cls.actions}
        >
          <NotificationButton />
          <AvatarDropdown authData={authData} />
        </HStack>
      </header>
    )
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <HStack gap={8} className={cls.actions}>
        <Button
          onClick={openModal}
          theme={ButtonTheme.OUTLINE_INVERTED}
        >
          <Icon>🔐</Icon>
          &nbsp;
          {t('Войти')}
        </Button>
      </HStack>
      <LoginModal isOpen={isAuthModalOpen} onClose={onClose} />
    </header>
  )
})
