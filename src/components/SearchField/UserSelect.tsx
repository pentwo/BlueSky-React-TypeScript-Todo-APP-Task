import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { TempTodo, User } from "../../state/state";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { ActionTypes } from "../../state/actions";
import { useGlobalContext } from "../../state/context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 240,
      marginBottom: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface UserSelect {
  inputName: string;
  // editTodo: EditTodo;
  setState: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function UserSelect({ inputName, setState }: UserSelect) {
  const classes = useStyles();
  const [select, setSelect] = useState<string>("");
  const globalContext = useGlobalContext();

  const { state, dispatch } = globalContext;

  useEffect(() => {
    if (state.TempTodo) {
      setSelect(state.TempTodo.userId);
    }
  }, [state.TempTodo, select]);

  if (!globalContext) return null;

  function handleChange(
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const value = e.target.value as string;

    setSelect(value);

    setState((pre) => {
      return { ...pre, user: value };
    });
    if (state.TempTodo) {
      dispatch({
        type: ActionTypes.EditTodo,
        payload: { ...state.TempTodo, userId: value },
      });
    }
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>User</InputLabel>
      <Select
        label="User"
        name={inputName}
        value={select}
        onChange={handleChange}
      >
        {state.users.map((user) => {
          return (
            <MenuItem
              key={`User-${user.id}`}
              value={user.id}
            >{`${user.firstName} ${user.lastName}`}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
