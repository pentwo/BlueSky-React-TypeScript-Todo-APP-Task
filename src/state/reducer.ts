import axios from "axios";
import { ActionTypes, StateActions } from "./actions";
import { GlobalState, Todo } from "./state";

export function stateReducer(
  state: GlobalState,
  action: StateActions
): GlobalState {
  switch (action.type) {
    // case ActionTypes.UpdateTodoList:

    case ActionTypes.AddTodo:
      return { ...state, todos: [action.payload, ...state.todos] };

    case ActionTypes.EditTodo:
      return { ...state };

    case ActionTypes.DeleteTodo:
      // deleteTodo(action.payload.id);
      return { ...state };
    default:
      return state;
  }
}

async function deleteTodo(id: number) {
  try {
    const result = await axios
      .delete(`api/todo/${id}/delete`)
      .then((response) => response);

    return result;
  } catch (error) {
    console.error(error);
  }
}

async function getTodos() {
  try {
    const { todos } = await axios
      .get("api/todos")
      .then((response) => response.data);

    return todos;
  } catch (error) {
    console.error(error);
  }
}
