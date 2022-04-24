// User for the Tasks
export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

// Tasks to be display/delete
export interface Todo {
  id: string;
  name: string;
  user: string;
  isComplete: boolean;
}

// Tasks prepared for save into database
export interface NewTodo {
  name: string;
  user: string;
  isComplete: boolean;
}

// Temporary task load from database, ready to be edit and save
export interface TempTodo {
  id: string;
  name: string;
  userId: string;
  isComplete: boolean;
}

// Put all search query text/userId in here, ready for be used in filter query
export interface SearchTodo {
  name: string;
  userId: string | number;
  isComplete: boolean;
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
    isComplete: false,
  },
};
