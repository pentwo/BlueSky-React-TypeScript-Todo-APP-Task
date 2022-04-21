import { makeStyles, Theme, createStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActionTypes } from "../../state/actions";
import { useGlobalContext } from "../../state/context";
import { TempTodo } from "../../state/state";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TextField: {
      minWidth: 360,
      marginBottom: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface ProjectInputField {
  label: string;
  editTodo?: TempTodo;
  inputName: string;
  setState?: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function ProjectInputField({
  label,
  inputName,
  editTodo,
  setState,
}: ProjectInputField) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const globalContext = useGlobalContext();
  const { state, dispatch } = globalContext;

  useEffect(() => {
    if (state.tempTodo) {
      setValue(state.tempTodo.name);
    }
  }, [state.tempTodo]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setValue(value);

    if (setState) {
      setState((pre) => {
        return { ...pre, name: value };
      });
    }

    if (state.tempTodo) {
      dispatch({
        type: ActionTypes.EditTodo,
        payload: { ...state.tempTodo, name: value },
      });
    }
  }

  if (!globalContext) return null;
  return (
    <TextField
      className={classes.TextField}
      label={label}
      type="text"
      name={inputName}
      variant="outlined"
      onChange={handleChange}
      value={value}
    />
  );
}
