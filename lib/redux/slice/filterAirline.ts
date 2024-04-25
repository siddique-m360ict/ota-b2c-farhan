import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface FilterAirlineState {
  selectedAirlines: string[]
}

const initialState: FilterAirlineState = {
  selectedAirlines: [],
}

const filterAirlineSlice = createSlice({
  name: "filterAirline",
  initialState,
  reducers: {
    setFilterAirline: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        selectedAirlines: action.payload,
      }
    },
  },
})

export const { setFilterAirline } = filterAirlineSlice.actions
export const selectFilterAirline = (state: RootState) =>
  state.filterAirline?.selectedAirlines
export default filterAirlineSlice.reducer
