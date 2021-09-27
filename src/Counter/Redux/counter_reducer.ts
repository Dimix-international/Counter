import {ACTIONS_TYPE, GlobalCounterType} from "./actions";

export type OptionsOfWorkType = {
    id:number,
    title:string
}
export type InitialStateType = {
    startValue:number
    finishValue:number
    currentValue:number
    modeModal:boolean
    autoPlayOption:boolean
    optionsOfWork:Array<OptionsOfWorkType>
    conditionOfWork:string
}
const initialState:InitialStateType = {
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
}
export const counterReducer = (state:InitialStateType = initialState, action:GlobalCounterType):InitialStateType => {
    switch (action.type){
        case ACTIONS_TYPE.SET_START_VALUE: {
            return {
                ...state,
                startValue:action.startValue
            }
        }
        case ACTIONS_TYPE.SET_FINISH_VALUE: {
            return {
                ...state,
                finishValue:action.finishValue
            }
        }
        case ACTIONS_TYPE.SET_CURRENT_VALUE:
            return{
                ...state,
                currentValue:action.currentValue
            }
        case ACTIONS_TYPE.SET_AUTOPLAY_OPTION:
            return {
                ...state,
                autoPlayOption: action.autoPlayOption
            }
        case ACTIONS_TYPE.SET_CONDITION_OF_WORK:
            return {
                ...state,
                conditionOfWork:action.conditionOfWork
            }
        case ACTIONS_TYPE.GENERAL_SETTINGS: {
            if(action.payload.conditionOfWork === 'increase') {
                return {
                    ...state,
                    ...action.payload,
                    currentValue: action.payload.startValue
                }
            } else{
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