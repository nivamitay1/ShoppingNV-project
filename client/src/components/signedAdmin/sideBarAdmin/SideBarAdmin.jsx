import React from "react";
import AddProductForm from "./addProductForm/AddProductForm";
import EditProductForm from "./editProductForm/EditProductForm";
import SearchAdmin from "./searchAdmin/SearchAdmin";
import Styles from "./sideBarAdmin.module.css";
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
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

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
    justifyContent: "flex-start",
    padding: "8 0px",
    ...theme.mixins.toolbar,
    position: "absolute",
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
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },

  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

export default function SideBarAdmin({ setToken }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen, addOrEdit } = useSelector((state) => state.sideBarReducer);

  const handleDrawerOpen = () => {
    dispatch({ type: "OPEN_ADD_PRODUCT" });
  };
  const handleDrawerClose = () => {
    dispatch({ type: "CLOSE" });
  };

  const logout = () => {
    setToken();
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
            <AddIcon fontSize="large" />
          </IconButton>
          <div className={Styles.logoDiv}>
            <img
              className={Styles.logoImg}
              src="https://res.cloudinary.com/dzwabkqxt/image/upload/v1624368076/ShoppingNV/instagram_profile_image_j74lto.jpg"
            />
          </div>
          <div>
            <SearchAdmin />
          </div>
        </Toolbar>
      </AppBar>

      {/* sideBar */}

      <Drawer
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
        <Divider />
        {addOrEdit === "add" ? <AddProductForm /> : <EditProductForm />}
      </Drawer>
    </div>
  );
}
