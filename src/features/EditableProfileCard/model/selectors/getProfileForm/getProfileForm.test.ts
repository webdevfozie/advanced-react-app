import { StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '@/entities/Profile'
import { getProfileForm } from './getProfileForm'

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

describe('getProfileForm.test', () => {
  test('should work with filled state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    }
    expect(getProfileForm(state as StateSchema)).toEqual(data)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileForm(state as StateSchema)).toEqual(undefined)
  })
})
