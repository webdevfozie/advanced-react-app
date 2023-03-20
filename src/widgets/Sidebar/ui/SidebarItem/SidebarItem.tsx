import { useTranslation } from 'react-i18next'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Icon } from 'shared/ui/Icon/Icon'
import { SidebarItemType } from 'widgets/Sidebar/model/Items'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: SidebarItemType,
  collapsed?: boolean,
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const {
    item,
    collapsed,
  } = props

  const { t } = useTranslation()

  const isAuth = useSelector(getUserAuthData)

  if (item.needAuth && !isAuth) {
    return null
  }

  return (
    <AppLink
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
    >
      <Icon>{item.icon}</Icon>
      <span>{t(item.text)}</span>
    </AppLink>
  )
})
