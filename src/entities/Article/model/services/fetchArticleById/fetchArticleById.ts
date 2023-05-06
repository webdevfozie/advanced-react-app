import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '../../types/article'

export const fetchArticleById = createAsyncThunk<Article, string | undefined, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, thunkAPI) => {
    const {
      extra, rejectWithValue, fulfillWithValue,
    } = thunkAPI

    try {
      if (!articleId) {
        throw new Error('id статьи не был передан')
      }

      const { data } = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: {
          _expand: 'user',
        },
      })

      if (!data) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error()
      }

      return fulfillWithValue(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return rejectWithValue('error')
    }
  },
)
