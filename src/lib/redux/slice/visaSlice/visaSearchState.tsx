import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { IVisaCountry } from "@/components/visa/elements/visaType"

interface visaSearchStateInfo {
  citizenCountry: IVisaCountry
  travelingCountry: IVisaCountry
  visaCategory: string
}

const initialState: visaSearchStateInfo = {
  citizenCountry: {
    id: 158,
    isActive: true,
    organization: "bangladesh",
    createdAt: "2023-10-21T18:27:28.680Z",
    updatedAt: "2024-05-23T05:51:28.225Z",
    title: "Bangladesh",
    code: "BDT",
    slug: "bangladesh",
    flag: "https://unispaces.sgp1.digitaloceanspaces.com/nebula/1681714914681.png",
    continent: "Asia",
    visaMethod: "In-Person Submission",
    orderPriority: 0,
    isFeatured: false,
    isPageActive: true,
    createdById: null,
    updatedById: 13,
  },
  travelingCountry: {
    id: 17,
    isActive: true,
    organization: "bangladesh",
    createdAt: "2023-10-21T18:27:28.680Z",
    updatedAt: "2024-05-21T05:34:09.083Z",
    title: "Pakistan",
    code: "pakistan",
    slug: "pakistan",
    flag: "https://unispaces.sgp1.digitaloceanspaces.com/nebula/1681714932559.png",
    continent: "Asia",
    visaMethod: "E-Visa",
    orderPriority: 0,
    isFeatured: false,
    isPageActive: true,
    createdById: null,
    updatedById: 13,
  },
  visaCategory: "Tourism",
}

const visaSearchState = createSlice({
  name: "visaSearchState",
  initialState,
  reducers: {
    setCitizenCountry(state, action: PayloadAction<IVisaCountry>) {
      state.citizenCountry = action.payload
    },
    setTravelingCountry(state, action: PayloadAction<IVisaCountry>) {
      state.travelingCountry = action.payload
    },
    setVisaCategory(state, action: PayloadAction<string>) {
      state.visaCategory = action.payload
    },
  },
})

export const { setCitizenCountry, setTravelingCountry, setVisaCategory } =
  visaSearchState.actions

export const selectCitizenCountry = (state: RootState) =>
  state.visaSearchState.citizenCountry
export const selectTravelingCountry = (state: RootState) =>
  state.visaSearchState.travelingCountry
export const selectVisaCategory = (state: RootState) =>
  state.visaSearchState.visaCategory

export default visaSearchState.reducer
