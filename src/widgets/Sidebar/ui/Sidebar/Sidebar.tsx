import { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useTranslation } from 'react-i18next'
import { Icon } from 'shared/ui/Icon/Icon'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string,
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()

  const onToggle = () => {
    setCollapsed((prevState) => !prevState)
  }

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <div className={cls.items}>
        <AppLink
          className={cls.link}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
        >
          <Icon>🏠</Icon>
          <span>{t('Главная страница')}</span>
        </AppLink>
        <AppLink
          className={cls.link}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.about}
        >
          <Icon>💁‍</Icon>
          <span>{t('О нас')}</span>
        </AppLink>
      </div>
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls['collapse-button']}
        theme={ButtonTheme.CLEAR}
        square
        size={ButtonSize.L}
      >
        { collapsed ? '➡️' : '⬅️' }
      </Button>

      <div className={classNames(cls.switchers)}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </div>
  )
}
