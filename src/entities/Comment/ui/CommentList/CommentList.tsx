import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from 'entities/Comment/ui/CommentCard/CommentCard'
import cls from './CommentList.module.scss'
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
      <div className={classNames(cls.commentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    )
  }

  return (
    <div className={classNames(cls.commentList, {}, [className])}>
      {commentList?.length
        ? commentList.map((comment) => (
          <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
        ))
        : <Text>{t('Комментарии отсутствуют')}</Text>}
    </div>
  )
}
