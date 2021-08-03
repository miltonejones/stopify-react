import { Icon, IconButton } from "@material-ui/core";
import React from "react";
import HtmlTooltip from "../HtmlTooltip/HtmlTooltip";
import "./ToolTipButton.css";

const ToolTipButton = ({ title, click, disabled, icon, css }) => {
  return (
    <div className={css}>
      <HtmlTooltip title={title}>
        <IconButton
          classes={{ root: "icon-button-no-padding" }}
          onClick={click}
          color="inherit"
          size="small"
          disabled={disabled}
        >
          <Icon>{icon}</Icon>
        </IconButton>
      </HtmlTooltip>
    </div>
  );
};

ToolTipButton.defaultProps = {};

export default ToolTipButton;
