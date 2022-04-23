import React, {
  useEffect,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

import { useGlobalContext } from "../../state/context";
import { ActionTypes } from "../../state/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Switch: {},
    Box: {
      marginBottom: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
interface SwitchProp {
  checked: boolean;
  setState?: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function Switches({ checked, setState }: SwitchProp) {
  const classes = useStyles();
  const [checkState, setCheckState] = useState(false);

  const globalContext = useGlobalContext();
  const { state, dispatch } = globalContext;

  useEffect(() => {
    setCheckState(checked);
  }, [checked]);

  useEffect(() => {
    if (state.tempTodo) {
      setCheckState(state.tempTodo.isComplete);
    }
  }, [state.tempTodo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckState(!checkState);

    if (setState) {
      setState((pre) => {
        return { ...pre, isComplete: !checkState };
      });
    }

    if (state.tempTodo) {
      dispatch({
        type: ActionTypes.EditTodo,
        payload: { ...state.tempTodo, isComplete: !checkState },
      });
    }
  };

  if (!globalContext) return null;
  return (
    <Box className={classes.Box}>
      <label htmlFor="completed">Completed</label>

      <Switch
        className={classes.Switch}
        icon={<RadioButtonUncheckedOutlinedIcon fontSize="small" />}
        checkedIcon={<CheckCircleOutlineOutlinedIcon fontSize="small" />}
        checked={checkState}
        onChange={handleChange}
        name="checked"
        color="primary"
      />
    </Box>
  );
}
