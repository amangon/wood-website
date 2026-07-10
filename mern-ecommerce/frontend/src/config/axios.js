import axios from 'axios'

export const axiosi = axios.create({
  withCredentials: true,
  // CRA env: must be defined as REACT_APP_BASE_URL, e.g. http://localhost:5001/api
  // Fallback keeps local dev working even if env var isn't loaded.
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5001/api',
});


