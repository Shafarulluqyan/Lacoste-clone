import { applyMiddleware, createStore } from "redux";
import categoriesReducer from "../store/reducers/categoriesReducer";
import { combineReducers } from "redux";
import productReducer from "./reducers/productsReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  productReducer: productReducer,
});
let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
