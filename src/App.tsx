import React, { useState, useEffect, createRef } from "react";
import { useReducerAsync } from "use-reducer-async";
import { Box, Button, Container, Modal } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./App.css";
import EditField from "./components/EditField";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";

// New implementation
import { initialState } from "./state/state";
import { stateReducer, asyncActionHandlers } from "./state/reducer";
import { GlobalContext } from "./state/context";
import { ActionTypes, REFRESH_TODO, REFRESH_USER } from "./state/actions";

function App() {
  const [state, dispatch] = useReducerAsync(
    stateReducer,
    initialState,
    asyncActionHandlers
  );
  const [addTaskModalState, setAddTaskModalState] = useState(false);
  const [search, setSearch] = useState({
    name: "",
    user: "",
    isComplete: false,
  });

  const handleModalOpen = () => {
    setAddTaskModalState(true);
  };

  const handleModalClose = () => {
    setAddTaskModalState(false);
    dispatch({ type: ActionTypes.ClearTempTodo });
  };

  useEffect(() => {
    dispatch({ type: REFRESH_TODO });
    dispatch({ type: REFRESH_USER });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Container maxWidth="md">
          {/* <EditField setSearch={setSearch} /> */}
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
        {/* Add Task */}
        <Modal open={addTaskModalState} onClose={handleModalClose}>
          <AddTask handleModalClose={handleModalClose} />
        </Modal>
        {/* Edit Task */}
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
