export interface IFlightSearchList {
  filter: Filter
  results: Result[]
}

export interface Filter {
  total_stoppage?: number[]
  price_rage: PriceRage
  airlines: Airline[]
}

export interface Airline {
  name: string
  logo?: string
  carrier_marketing: string
}

export interface PriceRage {
  max: number
  min: number
}

export interface Result {
  flight_id?: string
  totalPrice: number
  totalTaxAmount?: number
  currency: string
  baseFareAmount?: number
  baseFareCurrency?: string
  constructionAmount?: number
  constructionCurrency?: string
  equivalentAmount?: number
  equivalentCurrency?: string
  ticketLastDateTime?: string
  legDescriptions?: LegDescription[]
  flights: Flight[]
  passengers?: Passenger[]
}

export interface Flight {
  stoppage?: number
  elapsedTime?: number
  id: number
  options: Option[]
  layoverTime?: string[]
}

export interface Option {
  id?: number
  eTicketable?: boolean
  elapsedTime?: number
  frequency?: string
  stopCount?: number
  totalMilesFlown?: number
  departure_airport?: string
  departure_city?: string
  departure_country?: string
  departure_terminal?: string
  departure_time?: string
  arrival_airport?: string
  arrival_city?: string
  arrival_country?: string
  arrival_time?: string
  carrier_equipment?: CarrierEquipment
  carrier_marketing?: string
  carrier_marketingFlightNumber?: number
  carrier_operating?: string
  carrier_operatingFlightNumber?: number
  departureDateTime?: string
  arrivalDate?: string
  name?: string
  logo: string
  departure_airport_name?: string
  arrival_airport_name?: string
  departure_city_name: string
  arrival_city_name?: string
}

export interface CarrierEquipment {
  code?: string
  typeForFirstLeg?: string
  typeForLastLeg?: string
}

export interface LegDescription {
  departureDate?: string
  departureLocation?: string
  arrivalLocation?: string
}

export interface Passenger {
  passengerType?: string
  passengerNumber?: number
  nonRefundable?: boolean
  id?: number
  weight?: number | string
  unit?: string
  bookingCode?: string
  cabinCode?: string
  seatsAvailable?: number
  availabilityBreak?: boolean
  totalFare?: number
  totalTaxAmount?: number
  currency?: string
  baseFareAmount?: number
  baseFareCurrency?: string
  equivalentAmount?: number
  equivalentCurrency?: string
  constructionAmount?: number
  constructionCurrency?: string
  exchangeRateOne?: number
  cabin_type?: string
  airlineCode?: string
  provisionType?: string
}

/////////////////////////////////////

export interface IAirportList {
  id?: number
  country_id?: number
  country?: string
  name?: string
  iata_code?: string
}

export interface FilterState {
  carrier_operating?: string
  max_price?: string
  min_price?: string
  stops?: string
  sort?: string
  non_refundable?: string
}

export interface ISearchHistoryData {
  id: number
  search_data: {
    PassengerTypeQuantity: {
      Code: string
      Quantity: number
    }[]
    OriginDestinationInformation: OriginDestinationInformation[]
  }
}
export interface FlightState {
  OriginDestinationInformation: OriginDestinationInformation[]
  route?: string
}
export interface OriginDestinationInformation {
  RPH: string
  OriginLocation: {
    LocationCode: string
    name?: string
  }
  TPA_Extensions: {
    CabinPref: {
      Cabin: string
      PreferLevel: string
    }
  }
  DepartureDateTime: Date
  DestinationLocation: {
    LocationCode: string
    name?: string
  }
}

// =================== filter type
export type FilterAirlines = {
  carrier_operating?: string
  max_price?: string | number
  min_price?: string | number
  refundable?: string
  stoppage?: string
  aircraft?: string
  elapsed_time_min?: string
  departure_timings?: string
  arrival_timings?: string
  type?: "CHEAPEST" | "SHORTEST" | "EARLIEST"
}
