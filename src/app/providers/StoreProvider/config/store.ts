import {
  CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit'
import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { $api } from '@/shared/api/api'
import { scrollSavingReducer } from '@/features/ScrollSaving'
import { rtkApi } from '@/shared/api/rtkApi'
import { StateSchema, ThunkExtraArg } from './StateScheme'
import { createReducerManager } from './reducerManager'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    scrollSaving: scrollSavingReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArgument: ThunkExtraArg = {
    api: $api,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(rtkApi.middleware),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
