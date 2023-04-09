import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/articlePageSelectors'

interface FetchArticlesListProps {
  page?: number
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

    const {
      page = 1,
    } = props

    const limit = getArticlesPageLimit(getState())

    try {
      const { data } = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
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
