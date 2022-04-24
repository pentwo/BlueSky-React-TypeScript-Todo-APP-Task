import axios from "axios";
import { TempTodo, NewTodo } from "../state/state";

/**
 * Get all list of todos
 * @returns Todo[]
 */
export async function getTodos() {
  try {
    const { todos } = await axios
      .get("api/todos")
      .then((response) => response.data);

    return todos;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Get Todo from server by ID
 * @param id {Number|String} Todo id
 * @returns todo
 */
export async function getTodo(id: string | number) {
  try {
    const { todo } = await axios
      .get(`api/todo/${id}`)
      .then((response) => response.data);

    return todo;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Sent Todo to the server to save
 * @param payload {NewTodo}
 * @returns
 */
export async function addTodo(payload: NewTodo) {
  try {
    const result = await axios
      .post(`api/todo/create`, {
        ...payload,
      })
      .then((response) => response);

    return result;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Save Todo to the database
 * @param payload {TempTodo}
 * @returns todo
 */
export async function saveTodo(payload: TempTodo) {
  try {
    const { id } = payload;
    const { todo } = await axios
      .patch(`api/todo/${id}/edit`, {
        ...payload,
      })
      .then((response) => response.data);

    return todo;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Delete todo by id
 * @param id
 * @returns result: success | error
 */
export async function deleteTodo(id: string | number) {
  try {
    const result = await axios
      .delete(`api/todo/${id}/delete`)
      .then((response) => response);

    return result;
  } catch (error) {
    console.error(error);
  }
}
