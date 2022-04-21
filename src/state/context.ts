import { Dispatch, createContext, useContext } from "react";
import { Actions } from "./actions";
import { GlobalState, initialState } from "./state";

export const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const useGlobalContext = () => useContext(GlobalContext);
