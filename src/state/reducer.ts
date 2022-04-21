// @ts-nocheck
import { Dispatch, Reducer, ReducerAction, ReducerState } from "react";
import { AsyncActionHandlers } from "use-reducer-async";

import {
  addTodo,
  getTodos,
  deleteTodo,
  editTodo,
  saveTodo,
} from "../Util/Todo";
import { getUsers } from "../Util/User";
import { ActionTypes, StateActions } from "./actions";
import { GlobalState } from "./state";

export function stateReducer(
  state: GlobalState,
  action: StateActions
): GlobalState {
  switch (action.type) {
    case ActionTypes.RefreshTodoList:
      return { ...state, todos: [...action.payload] };
    case ActionTypes.RefreshUserList:
      return { ...state, users: [...action.payload] };

    case ActionTypes.AddTodo:
      return { ...state, todos: [action.payload, ...state.todos] };

    case ActionTypes.EditTodo:
      const editTodo = action.payload;
      return { ...state, tempTodo: { ...action.payload } };

    case ActionTypes.ClearTempTodo:
      return {
        ...state,
        tempTodo: {
          id: "",
          name: "",
          userId: "",
          isComplete: false,
        },
      };

    default:
      return { ...state };
  }
}

export const asyncActionHandlers = {
  ADD_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const result = await addTodo(action.payload);

      dispatch({ type: "REFRESH_TODO" });
    },
  GET_EDIT_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const todo = await editTodo(action.payload.id);
      console.log("GET_EDIT_AND_REFRESH_TODO:", todo);
      dispatch({ type: ActionTypes.EditTodo, payload: todo });

      dispatch({ type: "REFRESH_TODO" });
    },

  SAVE_EDIT_TODO_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      // Call async to save Todo to database
      const todo = await saveTodo(action.payload);
      console.log("SAVE_EDIT_TODO_AND_REFRESH_TODO", todo);

      dispatch({ type: "REFRESH_TODO" });
    },

  DELETE_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const result = await deleteTodo(action.payload.id);

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
};
