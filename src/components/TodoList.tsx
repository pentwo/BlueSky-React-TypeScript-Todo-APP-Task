import React from "react";
import {
  makeStyles,
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

import { Todo, User } from "../types";
import { useGlobalContext } from "../state/context";
import { DELETE_AND_REFRESH_TODO } from "../state/actions";

const useStyles = makeStyles({
  table: {
    marginTop: "32px",
    marginBottom: "32px",
  },
});

export default function TodoList() {
  const classes = useStyles();
  const globalContext = useGlobalContext();
  if (!globalContext) return null;

  const { state, dispatch } = globalContext;
  const { todos, users } = state;

  function handleFilter(e: React.MouseEvent) {
    const target = e.currentTarget.childNodes[0].nodeValue;
    // console.log("e.currentTarget: ", e.currentTarget);
    if (!target) return;
  }

  function handleEdit(e: React.MouseEvent) {
    // const ele = e.target instanceof HTMLInputElement;
    //   console.log("e.currentTarget : ", e.currentTarget);
    //   console.log("e.target : ", e.target);
    //   const id = e.currentTarget.id;
    //   console.log("id: ", id);
  }

  function handleDelete(e: React.MouseEvent) {
    console.log("e.currentTarget : ", e.currentTarget);
    const id = e.currentTarget.getAttribute("data-delete")?.split("-")[1];
    if (id) {
      dispatch({ type: DELETE_AND_REFRESH_TODO, payload: { id: id } });
    }
  }

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="todo table">
        <TableHead>
          <TableRow>
            <TableCell onClick={handleFilter}>Project Name</TableCell>
            <TableCell align="center" onClick={handleFilter}>
              User
            </TableCell>
            <TableCell align="center" onClick={handleFilter}>
              Completed
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.length > 0 ? (
            todos.map((todo) => {
              const filterResult: User = Object.values(users).filter((user) => {
                return user.id === todo.user;
              })[0];

              return (
                <TableRow hover key={todo.id}>
                  <TableCell scope="row">{todo.name}</TableCell>
                  <TableCell align="center">
                    {`${filterResult?.firstName} ${filterResult?.lastName}`}
                  </TableCell>
                  <TableCell align="center">
                    {/* <Switch checked={todo.isComplete} /> */}
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
            })
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// CheckCircleOutlineOutlinedIcon
// RadioButtonUncheckedOutlinedIcon
