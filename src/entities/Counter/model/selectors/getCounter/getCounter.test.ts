import { StateSchema } from 'app/providers/StoreProvider'
import { getCounter } from './getCounter'

describe('getCounter', () => {
  test('should return the counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 12,
      },
    }
    expect(getCounter(state as StateSchema)).toEqual({ value: 12 })
  })
})
