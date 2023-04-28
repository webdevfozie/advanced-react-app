import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from 'widgets/Page'
import { VStack } from 'shared/ui/Stack'
import { ArticleRecommendationsList } from 'features/articleRecommendationsList'
import {
  ArticleDetailsComments,
} from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import cls from './ArticleDetailsPage.module.scss'
import { articleDetailsPageReducer } from '../../model/slice'

interface ArticleDetailsPageProps {
  className?: string,
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation('article-details')
  const { id } = useParams<{id: string}>()

  if (!id) {
    return (
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        <VStack max gap={16}>
          <ArticleDetailsPageHeader id={id} />
          <ArticleDetails id={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
