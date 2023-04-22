import { TestAsyncThunk } from 'shared/lib/testing/TestAsyncThunk/TestAsyncThunk'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { Profile } from '../../types/profile'
import { fetchProfileData } from './fetchProfileData'

const data: Profile = {
  id: '1',
  username: 'affff',
  firstname: 'Artem',
  lastname: 'Frolov',
  country: Country.Kazakhstan,
  currency: Currency.KZT,
  age: 24,
  city: 'Almaty',
}

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ data }))
    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toBe(data)
  })

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
  })
})
