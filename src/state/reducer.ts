import { Reducer } from "react";
import { AsyncActionHandlers } from "use-reducer-async";

import { addTodo, getTodos, deleteTodo, getTodo, saveTodo } from "../Util/Todo";
import { getUsers } from "../Util/User";
import {
  ActionTypes,
  AsyncActions,
  REFRESH_TODO,
  StateActions,
} from "./actions";
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

    case ActionTypes.Search:
      return { ...state, search: { ...action.payload } };

    default:
      return { ...state };
  }
}

export const asyncActionHandlers: AsyncActionHandlers<
  Reducer<GlobalState, StateActions>,
  AsyncActions
> = {
  ADD_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const result = await addTodo(action.payload);
      if (result?.status !== 200) {
        console.error(result?.statusText);
      }

      dispatch({ type: REFRESH_TODO });
    },

  GET_EDIT_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const todo = await getTodo(action.payload.id);
      dispatch({ type: ActionTypes.EditTodo, payload: todo });

      dispatch({ type: REFRESH_TODO });
    },

  SAVE_EDIT_TODO_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      // Call async to save Todo to database
      await saveTodo(action.payload);

      dispatch({ type: REFRESH_TODO });
    },

  DELETE_AND_REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const id = action.payload.id as string;
      const result = await deleteTodo(id);
      if (result?.status !== 200) {
        console.error(result?.statusText);
      }

      dispatch({ type: REFRESH_TODO });
    },

  REFRESH_TODO:
    ({ dispatch }) =>
    async (action) => {
      const result = await getTodos();
      result.sort(function (
        a: { isComplete: boolean },
        b: { isComplete: boolean }
      ) {
        return a.isComplete === b.isComplete ? 0 : a.isComplete ? -1 : 1;
      });

      dispatch({ type: ActionTypes.RefreshTodoList, payload: result });
    },

  REFRESH_USER:
    ({ dispatch }) =>
    async (action) => {
      const result = await getUsers();

      dispatch({ type: ActionTypes.RefreshUserList, payload: result });
    },
};
