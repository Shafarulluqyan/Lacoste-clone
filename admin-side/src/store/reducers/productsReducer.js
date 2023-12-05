const initialState = { products: [], productById: {} };

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "products/fetchSuccess":
      return { ...state, products: action.payload };
    case "productById/fetchSuccess":
      return { ...state, productById: action.payload };
    default:
      return state;
  }
}

export default productsReducer;
