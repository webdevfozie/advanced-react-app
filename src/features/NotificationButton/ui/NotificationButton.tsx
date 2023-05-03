import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon, IconSize } from 'shared/ui/Icon/Icon'
import { NotificationList } from 'entities/Notification'
import { Popover } from 'shared/ui/Popups'

interface NotificationButtonProps {
  className?: string,
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const {
    className,
  } = props

  return (
    <Popover
      className={classNames('', {}, [className])}
      direction="bottom-left"
      trigger={(
        <Button theme={ButtonTheme.CLEAR}>
          <Icon size={IconSize.L}>🔔</Icon>
        </Button>
      )}
    >
      <NotificationList />
    </Popover>
  )
})
