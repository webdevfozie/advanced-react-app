import { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { useTranslation } from 'react-i18next'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string,
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()

  function toggle() {
    setCollapsed((prevState) => !prevState)
  }

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <button
        data-testid="sidebar-toggle"
        type="button"
        onClick={toggle}
      >
        {t('Переключить')}
      </button>

      <div className={classNames(cls.switchers)}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </div>
  )
}
