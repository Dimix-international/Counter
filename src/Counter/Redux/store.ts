import {combineReducers, createStore, Store} from "redux";
import {counterReducer} from "./counter_reducer";
import {loadState, saveState} from "../utils/localStorage_util";

let rootReducer = combineReducers({
    counter: counterReducer
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export let store: Store<RootReducerType, any> = createStore(rootReducer, loadState());

store.subscribe(() => {
    saveState({
        counter: store.getState().counter
    })
})
// @ts-ignore
window.store = store