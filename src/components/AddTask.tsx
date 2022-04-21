import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import React, { Ref, useState } from "react";

import { Todo } from "../types";
import { useGlobalContext } from "../state/context";
import ProjectInputField from "./SearchField/ProjectInputField";
import UserSelect from "./SearchField/UserSelect";
import Switch from "./SearchField/Switch";
import { ADD_AND_REFRESH_TODO } from "../state/actions";

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
}

export default function AddTask({ handleModalClose }: AddTask) {
  const classes = useStyles();
  const [newTodo, setNewTodo] = useState({
    name: "",
    user: "",
    isComplete: false,
  });

  const globalContext = useGlobalContext();
  if (!globalContext) return null;

  const { state, dispatch } = globalContext;
  const { todos, users } = state;

  function handleSave() {
    dispatch({ type: ADD_AND_REFRESH_TODO, payload: newTodo });
    handleModalClose();
  }

  return (
    <div>
      <Box className={classes.paper} display="flex" flexDirection="column">
        <h2>AddTask</h2>
        <ProjectInputField
          label="Project Name"
          setState={setNewTodo}
          inputName="newTodoInput"
        />
        <UserSelect
          users={users}
          setState={setNewTodo}
          inputName="newTodoSelect"
        />
        <Switch checked={false} setState={setNewTodo} />
        <Button
          variant="contained"
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </div>
  );
}
