// redux/slice/filterOptions.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface FilterAirlines {
  carrier_operating?: string[] | null
  max_price?: number | null
  min_price?: number | null
  refundable?: string | null
  baggage?: string[] | null
  stoppage?: Array<number[]> | null
  aircraft?: string | null
  elapsed_time_min?: string | null
  departure_timings?: string | null
  arrival_timings?: string | null
  sort_by?: string | null
  priceRange?: number[] | null
  min_departure_time?: string | null
  max_departure_time?: string | null
  min_arrival_time?: string | null
  max_arrival_time?: string | null
}

const initialState: FilterAirlines = {
  carrier_operating: null,
  max_price: null,
  min_price: null,
  refundable: null,
  stoppage: null,
  aircraft: null,
  elapsed_time_min: null,
  departure_timings: null,
  arrival_timings: null,
  sort_by: null,
  priceRange: null,
  min_departure_time: null,
  max_departure_time: null,
  min_arrival_time: null,
  max_arrival_time: null,
  baggage: null,
}

const filterOptionSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFilterOption: (state, action: PayloadAction<FilterAirlines>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    removeFilterOption: () => {
      return initialState
    },
  },
})

export const { setFilterOption, removeFilterOption } = filterOptionSlice.actions
export const selectFilterOption = (state: RootState) => state.filterOption
export default filterOptionSlice.reducer
