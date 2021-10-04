import {combineReducers, createStore} from "redux";
import {counterReducer} from "./Redux/counter_reducer";
import {RootReducerType} from "./Redux/store";
import {Provider} from "react-redux";

let rootReducer = combineReducers({
    counter: counterReducer
});

export type OptionsOfWorkType = {
    id: number,
    title: string
}

const initialState = {
    counter: {
        startValue: 5,
        finishValue: 15,
        currentValue: 0,
        modeModal: false,
        autoPlayOption: false,
        speedAutoplayOption: 1,
        optionsOfWork: [
            {id: 1, title: 'increase'},
            {id: 2, title: 'decrease'}
        ] as Array<OptionsOfWorkType>,
        conditionOfWork: 'increase'
    }
}

export const storeStoryBook = createStore(rootReducer, initialState as RootReducerType);
export const ReduxProviderDecorator = (storyFn: any) => {
    return <Provider store={storeStoryBook}>{storyFn()}</Provider>
}
