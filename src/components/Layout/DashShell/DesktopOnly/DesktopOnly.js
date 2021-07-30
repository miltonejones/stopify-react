import { useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import "./DesktopOnly.css";

const DesktopOnly = (props) => {
  const theme = useTheme();
  const screenIsBiggerThanSmSize = useMediaQuery(theme.breakpoints.up("md"));
  if (!screenIsBiggerThanSmSize) return <i />;
  return <>{props.children}</>;
};

DesktopOnly.defaultProps = {};
export default DesktopOnly;
