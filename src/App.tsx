import React, { useState, createContext, useEffect, useReducer } from "react";
import { Box, Button, Container } from "@material-ui/core";
import axios from "axios";

import "./App.css";
import { MyGlobalContext } from "./context/GlobalContext";
import { Todo, User } from "./types";
import SearchField from "./components/SearchField";
import TodoList from "./components/TodoList";

// New implementation
import { initialState } from "./state/state";
import { stateReducer } from "./state/reducer";
import { GlobalContext } from "./state/context";

function App() {
  // const [state, dispatch] = useReducer(stateReducer, initialState);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  async function getTodos() {
    try {
      const { todos } = await axios
        .get("api/todos")
        .then((response) => response.data);

      setTodos(todos);
    } catch (error) {
      console.error(error);
    }
  }
  async function getUsers() {
    try {
      const { users } = await axios
        .get("api/users")
        .then((response) => response.data);

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteTodo(id: string) {
    try {
      const result = await axios
        .delete(`api/todo/${id}/delete`)
        .then((response) => response);

      console.log("result: ", result);
      getTodos();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // dispatch(UpdateTodoList());
    getTodos();
    getUsers();
  }, []);

  return (
    // <GlobalContext.Provider value={{ state, dispatch }}>
    <MyGlobalContext.Provider
      value={{ todos, setTodos, deleteTodo, users, setUsers }}
    >
      <div className="App">
        <Container maxWidth="md">
          <SearchField />
          <TodoList />
          <Box display="flex" flexDirection="row-reverse">
            <Button variant="contained">Add Task</Button>
          </Box>
        </Container>
      </div>
    </MyGlobalContext.Provider>
    // </GlobalContext.Provider>
  );
}

export default App;
function UpdateTodoList(): import("./state/actions").StateActions {
  throw new Error("Function not implemented.");
}
