import {
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
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

import { ActionTypes } from "../../state/actions";
import { useGlobalContext } from "../../state/context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Grid: {
      marginTop: 24,
      gap: theme.spacing(2),
    },
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

  const globalContext = useGlobalContext();

  const { state, dispatch } = globalContext;
  const { search } = state;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    dispatch({ type: ActionTypes.Search, payload: { ...search, name: value } });
  }

  function handleSelectChange(
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) {
    const value = e.target.value as string;

    dispatch({
      type: ActionTypes.Search,
      payload: { ...search, userId: value },
    });
  }
  function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = !e.target.checked;
    console.log("value: ", value);

    dispatch({
      type: ActionTypes.Search,
      payload: { ...search, isComplete: e.target.checked },
    });
  }

  return (
    <Grid
      className={classes.Grid}
      container
      justifyContent="space-between"
      alignItems="center"
      // spacing={2}
    >
      <Grid item>
        <TextField
          className={classes.TextField}
          label="Project Name"
          type="text"
          name="searchInput"
          variant="outlined"
          onChange={handleInputChange}
          value={search.name}
        />
      </Grid>
      <Grid item>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>User</InputLabel>
          <Select
            label="User"
            name="searchSelect"
            value={search.userId}
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
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
      </Grid>
      <Grid item>
        <label htmlFor="completed">Completed</label>

        <Switch
          icon={<RadioButtonUncheckedOutlinedIcon fontSize="small" />}
          checkedIcon={<CheckCircleOutlineOutlinedIcon fontSize="small" />}
          checked={search.isComplete}
          onChange={handleSwitchChange}
          name="checked"
          color="primary"
        />
      </Grid>
    </Grid>
  );
}
