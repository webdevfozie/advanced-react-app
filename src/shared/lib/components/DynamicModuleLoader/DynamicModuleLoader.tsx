import { FC, useEffect } from 'react'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateScheme'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Reducer } from '@reduxjs/toolkit'

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList,
  removeAfterUnmount?: boolean,
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children,
    reducers,
    removeAfterUnmount = false,
  } = props

  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer)
      dispatch({ type: `@INIT ${name} reducer` })
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey)
          dispatch({ type: `@DESTROY ${name} reducer` })
        })
      }
    }
    // eslint-disable-next-line
  }, [])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<>{children}</>)
}
