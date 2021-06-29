export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "FIRST_STEP":
      return (state = action.user);
    case "SECOND_STEP":
      state.city = action.user.city;
      state.street = action.user.street;
      return state;
    default:
      return state;
  }
};

export const sideBarReducer = (
  state = { isOpen: true, addOrEdit: "add", product: {} },
  action
) => {
  switch (action.type) {
    case "OPEN_ADD_PRODUCT":
      return (state = { isOpen: true, addOrEdit: "add" });

    case "OPEN_EDIT_PRODUCT":
      return (state = {
        isOpen: true,
        addOrEdit: "edit",
        product: action.product,
      });

    case "INITIALIZE_SIDEBAR":
      return (state = { isOpen: true, addOrEdit: "add", product: {} });

    case "OPEN":
      return (state = { isOpen: true });

    case "CLOSE":
      return (state = { isOpen: false, addOrEdit: "add" });

    default:
      return state;
  }
};

export const categoryReducer = (state = null, action) => {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      return (state = action.currentCategory);

    default:
      return state;
  }
};

export const productsListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCTS_ֹֹLIST":
      return (state = action.productsList);

    case "ADMIN_ADD_PRODUCT":
      if (
        // adding product only if his catgory = currentCategory or currentCategory = null
        action.newProduct.category_id === action.currentCategory ||
        action.currentCategory === null
      ) {
        return (state = [...state, action.newProduct]);
      }
      return state;

    case "ADMIN_UPDATE_PRODUCT":
      state.forEach((product, index) => {
        if (product.id === action.product_id) {
          state[index] = action.updatedProduct;
        }
      });
      return (state = [...state]);

    case "SEARCH_FILTER_PRODUCTS_ֹֹLIST":
      return (state = state.filter(
        (product) =>
          product.product_name
            .toLowerCase()
            .indexOf(action.searchValue.toLowerCase()) > -1
      ));

    default:
      return state;
  }
};

export const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case "OPEN_LOADER":
      return (state = true);
    case "CLOSE_LOADER":
      return (state = false);
    default:
      return state;
  }
};

export const cartReducer = (state = { cart_items: [] }, action) => {
  switch (action.type) {
    case "SET_CART":
      return (state = action.cart);

    case "ADD_ITEM_TO_CART":
      state.cartTotalPrice =
        state.cartTotalPrice + Number(action.newCartItem.total_price);
      state.cart_items = [...state.cart_items, action.newCartItem];
      return (state = state);

    case "DELETE_ITEM_FROM_CART":
      state.cartTotalPrice =
        state.cartTotalPrice - Number(action.cartItem.total_price);

      return {
        ...state,
        cart_items: state.cart_items.filter(
          (item, index) => item.id !== action.cartItem.id
        ),
      };
    case "UPDATE_ITEM_QUANTITY":
      const findItem = state.cart_items.find(
        (cart_item) => cart_item.id === action.cartItem.id
      );
      state.cartTotalPrice =
        state.cartTotalPrice -
        Number(findItem.total_price) +
        Number(action.cartItem.newTotalPrice);

      findItem.quantity = action.cartItem.newQuantity;
      findItem.total_price = action.cartItem.newTotalPrice;
      return {
        ...state,
        cart_items: [...state.cart_items],
      };
    case "UPDATE_ITEM_FROM_CART":
      state.forEach((product, index) => {
        if (product.id === action.product_id) {
          state[index] = action.updatedProduct;
        }
      });
      return (state = [...state]);

    case "CLEAR_CART":
      state.cartTotalPrice = 0;
      return { ...state, cart_items: [] };

    case "FILTER_CART_ITEMS_ֹֹLIST":
      return (state = state.filter(
        (product) =>
          product.product_name
            .toLowerCase()
            .indexOf(action.searchValue.toLowerCase()) > -1
      ));

    default:
      return state;
  }
};

export const cartReviewReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH_FILTER_CART_ֹֹLIST":
      return (state = action.searchValue);

    default:
      return state;
  }
};
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_ORDER":
      return (state = action.order);

    default:
      return state;
  }
};
