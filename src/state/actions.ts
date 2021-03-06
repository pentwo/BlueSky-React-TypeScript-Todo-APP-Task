import { Todo, User, TempTodo, SearchTodo, NewTodo } from "./state";

// normal reducer actions
export enum ActionTypes {
  RefreshTodoList,
  RefreshUserList,
  AddTodo,
  EditTodo,
  DeleteAndRefreshTodo,
  ClearTempTodo,
  Search,
  Update,
  Clear,
}

// Actions for Normal reducer calls

export interface RefreshTodoList {
  type: ActionTypes.RefreshTodoList;
  payload: Todo[];
}
export interface RefreshUserList {
  type: ActionTypes.RefreshUserList;
  payload: User[];
}

export interface AddTodo {
  type: ActionTypes.AddTodo;
  payload: Todo;
}
export interface EditTodo {
  type: ActionTypes.EditTodo;
  payload: TempTodo;
}
export interface Search {
  type: ActionTypes.Search;
  payload: SearchTodo;
}

export interface ClearTempTodo {
  type: ActionTypes.ClearTempTodo;
}

// Actions for Async reducer calls

export const ADD_AND_REFRESH_TODO = "ADD_AND_REFRESH_TODO";
export const DELETE_AND_REFRESH_TODO = "DELETE_AND_REFRESH_TODO";
export const GET_EDIT_AND_REFRESH_TODO = "GET_EDIT_AND_REFRESH_TODO";
export const SAVE_EDIT_TODO_AND_REFRESH_TODO =
  "SAVE_EDIT_TODO_AND_REFRESH_TODO";
export const REFRESH_TODO = "REFRESH_TODO";
export const REFRESH_USER = "REFRESH_USER";

export interface AddAndRefreshTodo {
  type: "ADD_AND_REFRESH_TODO";
  payload: NewTodo;
}
export interface EditAndRefreshTodo {
  type: "GET_EDIT_AND_REFRESH_TODO";
  payload: { id: string };
}
export interface SaveEditAndRefreshTodo {
  type: "SAVE_EDIT_TODO_AND_REFRESH_TODO";
  payload: TempTodo;
}

export interface DeleteAndRefreshTodo {
  type: "DELETE_AND_REFRESH_TODO";
  payload: { id: string };
}

export interface RefreshTodo {
  type: "REFRESH_TODO";
}
export interface RefreshUser {
  type: "REFRESH_USER";
}

export type AsyncActions =
  | AddAndRefreshTodo
  | EditAndRefreshTodo
  | SaveEditAndRefreshTodo
  | DeleteAndRefreshTodo
  | RefreshTodo
  | RefreshUser;

export type StateActions =
  | RefreshTodoList
  | RefreshUserList
  | AddTodo
  | EditTodo
  | Search
  | ClearTempTodo
  | AddAndRefreshTodo
  | EditAndRefreshTodo
  | SaveEditAndRefreshTodo
  | DeleteAndRefreshTodo
  | RefreshTodo
  | RefreshUser;

export type Actions = StateActions | AsyncActions;
