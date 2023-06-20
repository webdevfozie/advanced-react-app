import { useTranslation } from 'react-i18next'
import { memo, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleTypeTags.module.scss'
import { TagItem, Tags } from '@/shared/ui/Tags'

import { ArticleType } from '@/entities/Article'

interface ArticleTypeTagsProps {
  className?: string;
  onChangeType: (tag: TagItem) => void,
  type: ArticleType
}

export const ArticleTypeTags = memo((props: ArticleTypeTagsProps) => {
  const { className } = props
  const { t } = useTranslation()

  const typeTags = useMemo<TagItem[]>(() => [
    {
      value: ArticleType.ALL,
      content: t('Все статьи'),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Экономика'),
    },
    {
      value: ArticleType.IT,
      content: t('IT'),
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Наука'),
    },
  ], [t])

  return (
    <Tags
      className={classNames(cls.ArticleTypeTags, {}, [className])}
      tags={typeTags}
      value={props.type}
      onTagClick={props.onChangeType}
    />
  )
})
