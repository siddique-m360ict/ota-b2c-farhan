export interface IFlightSearchList {
  filter: Filter
  results: Result[]
}

export interface Filter {
  total_stoppage?: number[]
  price_rage?: PriceRage
  airlines?: Airline[]
}

export interface Airline {
  airline_code: string
  airline_logo: string
  airline_name: string
  price: number
}

export interface PriceRage {
  max?: number
  min?: number
}

export interface Result {
  flight_id?: string
  fare: Fare
  refundable?: Refundable[]
  flight_class: FlightClass[]
  carrier_code?: string
  carrier_name?: string
  carrier_logo?: string
  ticket_last_date?: Date
  leg_descriptions?: LegDescription[]
  flights: Flight[]
  passengers: Passenger[]
}

export interface Fare {
  commission?: number
  base_fare?: number
  discount?: number
  ait?: number
  payable?: number
  total_price?: number
  total_tax?: number
}

export interface FlightClass {
  id?: number
  booking_code?: string
  cabin_type?: string
}

export interface Flight {
  stoppage?: number
  id: number
  elapsed_time?: string
  options: Option[]
  layover_time: string[]
}

export interface Option {
  id?: number
  e_ticketable?: boolean
  elapsedTime?: number
  stopCount?: number
  total_miles_flown?: number
  departure?: Arrival
  arrival?: Arrival
  carrier?: Carrier
}

export interface Arrival {
  airport?: string
  city?: string
  airport_code?: string
  city_code?: string
  country?: string
  time?: string
  terminal?: string
  date: string
}

export interface Carrier {
  carrier_marketing_code?: string
  carrier_marketing_airline?: string
  carrier_marketing_logo?: string
  carrier_marketing_flight_number?: number
  carrier_operating_code?: string
  carrier_operating_airline?: string
  carrier_operating_logo?: string
  carrier_operating_flight_number?: number
}

export interface LegDescription {
  departureDate?: Date
  departureLocation?: string
  arrivalLocation?: string
}

export interface Passenger {
  type?: string
  number?: number
  non_refundable?: boolean
  baggage?: Baggage
  cabin_code?: string
  cabin_type?: string
  booking_code?: string
  fare?: PassengerFare
}

export interface Baggage {
  id?: number
  weight?: number
  unit?: string
}

export interface PassengerFare {
  total_fare?: number
  tax?: number
  base_fare?: number
}

export interface Refundable {
  id?: number
  refundable?: boolean
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
