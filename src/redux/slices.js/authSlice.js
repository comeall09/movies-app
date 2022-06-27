import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit"
import { authApi } from "../../dal/authApi"

export const checkEmail = createAsyncThunk(
  'email/checkEmail',
  async (email, rejectWithValue) => {
    try {
      debugger
      console.log(email);
      const isValid = await authApi.checkEmail(email)
      // if(isValid === 'DELIVERABLE') return isValid
      throw new Error()
    } catch(e) {
      return rejectWithValue(e)
    } 
  }
)

checkEmail({email: 'kamolkhamidov200002@gmail.com', login: 'someLogin'})


const initialState = {
  isValid: false,
  login: '',
  checking: false
}

export const movieDetailsSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(checkEmail.pending, state => {
      state.checking = true
    })
    .addCase(checkEmail.fulfilled, (state, action) => {
      state.isValid = true
      console.log(action.payload);
      state.checking = false
    })
    // .addCase(checkEmail.rejected, (state) => {
    //   state.isValid = false,
    //   state.checking = false
    // })
  }
})
