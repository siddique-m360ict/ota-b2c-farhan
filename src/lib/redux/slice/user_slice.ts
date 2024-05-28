import { LoginResData } from "@/lib/server/auth/PostLoginEndpoints"
import { UserType } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { deleteCookie } from "cookies-next"

interface UserState {
  success?: boolean | null
  data?: LoginResData
  token?: string | null
  message?: string | null
}

const initialState: UserState = {}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user: (state, action: PayloadAction<UserState>) => {
      return action.payload
    },
    logout: (state) => {
      localStorage.removeItem("b_token")
      deleteCookie("b_token")
      deleteCookie("user")
      return initialState
    },
    updateIsVerified: (state, action: PayloadAction<true | false>) => {
      if (state && state.data) {
        state.data = {
          ...state.data,
          is_verified: action.payload,
        }
      }
    },
  },
})

export const { user, logout, updateIsVerified } = userSlice.actions
export const selectUser = (state: { user: UserState }) => state.user
export default userSlice.reducer
