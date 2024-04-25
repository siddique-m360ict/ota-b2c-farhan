export interface HTTPResponse<T> {
  success: boolean
  count: number
  data?: T
  message?: string
}

export interface AirplaneSearch {
  originLocationCode: string
  destinationLocationCode: string
  departureDate: string
  returnDate: string
  adults: string
  max: string
}

export const initialState: AirplaneSearch = {
  originLocationCode: "DAC",
  destinationLocationCode: "CXB",
  departureDate: "",
  returnDate: "",
  adults: "1",
  max: "10",
}
