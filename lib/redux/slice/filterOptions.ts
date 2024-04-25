import { Filter } from "@/components/home/elements/types/flightSearchType"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface stateType {
  carrier_operating?: string | null
  max_price?: number | null
  min_price?: number | null
  refundable?: string | null
  stoppage?: string | null
  aircraft?: string | null
  elapsed_time_min?: string | null
  departure_timings?: string | null
  arrival_timings?: string | null
  type?: string | null
}

const initialState: stateType = {
  carrier_operating: null,
  max_price: null,
  min_price: null,
  refundable: null,
  stoppage: null,
  aircraft: null,
  elapsed_time_min: null,
  departure_timings: null,
  arrival_timings: null,
  type: null,
}

const filterOptionSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFilterOption: (state, action: PayloadAction<stateType>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
export const { setFilterOption } = filterOptionSlice.actions
export const selectFilterOption = (state: RootState) => state.filterOption
export default filterOptionSlice.reducer
