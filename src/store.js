import { createStore } from "redux";
import updateStore from "./reducer";
const store = createStore(updateStore);
export default store;