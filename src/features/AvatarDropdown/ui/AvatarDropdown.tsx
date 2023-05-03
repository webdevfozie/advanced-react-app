import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Dropdown } from 'shared/ui/Popups'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import {
  isUserAdmin, isUserManager, User, userActions,
} from 'entities/User'

interface AvatarDropdownProps {
  className?: string,
  authData: User
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const {
    className,
    authData,
  } = props
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  const isAdminPanelAvailable = isAdmin || isManager

  return (
    <Dropdown
      className={classNames('', {}, [className])}
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
      direction="bottom-left"
    />
  )
})
