import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LS_USER_KEY } from '@/shared/const/localStorage'
import { User, UserSchema } from '../types/User'

const initialState: UserSchema = {
  _mounted: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(LS_USER_KEY)
      if (user) {
        state.authData = JSON.parse(user)
      }
      state._mounted = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(LS_USER_KEY)
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
