import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleList } from 'entities/Article'
import { useSelector } from 'react-redux'
import { Text } from 'shared/ui/Text/Text'
import { getArticles } from '../../model/slices/articlesPageSlice'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'

interface ArticleInfiniteListProps {
  className?: string,
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation()
  const view = useSelector(getArticlesPageView)
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)

  if (error) {
    return <Text>{t('Произошла ошибка при загрузке статей!')}</Text>
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  )
})
