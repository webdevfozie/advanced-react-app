import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, userActions } from '@/entities/User'
import { LS_USER_KEY } from '@/shared/const/localStorage'
import { ThunkConfig } from '@/app/providers/StoreProvider'

interface LoginByUsernameProps {
  username: string,
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    const {
      dispatch, extra, rejectWithValue, fulfillWithValue,
    } = thunkAPI

    try {
      const { data } = await extra.api.post<User>('/login', authData)

      if (!data) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error()
      }

      localStorage.setItem(LS_USER_KEY, JSON.stringify(data))
      dispatch(userActions.setAuthData(data))
      return fulfillWithValue(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return rejectWithValue('error')
    }
  },
)
