import { createContext, useContext } from "react";

export const RetiroContext = createContext({
  openRetiro: () => {},
  closeRetiro: () => {},
});

export function useRetiro() {
  return useContext(RetiroContext);
}
