import { useState, useContext } from "react"
import { createContext } from "react"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logOut = () => {
    setIsLoggedIn(false)
  }

  const logIn = () => {
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logOut,
        logIn,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
