import { useAuth } from "../context/AuthProvider/useAuth"
import Signin from '../pages/Signin'

export const ProtectedLayout = ({ children }) => {
  const auth = useAuth()

  if (!auth.email) {
    return (
        <Signin />
    )
  }

  return children
}