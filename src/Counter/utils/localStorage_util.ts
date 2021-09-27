import {RootReducerType} from "../Redux/store";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('counter-state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
export const saveState = (state:RootReducerType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('counter-state', serializedState);
    } catch {
        // ignore write errors
    }
};