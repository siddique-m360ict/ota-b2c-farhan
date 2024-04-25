import { Filter } from "@/components/home/elements/types/flightSearchType"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

const initialState: Filter = {
  total_stoppage: [],
  price_rage: {
    max: 0,
    min: 0,
  },
  airlines: [],
}

const filterSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFilterData: (state, action: PayloadAction<Filter>) => {
      return action.payload
    },
  },
})
export const { setFilterData } = filterSlice.actions
export const selectFilterItem = (state: RootState) => state.filterItems
export default filterSlice.reducer
