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

export type GlobalState = {
  todos: Todo[];
  users: User[];
};

export const initialState: GlobalState = {
  todos: [],
  users: [],
};
