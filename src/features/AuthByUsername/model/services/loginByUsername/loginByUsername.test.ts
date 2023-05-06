import { userActions } from '@/entities/User'
import { TestAsyncThunk } from '@/shared/lib/testing/TestAsyncThunk/TestAsyncThunk'
import { loginByUsername } from './loginByUsername'

describe('loginByUsername.test', () => {
  test('success login', async () => {
    const loginValue = { username: 'login', id: '1' }
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: loginValue }))
    const result = await thunk.callThunk({ username: 'login', password: '123' })

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(loginValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(thunk.api.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toBe(loginValue)
  })

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk({ username: 'login', password: '123' })

    expect(thunk.api.post).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
