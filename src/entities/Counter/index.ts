import { counterReducer } from 'entities/Counter/model/slice/CounterSlice'
import type { CounterSchema } from './model/types/CounterSchema'
import { Counter } from './ui/Counter'

export {
  CounterSchema,
  counterReducer,
  Counter,
}
