import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Icon } from 'shared/ui/Icon/Icon'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { HStack, VStack } from 'shared/ui/Stack'
import { ArticleBlock, ArticleBlockType } from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import cls from './ArticleDetails.module.scss'

interface ArticleDetailsProps {
  className?: string,
  id?: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const {
    className,
    id,
  } = props

  const { t } = useTranslation('article-details')
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)
  const article = useSelector(getArticleDetailsData)

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      default:
        return null
    }
  }, [])

  useInitialEffect(() => {
    dispatch(fetchArticleById(id))
  })

  let content

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} height={200} width={200} radius="50%" />
        <Skeleton className={cls.title} height={32} width="50%" />
        <Skeleton className={cls.skeleton} height={48} width="70%" />
        <Skeleton className={cls.skeleton} height={200} width="100%" />
        <Skeleton className={cls.skeleton} height={300} width="100%" />
        <Skeleton className={cls.skeleton} height={200} width="100%" />
        <Skeleton className={cls.skeleton} height={300} width="100%" />
      </>
    )
  } else if (error) {
    content = (
      <Text align={TextAlign.CENTER} theme={TextTheme.ERROR} title={t('Произошла ошибка при загрузке статьи!')} />
    )
  } else {
    content = (
      <>
        <Avatar
          size={200}
          src={article?.img}
          className={cls.avatar}
        />
        <Text
          title={article?.title}
          size={TextSize.L}
        >
          {article?.subtitle}
        </Text>
        <VStack gap={4}>
          <HStack gap={4} className={cls.articleInfo}>
            <Icon>👁️</Icon>
            <Text>{article?.views}</Text>
          </HStack>
          <HStack gap={4} className={cls.articleInfo}>
            <Icon>📆</Icon>
            <Text>{article?.createdAt}</Text>
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack
        gap={16}
        max
        className={classNames(cls.articleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  )
})
