export const getAllFlights = async () => {
  try {
    const apiUrl =
      "https://booking-expert.m360ictapi.com/api/v1/booking/flight/search/v2?page=1&size=20"
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const body = {
      OriginDestinationInformation: [
        {
          RPH: "1",
          DepartureDateTime: "2024-05-03T06:00:00",
          OriginLocation: { LocationCode: "DAC" },
          DestinationLocation: { LocationCode: "CXB" },
          TPA_Extensions: {
            CabinPref: { Cabin: "Y", PreferLevel: "Preferred" },
          },
        },
      ],
      PassengerTypeQuantity: [{ Code: "ADT", Quantity: 1 }],
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    })
    console.log(JSON.stringify(body))

    return response.json()
  } catch (error) {
    console.error("Error getting flights:", error)
    throw new Error("Failed to fetch Flights")
  }
}
