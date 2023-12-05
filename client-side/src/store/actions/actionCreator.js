import {
  CATEGORIES_FETCH_SUCCESS,
  PRODUCT_BY_ID_FETCH_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
} from "./actionType";

export function productsFetchSucess(payload) {
  return { type: PRODUCT_FETCH_SUCCESS, payload: payload };
}
export function productByIdFetchSucess(payload) {
  return { type: PRODUCT_BY_ID_FETCH_SUCCESS, payload: payload };
}
export function categoriesFetchSucess(payload) {
  return { type: CATEGORIES_FETCH_SUCCESS, payload: payload };
}

export function fetchProducts() {
  return async function (dispatch) {
    try {
      const res = await fetch("http://localhost:4002/products", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          // access_token: localStorage.access_token,
        },
      });
      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(productsFetchSucess(data));
      // console.log(data, "ini di actioncreator");
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };
}
export function fetchProductById(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(`http://localhost:4002/products/${id}`);
      const data = await res.json();
      if (!res.ok) throw data;
      // console.log(data, "<<<hayo lah");
      dispatch(productByIdFetchSucess(data));
      // console.log(data, "product detail");
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };
}
export function fetchCategories() {
  return async function (dispatch) {
    try {
      const res = await fetch("http://localhost:4002/categories");
      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(categoriesFetchSucess(data.category));
      // console.log(data, "ini category");
    } catch (err) {
      console.log("Error:", err);
    }
  };
}
