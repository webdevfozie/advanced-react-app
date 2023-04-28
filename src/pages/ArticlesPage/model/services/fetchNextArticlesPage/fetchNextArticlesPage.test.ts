import { TestAsyncThunk } from 'shared/lib/testing/TestAsyncThunk/TestAsyncThunk'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { fetchNextArticlesPage } from './fetchNextArticlesPage'

jest.mock('../fetchArticlesList/fetchArticlesList')

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        hasMore: true,
      },
    })

    await thunk.callThunk(false)

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticlesList).toHaveBeenCalled()
  })

  test('fetchArticlesList not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        hasMore: false,
      },
    })

    await thunk.callThunk(false)

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })

  test('fetchArticlesList is loading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        hasMore: true,
      },
    })

    await thunk.callThunk(true)

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticlesList).not.toHaveBeenCalled()
  })
})
