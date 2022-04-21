import { makeStyles, Theme, createStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { Dispatch, SetStateAction } from "react";

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
  inputName: string;
  setState: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function ProjectInputField({
  label,
  inputName,
  setState,
}: ProjectInputField) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    console.log(`TextField: ${name}`, e.target.value);
    setState((pre) => {
      return { ...pre, name: value };
    });
  }

  const classes = useStyles();
  return (
    <TextField
      className={classes.TextField}
      label={label}
      type="text"
      name={inputName}
      variant="outlined"
      onChange={handleChange}
    />
  );
}
