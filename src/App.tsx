import React, { useState, useEffect, createRef } from "react";
import { useReducerAsync } from "use-reducer-async";
import { Box, Button, Container, Modal } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./App.css";
import SearchField from "./components/SearchField";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";

// New implementation
import { initialState } from "./state/state";
import { stateReducer, asyncActionHandlers } from "./state/reducer";
import { GlobalContext } from "./state/context";
import { REFRESH_TODO, REFRESH_USER } from "./state/actions";

function App() {
  const [state, dispatch] = useReducerAsync(
    stateReducer,
    initialState,
    asyncActionHandlers
  );
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState({
    name: "",
    user: "",
    isComplete: false,
  });

  const myModalRef = createRef();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch({ type: REFRESH_TODO });
    dispatch({ type: REFRESH_USER });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Container maxWidth="md">
          <SearchField setSearch={setSearch} />
          <TodoList />
          <Box display="flex" flexDirection="row-reverse">
            <Button
              variant="contained"
              onClick={handleModalOpen}
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Task
            </Button>
          </Box>
        </Container>
        <Modal open={open} onClose={handleModalClose}>
          <AddTask handleModalClose={handleModalClose} />
        </Modal>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
