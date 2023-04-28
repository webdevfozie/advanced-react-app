import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileSchema } from '../types/editableProfileCardSchema'
import { Profile } from '../../../../entities/Profile/model/types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const initialState: ProfileSchema = {
  data: undefined,
  error: undefined,
  isLoading: false,
  readonly: true,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    cancelEdit: (state) => {
      state.readonly = true
      state.validateErrors = undefined
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false
        state.data = action.payload
        state.form = action.payload
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(updateProfileData.pending, (state) => {
        state.validateErrors = undefined
        state.isLoading = true
      })
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false
        state.data = action.payload
        state.form = action.payload
        state.readonly = true
        state.validateErrors = undefined
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.validateErrors = action.payload
        state.isLoading = false
      })
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
