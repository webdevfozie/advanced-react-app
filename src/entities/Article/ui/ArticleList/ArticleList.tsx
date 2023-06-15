import { useTranslation } from 'react-i18next'
import { HTMLAttributeAnchorTarget, memo } from 'react'
import { Text } from '@/shared/ui/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleView } from '../../model/consts/consts'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import cls from './ArticleList.module.scss'
import { Article } from '../../model/types/article'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget,

}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.BIG ? 3 : 18)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ))

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    target,
    view = ArticleView.SMALL,
  } = props

  const { t } = useTranslation()

  if (!articles || !articles.length) {
    return null
  }

  if (!isLoading && !articles?.length) {
    return (
      <Text title={t('Статьи не найдены')} />
    )
  }

  return (
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {
        articles.map((article) => (
          <ArticleListItem
            article={article}
            view={view}
            target={target}
            key={article.id}
            className={cls.card}
          />
        ))

      }
      {isLoading && getSkeletons(view)}
    </div>
  )
})
