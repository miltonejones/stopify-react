import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  LinkButton: {
    margin: 10,
    padding: 10,
  },
}));

const LinkButton = () => {
  const classes = useStyles();
  return (
    <div className={classes.LinkButton} data-testid="test-for-LinkButton">
      <Button variant="contained" color="primary">
        Test
      </Button>
    </div>
  );
};

LinkButton.defaultProps = {};
export default LinkButton;
