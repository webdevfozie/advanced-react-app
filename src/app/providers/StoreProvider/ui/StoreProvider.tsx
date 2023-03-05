import { Provider } from 'react-redux'
import { ReactNode } from 'react'
import { DeepPartial } from '@reduxjs/toolkit'
import { createReduxStore } from '../config/store'
import { StateSchema } from '../config/StateScheme'

interface StoreProviderProps {
  children?: ReactNode,
  initialState?: DeepPartial<StateSchema>,
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
  const store = createReduxStore(initialState as StateSchema)

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
