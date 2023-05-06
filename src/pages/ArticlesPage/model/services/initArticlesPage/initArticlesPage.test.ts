import { TestAsyncThunk } from '@/shared/lib/testing/TestAsyncThunk/TestAsyncThunk'
import { initArticlesPage } from './initArticlesPage'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('initArticlesPage.test', () => {
  test('not mounted', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        hasMore: true,
        _mounted: false,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticlesList).toHaveBeenCalled()
  })

  test('mounted', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        hasMore: true,
        _mounted: true,
      },
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })
})
