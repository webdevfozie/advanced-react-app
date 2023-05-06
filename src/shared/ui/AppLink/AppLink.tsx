import React, { memo, ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string,
  theme?: AppLinkTheme,
  children?: ReactNode,
  underline?: boolean
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    className,
    children,
    to,
    theme = AppLinkTheme.PRIMARY,
    underline = true,
    ...otherProps
  } = props

  return (
    <Link
      to={to}
      className={classNames(cls.appLink, { [cls.underline]: underline }, [className, cls[theme]])}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...otherProps}
    >
      {children}
    </Link>
  )
})
