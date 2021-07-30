import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import "./ListItemLink.css";
import { ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: (props) => (props.small ? "column" : "row"),
    maxWidth: (props) => (props.small ? "64px" : "100%"),
  },
  avatar: {
    minWidth: (props) => (props.small ? "40px" : "64px"),
  },
  small: {
    whiteSpace: "nowrap",
    fontSize: ".7rem",
  },
}));

const ListItemLink = (props) => {
  const { icon, primary, to, image } = props;
  const classes = useStyles(props);
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );
  return (
    <ListItem classes={{ root: classes.root }} button component={CustomLink}>
      <ListItemAvatar classes={{ root: classes.avatar }}>
        <Avatar alt={primary} src={image}>
          {!image && icon}
        </Avatar>
      </ListItemAvatar>
      <Content {...props} />
    </ListItem>
  );
};

function Content(props) {
  const classes = useStyles(props);
  const { primary, secondary, count, small } = props;
  if (small) {
    return (
      <ListItemText classes={{ primary: classes.small }} primary={primary} />
    );
  }
  return (
    <>
      <ListItemText primary={primary} secondary={secondary} />
      {!!count && <ListItemSecondaryAction>{count}</ListItemSecondaryAction>}
    </>
  );
}

ListItemLink.propTypes = {};

ListItemLink.defaultProps = {};

export default ListItemLink;
