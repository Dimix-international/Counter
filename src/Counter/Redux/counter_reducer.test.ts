import {InitialStateType} from "./counter_reducer";

let initialState:InitialStateType;
beforeEach(() => {
    initialState = {
        startValue:0,
        finishValue:5,
        currentValue:0,
        modeModal:false,
        autoPlayOption:false,
        autoplayMode:false,
        optionsOfWork: [
            {id: 1, title: 'increase'},
            {id: 2, title: 'decrease'}
        ],
        conditionOfWork:'increase'
    }
})


