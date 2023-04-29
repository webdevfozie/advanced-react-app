import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Text } from 'shared/ui/Text/Text'
import { ArticleList } from 'entities/Article'
import { VStack } from 'shared/ui/Stack'
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi'

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props
  const { t } = useTranslation('article-details')
  const { isLoading, error, data: articles } = useArticleRecommendationsList(4)

  if (error || !articles) {
    return null
  }

  return (
    <VStack gap={8} className={classNames('', {}, [className])}>
      <Text title={t('Рекомендуем')} />
      <ArticleList
        target="_blank"
        articles={articles}
        isLoading={isLoading}
        virtualization={false}
      />
    </VStack>
  )
})
