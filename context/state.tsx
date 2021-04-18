import { createContext, useState, useEffect } from 'react'
export const CurrentUserContext = createContext({})

export function AppWrapper({ children }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('currentUser')))
  }, [])

  return <CurrentUserContext.Provider value={{ user }}>{children}</CurrentUserContext.Provider>
}
