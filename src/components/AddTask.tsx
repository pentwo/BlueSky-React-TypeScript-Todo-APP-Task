import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";

import { useGlobalContext } from "../state/context";
import ProjectInputField from "./EditField/ProjectInputField";
import UserSelect from "./EditField/UserSelect";
import Switch from "./EditField/Switch";
import { ActionTypes, ADD_AND_REFRESH_TODO } from "../state/actions";
import { TempTodo } from "../state/state";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #333",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface AddTask {
  handleModalClose: () => void;
  payload?: TempTodo;
}

export default function AddTask({ handleModalClose, payload }: AddTask) {
  const classes = useStyles();
  const globalContext = useGlobalContext();
  const { dispatch } = globalContext;

  const [newTodo, setNewTodo] = useState({
    name: "",
    user: "",
    isComplete: false,
  });

  function handleSave() {
    dispatch({ type: ADD_AND_REFRESH_TODO, payload: newTodo });
    dispatch({ type: ActionTypes.ClearTempTodo });
    handleModalClose();
  }

  if (!globalContext) return null;
  return (
    <Box className={classes.paper} display="flex" flexDirection="column">
      <h2>Add Task</h2>
      <ProjectInputField
        label="Project Name"
        setState={setNewTodo}
        inputName="newTodoInput"
      />
      <UserSelect setState={setNewTodo} inputName="newTodoSelect" />
      <Switch checked={false} setState={setNewTodo} />
      <Button
        disabled={newTodo.name === "" || newTodo.user === ""}
        variant="contained"
        onClick={handleSave}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </Box>
  );
}
