import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import cls from './ArticleDetailsPage.module.scss'
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'

interface ArticleDetailsPageProps {
  className?: string,
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
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

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <div className={cls.comments}>
          <Text className={cls['comments-title']} title={t('Комментарии')} />
          <CommentList
            isLoading={commentsIsLoading}
            commentList={commentList}
          />
        </div>
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
