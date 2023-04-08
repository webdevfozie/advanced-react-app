import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, ArticleView } from 'entities/Article'
import { StateSchema } from 'app/providers/StoreProvider'
import { ARTICLE_VIEW_USER_KEY } from 'shared/const/localStorage'
import { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticlesList } from '../services/fetchArticlesList'

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

const initialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
  error: undefined,
  isLoading: false,
  ids: [],
  entities: {},
  view: ArticleView.SMALL,
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
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLE_VIEW_USER_KEY) as ArticleView
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
        articlesAdapter.setAll(state, action.payload)
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
