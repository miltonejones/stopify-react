import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import "./CrumbList.css";
import { NavigateNext } from "@material-ui/icons";
import { rxcs } from "../../../../util/Functions";
import { MenuLink } from "../../../Layout/DashShell/LinkList/LinkList";

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

export default function CrumbList({ route, name, icononly, dark }) {
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

function IconOnly({hide, children}) {
  if (hide) return <i/>
return <>{children}</>
}