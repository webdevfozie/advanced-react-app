import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleRecommendationsIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.recommendation?.isLoading ?? false
}
export const getArticleRecommendationsError = (state: StateSchema) => {
  return state.articleDetailsPage?.recommendation?.error ?? ''
}
