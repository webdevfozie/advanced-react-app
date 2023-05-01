import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { useCallback, useMemo } from 'react'
import { SortOrder } from 'shared/types'
import { ListBox } from 'shared/ui/ListBox/ListBox'
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

  const orderOptions = useMemo(() => [
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

  const changeSortHandler = useCallback((newSort: string) => {
    onChangeSort(newSort as ArticleSortField)
  }, [onChangeSort])

  const changeOrderHandler = useCallback((newOrder: string) => {
    onChangeOrder(newOrder as SortOrder)
  }, [onChangeOrder])

  return (
    <div className={classNames(cls.articlesSortSelector, {}, [className])}>
      <ListBox
        items={orderOptions}
        label={t('Отсортировать по')}
        value={order}
        onChange={changeOrderHandler}
      />
      <ListBox
        items={sortFieldOptions}
        label={t('по')}
        value={sort}
        onChange={changeSortHandler}
      />
    </div>
  )
}
