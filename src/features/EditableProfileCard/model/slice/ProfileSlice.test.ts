import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { Profile } from '../../../../entities/Profile/model/types/profile'
import { profileReducer, profileActions } from './ProfileSlice'

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

describe('ProfileSlice.test', () => {
  test('test readonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.setReadonly(true),
      ),
    ).toEqual({ readonly: true })
  })

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: {
        username: '',
      },
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit(),
      ),
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    })
  })

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: {
        username: 'new user',
      },
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          username: 'one more user',
        }),
      ),
    ).toEqual({ form: { username: 'one more user' } })
  })

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [
        ValidateProfileError.SERVER_ERROR,
      ],
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending,
      ),
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    })
  })

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    }
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, ''),
      ),
    ).toEqual({
      isLoading: false,
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    })
  })
})
