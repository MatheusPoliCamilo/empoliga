import { createContext, useState, useEffect } from 'react'
import Cookie from 'js-cookie'

export const CurrentUserContext = createContext({ user: undefined, token: undefined })

export function AppWrapper({ children }) {
  const [user, setUser] = useState({})
  const [token, setToken] = useState({})

  useEffect(() => {
    if (Cookie.get('token') && Cookie.get('currentUser')) {
      setUser(JSON.parse(Cookie.get('currentUser')))
      setToken(Cookie.get('token'))
    }
  }, [Cookie.get('currentUser')])

  return <CurrentUserContext.Provider value={{ user, token }}>{children}</CurrentUserContext.Provider>
}
