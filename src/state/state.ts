// import { Todo, User, EditTodo } from "../types";

export interface Todo {
  id: string;
  name: string;
  user: string;
  isComplete: boolean;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
}
// export interface NewTodo {
//   name: string;
//   user: string;
//   isComplete: boolean;
// }

export interface TempTodo {
  id: string;
  name: string;
  userId: string;
  isComplete: boolean;
}

export interface SearchTodo {
  name: string;
  userId: string;
}

export type GlobalState = {
  todos: Todo[];
  users: User[];
  search: SearchTodo;
  tempTodo: undefined | TempTodo;
};

export const initialState: GlobalState = {
  todos: [],
  users: [],
  tempTodo: {
    id: "",
    name: "",
    userId: "",
    isComplete: false,
  },
  search: {
    name: "",
    userId: "",
  },
};
