import {
  PRODUCT_BY_ID_FETCH_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
} from "../actions/actionType";

const initialState = { products: [], productById: null };

function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_FETCH_SUCCESS:
      return { ...state, products: action.payload };
    case PRODUCT_BY_ID_FETCH_SUCCESS:
      return { ...state, productById: action.payload };
    default:
      return state;
  }
}

export default productReducer;
