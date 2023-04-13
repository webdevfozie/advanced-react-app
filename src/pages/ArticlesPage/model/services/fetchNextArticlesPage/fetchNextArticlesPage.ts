import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import {
  getArticlesPageCount, getArticlesPageHasMore,
} from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const fetchNextArticlesPage = createAsyncThunk<
void,
boolean,
ThunkConfig<string>
>(
  'articlesPage/fetchNextArticlesPage',
  async (isLoading, thunkAPI) => {
    const {
      dispatch,
      getState,
    } = thunkAPI
    const hasMore = getArticlesPageHasMore(getState())
    const page = getArticlesPageCount(getState())

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1))
      dispatch(fetchArticlesList({}))
    }
  },
)
