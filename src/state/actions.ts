import { Todo, User } from "./state";

// normal reducer actions
export enum ActionTypes {
  RefreshTodoList,
  RefreshUserList,
  AddTodo,
  EditTodo,
  DeleteAndRefreshTodo,
  // DeleteTodo,
  Update,
  Clear,
}

export const ADD_AND_REFRESH_TODO = "ADD_AND_REFRESH_TODO";
export const DELETE_AND_REFRESH_TODO = "DELETE_AND_REFRESH_TODO";
export const REFRESH_TODO = "REFRESH_TODO";
export const REFRESH_USER = "REFRESH_USER";

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
  payload: Todo;
}

export interface AddAndRefreshTodo {
  type: "ADD_AND_REFRESH_TODO";
  payload: { name: string; user: string; isComplete: boolean };
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

// export interface DeleteTodo {
//   type: ActionTypes.DeleteTodo;
//   payload: { id: number };
// }

export type StateActions =
  | RefreshTodoList
  | RefreshUserList
  | AddTodo
  | EditTodo
  | AddAndRefreshTodo
  | DeleteAndRefreshTodo
  | RefreshTodo
  | RefreshUser;

// | DeleteTodo;

export type Actions = StateActions;
