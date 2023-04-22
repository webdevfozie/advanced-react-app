import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon, IconSize } from 'shared/ui/Icon/Icon'
import { useCallback } from 'react'

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
