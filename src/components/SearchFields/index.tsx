import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
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
    TextField: {
      minWidth: 360,
      marginBottom: theme.spacing(2),
    },
  })
);

export default function SearchFields() {
  const classes = useStyles();
  const [select, setSelect] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const globalContext = useGlobalContext();

  const { state, dispatch } = globalContext;
  const { search } = state;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setValue(value);

    dispatch({ type: ActionTypes.Search, payload: { ...search, name: value } });
  }

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      style={{ marginTop: 24 }}
    >
      <Grid item>
        <TextField
          className={classes.TextField}
          label="Project Name"
          type="text"
          name="searchInput"
          variant="outlined"
          onChange={handleChange}
          value={value}
        />
      </Grid>
      <Grid item>
        {/* <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>User</InputLabel>
      <Select
        label="User"
        name='searchSelect'
        value={select}
        // onChange={handleChange}
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
    </FormControl> */}
      </Grid>
      <Grid item>{/* <Switch checked={false} setState={setSearch} /> */}</Grid>
    </Grid>
  );
}
