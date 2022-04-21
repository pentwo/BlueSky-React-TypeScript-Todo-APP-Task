import React, { Dispatch, SetStateAction } from "react";
import { Grid } from "@material-ui/core";

import { useGlobalContext } from "../../state/context";
import ProjectInputField from "./ProjectInputField";
import UserSelect from "./UserSelect";
import Switch from "./Switch";

interface SearchFieldProps {
  setSearch: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function SearchField({ setSearch }: SearchFieldProps) {
  const globalContext = useGlobalContext();
  if (!globalContext) return null;

  const { state, dispatch } = globalContext;
  const { todos, users } = state;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      style={{ marginTop: 24 }}
    >
      <Grid item>
        <ProjectInputField
          editTodo={state.TempTodo}
          label="Project Name"
          setState={setSearch}
          inputName="searchInput"
        />
      </Grid>
      <Grid item>
        <UserSelect setState={setSearch} inputName="searchSelect" />
      </Grid>
      <Grid item>
        <Switch checked={false} setState={setSearch} />
      </Grid>
    </Grid>
  );
}
