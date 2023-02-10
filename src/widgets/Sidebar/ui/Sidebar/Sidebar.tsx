import { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'

interface SidebarProps {
	className?: string,
}

export const Sidebar = ({className}: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false)

	function toggle() {
		setCollapsed(prevState => !prevState)
	}

	return (
		<div className={classNames(cls.sidebar, {[cls.collapsed]: collapsed}, [className])}>
			<button onClick={toggle}>toggle</button>

			<div className={classNames(cls.switchers)}>
				<ThemeSwitcher />
				<LangSwitcher />
			</div>
		</div>
	)
}
