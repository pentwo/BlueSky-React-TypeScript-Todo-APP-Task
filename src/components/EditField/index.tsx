import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { useGlobalContext } from "../../state/context";
import ProjectInputField from "./ProjectInputField";
import UserSelect from "./UserSelect";
import Switch from "./Switch";
import { ActionTypes } from "../../state/actions";

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
  const globalContext = useGlobalContext();
  if (!globalContext) return null;

  const { state, dispatch } = globalContext;
  const { tempTodo } = state;

  function handleSaveEdit() {
    if (tempTodo) {
      dispatch({
        type: "SAVE_EDIT_TODO_AND_REFRESH_TODO",
        payload: tempTodo,
      });
      dispatch({ type: ActionTypes.ClearTempTodo });
    }
    handleModalClose();
  }

  return (
    <Box className={classes.paper} display="flex" flexDirection="column">
      <h2>Edit Task</h2>
      <ProjectInputField
        editTodo={state.tempTodo}
        label="Project Name"
        inputName="searchInput"
      />
      <UserSelect inputName="searchSelect" />
      <Switch checked={false} setState={setSearch} />
      <Button
        variant="contained"
        onClick={handleSaveEdit}
        startIcon={<SaveIcon />}
      >
        Save Edit
      </Button>
    </Box>
    // <Grid
    //   container
    //   justifyContent="space-between"
    //   alignItems="center"
    //   spacing={2}
    //   style={{ marginTop: 24 }}
    // >
    //   <Grid item>
    // <ProjectInputField
    //   editTodo={state.tempTodo}
    //   label="Project Name"
    //   inputName="searchInput"
    // />
    //   </Grid>
    //   <Grid item>
    //     <UserSelect inputName="searchSelect" />
    //   </Grid>
    //   <Grid item>
    //     <Switch checked={false} setState={setSearch} />
    //   </Grid>
    //   <Grid item>
    //     <Button
    //       variant="contained"
    //       onClick={handleSaveEdit}
    //       startIcon={<SaveIcon />}
    //     >
    //       Save Edit
    //     </Button>
    //   </Grid>
    // </Grid>
  );
}
