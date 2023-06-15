import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon, IconSize } from '@/shared/ui/Icon'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

import { Theme } from '@/shared/const/theme'

interface ThemeSwitcherProps {
  className?: string,
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const {
    theme,
    toggleTheme,
  } = useTheme()

  const themeIcon = useCallback(() => {
    if (theme === Theme.LIGHT) {
      return '🌚'
    }

    if (theme === Theme.DARK) {
      return '🌿'
    }
    return '🌝'
  }, [theme])

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [className])}
      onClick={toggleTheme}
    >
      <Icon size={IconSize.L}>{themeIcon()}</Icon>
    </Button>
  )
}
