import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { SortOrder } from '@/shared/types'
import { ArticleSortField, ArticleType } from '@/entities/Article'
import { getArticlesPageMounted } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const initArticlesPage = createAsyncThunk<
void,
URLSearchParams | void,
ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (searchParams, thunkAPI) => {
    const {
      dispatch,
      getState,
    } = thunkAPI

    const mounted = getArticlesPageMounted(getState())

    if (!mounted) {
      if (searchParams) {
        const orderFromURL = searchParams.get('order') as SortOrder
        const sortFromURL = searchParams.get('sort') as ArticleSortField
        const searchFromURL = searchParams.get('search')
        const typeFromURL = searchParams.get('type') as ArticleType
        if (orderFromURL) dispatch(articlesPageActions.setOrder(orderFromURL))
        if (sortFromURL) dispatch(articlesPageActions.setSort(sortFromURL))
        if (searchFromURL) dispatch(articlesPageActions.setSearch(searchFromURL))
        if (typeFromURL) dispatch(articlesPageActions.setType(typeFromURL))
      }
      dispatch(articlesPageActions.initState())
      dispatch(fetchArticlesList({}))
    }
  },
)
