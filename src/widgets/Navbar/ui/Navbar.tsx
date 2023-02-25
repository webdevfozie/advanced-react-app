import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Icon, IconSize } from 'shared/ui/Icon/Icon'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string,
}

export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(cls.navbar, {}, [className])}>
    <div className={cls.links}>
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={RoutePath.main}
      >
        <Icon size={IconSize.L}>🏠</Icon>
      </AppLink>
    </div>
  </div>
)
