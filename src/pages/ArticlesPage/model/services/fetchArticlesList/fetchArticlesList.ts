import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article, ArticleType } from 'entities/Article'
import { addQueryParams } from 'shared/lib/url/addQueryParams'
import {
  getArticlesPageCount,
  getArticlesPageLimit,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors'

interface FetchArticlesListProps {
  replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
Article[],
FetchArticlesListProps,
ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async (props, thunkAPI) => {
    const {
      extra,
      rejectWithValue,
      fulfillWithValue,
      getState,
    } = thunkAPI

    const order = getArticlesPageOrder(getState())
    const sort = getArticlesPageSort(getState())
    const search = getArticlesPageSearch(getState())
    const page = getArticlesPageCount(getState())
    const limit = getArticlesPageLimit(getState())
    const type = getArticlesPageType(getState())

    try {
      addQueryParams({
        sort,
        order,
        search,
      })
      const { data } = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      })

      if (!data) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error()
      }

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue('error')
    }
  },
)
