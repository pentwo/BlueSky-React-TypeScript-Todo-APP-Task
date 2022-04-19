import React from "react";
import { StateActions } from "./actions";
import { GlobalState, initialState } from "./state";

export const GlobalContext = React.createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<StateActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
