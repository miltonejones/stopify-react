import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import "./CrumbList.css";
import { NavigateNext } from "@material-ui/icons";
import { rxcs } from "../../../../util/Functions";
import { MenuLink } from "../../../Layout/DashShell/LinkList/LinkList";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: "white",
    mixBlendMode: "exclusion",
  },
  next: {
    color: "white",
  },
  dark: {
    color: "black",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function MiniCrumbList({ route }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-nav-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const locale = useHistory();
  const navigateToObject = (d) => {
    locale.push(d);
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={handleProfileMenuOpen}
        color="inherit"
        size="small"
      >
        {route?.data?.icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem
          dense
          onClick={() => {
            navigateToObject(`/browse/${route.type}`);
            handleMenuClose();
          }}
        >
          {route?.data?.icon}
          {route?.data?.label}
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            navigateToObject("/");
            handleMenuClose();
          }}
        >
          <HomeIcon />
          Home
        </MenuItem>
      </Menu>
    </>
  );
}

export default function CrumbList({ route, name, icononly, dark, small }) {
  const classes = useStyles();
  // const home = appRoutes[0];
  // const handleClick = (event, haus) => {
  //   event.preventDefault();
  //   console.info("You clicked a breadcrumb.", {
  //     direct,
  //     route: haus ? home : route,
  //   });
  //   direct && route && direct(route);
  // };

  if (small) return <MiniCrumbList route={route} />;

  return (
    <Breadcrumbs
      separator={
        <NavigateNext
          className={rxcs({ [classes.next]: !dark, [classes.dark]: dark })}
          fontSize="small"
        />
      }
      classes={{ root: "CrumbList" }}
      aria-label="breadcrumb"
    >
      <MenuLink color="inherit" dest="/" className={classes.link}>
        <HomeIcon className={classes.icon} />
        <IconOnly hide={icononly}>Home</IconOnly>
      </MenuLink>

      {!!route?.type && (
        <MenuLink
          underline="hover"
          color="inherit"
          dest={`/browse/${route.type}`}
          className={classes.link}
        >
          {route?.data?.icon}
          <IconOnly hide={icononly}>{route?.data?.label}</IconOnly>
        </MenuLink>
      )}

      {!!name && (
        <Typography color="textPrimary" className={classes.link}>
          {name}
        </Typography>
      )}
    </Breadcrumbs>
  );
}

function IconOnly({ hide, children }) {
  if (hide) return <i />;
  return <>{children}</>;
}
