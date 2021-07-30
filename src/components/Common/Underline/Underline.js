import React from "react";
import { rxcs } from "../../../util/Functions";
import "./Underline.css";

const Underline = (props) => {
  const { children, dark } = props;
  const className = rxcs({ dark });
  return <strong className={className}>{children}</strong>;
};

Underline.defaultProps = {};
export default Underline;
