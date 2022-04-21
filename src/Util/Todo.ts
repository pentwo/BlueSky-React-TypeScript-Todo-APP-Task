import axios from "axios";
import { Todo } from "../types";

export async function deleteTodo(id: number) {
  try {
    const result = await axios
      .delete(`api/todo/${id}/delete`)
      .then((response) => response);

    return result;
  } catch (error) {
    console.error(error);
  }
}

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

export async function addTodo(payload: Todo) {
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
