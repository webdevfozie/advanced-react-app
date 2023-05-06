import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
  'articleDetails/fetchCommentsByArticleId',
  async (articleId, thunkAPI) => {
    const {
      extra, rejectWithValue, fulfillWithValue,
    } = thunkAPI

    try {
      if (!articleId) {
        return rejectWithValue('error')
      }

      const { data } = await extra.api.get<Comment[]>('/comments', {
        params: {
          articleId,
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
