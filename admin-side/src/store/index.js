import { applyMiddleware, createStore } from "redux";
import categoriesReducer from "../store/reducers/categoriesReducer";
import { combineReducers } from "redux";
import productsReducer from "./reducers/productsReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
});
let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
