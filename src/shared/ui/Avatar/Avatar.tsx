import { CSSProperties, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string,
  src?: string,
  size?: number
  alt?: string
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    size = 50,
    alt = 'image',
  } = props

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size])

  return (
    <img
      className={classNames(cls.avatar, {}, [className])}
      src={src}
      style={styles}
      alt={alt}
    />
  )
}
