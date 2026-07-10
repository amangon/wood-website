import { axiosi } from '../../config/axios'

export const signup = async (cred) => {
  try {
    const res = await axiosi.post('auth/register', cred)
    return res.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const login = async (cred) => {
  try {
    const res = await axiosi.post('auth/login', cred)
    return res.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const checkAuth = async () => {
  try {
    const res = await axiosi.get('auth/profile')
    return res.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const logout = async () => {
  try {
    const res = await axiosi.post('auth/logout')
    return res.data
  } catch (error) {
    throw error.response?.data || error
  }
}


