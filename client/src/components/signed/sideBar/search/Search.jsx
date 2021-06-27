import React, { useEffect, useState } from "react";
import SearchSuggestionsMenu from "./SearchSuggestionsMenu";
import { useDispatch } from "react-redux";
import axios from "axios";
import { domain } from "../../../../config";
import { fade, makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  searchBtn: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    zIndex: 1,
    display: "flex",
    border: "none",
    backgroundColor: "#b2d233",
    "&:hover": { backgroundColor: "#99b91a" },
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.shape.borderRadius,
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchBtn
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Search() {
  const classes = useStyles();
  let dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    let didCancel = false;

    async function getAllProducts() {
      const res = await axios.get(`${domain}/products`);
      if (!didCancel) {
        setAllProducts(res.data.products);
      }
    }
    getAllProducts();
  }, []);
  const handleFocus = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setMenuItems(
      allProducts.filter(
        (product) =>
          product.product_name
            .toLowerCase()
            .indexOf(e.target.value.toLowerCase()) > -1
      )
    );
  };
  return (
    <ClickAwayListener
      onClickAway={(e) => {
        setAnchorEl(null);
      }}
    >
      <div>
        <div className={classes.search}>
          <button
            className={classes.searchBtn}
            onClick={() =>
              dispatch({
                type: "SEARCH_FILTER_PRODUCTS_ֹֹLIST",
                searchValue: searchValue,
              })
            }
          >
            <SearchIcon />
          </button>
          <InputBase
            value={searchValue}
            onFocus={handleFocus}
            placeholder="Search…"
            onChange={handleChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div>
          <SearchSuggestionsMenu
            menuItems={menuItems}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            setSearchValue={setSearchValue}
          />
        </div>
      </div>
    </ClickAwayListener>
  );
}
