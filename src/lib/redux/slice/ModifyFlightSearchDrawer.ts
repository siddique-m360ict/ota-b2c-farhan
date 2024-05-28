import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface DrawerState {
  open: boolean
}

const initialState: DrawerState = {
  open: false,
}

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setModifyFlightDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  },
})

export const { setModifyFlightDrawerOpen } = drawerSlice.actions
export const selectModifyFlightDrawerOpen = (state: RootState) =>
  state.modifyFlightSearch.open
export default drawerSlice.reducer
