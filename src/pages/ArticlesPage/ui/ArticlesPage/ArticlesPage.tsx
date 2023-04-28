import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Page } from 'widgets/Page'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
} from '../../model/selectors/articlesPageSelectors'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { ArticlesFilters } from '../ArticlesFilters/ArticlesFilters'

interface ArticlesPageProps {
  className ? : string,
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const {
    className,
  } = props

  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const [searchParams] = useSearchParams()

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage(isLoading))
  }, [dispatch, isLoading])

  if (error) {
    return (
      <Page className={classNames(cls.articlesPage, {}, [className])}>
        <Text
          title={t('Произошла ошибка при загрузке статей!')}
          align={TextAlign.CENTER}
          theme={TextTheme.ERROR}
        />
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classNames(cls.articlesPage, {}, [className])}
        onScrollEndCallback={onLoadNextPart}
      >
        <ArticlesFilters className={cls.filters} />
        <ArticleInfiniteList />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
