import React, { Dispatch, SetStateAction, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { User } from "../../types";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
  users: User[];
  inputName: string;

  setState: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function UserSelect({ users, inputName, setState }: UserSelect) {
  const classes = useStyles();
  const [select, setSelect] = useState<string>("");

  function handleChange(
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const value = e.target.value as string;
    // const { name as string, value as string }= e.target;
    // console.log("Select state changed: ", select);
    setSelect(value);
    console.log(`Select: ${e.target.name as string}`, value);
    setState((pre) => {
      return { ...pre, user: value };
    });
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
        {users.map((user) => {
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
