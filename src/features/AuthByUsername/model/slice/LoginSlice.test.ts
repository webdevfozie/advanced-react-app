import { LoginSchema } from '../types/LoginSchema'
import { loginActions, loginReducer } from './LoginSlice'

describe('LoginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = {
      username: 'login',
    }
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('new_login')),
    ).toEqual({ username: 'new_login' })
  })

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = {
      password: '123',
    }
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('321')),
    ).toEqual({ password: '321' })
  })
})
