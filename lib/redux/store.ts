import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import filterReducer from "./slice/flight_filter"
import filterAirlineReducer from "./slice/filterAirline"
import filterOptionsReducer from "./slice/filterOptions"
const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  filterItems: filterReducer,
  filterAirline: filterAirlineReducer,
  filterOption: filterOptionsReducer,
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
