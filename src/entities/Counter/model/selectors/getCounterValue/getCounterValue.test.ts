import { StateSchema } from '@/app/providers/StoreProvider'
import { getCounterValue } from './getCounterValue'

describe('getCounterValue', () => {
  test('should return the counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 12,
      },
    }
    expect(getCounterValue(state as StateSchema)).toEqual(12)
  })
})
