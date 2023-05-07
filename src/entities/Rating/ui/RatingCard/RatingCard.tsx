import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { StarRating } from '@/shared/ui/StarRating/StarRating'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Drawer } from '@/shared/ui/Drawer/Drawer'

interface RatingCardProps {
  className?: string,
  title?: string,
  feedbackTitle?: string,
  hasFeedback?: boolean,
  onCancel?: (starsCount: number) => void,
  onAccept?: (starsCount: number, feedback?: string) => void,
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    hasFeedback = false,
    onCancel,
    feedbackTitle,
    onAccept,
    title,
  } = props

  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(0)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept])

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount)
  }, [onAccept, starsCount])

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input placeholder={t('Ваш отзыв')} />
    </>
  )

  return (
    <Card className={className}>
      <VStack align="center" gap={8}>
        <Text title={title} />
        <StarRating onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
          <VStack max gap={16}>
            {modalContent}
            <HStack gap={8} justify="end" max>
              <Button
                onClick={cancelHandler}
                theme={ButtonTheme.OUTLINE_WARNING}
              >
                {t('Закрыть')}
              </Button>
              <Button
                onClick={acceptHandler}
              >
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          <VStack max gap={16}>
            {modalContent}
            <Button
              onClick={acceptHandler}
              fullWidth
            >
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  )
})
