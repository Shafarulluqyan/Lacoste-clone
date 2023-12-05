const initialState = { categories: [], categoryById: {} };

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "categories/fetchSuccess":
      return { ...state, categories: action.payload };
    case "categoryById/fetchSuccess":
      return { ...state, categoryById: action.payload };
    default:
      return state;
  }
}

export default categoriesReducer;
