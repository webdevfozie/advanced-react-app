import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { VStack } from 'shared/ui/Stack'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import cls from './NotificationList.module.scss'
import { useNotifications } from '../../api/notificationApi'

interface NotificationListProps {
  className?: string,
}

export const NotificationList = memo((props: NotificationListProps) => {
  const {
    className,
  } = props

  const { data, isLoading } = useNotifications(undefined, {
    pollingInterval: 5000,
  })

  if (isLoading) {
    return (
      <VStack
        gap={16}
        max
        className={classNames(cls.notificationList, {}, [className])}
      >
        <Skeleton width="200px" height="60px" radius="8px" />
        <Skeleton width="200px" height="60px" radius="8px" />
        <Skeleton width="200px" height="60px" radius="8px" />
      </VStack>
    )
  }

  return (
    <VStack
      gap={16}
      max
      className={classNames(cls.notificationList, {}, [className])}
    >
      {data?.map((notification) => (
        <NotificationItem
          key={notification.id}
          item={notification}
        />
      ))}
    </VStack>
  )
})
