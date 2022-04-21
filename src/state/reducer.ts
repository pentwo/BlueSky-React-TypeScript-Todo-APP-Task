// @ts-nocheck
import { Dispatch, Reducer, ReducerAction, ReducerState } from "react";
import { AsyncActionHandlers } from "use-reducer-async";

import { addTodo, getTodos, deleteTodo } from "../Util/Todo";
import { getUsers } from "../Util/User";
import { ActionTypes, StateActions } from "./actions";
import { GlobalState } from "./state";

export function stateReducer(
  state: GlobalState,
  action: StateActions
): GlobalState {
  // console.log(`Reducer-${action.type} -> Action: `, action);
  switch (action.type) {
    case ActionTypes.RefreshTodoList:
      return { ...state, todos: [...action.payload] };
    case ActionTypes.RefreshUserList:
      return { ...state, users: [...action.payload] };

    case ActionTypes.AddTodo:
      return { ...state, todos: [action.payload, ...state.todos] };

    case ActionTypes.EditTodo:
      const todo = action.payload;

      return { ...state };

    default:
      return { ...state };
  }
}

export const asyncActionHandlers = {
  ADD_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      console.log("ADD_AND_REFRESH_TODO-PAYLOAD", action.payload);
      const result = await addTodo(action.payload);

      dispatch({ type: "REFRESH_TODO" });
    },
  REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const result = await getTodos();

      dispatch({ type: ActionTypes.RefreshTodoList, payload: result });
    },
  REFRESH_USER:
    ({ dispatch }) =>
    async (action) => {
      const result = await getUsers();

      dispatch({ type: ActionTypes.RefreshUserList, payload: result });
    },
  DELETE_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const result = await deleteTodo(action.payload.id);

      dispatch({ type: "REFRESH_TODO" });
    },
};
