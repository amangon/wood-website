import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, logout, signup } from './AuthApi'


const initialState = {
  status: 'idle',
  errors: null,

  signupStatus: 'idle',
  signupError: null,

  loginStatus: 'idle',
  loginError: null,

  loggedInUser: null,



  successMessage: null,
  isAuthChecked: false,
}

export const signupAsync = createAsyncThunk('auth/signupAsync', async (cred) => {
  const res = await signup(cred)
  return res
})

export const loginAsync = createAsyncThunk('auth/loginAsync', async (cred) => {
  const res = await login(cred)
  return res
})

export const checkAuthAsync = createAsyncThunk('auth/checkAuthAsync', async () => {
  const res = await checkAuth()
  return res
})

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  const res = await logout()
  return res
})

// NOTE: This project backend supports only email+password auth (register/login/profile/logout).

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    clearAuthSuccessMessage: (state) => {
      state.successMessage = null
    },
    clearAuthErrors: (state) => {
      state.errors = null
    },

    resetSignupStatus: (state) => {
      state.signupStatus = 'idle'
    },
    clearSignupError: (state) => {
      state.signupError = null
    },

    resetLoginStatus: (state) => {
      state.loginStatus = 'idle'
    },
    clearLoginError: (state) => {
      state.loginError = null
    },

    resetAuthStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.signupStatus = 'pending'
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.signupStatus = 'fullfilled'
        state.loggedInUser = action.payload?.user || action.payload
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.signupStatus = 'rejected'
        state.signupError = action.error
      })

      .addCase(loginAsync.pending, (state) => {
        state.loginStatus = 'pending'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginStatus = 'fullfilled'
        state.loggedInUser = action.payload?.user || action.payload
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginStatus = 'rejected'
        state.loginError = action.error
      })

      .addCase(logoutAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'fullfilled'
        state.loggedInUser = null
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = 'rejected'
        state.errors = action.error
      })

      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'fullfilled'
        state.loggedInUser = action.payload?.user || action.payload
        state.isAuthChecked = true
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'rejected'
        state.errors = action.error
        state.loggedInUser = null
        state.isAuthChecked = true
      })
  },
})

// selectors
export const selectAuthStatus = (state) => state.AuthSlice.status
export const selectAuthErrors = (state) => state.AuthSlice.errors
export const selectLoggedInUser = (state) => state.AuthSlice.loggedInUser
export const selectAuthSuccessMessage = (state) => state.AuthSlice.successMessage

export const selectIsAuthChecked = (state) => state.AuthSlice.isAuthChecked

export const selectSignupStatus = (state) => state.AuthSlice.signupStatus
export const selectSignupError = (state) => state.AuthSlice.signupError

export const selectLoginStatus = (state) => state.AuthSlice.loginStatus
export const selectLoginError = (state) => state.AuthSlice.loginError

// ---------------------------------------------------------------------------
// Backward-compatible no-op exports for pages that still exist in the UI.
// They prevent compile errors while backend endpoints for OTP/forgot/reset
// are not implemented in this codebase.
// ---------------------------------------------------------------------------

export const selectForgotPasswordStatus = () => 'idle'
export const selectForgotPasswordError = () => null
export const selectForgotPasswordSuccessMessage = () => null

export const selectResetPasswordStatus = () => 'idle'
export const selectResetPasswordError = () => null
export const selectResetPasswordSuccessMessage = () => null

export const clearForgotPasswordError = () => ({ type: 'auth/clearForgotPasswordError' })
export const clearForgotPasswordSuccessMessage = () => ({ type: 'auth/clearForgotPasswordSuccessMessage' })
export const resetForgotPasswordStatus = () => ({ type: 'auth/resetForgotPasswordStatus' })

export const clearResetPasswordError = () => ({ type: 'auth/clearResetPasswordError' })
export const clearResetPasswordSuccessMessage = () => ({ type: 'auth/clearResetPasswordSuccessMessage' })
export const resetResetPasswordStatus = () => ({ type: 'auth/resetResetPasswordStatus' })

// no-op async thunks (so dispatch won't crash)
export const forgotPasswordAsync = () => async () => ({ success: false, message: 'Not supported' })
export const resetPasswordAsync = () => async () => ({ success: false, message: 'Not supported' })

// reducers
export const {
  clearAuthSuccessMessage,
  clearAuthErrors,
  resetAuthStatus,
  resetSignupStatus,
  clearSignupError,
  resetLoginStatus,
  clearLoginError,
} = authSlice.actions

export default authSlice.reducer

