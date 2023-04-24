import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { HStack, VStack } from 'shared/ui/Stack'
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
      <VStack gap={8} max className={classNames(cls.commentCard, {}, [className, cls.loading])}>
        <HStack gap={8} className={cls.header}>
          <Skeleton width={30} height={30} radius="50%" />
          <Skeleton width={150} height={24} />
        </HStack>
        <Skeleton width="100%" height={80} />
      </VStack>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <VStack gap={8} max className={classNames(cls.commentCard, {}, [className])}>
      <AppLink to={`${RoutePath.profile}${comment?.user.id}`}>
        <HStack gap={8}>
          {comment?.user?.avatar && <Avatar size={30} src={comment?.user.avatar} alt={comment?.user.username} />}
          <Text title={comment?.user.username} />
        </HStack>
      </AppLink>
      <Text>{comment?.text}</Text>
    </VStack>
  )
}
