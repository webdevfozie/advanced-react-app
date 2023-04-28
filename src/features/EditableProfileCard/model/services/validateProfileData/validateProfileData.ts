import { ValidateProfileError } from '../../types/editableProfileCardSchema'
import { Profile } from '../../../../../entities/Profile/model/types/profile'

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA]
  }

  const {
    firstname, lastname, age, city, country, username, currency,
  } = profile

  const errors: ValidateProfileError[] = []

  if (!firstname || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY)
  }

  if (!city) {
    errors.push(ValidateProfileError.INCORRECT_CITY)
  }

  if (!username) {
    errors.push(ValidateProfileError.INCORRECT_USERNAME)
  }

  if (!currency) {
    errors.push(ValidateProfileError.INCORRECT_CURRENCY)
  }

  return errors
}
