import React from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "./DynamicGrid.css";

const DynamicGrid = (props) => {
  const theme = useTheme();
  const screenIsBiggerThanSmSize = useMediaQuery(theme.breakpoints.up("sm"));
  const sm = screenIsBiggerThanSmSize ? props.size : 12;
  return (
    <Grid item sm={sm} xs={sm}>
      {props.children}
    </Grid>
  );
};

DynamicGrid.defaultProps = {};
export default DynamicGrid;
