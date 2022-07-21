import {createStore} from "@reduxjs/toolkit";
import {rootReducer} from "./AppState";

const configureStore = () => {
  return createStore(rootReducer, {});
}

export default configureStore;