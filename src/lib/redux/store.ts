import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import filterReducer from "./slice/flight_filter"
import userReducer from "./slice/user_slice"
import filterOptionsReducer from "./slice/filterOptions"
import filterDataReducer from "./slice/filterDataList"
import modifyFlightSearchDrawerReducer from "./slice/ModifyFlightSearchDrawer"
import transitionLoadingReducer from "./slice/transitionLoading"
import cappingAirlineReducers from "./slice/cappingAirline"
import visaSearchStateReducer from "./slice/visaSlice/visaSearchState"
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["filterItems", "user", "cappingAirline", "visaSearchState"],
}

const rootReducer = combineReducers({
  filterItems: filterReducer,
  cappingAirline: cappingAirlineReducers,
  filterOption: filterOptionsReducer,
  user: userReducer,
  filter: filterDataReducer,
  modifyFlightSearch: modifyFlightSearchDrawerReducer,
  transitionLoading: transitionLoadingReducer,
  visaSearchState: visaSearchStateReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
