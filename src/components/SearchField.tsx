import {
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import Switch from "./Switch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 240,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function SearchField() {
  const classes = useStyles();
  const globalContext = useGlobalContext();
  if (!globalContext) return null;

  const { todos, setTodos, users } = globalContext;

  return (
    <Grid
      container
      justify="space-between"
      spacing={2}
      style={{ marginTop: 24 }}
    >
      <Grid item>
        <TextField
          label="Project Name"
          type="text"
          name="project"
          variant="outlined"
          // value="Watermellon Squad"
          // id=""
          style={{
            minWidth: 360,
          }}
        />
      </Grid>
      <Grid item>
        {/* <label htmlFor="user">User</label> */}
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={age}
            // onChange={handleChange}
            label="User"
          >
            {users.map((user) => {
              return (
                <MenuItem
                  key={`User-${user.id}`}
                  value={user.id}
                >{`${user.firstName} ${user.lastName}`}</MenuItem>
              );
            })}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <label htmlFor="completed">
          Completed
          <Switch checked={false} />
        </label>
      </Grid>
    </Grid>
  );
}
