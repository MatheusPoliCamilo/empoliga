import { createContext, useState } from 'react'
export const CurrentUserContext = createContext({})

export function AppWrapper({ children }) {
  const [user, setUser] = useState({})

  console.log('estado', user)

  return <CurrentUserContext.Provider value={{ user, setUser }}>{children}</CurrentUserContext.Provider>
}
