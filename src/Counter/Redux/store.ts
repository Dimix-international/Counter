import {combineReducers, createStore, Store} from "redux";
import {counterReducer} from "./counter_reducer";

let rootReducer = combineReducers({
    counter: counterReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export let store: Store<RootReducerType, any> = createStore(rootReducer);