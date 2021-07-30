import React from "react";
import { rxcs } from "../../../../util/Functions";
import "./Spinner.css";

const Spinner = ({ children, on }) => {
  const className = rxcs({ Spinner: !0, on });
  return <div className={className}>{children}</div>;
};

Spinner.defaultProps = {};
export default Spinner;
