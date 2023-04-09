import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'

interface ArticleListProps {
  className?: string
  articles?: Article[]
  isLoading?: boolean
  view?: ArticleView
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.BIG ? 3 : 18)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ))

export const ArticleList = (props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
  } = props

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id}
      className={cls.card}
      article={article}
      view={view}
    />
  )

  return (
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {
        articles?.length
          ? articles.map(renderArticle)
          : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  )
}
