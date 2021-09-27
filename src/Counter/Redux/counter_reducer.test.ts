import {counterReducer, InitialStateType} from "./counter_reducer";
import {decreaseCurrentValueAC, increaseCurrentValueAC} from "./actions";

let startStateForIncrease:InitialStateType;
let startStateForDecrease:InitialStateType;
beforeEach(() => {
    startStateForIncrease = {
        startValue:0,
        finishValue:5,
        currentValue:0,
        modeModal:false,
        autoPlayOption:false,
        optionsOfWork: [
            {id: 1, title: 'increase'},
            {id: 2, title: 'decrease'}
        ],
        conditionOfWork:'increase'
    };
    startStateForDecrease = {
        startValue:0,
        finishValue:5,
        currentValue:5,
        modeModal:false,
        autoPlayOption:false,
        optionsOfWork: [
            {id: 1, title: 'increase'},
            {id: 2, title: 'decrease'}
        ],
        conditionOfWork:'increase'
    }
})

test('current value should be increase', () => {
    const endState = counterReducer(startStateForIncrease,increaseCurrentValueAC())

    expect(endState.currentValue).toBe(1);
    expect(startStateForIncrease.currentValue).toBe(0);
})
test('current value should be decrease', () => {
    const endState = counterReducer(startStateForDecrease,decreaseCurrentValueAC())

    expect(endState.currentValue).toBe(4);
    expect(startStateForDecrease.currentValue).toBe(5);
})

