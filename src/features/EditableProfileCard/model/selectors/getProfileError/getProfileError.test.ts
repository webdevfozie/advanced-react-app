import { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileError } from './getProfileError'

describe('getProfileError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: '404',
      },
    }
    expect(getProfileError(state as StateSchema)).toEqual('404')
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileError(state as StateSchema)).toEqual(undefined)
  })
})
