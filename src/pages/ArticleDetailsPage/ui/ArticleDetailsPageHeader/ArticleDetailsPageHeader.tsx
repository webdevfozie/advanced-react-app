import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { useSelector } from 'react-redux'
import { getCanEditArticle } from '../../model/selectors/article'
import cls from './ArticleDetailsPageHeader.module.scss'

interface ArticleDetailsPageHeaderProps {
  className?: string,
  id: string
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const {
    className,
    id,
  } = props

  const { t } = useTranslation('article-details')
  const canEdit = useSelector(getCanEditArticle)

  return (
    <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
      <AppLink to={RoutePath.articles}>
        <Button>{t('Назад к списку')}</Button>
      </AppLink>
      {canEdit && (
        <AppLink
          className={cls.editButton}
          to={`${RoutePath['article-details']}${id}/edit`}
        >
          <Button>{t('Редактировать')}</Button>
        </AppLink>
      )}
    </div>
  )
})
