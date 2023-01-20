import { createContext } from "react"

export interface UserI {
  name: string,
  email: string,
}
export const CurrentUserContext = createContext<UserI | null>(null);