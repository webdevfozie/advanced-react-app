import { StateSchema } from 'app/providers/StoreProvider'
import { ValidateProfileError } from '../../types/editableProfileCardSchema'
import { getProfileValidateErrors } from './getProfileValidateErrors'

describe('getProfileValidateErrors.test', () => {
  test('should work with filled state', () => {
    const errors = [
      ValidateProfileError.NO_DATA,
      ValidateProfileError.SERVER_ERROR,
    ]

    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: errors,
      },
    }
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors)
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
  })
})
