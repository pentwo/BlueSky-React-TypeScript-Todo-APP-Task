import { createContext, useContext } from "react";
import { Todo, User } from "../state/state";

export type GlobalContext = {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  deleteTodo: (id: string) => void;
  users: User[];
  setUsers: (users: User[]) => void;
};

export const MyGlobalContext = createContext<GlobalContext>({
  todos: [],
  setTodos: () => {},
  deleteTodo: () => {},
  users: [],
  setUsers: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
