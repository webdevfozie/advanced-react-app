import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Icon, IconSize } from '@/shared/ui/Icon/Icon'
import cls from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string,
  short?: boolean
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()
  const toggleLanguage = () => {
    // noinspection JSIgnoredPromiseFromCall
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')
  }

  return (
    <Button
      className={classNames(cls.langSwitcher, {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={toggleLanguage}
    >
      {!short && t('Название языка')}
      <Icon size={IconSize.L}>{i18n.language === 'en' ? '🇬🇧' : '🇷🇺'}</Icon>
    </Button>
  )
}
