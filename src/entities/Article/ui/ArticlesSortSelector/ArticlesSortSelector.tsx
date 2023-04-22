import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import { useCallback, useMemo } from 'react'
import { SortOrder } from 'shared/types'
import { ArticleSortField } from '../../model/types/article'
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

  const orderOptions = useMemo<SelectOption[]>(() => [
    {
      value: 'asc',
      content: t('возрастанию'),
    },
    {
      value: 'desc',
      content: t('убыванию'),
    },
  ], [t])

  const sortFieldOptions = useMemo<SelectOption[]>(() => [
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

  const changeSortHandler = useCallback((newSort: string) => {
    onChangeSort(newSort as ArticleSortField)
  }, [onChangeSort])

  const changeOrderHandler = useCallback((newOrder: string) => {
    onChangeOrder(newOrder as SortOrder)
  }, [onChangeOrder])

  return (
    <div className={classNames(cls.articlesSortSelector, {}, [className])}>
      <Select
        options={orderOptions}
        label={t('Отсортировать по')}
        value={order}
        onChange={changeOrderHandler}
      />
      <Select
        options={sortFieldOptions}
        label={t('по')}
        value={sort}
        onChange={changeSortHandler}
      />
    </div>
  )
}
