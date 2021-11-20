import {ACTIONS_TYPE, ActionCounterType} from "./actions";

export type OptionsOfWorkType = {
    id: number,
    title: string,
};

const initialState = {
    startValue: 0,
    finishValue: 5,
    currentValue: 0,
    modeModal: false,
    autoPlayOption: false,
    speedAutoplayOption: 1,
    optionsOfWork: [
        {id: 1, title: 'increase'},
        {id: 2, title: 'decrease'}
    ] as Array<OptionsOfWorkType>,
    conditionOfWork: 'increase'
};

export type InitialStateType = typeof initialState;
export const counterReducer = (state: InitialStateType = initialState, action: ActionCounterType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_START_VALUE:
        case ACTIONS_TYPE.SET_FINISH_VALUE:
        case ACTIONS_TYPE.SET_CURRENT_VALUE:
        case ACTIONS_TYPE.SET_AUTOPLAY_OPTION:
        case ACTIONS_TYPE.SET_SPEED_AUTOPLAY_OPTION:
        case ACTIONS_TYPE.SET_CONDITION_OF_WORK: {
            return {
                ...state,
                ...action
            }
        }
        case ACTIONS_TYPE.GENERAL_SETTINGS: {
            if (action.payload.conditionOfWork === 'increase') {
                return {
                    ...state,
                    ...action.payload,
                    currentValue: action.payload.startValue
                }
            } else {
                return {
                    ...state,
                    ...action.payload,
                    currentValue: action.payload.finishValue
                }
            }
        }
        case ACTIONS_TYPE.INCREASE_CURRENT_VALUE:
            return {
                ...state,
                currentValue: state.currentValue + 1
            }
        case ACTIONS_TYPE.DECREASE_CURRENT_VALUE:
            return {
                ...state,
                currentValue: state.currentValue - 1
            }
        default:
            return state
    }
}