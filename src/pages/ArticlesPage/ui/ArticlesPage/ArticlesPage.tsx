import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback } from 'react'
import { ArticleList, ArticleView, ArticleViewSwitcher } from 'entities/Article'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Page } from 'shared/ui/Page/Page'
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlePageSelectors'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'

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
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState())
    dispatch(fetchArticlesList({
      page: 1,
    }))
  })

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

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
    <DynamicModuleLoader reducers={reducers}>
      <Page
        className={classNames(cls.articlesPage, {}, [className])}
        onScrollEndCallback={onLoadNextPart}
      >
        <ArticleViewSwitcher
          className={cls.viewSwitcher}
          view={view}
          onViewClick={onChangeView}
        />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
