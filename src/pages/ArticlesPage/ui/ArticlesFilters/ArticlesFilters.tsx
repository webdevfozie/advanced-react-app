import { useTranslation } from 'react-i18next'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Input } from '@/shared/ui/Input/Input'
import {
  ArticlesSortSelector, ArticleViewSwitcher, ArticleView, ArticleSortField, ArticleType,
} from '@/entities/Article'
import { SortOrder } from '@/shared/types'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { TagItem, Tags } from '@/shared/ui/Tags/Tags'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import {
  getArticlesPageOrder, getArticlesPageSearch,
  getArticlesPageSort, getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import cls from './ArticlesFilters.module.scss'

interface ArticlesFiltersProps {
  className?: string,
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const order = useSelector(getArticlesPageOrder)
  const sort = useSelector(getArticlesPageSort)
  const search = useSelector(getArticlesPageSearch)
  const view = useSelector(getArticlesPageView)
  const type = useSelector(getArticlesPageType)

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])

  const debouncedFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeOrder = useCallback((order: SortOrder) => {
    dispatch(articlesPageActions.setOrder(order))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSort = useCallback((sort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(sort))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search))
    dispatch(articlesPageActions.setPage(1))
    debouncedFetchData()
  }, [dispatch, debouncedFetchData])

  const onChangeType = useCallback((tag: TagItem) => {
    dispatch(articlesPageActions.setType(tag.value as ArticleType))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

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
    <div className={classNames(cls.articlesFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticlesSortSelector
          sort={sort}
          order={order}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSwitcher
          className={cls.viewSwitcher}
          view={view}
          onViewClick={onChangeView}
        />
      </div>
      <Input
        placeholder={t('Поиск')}
        value={search}
        onChange={onChangeSearch}
        className={cls.search}
      />
      <Tags
        tags={typeTags}
        value={type}
        onTagClick={onChangeType}
      />
    </div>
  )
}
