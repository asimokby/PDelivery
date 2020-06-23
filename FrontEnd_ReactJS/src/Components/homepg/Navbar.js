import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "../../Imgs/logo-1.png";
import { Link, NavLink } from "react-router-dom";
import DropDown from "./dropDown";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0, 2),
  },
  title: {
    flexGrow: 1,
  },
  buttons_: {
    // float: "right",
    // display: "inline-block",
    marginLeft: "auto",
    // verticalAlign: "top",
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const style = { textDecoration: "none" };
  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <Link to="/">
            <img className="img-fluid" src={logo} alt="background img"></img>
          </Link>
          <div className={classes.buttons_}>
            <NavLink style={style} to="/Search">
              <Button color="primary">Search</Button>
            </NavLink>

            {props.isAuthenticated ? (
              <a style={style} href={`/accounts/${props.username}`}>
                <Button color="primary">My Profile</Button>
              </a>
            ) : (
              ""
            )}

            {props.isAuthenticated ? (
              <NavLink style={style} to="/CommunityChat">
                <Button color="primary">Community Chat</Button>
              </NavLink>
            ) : (
                ""
              )}


            {!props.isAuthenticated ? (
              <NavLink style={style} to="/Login">
                <Button color="primary">Login</Button>
              </NavLink>
            ) : (
              ""
            )}
            {!props.isAuthenticated ? (
              <NavLink style={style} to="/SignUp">
                <Button color="primary">Sign up!</Button>
              </NavLink>
            ) : (
              ""
            )}
            {props.isAuthenticated ? (
              <NavLink style={style} to="/">
                <Button onClick={props.userSignedOut} color="primary">
                  Sign Out
                </Button>
              </NavLink>
            ) : (
              ""
            )}
          </div>
          {props.isAuthenticated ? <DropDown username={props.username} /> : ""}
        </Toolbar>
      </AppBar>
    </div>
  );
}
