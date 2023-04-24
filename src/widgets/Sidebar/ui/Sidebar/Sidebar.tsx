import { memo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'features/ThemeSwitcher'
import { LangSwitcher } from 'features/LangSwitcher'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { HStack, VStack } from 'shared/ui/Stack'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string,
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemsList = useSelector(getSidebarItems)

  const onToggle = () => {
    setCollapsed((prevState) => !prevState)
  }

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <VStack role="navigation" gap={4}>
        {sidebarItemsList.map((item) => (
          <SidebarItem
            item={item}
            key={item.path}
            collapsed={collapsed}
          />
        ))}
      </VStack>
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

      <HStack max gap={16} justify="center" className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </HStack>
    </aside>
  )
})
