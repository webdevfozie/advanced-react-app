import { useSelector } from 'react-redux'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { counterActions } from '../model/slice/CounterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
  const dispatch = useAppDispatch()
  const counterValue = useSelector(getCounterValue)
  const increment = () => {
    dispatch(counterActions.increment())
  }
  const decrement = () => {
    dispatch(counterActions.decrement())
  }

  return (
    <div>
      <Icon>
        <h1 data-testid="value-title">
          {counterValue}
        </h1>
        <Button onClick={increment} data-testid="increment-btn">Увеличить</Button>
        <Button onClick={decrement} data-testid="decrement-btn">Уменьшить</Button>
      </Icon>
    </div>
  )
}
