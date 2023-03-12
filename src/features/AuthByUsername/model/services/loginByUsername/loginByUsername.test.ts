import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { userActions } from 'entities/User'
import { TestAsyncThunk } from 'shared/lib/testing/TestAsyncThunk/TestAsyncThunk'
import { loginByUsername } from './loginByUsername'

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)
describe('loginByUsername.test', () => {
  test('success login', async () => {
    const loginValue = { username: 'login', id: '1' }
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: loginValue }))
    const thunk = new TestAsyncThunk(loginByUsername)
    const result = await thunk.callThunk({ username: 'login', password: '123' })

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(loginValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toBe(loginValue)
  })

  test('error login', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const thunk = new TestAsyncThunk(loginByUsername)
    const result = await thunk.callThunk({ username: 'login', password: '123' })

    expect(mockedAxios.post).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
