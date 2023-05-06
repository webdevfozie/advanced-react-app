import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { Button } from '@/shared/ui/Button/Button'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { getCanEditArticle } from '../../model/selectors/article'

interface ArticleDetailsPageHeaderProps {
  className?: string,
  id?: string
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const {
    className,
    id,
  } = props

  const { t } = useTranslation('article-details')
  const canEdit = useSelector(getCanEditArticle)

  return (
    <HStack gap={16} max justify="between" className={classNames('', {}, [className])}>
      <AppLink to={RoutePath.articles}>
        <Button>{t('Назад к списку')}</Button>
      </AppLink>
      {(canEdit && id) && (
        <AppLink
          to={`${RoutePath['article-details']}${id}/edit`}
        >
          <Button>{t('Редактировать')}</Button>
        </AppLink>
      )}
    </HStack>
  )
})
