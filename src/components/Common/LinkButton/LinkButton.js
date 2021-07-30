import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  LinkButton: {
    margin: 10,
    padding: 10,
  },
}));

const LinkButton = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.LinkButton} data-testid="test-for-LinkButton">
      <IconButton {...props}>
        <MoreHoriz />
      </IconButton>
    </div>
  );
};

LinkButton.defaultProps = {};
export default LinkButton;
