import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Article, ArticleView, ArticleSortField, ArticleType,
} from 'entities/Article'
import { StateSchema } from 'app/providers/StoreProvider'
import { ARTICLE_VIEW_USER_KEY } from 'shared/const/localStorage'
import { SortOrder } from 'shared/types'
import { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

const initialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
  error: undefined,
  isLoading: false,
  ids: [],
  entities: {},
  view: ArticleView.SMALL,
  page: 1,
  hasMore: true,
  _mounted: false,
  limit: 6,
  sort: ArticleSortField.CREATED,
  search: '',
  order: 'asc',
  type: ArticleType.ALL,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

export const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLE_VIEW_USER_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLE_VIEW_USER_KEY) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BIG ? 3 : 9
      state._mounted = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasMore = action.payload.length >= state.limit

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload)
        } else {
          articlesAdapter.addMany(state, action.payload)
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const {
  actions: articlesPageActions,
  reducer: articlesPageReducer,
} = articlesPageSlice
