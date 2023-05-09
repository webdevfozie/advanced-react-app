import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import { Icon, IconSize } from '@/shared/ui/Icon/Icon'
import { HStack } from '@/shared/ui/Stack'

interface StarRatingProps {
  className?: string,
  onSelect?: (starCount: number) => void,
  selectedStars?: number
}

const starts = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    selectedStars = 0,
    onSelect,
  } = props

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount)
    }
  }

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount)
      setCurrentStarsCount(starsCount)
      setIsSelected(true)
    }
  }

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0)
    }
  }

  return (
    <HStack gap={4} className={className}>
      {starts.map((star) => (
        <Icon
          className={classNames(cls.star, {
            [cls.hovered]: currentStarsCount >= star,
            [cls.selected]: isSelected,
          }, [])}
          key={star}
          size={IconSize.XL}
          onMouseEnter={onHover(star)}
          onMouseLeave={onLeave}
          onClick={onClick(star)}
        >
          ⭐️
        </Icon>
      ))}
    </HStack>
  )
})
