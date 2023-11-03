import { createContext, useContext } from "react";

// Create a context
export const AuthContext = createContext();

// Create a custom hook to access the context
export function useAuth() {
  return useContext(AuthContext);
}