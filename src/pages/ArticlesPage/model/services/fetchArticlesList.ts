import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articlesPage/fetchArticlesList',
  async (_, thunkAPI) => {
    const {
      extra, rejectWithValue, fulfillWithValue,
    } = thunkAPI

    try {
      const { data } = await extra.api.get<Article[]>('/articles', {
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
      return rejectWithValue('error')
    }
  },
)
