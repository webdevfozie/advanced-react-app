import { Theme, useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames/classNames'
import ThemeLight from 'shared/assets/icons/theme-light.svg'
import ThemeDark from 'shared/assets/icons/theme-dark.svg'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import cls from './ThemeSwitcher.module.scss'

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
      theme={ThemeButton.CLEAR}
      className={classNames(cls.themeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      {
        theme === Theme.LIGHT
          ? <ThemeDark />
          : <ThemeLight />
      }
    </Button>
  )
}
