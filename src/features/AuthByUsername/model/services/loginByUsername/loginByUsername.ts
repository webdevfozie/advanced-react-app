import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, userActions } from 'entities/User'
import { LS_USER_KEY } from 'shared/const/localStorage'

interface LoginByUsernameProps {
  username: string,
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const { data } = await axios.post<User>('http://localhost:8000/login', authData)

      if (!data) { // noinspection ExceptionCaughtLocallyJS
        throw new Error()
      }

      localStorage.setItem(LS_USER_KEY, JSON.stringify(data))
      thunkAPI.dispatch(userActions.setAuthData(data))

      return thunkAPI.fulfillWithValue(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
