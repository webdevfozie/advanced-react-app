import { classNames } from 'shared/lib/classNames/classNames'
import { ReactNode, useCallback } from 'react'
import cls from './Tags.module.scss'

export interface TagItem {
  value: string
  content: ReactNode
}

interface TagsProps {
  className?: string,
  tags: Array<TagItem>,
  value: string,
  onTagClick: (tab: TagItem) => void,
}

export const Tags = (props: TagsProps) => {
  const {
    className,
    tags,
    value,
    onTagClick,
  } = props

  const onClick = useCallback((tag: TagItem) => () => {
    onTagClick(tag)
  }, [onTagClick])

  return (
    <div className={classNames(cls.tags, {}, [className])}>
      {tags.map((tag) => (
        <div
          key={tag.value}
          className={classNames(cls.tag, { [cls.active]: tag.value === value }, [])}
          onClick={onClick(tag)}
        >
          {tag.content}
        </div>
      ))}
    </div>
  )
}
