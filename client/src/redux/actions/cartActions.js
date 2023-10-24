export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount
) => {
  return dispatch => {
    if (addToast) {
      addToast("Đã thêm sản phâm vào giỏ hàng", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount
      }
    });
  };
};
//decrement from cart
export const decrementQty = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Đã giảm số lượng sản phẩm", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//remove from cart
export const removeFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Đã xóa khỏi giỏ hàng", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//remove all from cart
export const removeAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Đã xóa tất cả sản phẩm", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

//clear all from cart
export const clearAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Đặt hàng thành công", {
        appearance: "success",
        autoDismiss: false,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item) => {
  if (item.stock) {
    return item.stock;
  }
};
