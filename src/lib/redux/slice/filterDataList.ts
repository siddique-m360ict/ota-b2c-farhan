import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Result } from "@/components/home/elements/types/flightSearchType"
import { RootState } from "../store"

interface FilterState {
  filterDataList: Result[] | undefined
  filterCount: number | undefined
}

const initialState: FilterState = {
  filterDataList: undefined,
  filterCount: undefined,
}

const filterDataSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterDataList(state, action: PayloadAction<Result[] | undefined>) {
      state.filterDataList = action.payload
    },
    setFilterCount(state, action: PayloadAction<number | undefined>) {
      state.filterCount = action.payload
    },
  },
})

export const { setFilterDataList, setFilterCount } = filterDataSlice.actions
export const selectFilterDataList = (state: RootState) =>
  state.filter.filterDataList
export const selectFilterDataCount = (state: RootState) =>
  state.filter.filterCount
export default filterDataSlice.reducer
