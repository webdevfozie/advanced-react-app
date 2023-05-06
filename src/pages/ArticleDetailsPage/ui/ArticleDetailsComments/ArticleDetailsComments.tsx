import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { AddCommentForm } from '@/features/AddCommentForm'
import { CommentList } from '@/entities/Comment'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from '@/shared/ui/Stack'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'

interface ArticleDetailsCommentsProps {
  className?: string,
  id?: string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const {
    className,
    id,
  } = props

  const { t } = useTranslation('article-details')
  const dispatch = useAppDispatch()
  const commentList = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  return (
    <VStack gap={8} max className={classNames('', {}, [className])}>
      <Text title={t('Комментарии')} />
      <AddCommentForm
        onSendComment={onSendComment}
      />
      <CommentList
        isLoading={commentsIsLoading}
        commentList={commentList}
      />
    </VStack>
  )
})
