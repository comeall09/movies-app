import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit"
import { authApi } from "../../service/authApi"

export const checkEmail = createAsyncThunk(
  'email/checkEmail',
  async (data, { rejectWithValue}) => {
    const [email, login] = data
  try {
    const isValid = await authApi.checkEmail(email)
    if(isValid) {
      localStorage.setItem('email', email)
      localStorage.setItem('login', login)
      return [email, login]
    }
    throw new Error('invalid email')
  } catch (e) {
    return rejectWithValue(e)
  }
  }
)

const initialState = {
  login: '',
  email: '',
  isValid: true,
  checking: false,
  checked: false
}

export const authSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.login = payload.length > 0 ? payload : state.login
    }
  },
  extraReducers: builder => {
    builder
    .addCase(checkEmail.pending, state => {
      state.checking = true
    })
    .addCase(checkEmail.fulfilled, (state, {payload}) => {
      state.isValid = true
      state.email = payload[0]  // email
      state.login = payload[1]  // login
      state.checked = true
      state.checking = false
    })
    .addCase(checkEmail.rejected, (state, action) => {
      state.isValid = false
      state.checking = false
    })
  }
})

export const { setLogin } = authSlice.actions