import React from "react";
import Search from "./search/Search";
import Cart from "./cart/Cart";
import ClearCartBtn from "./ClearCartBtn";
import Styles from "./sideBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import { Button, IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = "27vw";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    left: "33%",
    padding: "8px",
    ...theme.mixins.toolbar,
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      left: "30%",
    },
  },
  appBar: {
    width: "100vw",
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "1px solid #e5e5e5",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("xl")]: {
      marginLeft: "18vw",
      width: `calc(100vw - ${"18vw"})`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "34vw",
      width: `calc(100vw - ${"34vw"})`,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "40vw",
      width: `calc(100vw - ${"40vw"})`,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "80vw",
      width: `calc(100vw - ${"80vw"})`,
    },
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },

  drawerPaper: {
    position: "absulote",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("xl")]: {
      width: "18vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "34vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
    },
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

export default function SideBar({ setToken }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen } = useSelector((state) => state.sideBarReducer);

  const handleDrawerOpen = () => {
    dispatch({ type: "OPEN" });
  };
  const handleDrawerClose = () => {
    dispatch({ type: "CLOSE" });
  };

  const logout = () => {
    setToken();
    dispatch({ type: "INITIALIZE_SIDEBAR" });
    localStorage.setItem("ShoppingNVUser", null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="default"
        position="relative"
        className={clsx(classes.appBar, isOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              isOpen && classes.menuButtonHidden
            )}
          >
            <ShoppingCartOutlined fontSize="large" />
          </IconButton>

          <div className={Styles.logoDiv}>
            <img
              className={Styles.logoImg}
              src="https://res.cloudinary.com/dzwabkqxt/image/upload/v1624368076/ShoppingNV/instagram_profile_image_j74lto.jpg"
            />
          </div>
          <div>
            <Search />
          </div>
        </Toolbar>
      </AppBar>

      {/* sideBar */}

      <Drawer
        variant="persistent"
        anchor="left"
        classes={{
          paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
        }}
        open={isOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={classes.logoutBtn}>
          <Button
            variant="contained"
            color="secondary"
            onClick={logout}
            style={{ textTransform: "none" }}
          >
            Logout
            <ExitToAppIcon />
          </Button>
        </div>
        <div>
          <ClearCartBtn />
        </div>
        <Divider />
        <Cart />
      </Drawer>
    </div>
  );
}
