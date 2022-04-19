import { Todo } from "./state";

export enum ActionTypes {
  UpdateTodoList,
  AddTodo,
  EditTodo,
  DeleteTodo,
}

export interface UpdateTodoList {
  type: ActionTypes.UpdateTodoList;
}

export interface AddTodo {
  type: ActionTypes.AddTodo;
  payload: Todo;
}
export interface EditTodo {
  type: ActionTypes.EditTodo;
  payload: Todo;
}
export interface DeleteTodo {
  type: ActionTypes.DeleteTodo;
  payload: { id: number };
}

export type StateActions = UpdateTodoList | AddTodo | EditTodo | DeleteTodo;
