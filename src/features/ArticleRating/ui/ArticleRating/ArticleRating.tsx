import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export interface ArticleRatingProps {
  className?: string;
  id: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, id } = props
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)

  const { data, isLoading } = useGetArticleRating({
    userId: userData?.id ?? '',
    articleId: id,
  })

  const [rateArticleMutation] = useRateArticle()

  const rating = data?.[0]

  const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateArticleMutation({
        userId: userData?.id ?? '',
        articleId: id,
        rate: starsCount,
        feedback,
      })
    } catch (err) {
      console.error(err)
    }
  }, [id, rateArticleMutation, userData?.id])

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback)
  }, [handleRateArticle])

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount)
  }, [handleRateArticle])

  if (isLoading) {
    return <Skeleton width="100%" height={120} />
  }

  return (
    <RatingCard
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
      hasFeedback
    />
  )
})

export default ArticleRating
