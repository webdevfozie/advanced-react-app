import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import cls from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string,
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    // noinspection JSIgnoredPromiseFromCall
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')
  }
  return (
    <Button
      className={classNames(cls.langSwitcher, {}, [className])}
      theme={ThemeButton.CLEAR}
      onClick={toggleLanguage}
    >
      {t('Язык')}
    </Button>
  )
}
