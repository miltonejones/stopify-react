import { Tooltip, withStyles } from "@material-ui/core";
import "./HtmlTooltip.css";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    width: "fit-content",
  },
}))(Tooltip);

HtmlTooltip.defaultProps = {
  title: "I am your tooltip!",
};

export default HtmlTooltip;
