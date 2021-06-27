import React from "react";
import { useDispatch } from "react-redux";
import Styles from "../sideBarAdmin.module.css";
import { Popper, List, ListItem } from "@material-ui/core";

export default function SearchSuggestionsMenuAdmin({
  menuItems,
  anchorEl,
  setSearchValue,
}) {
  let dispatch = useDispatch();
  const pickItem = (menuItem) => {
    dispatch({
      type: "SET_PRODUCTS_ֹֹLIST",
      productsList: [menuItem],
    });
    setSearchValue(menuItem.product_name);
  };
  return (
    <div>
      <Popper
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        className={Styles.searchList}
      >
        <List>
          {menuItems.map((menuItem) => {
            return (
              <ListItem
                key={menuItem.id}
                onClick={(e) => {
                  pickItem(menuItem);
                }}
                className={Styles.searchListItem}
              >
                {menuItem.product_name}
              </ListItem>
            );
          })}
        </List>
      </Popper>
    </div>
  );
}
