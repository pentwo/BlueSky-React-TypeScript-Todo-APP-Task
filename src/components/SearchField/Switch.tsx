import React, {
  useEffect,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import Switch from "@material-ui/core/Switch";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Box, FormControlLabel } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

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
  setState: Dispatch<
    SetStateAction<{ name: string; user: string; isComplete: boolean }>
  >;
}

export default function Switches({ checked, setState }: SwitchProp) {
  const classes = useStyles();
  const [checkState, setCheckState] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckState(!checkState);
    setState((pre) => {
      return { ...pre, isComplete: !pre.isComplete };
    });
  };

  useEffect(() => {
    setCheckState(checked);
  }, [checked]);

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
