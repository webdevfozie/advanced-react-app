import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SortOrder } from '@/shared/types'
import { ListBox } from '@/shared/ui/Popups'
import { ArticleSortField } from '../../model/consts/consts'
import cls from './ArticlesSortSelector.module.scss'

interface ArticlesSortSelectorProps {
  className?: string,
  sort: ArticleSortField,
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void,
  onChangeSort: (newSort: ArticleSortField) => void,
}

export const ArticlesSortSelector = (props: ArticlesSortSelectorProps) => {
  const {
    className,
    sort,
    order,
    onChangeOrder,
    onChangeSort,
  } = props

  const { t } = useTranslation()

  interface ArticleOrderItem {
    value: SortOrder,
    content: string
  }

  const orderOptions = useMemo<ArticleOrderItem[]>(() => [
    {
      value: 'asc',
      content: t('возрастанию'),
    },
    {
      value: 'desc',
      content: t('убыванию'),
    },
  ], [t])

  const sortFieldOptions = useMemo(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('дате создания'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('количество просмотров'),
    },
  ], [t])

  return (
    <div className={classNames(cls.articlesSortSelector, {}, [className])}>
      <ListBox
        items={orderOptions}
        label={t('Отсортировать по')}
        value={order}
        onChange={onChangeOrder}
      />
      <ListBox
        items={sortFieldOptions}
        label={t('по')}
        value={sort}
        onChange={onChangeSort}
      />
    </div>
  )
}
