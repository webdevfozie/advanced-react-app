import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/editableProfileCardSchema'
import { Profile } from '../../../../../entities/Profile/model/types/profile'
import { validateProfileData } from './validateProfileData'

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

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data)

    expect(result).toEqual([])
  })

  test('without firstname and lastname', async () => {
    const result = validateProfileData({
      ...data,
      firstname: '',
      lastname: '',
    })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
    ])
  })

  test('incorrect age', async () => {
    const result = validateProfileData({
      ...data,
      age: undefined,
    })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_AGE,
    ])
  })

  test('without country', async () => {
    const result = validateProfileData({
      ...data,
      country: undefined,
    })

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_COUNTRY,
    ])
  })

  test('no data', async () => {
    const result = validateProfileData(undefined)

    expect(result).toEqual([
      ValidateProfileError.NO_DATA,
    ])
  })
})
