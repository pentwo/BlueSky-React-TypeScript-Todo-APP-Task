import React, { useState, useEffect } from "react";
import { useReducerAsync } from "use-reducer-async";
import { Box, Button, Container, Modal } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import "./App.css";
import SearchFields from "./components/SearchFields";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";

// New implementation
import { initialState } from "./state/state";
import { stateReducer, asyncActionHandlers } from "./state/reducer";
import { GlobalContext } from "./state/context";
import { ActionTypes, REFRESH_TODO, REFRESH_USER } from "./state/actions";

function App() {
  // Context provider and reducers
  const [state, dispatch] = useReducerAsync(
    stateReducer,
    initialState,
    asyncActionHandlers
  );

  // MODAL controls
  const [addTaskModalState, setAddTaskModalState] = useState(false);

  const handleModalOpen = () => {
    setAddTaskModalState(true);
  };

  const handleModalClose = () => {
    setAddTaskModalState(false);
    dispatch({ type: ActionTypes.ClearTempTodo });
  };

  // Load Tasks and users from Mirage Database
  useEffect(() => {
    dispatch({ type: REFRESH_TODO });
    dispatch({ type: REFRESH_USER });
  }, [dispatch]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Container maxWidth="md">
          {/* Search fields */}
          <SearchFields />
          {/* Task List */}
          <TodoList />
          {/* Add Task BUTTON */}
          <Box display="flex" flexDirection="row-reverse">
            <Button
              variant="contained"
              onClick={handleModalOpen}
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Task
            </Button>
          </Box>
          {/* Add Task MODAL*/}
          <Modal open={addTaskModalState} onClose={handleModalClose}>
            <AddTask handleModalClose={handleModalClose} />
          </Modal>
        </Container>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
