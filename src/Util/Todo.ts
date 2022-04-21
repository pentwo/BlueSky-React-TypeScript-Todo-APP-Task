import axios from "axios";
import { Todo, TempTodo } from "../state/state";

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

export async function editTodo(id: string) {
  try {
    const { todo } = await axios
      .get(`api/todo/${id}`)
      .then((response) => response.data);

    console.log("todo: ", todo);
    return todo;
  } catch (error) {
    console.error(error);
  }
}
export async function saveTodo(payload: TempTodo) {
  try {
    const { id } = payload;
    const { todo } = await axios
      .patch(`api/todo/${id}/edit`, {
        ...payload,
      })
      .then((response) => response.data);

    console.log("todo: ", todo);
    return todo;
  } catch (error) {
    console.error(error);
  }
}

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
