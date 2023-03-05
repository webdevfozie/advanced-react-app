import { CounterSchema } from '../types/CounterSchema'
import { counterActions, counterReducer } from './CounterSlice'

describe('CounterSlice.test', () => {
  test('decrement value', () => {
    const state: CounterSchema = {
      value: 2,
    }
    expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 1 })
  })

  test('increment value', () => {
    const state: CounterSchema = {
      value: 2,
    }
    expect(counterReducer(state, counterActions.increment())).toEqual({ value: 3 })
  })

  test('should work with empty test', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 })
  })
})
