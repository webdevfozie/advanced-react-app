import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { ValidateProfileError } from '../../types/editableProfileCardSchema'
import { Profile } from '../../../../../entities/Profile/model/types/profile'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { validateProfileData } from '../validateProfileData/validateProfileData'

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const {
      extra, rejectWithValue, fulfillWithValue, getState,
    } = thunkAPI

    const formData = getProfileForm(getState())
    const errors = validateProfileData(formData)

    if (errors.length) {
      return rejectWithValue(errors)
    }

    try {
      const { data } = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)

      if (!data) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error()
      }

      return fulfillWithValue(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  },
)
