import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button } from 'shared/ui/Button/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { HTMLAttributeAnchorTarget } from 'react'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import cls from './ArticleListItem.module.scss'
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = (props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target,
  } = props
  const { t } = useTranslation()

  const articleUrl = RoutePath['article-details'] + article.id

  const types = <Text className={cls.types}>{article.type.join(', ')}</Text>
  const views = (
    <>
      <Text className={cls.views}>{String(article.views)}</Text>
      <Icon>👁️</Icon>
    </>
  )

  if (view === ArticleView.BIG) {
    const firstTextBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock

    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={cls.username}>{article.user.username}</Text>
            <Text className={cls.createdAt}>{article.createdAt}</Text>
          </div>
          <Text className={cls.title} title={article.title} />
          {types}
          <img className={cls.img} src={article.img} alt={article.title} />
          {firstTextBlock && (
            <ArticleTextBlockComponent block={firstTextBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <AppLink
              to={articleUrl}
              underline={false}
              target={target}
            >
              <Button>{t('Читать далее...')}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <AppLink
      to={articleUrl}
      target={target}
      underline={false}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card>
        <div className={cls.imageWrapper}>
          <img src={article.img} className={cls.img} alt={article.title} />
          <Text className={cls.createdAt}>{article.createdAt}</Text>
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text className={cls.title}>{article.title}</Text>
      </Card>
    </AppLink>
  )
}
