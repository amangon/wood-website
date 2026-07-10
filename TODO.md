# TODO - Auth simplify (email+password only)

- [x] Inspect backend auth routes: only register/login/logout/profile exist (no OTP endpoints)

- [x] Update frontend `AuthApi.jsx` to remove verify/resend OTP (and remove forgot/reset if backend missing)

- [x] Update frontend `AuthSlice.jsx` to remove OTP state + thunks/selectors/reducers

- [ ] Update frontend auth components:
  - [ ] `Signup.jsx`: remove username + confirmPassword, keep only email/password
  - [ ] `Login.jsx`: remove OTP redirect logic and `isVerified` checks
  - [ ] Remove `OtpVerfication.jsx` usage + route: replace `/verify-otp` navigation so no page is needed
- [x] Update `App.js` routes to remove OTP/forgot/reset routes
- [x] Update `Protected.jsx` to allow access when logged in user exists (no isVerified requirement)

- [ ] Ensure `axios.js` baseURL + endpoint paths match backend (`/api/auth/...`)
- [ ] Run backend + frontend and verify register/login flow + protected navigation

