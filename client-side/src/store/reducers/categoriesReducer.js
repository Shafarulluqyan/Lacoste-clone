const initialState = { categories: [] };

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "categories/fetchSuccess":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}

export default categoriesReducer;
