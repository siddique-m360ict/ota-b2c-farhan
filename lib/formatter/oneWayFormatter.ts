import { format } from "date-fns"
import { IReqFlightSearch } from "../server/flights/SearchFlightListEndpoint"

export const OneWayFormatter = (query: IReqFlightSearch) => {
  const formattedQuery = {
    OriginDestinationInformation: [
      {
        RPH: "1",
        DepartureDateTime: query.departuredate
          ? format(new Date(query.departuredate), "yyyy-MM-dd'T'HH:mm:ss")
          : "no date formate",
        OriginLocation: {
          LocationCode: query.origin,
        },
        DestinationLocation: {
          LocationCode: query.destination,
        },
        TPA_Extensions: {
          CabinPref: {
            Cabin: query.class?.toUpperCase(),
            PreferLevel: "Preferred",
          },
        },
      },
    ],
    PassengerTypeQuantity: [
      {
        Code: "ADT",
        Quantity: Number(query.adults || 1) || 1,
      },
    ],
  }
  if (Number(query.child || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "C11",
      Quantity: Number(query.child),
    })
  }

  if (Number(query.infant || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "INY",
      Quantity: Number(query.infant),
    })
  }

  return formattedQuery
}
