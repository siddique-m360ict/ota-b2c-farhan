import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface LoadingState {
  isPending: boolean
}

const initialState: LoadingState = {
  isPending: false,
}

const transitionLoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setTransitionLoading: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload
    },
  },
})

export const { setTransitionLoading } = transitionLoadingSlice.actions
export const selectTransitionIsPending = (state: RootState) =>
  state.transitionLoading.isPending
export default transitionLoadingSlice.reducer
