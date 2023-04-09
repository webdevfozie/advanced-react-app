import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, ArticleView } from 'entities/Article'
import { StateSchema } from 'app/providers/StoreProvider'
import { ARTICLE_VIEW_USER_KEY } from 'shared/const/localStorage'
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
    initState: (state) => {
      const view = localStorage.getItem(ARTICLE_VIEW_USER_KEY) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BIG ? 3 : 9
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false
        articlesAdapter.addMany(state, action.payload)
        state.hasMore = action.payload.length > 0
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
