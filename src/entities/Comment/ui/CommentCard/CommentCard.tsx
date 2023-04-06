import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import cls from './CommentCard.module.scss'
import { Comment } from '../../model/types/comment'

interface CommentCardProps {
  className?: string,
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = (props: CommentCardProps) => {
  const {
    className,
    comment,
    isLoading,
  } = props

  if (isLoading) {
    return (
      <div className={classNames(cls.commentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} radius="50%" />
          <Skeleton width={150} height={24} />
        </div>
        <Skeleton width="100%" height={80} />
      </div>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <div className={classNames(cls.commentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment?.user.id}`} className={cls.header}>
        {comment?.user?.avatar && <Avatar size={30} src={comment?.user.avatar} alt={comment?.user.username} />}
        <Text title={comment?.user.username} />
      </AppLink>
      <Text>{comment?.text}</Text>
    </div>
  )
}
