import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import axios from "axios";
import { domain } from "../../../config";
import Styles from "./categories.module.css";
export default function Categories({ setRender }) {
  let dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.categoryReducer);
  const isSideBar = useSelector((state) => state.sideBarReducer.isOpen);
  const [categories, setCategories] = useState([]);
  const _isMounted = useRef(true); // Initial value _isMounted = true

  useEffect(() => {
    async function getCategories() {
      if (_isMounted.current) {
        const res = await axios.get(`${domain}/products/categories`);
        setCategories(res.data.categories);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    // Cleanup useEffect
    return () => {
      _isMounted.current = false;
      setCategories([]);
    };
  }, []);

  const changeCurrentCategory = (category_id) => {
    dispatch({ type: "CHANGE_CATEGORY", currentCategory: category_id });
    setRender(Math.random() * 1000);
  };

  return (
    <div
      id="MainMenuContainer"
      className={clsx(Styles.MainMenu, {
        [Styles.MainMenuOpenSideBar]: isSideBar,
      })}
    >
      <div id="MainMenuDivContainer" className={Styles.nav}>
        <ul id="DropDownMenu" className={Styles.DropDownMenu}>
          <li className={Styles.Level0}>
            <div className={Styles.Title}>
              <span>
                <button
                  type="button"
                  onClick={() => changeCurrentCategory(null)}
                  className={clsx(Styles.categoryBtn, {
                    [Styles.selected]: !currentCategory,
                  })}
                >
                  All Products
                </button>
              </span>
            </div>
          </li>
          {categories.map((category) => {
            return (
              <li className={Styles.Level0} key={category.id}>
                <div className={Styles.Title}>
                  <span>
                    <button
                      type="button"
                      onClick={() => changeCurrentCategory(category.id)}
                      className={clsx(Styles.categoryBtn, {
                        [Styles.selected]: currentCategory === category.id,
                      })}
                    >
                      {category.category_name}
                    </button>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
