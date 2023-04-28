import { CounterSchema } from 'entities/Counter'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/AuthByUsername'
import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema } from 'entities/Article'
import { AddCommentFormSchema } from 'features/AddCommentForm'
import { ArticlesPageSchema } from 'pages/ArticlesPage'
import { ScrollSavingSchema } from 'features/ScrollSaving'
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage'
import { rtkApi } from 'shared/api/rtkApi'
import { ProfileSchema } from 'features/EditableProfileCard'
import { createReduxStore } from './store'

export interface StateSchema {
  counter: CounterSchema,
  user: UserSchema,
  scrollSaving: ScrollSavingSchema,
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Async
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsPage?: ArticleDetailsPageSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>,
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
  add: (key: StateSchemaKey, reducer: Reducer) => void,
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

export interface ThunkExtraArg {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArg,
  state: StateSchema
}
