import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { VStack } from 'shared/ui/Stack'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { Notification } from '../../model/types/notifications'

interface NotificationItemProps {
  className?: string,
  item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const {
    className,
    item,
  } = props

  const content = (
    <VStack
      gap={8}
      max
      className={classNames('', {}, [className])}
    >
      <Text title={item.title} size={TextSize.S}>
        {item.description}
      </Text>
    </VStack>
  )

  if (item.href) {
    return (
      <AppLink to={item.href} target="_blank" underline={false}>
        {content}
      </AppLink>
    )
  }

  return content
})
