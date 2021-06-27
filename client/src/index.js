import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers } from "redux";
import {
  userReducer,
  sideBarReducer,
  categoryReducer,
  productsListReducer,
  loaderReducer,
  cartReducer,
  cartReviewReducer,
  orderReducer,
} from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  combineReducers({
    userReducer: userReducer,
    sideBarReducer: sideBarReducer,
    categoryReducer: categoryReducer,
    productsListReducer: productsListReducer,
    loaderReducer: loaderReducer,
    cartReducer: cartReducer,
    cartReviewReducer: cartReviewReducer,
    orderReducer: orderReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
