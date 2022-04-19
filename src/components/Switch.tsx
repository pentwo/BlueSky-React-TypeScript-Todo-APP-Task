import React, { useEffect } from "react";
import Switch from "@material-ui/core/Switch";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 48,
      height: 20,
      padding: 0,
      display: "flex",
      margin: 2,
    },
    switchBase: {
      padding: 3,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(24px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 18,
      height: 18,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  })
)(Switch);

interface SwitchProps {
  checked: boolean;
}

export default function Switches({ checked }: SwitchProps) {
  // console.log("props: ", checked);
  const [state, setState] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(!state);
  };

  useEffect(() => {
    setState(checked);
  }, [checked]);

  return (
    <Box display="flex" alignItems="center">
      <label>Off</label>
      <Switch
        checked={state}
        onChange={handleChange}
        name="checked"
        color="primary"
      />
      <label>On</label>

      {/* </Switch> */}
    </Box>
  );
}
