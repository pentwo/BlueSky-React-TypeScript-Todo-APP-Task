import React, { useState } from "react";
import {
  createStyles,
  makeStyles,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
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
import EditField from "./EditField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginBottom: theme.spacing(4),
    },
    h2: {
      marginLeft: theme.spacing(2),
    },
  })
);

export default function TodoList() {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  // Loading global context
  const globalContext = useGlobalContext();
  const { state, dispatch } = globalContext;
  const { todos, users } = state;

  // When modal closed, clear temporary todo
  const handleModalClose = () => {
    setModalOpen(false);
    dispatch({ type: ActionTypes.ClearTempTodo });
  };

  /**
   * click on edit button, fetch Todo data for that todo and
   * put into temporary todo
   */
  function handleEdit(e: React.MouseEvent) {
    const id = e.currentTarget
      .getAttribute("data-edit")
      ?.split("-")[1] as string;

    setModalOpen(true);
    dispatch({ type: GET_EDIT_AND_REFRESH_TODO, payload: { id: id } });
  }

  // delete todo by id with alert window
  function handleDelete(e: React.MouseEvent) {
    if (window.confirm("Are you sure you want to delete?")) {
      const id = e.currentTarget.getAttribute("data-delete")?.split("-")[1];
      if (id) {
        dispatch({ type: DELETE_AND_REFRESH_TODO, payload: { id: id } });
      }
    }
  }

  if (!globalContext) return null;
  return (
    <>
      <TableContainer className={classes.table} component={Paper} elevation={4}>
        <h2 className={classes.h2}>Task list</h2>
        {/* Main Table */}
        <Table aria-label="todo table">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell align="center" width="20%">
                User
              </TableCell>
              <TableCell align="center" width="10%">
                Completed
              </TableCell>
              <TableCell align="center" width="5%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.search.name || state.search.userId ? (
              todos
                .filter((todo) => {
                  const { name, userId, isComplete } = state.search;

                  const regex = new RegExp(name, "gi");
                  const nameMatch = todo.name.search(regex) !== -1;
                  let userMatch = true;
                  if (userId) {
                    userMatch = todo.user === userId;
                  }
                  const isCompleteMatch = isComplete === todo.isComplete;

                  return nameMatch && userMatch && isCompleteMatch;
                })
                .map((todo) => {
                  const userQuery: User = Object.values(users).filter(
                    (user) => {
                      return user.id === todo.user;
                    }
                  )[0];

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
        {/* Edit Components */}
        <Modal open={modalOpen} onClose={handleModalClose}>
          <EditField handleModalClose={handleModalClose} />
        </Modal>
      </TableContainer>
    </>
  );
}

interface TodoRow {
  todo: Todo;
  userQuery: User;
  handleDelete: (e: React.MouseEvent) => void;
  handleEdit: (e: React.MouseEvent) => void;
}

// Table row components
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
