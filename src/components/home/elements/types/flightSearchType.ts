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
  fare?: Fare
  refundable?: Refundable[]
  carrier_code?: string
  carrier_name?: string
  carrier_logo?: string
  ticket_last_date?: string
  ticket_last_time?: string
  leg_descriptions?: LegDescription[]
  flights?: Flight[]
  passengers?: Passenger[]
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

export interface Flight {
  stoppage?: number
  id?: number
  elapsed_time?: number
  options?: Option[]
  layover_time?: number[]
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
  date?: string
  terminal?: string
  date_adjustment?: number
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
  carrier_aircraft_code?: string
  carrier_aircraft_name?: string
}

export interface LegDescription {
  departureDate?: string
  departureLocation?: string
  arrivalLocation?: string
}

export interface Passenger {
  type?: string
  number?: number
  non_refundable?: boolean
  availability?: Availability[]
  fare?: PassengerFare
}

export interface Availability {
  id?: number
  from_airport?: string
  to_airport?: string
  segments?: Segment[]
  baggage?: Baggage
}

export interface Baggage {
  id?: number
  unit?: string
  count?: number
}

export interface Segment {
  id?: number
  name?: string
  meal_type?: string
  meal_code?: string
  cabin_code?: string
  cabin_type?: string
  booking_code?: string
  available_seat?: number
  available_break?: boolean
  available_fare_break?: boolean
}

export interface PassengerFare {
  total_fare?: number
  tax?: number
  base_fare?: number
}

export interface Refundable {
  type?: string
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
