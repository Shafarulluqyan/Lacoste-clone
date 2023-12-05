import {
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_BY_ID_FETCH_SUCCESS,
  PRODUCT_BY_ID_FETCH_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
} from "./actionType";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./actionType";
import Swal from "sweetalert2";

export function productsFetchSucess(payload) {
  return { type: PRODUCT_FETCH_SUCCESS, payload: payload };
}
export function categoriesFetchSucess(payload) {
  return { type: CATEGORIES_FETCH_SUCCESS, payload: payload };
}

export function productByIdFetchSuccess(payload) {
  return { type: PRODUCT_BY_ID_FETCH_SUCCESS, payload: payload };
}

export function categoryByIdFetchSuccess(payload) {
  return { type: CATEGORY_BY_ID_FETCH_SUCCESS, payload: payload };
}

export function loginSuccess(token) {
  return { type: LOGIN_SUCCESS, payload: token };
}

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, payload: error };
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const response = await fetch("https://api.luqyanazka.site/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw data;
      }

      const data = await response.json();
      const token = data.access_token;
      localStorage.setItem("access_token", token);
      dispatch(loginSuccess(token));
    } catch (error) {
      console.log(error);
      dispatch(loginFailure("Login failed"));
    }
  };
}

export function fetchProducts() {
  // console.log(pay+load, "<<<<payload ");
  return async function (dispatch) {
    try {
      const res = await fetch("https://api.luqyanazka.site/products", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(productsFetchSucess(data));
      // console.log(data, "<<, data do craetor");
    } catch (err) {
      console.log("Error:", err);
    }
  };
}

export function fetchProductById(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.luqyanazka.site/products/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw data;
      }

      const data = await response.json();
      dispatch(productByIdFetchSuccess(data));
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };
}

export function fetchCategories() {
  return async function (dispatch) {
    try {
      // console.log(localStorage.access_token, "<<<<token");
      const res = await fetch("https://api.luqyanazka.site/categories", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(categoriesFetchSucess(data));
      // console.log(data, "<<, data category dicraetor");
    } catch (err) {
      console.log("Error:", err);
    }
  };
}

export function fetchCategoryById(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.luqyanazka.site/categories/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw data;
      }

      const data = await response.json();
      dispatch(categoryByIdFetchSuccess(data));
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };
}

export function postProduct(payload) {
  return async () => {
    try {
      const res = await fetch("https://api.luqyanazka.site/products", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();

      if (!res.ok) throw data;
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: `Success added new product!!!`,
      });
      console.log(data, "<><><‰>< ");
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };
}

export function postNewAdmin(payload) {
  return async () => {
    try {
      const res = await fetch("https://api.luqyanazka.site/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();

      if (!res.ok) throw data;

      // Show a success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered as an admin.",
      });
    } catch (err) {
      console.log("Error:", err.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: `An error occurred while registering. ${err.message}.`,
      });
      throw err;
    }
  };
}

export function postCategory(payload) {
  return async () => {
    try {
      const res = await fetch("https://api.luqyanazka.site/categories", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();

      if (!res.ok) throw data;
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: `Success added new category!!!`,
      });
      // console.log(data, "<><><>< ");
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  };
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure want to delete this stuff?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        const res = await fetch("https://api.luqyanazka.site/products/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
        });

        if (!res.ok) {
          const resData = await res.json();
          throw resData;
        }
        dispatch(fetchProducts());
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `Success delete product!!!`,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure want to delete this stuff?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        const res = await fetch(
          "https://api.luqyanazka.site/categories/" + id,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              access_token: localStorage.access_token,
            },
          }
        );

        if (!res.ok) {
          const resData = await res.json();
          throw resData;
        }
        dispatch(fetchCategories());
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `Success delete category!!!`,
        });
      }
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };
};

export function editProduct(ProductId, payload) {
  return async (dispatch) => {
    try {
      console.log(payload);

      const response = await fetch(
        `https://api.luqyanazka.site/products/${+ProductId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function editCategory(categoryId, payload) {
  return async (dispatch) => {
    try {
      console.log(payload);

      const response = await fetch(
        `https://api.luqyanazka.site/categories/${+categoryId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseJSON = await response.json();
      if (!response.ok) throw responseJSON.message;
      return await dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const logout = () => {
  Swal.fire({
    title: "Logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("access_token");
    }
  });
};
