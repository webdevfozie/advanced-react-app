import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  isUserAdmin, isUserManager, User, userActions,
} from '@/entities/User'
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router'

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
            href: getRouteAdminPanel(),
          }]
          : []
        ),
        {
          content: t('Выйти'),
          onClick: onLogout,
        },
        {
          content: t('Профиль'),
          href: getRouteProfile(authData.id),
        },
      ]}
      trigger={<Avatar size={35} src={authData.avatar} />}
      direction="bottom-left"
    />
  )
})
