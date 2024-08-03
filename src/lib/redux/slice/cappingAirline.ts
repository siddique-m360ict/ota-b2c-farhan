import { CappingAirlines } from "@/components/home/elements/FancyMultiSelect"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface ICappingAirline {
  cappingAirlineList: CappingAirlines[] | undefined
  selectedAirlines: CappingAirlines[] | undefined
}

const initialState: ICappingAirline = {
  cappingAirlineList: undefined,
  selectedAirlines: undefined,
}

const cappingAirline = createSlice({
  name: "cappingAirline",
  initialState,
  reducers: {
    setCappingAirlineList(
      state,
      action: PayloadAction<CappingAirlines[] | undefined>
    ) {
      state.cappingAirlineList = action.payload
    },
    setSelectedAirlines(
      state,
      action: PayloadAction<CappingAirlines[] | undefined>
    ) {
      state.selectedAirlines = action.payload
    },
  },
})

export const { setCappingAirlineList, setSelectedAirlines } =
  cappingAirline.actions
export const selectCapAirline = (state: RootState) =>
  state.cappingAirline.cappingAirlineList
export const selectSelectedAirlines = (state: RootState) =>
  state.cappingAirline.selectedAirlines
export default cappingAirline.reducer
