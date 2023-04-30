import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { HTMLAttributeAnchorTarget, memo } from 'react'
import { List, ListRowProps, WindowScroller } from 'react-virtualized'
import { PAGE_ID } from 'widgets/Page/ui/Page'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget,
  virtualization?: boolean

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
    virtualization = true,
  } = props

  const { t } = useTranslation()

  if (!articles || !articles.length) {
    return null
  }

  const isBig = view === ArticleView.BIG

  const itemsPerRow = isBig ? 1 : 3
  const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem
          target={target}
          className={cls.card}
          article={articles[i]}
          view={view}
          key={articles[i].id}
        />,
      )
    }

    return (
      <div
        key={key}
        style={style}
        className={cls.row}
      >
        {items}
      </div>
    )
  }

  if (!isLoading && !articles?.length) {
    return (
      <Text title={t('Статьи не найдены')} />
    )
  }

  return (
    // @ts-ignore
    <WindowScroller
      scrollElement={document.getElementById(PAGE_ID) as Element}
    >
      {({
        width,
        height,
        registerChild,
        onChildScroll,
        isScrolling,
        scrollTop,
      }) => (
        <div
          className={classNames(cls.articleList, {}, [className, cls[view]])}
          // @ts-ignore
          ref={registerChild}
        >
          {virtualization
            ? (
              // @ts-ignore
              <List
                height={height ?? 700}
                rowCount={rowCount}
                rowHeight={isBig ? 660 : 320}
                rowRenderer={rowRenderer}
                width={width ? width - 80 : 700}
                autoHeight
                onScroll={onChildScroll}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
              />
            )
            : (
              articles.map((article) => (
                <ArticleListItem
                  article={article}
                  view={view}
                  target={target}
                  key={article.id}
                  className={cls.card}
                />
              ))
            )}

          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  )
})
