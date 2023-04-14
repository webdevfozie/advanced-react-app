import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { ArticleDetails, ArticleList } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/AddCommentForm'
import { Page } from 'widgets/Page'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import {
  getArticleRecommendationsIsLoading,
} from '../../model/selectors/recommendations'
import {
  getArticleRecommendations,
} from '../../model/slice/articleDetailsRecommendationsSlice'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import cls from './ArticleDetailsPage.module.scss'
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
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
  const dispatch = useAppDispatch()
  const commentList = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendations())
  })

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
        <ArticleDetailsPageHeader id={id} />
        <ArticleDetails id={id} />
        <div className={cls.comments}>
          <Text className={cls.recommendationsTitle} title={t('Рекомендуем')} />
          <ArticleList
            target="_blank"
            className={cls.recommendations}
            articles={recommendations}
            isLoading={recommendationsIsLoading}
          />
          <Text className={cls['comments-title']} title={t('Комментарии')} />
          <AddCommentForm
            onSendComment={onSendComment}
            className={cls.addCommentForm}
          />
          <CommentList
            isLoading={commentsIsLoading}
            commentList={commentList}
          />
        </div>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
