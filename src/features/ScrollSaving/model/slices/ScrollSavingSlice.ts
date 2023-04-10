import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScrollSavingSchema } from '../types/scrollSavingSchema'

const initialState: ScrollSavingSchema = {
  scroll: {},
}

export const ScrollSavingSlice = createSlice({
  name: 'scrollSavingSlice',
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<{path: string, position: number}>) => {
      state.scroll[action.payload.path] = action.payload.position
    },
  },
})

export const { actions: scrollSavingActions } = ScrollSavingSlice
export const { reducer: scrollSavingReducer } = ScrollSavingSlice
