import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { selectLoggedInUser } from '../AuthSlice'

export const Protected = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser)

  // Backend supports only email+password; allow access when loggedInUser exists.
  if (loggedInUser) {
    return children
  }
  return <Navigate to={'/login'} replace={true} />
}


