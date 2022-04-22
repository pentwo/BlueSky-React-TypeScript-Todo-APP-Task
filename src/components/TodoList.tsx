import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

import { Todo, User } from "../state/state";
import { useGlobalContext } from "../state/context";
import {
  GET_EDIT_AND_REFRESH_TODO,
  DELETE_AND_REFRESH_TODO,
  ActionTypes,
} from "../state/actions";
import { editTodo } from "../Util/Todo";
import AddTask from "./AddTask";
import EditField from "./EditField";

const useStyles = makeStyles({
  table: {
    marginTop: "32px",
    marginBottom: "32px",
  },
});

interface Payload {
  name: string;
  user: string;
  isComplete: boolean;
}

export default function TodoList() {
  const [payload, setPayload] = useState<Payload>({
    name: "",
    user: "",
    isComplete: false,
  });
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const globalContext = useGlobalContext();
  if (!globalContext) return null;

  const { state, dispatch } = globalContext;
  const { todos, users } = state;

  const handleModalClose = () => {
    setOpen(false);
    dispatch({ type: ActionTypes.ClearTempTodo });
  };

  function handleFilter(e: React.MouseEvent) {
    const target = e.currentTarget.childNodes[0].nodeValue;
    if (!target) return;
  }

  function handleEdit(e: React.MouseEvent) {
    const id = e.currentTarget
      .getAttribute("data-edit")
      ?.split("-")[1] as string;

    setOpen(true);
    dispatch({ type: GET_EDIT_AND_REFRESH_TODO, payload: { id: id } });
  }

  function handleDelete(e: React.MouseEvent) {
    if (window.confirm("Are you sure you want to delete?")) {
      const id = e.currentTarget.getAttribute("data-delete")?.split("-")[1];
      if (id) {
        dispatch({ type: DELETE_AND_REFRESH_TODO, payload: { id: id } });
      }
    }
  }

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="todo table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Completed</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.search.name ? (
            todos
              .filter((todo) => {
                const { name } = state.search;
                const regex = new RegExp(name, "gi");
                return todo.name.search(regex) !== -1;
              })
              .map((todo) => {
                const userQuery: User = Object.values(users).filter((user) => {
                  return user.id === todo.user;
                })[0];

                return (
                  <TodoRow
                    key={todo.id}
                    todo={todo}
                    userQuery={userQuery}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              })
          ) : todos.length > 0 ? (
            todos.map((todo) => {
              const userQuery: User = Object.values(users).filter((user) => {
                return user.id === todo.user;
              })[0];
              return (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  userQuery={userQuery}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      <Modal open={open} onClose={handleModalClose}>
        <EditField handleModalClose={handleModalClose} />
      </Modal>
    </TableContainer>
  );
}

interface TodoRow {
  todo: Todo;
  userQuery: User;
  handleDelete: (e: React.MouseEvent) => void;
  handleEdit: (e: React.MouseEvent) => void;
}

function TodoRow({ todo, userQuery, handleDelete, handleEdit }: TodoRow) {
  return (
    <TableRow hover>
      <TableCell scope="row">{todo.name}</TableCell>
      <TableCell align="center">
        {`${userQuery?.firstName} ${userQuery?.lastName}`}
      </TableCell>
      <TableCell align="center">
        {todo.isComplete ? (
          <CheckCircleOutlineOutlinedIcon color="primary" />
        ) : (
          <RadioButtonUncheckedOutlinedIcon color="primary" />
        )}
      </TableCell>
      <TableCell align="center">
        <CancelIcon
          data-delete={`Delete-${todo.id}`}
          color="primary"
          onClick={handleDelete}
        />
        <EditIcon
          data-edit={`Edit-${todo.id}`}
          color="primary"
          onClick={handleEdit}
        />
      </TableCell>
    </TableRow>
  );
}
