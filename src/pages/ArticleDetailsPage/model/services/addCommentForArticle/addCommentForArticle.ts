import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article'
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (text, thunkAPI) => {
    const {
      extra, dispatch, rejectWithValue, fulfillWithValue, getState,
    } = thunkAPI

    const userData = getUserAuthData(getState())
    const article = getArticleDetailsData(getState())

    if (!article?.id || !text || !userData) {
      return rejectWithValue('error')
    }

    try {
      const { data } = await extra.api.post<Comment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text,
      })

      if (!data) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error()
      }

      dispatch(fetchCommentsByArticleId(article.id))

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue('error')
    }
  },
)
