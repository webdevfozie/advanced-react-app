import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './NotFound.module.scss'

interface NotFoundProps {
  className?: string,
}

export const NotFound = ({ className }: NotFoundProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.notFound, {}, [className])}>
      {t('Страница не найдена')}
    </div>
  )
}
