import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import "./CrumbList.css";
import { NavigateNext } from "@material-ui/icons";
import appRoutes from "../../../../app/Routes";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: "white",
    mixBlendMode: "exclusion",
  },
  next: {
    color: "white",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function CrumbList({ route, name, direct }) {
  const classes = useStyles();
  const home = appRoutes[0];
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
      separator={<NavigateNext className={classes.next} fontSize="small" />}
      classes={{ root: "CrumbList" }}
      aria-label="breadcrumb"
    >
      <Link color="inherit" href="/" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      {!!route?.type && (
        <Link
          underline="hover"
          color="inherit"
          href={`/browse/${route.type}`}
          className={classes.link}
        >
          {route?.data?.icon}[{route?.data?.label}]
        </Link>
      )}
      {!!name && (
        <Typography color="textPrimary" className={classes.link}>
          {name}
        </Typography>
      )}
    </Breadcrumbs>
  );
}
