import { combineReducers } from '@reduxjs/toolkit'
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import { ArticleDetailsPageSchema } from '../types'

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendation: articleDetailsRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
})
