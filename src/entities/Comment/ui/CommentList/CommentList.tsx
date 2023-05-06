import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'
import { CommentCard } from '../CommentCard/CommentCard'
import { Comment } from '../../model/types/comment'

interface CommentListProps {
  className?: string,
  commentList?: Comment[]
  isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
  const {
    className,
    commentList,
    isLoading,
  } = props

  const { t } = useTranslation()

  if (isLoading) {
    return (
      <VStack gap={16} max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    )
  }

  return (
    <VStack max gap={16} className={classNames('', {}, [className])}>
      {commentList?.length
        ? commentList.map((comment) => (
          <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
        ))
        : <Text>{t('Комментарии отсутствуют')}</Text>}
    </VStack>
  )
}
