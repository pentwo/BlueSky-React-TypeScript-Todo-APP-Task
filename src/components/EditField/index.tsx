import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { useGlobalContext } from "../../state/context";
import {
  ActionTypes,
  SAVE_EDIT_TODO_AND_REFRESH_TODO,
} from "../../state/actions";

import ProjectInputField from "./ProjectInputField";
import UserSelect from "./UserSelect";
import Switch from "./Switch";

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

interface EditField {
  handleModalClose: () => void;
  setSearch?: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function EditField({ handleModalClose, setSearch }: EditField) {
  const classes = useStyles();

  // Loading global context
  const globalContext = useGlobalContext();
  const { state, dispatch } = globalContext;
  const { tempTodo } = state;

  function handleSaveEdit() {
    if (tempTodo) {
      dispatch({
        type: SAVE_EDIT_TODO_AND_REFRESH_TODO,
        payload: tempTodo,
      });
      dispatch({ type: ActionTypes.ClearTempTodo });
    }
    handleModalClose();
  }

  if (!globalContext) return null;
  return (
    <Box className={classes.paper} display="flex" flexDirection="column">
      <h2>Edit Task</h2>
      <ProjectInputField
        editTodo={state.tempTodo}
        label="Project Name"
        inputName="editInput"
      />
      <UserSelect inputName="editSelect" />
      <Switch checked={false} setState={setSearch} />
      <Button
        variant="contained"
        onClick={handleSaveEdit}
        startIcon={<SaveIcon />}
      >
        Save Edit
      </Button>
    </Box>
  );
}
