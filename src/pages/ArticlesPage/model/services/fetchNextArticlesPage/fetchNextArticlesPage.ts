import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import {
  getArticlesPageCount, getArticlesPageHasMore,
} from '../../selectors/articlePageSelectors'
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
      const nextPage = page + 1
      dispatch(articlesPageActions.setPage(nextPage))
      dispatch(fetchArticlesList({
        page: nextPage,
      }))
    }
  },
)
