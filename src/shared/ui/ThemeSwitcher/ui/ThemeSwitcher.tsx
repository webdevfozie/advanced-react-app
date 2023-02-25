import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon, IconSize } from 'shared/ui/Icon/Icon'

interface ThemeSwitcherProps {
  className?: string,
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const {
    theme,
    toggleTheme,
  } = useTheme()

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [className])}
      onClick={toggleTheme}
    >
      {
        theme === Theme.LIGHT
          ? <Icon size={IconSize.L}>🌚</Icon>
          : <Icon size={IconSize.L}>🌝</Icon>
      }
    </Button>
  )
}
