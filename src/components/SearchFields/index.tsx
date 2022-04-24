import React from "react";
import {
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Theme,
} from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

import { ActionTypes } from "../../state/actions";
import { useGlobalContext } from "../../state/context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
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

  // Loading global context
  const globalContext = useGlobalContext();
  const { state, dispatch } = globalContext;
  const { search } = state;

  // Set input value to search state
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    dispatch({ type: ActionTypes.Search, payload: { ...search, name: value } });
  }
  // Set select value to search state
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
  // Set switch boolean value to search state
  function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: ActionTypes.Search,
      payload: { ...search, isComplete: e.target.checked },
    });
  }

  if (!globalContext) return null;
  return (
    <Paper className={classes.Paper} elevation={4}>
      <h2>Search</h2>
      <Grid
        className={classes.Grid}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Task name search input */}
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

        {/* User Selector */}
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

        {/* Only enable when Input text or Select user have value*/}
        <Grid item>
          <label htmlFor="completed">Completed</label>
          <Switch
            disabled={search.name === "" && search.userId === ""}
            icon={<RadioButtonUncheckedOutlinedIcon fontSize="small" />}
            checkedIcon={<CheckCircleOutlineOutlinedIcon fontSize="small" />}
            checked={search.isComplete}
            onChange={handleSwitchChange}
            name="completed"
            color="primary"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
