import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (profileId, thunkAPI) => {
    const {
      extra, rejectWithValue, fulfillWithValue,
    } = thunkAPI

    try {
      const { data } = await extra.api.get<Profile>(`/profile/${profileId}`)

      if (!data) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error()
      }

      return fulfillWithValue(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      return rejectWithValue('error')
    }
  },
)
