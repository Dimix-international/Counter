export enum ACTIONS_TYPE {
    INCREASE_CURRENT_VALUE = 'INCREASE_CURRENT_VALUE/COUNTER_COMPONENT',
    DECREASE_CURRENT_VALUE = 'DECREASE_CURRENT_VALUE/COUNTER_COMPONENT',
    SET_CURRENT_VALUE = 'CHANGE_CURRENT_VALUE/COUNTER_COMPONENT',
    GENERAL_SETTINGS = 'GENERAL_SETTINGS/COUNTER_COMPONENT',
    SET_START_VALUE = 'CHANGE_START_VALUE/COUNTER_COMPONENT',
    SET_FINISH_VALUE = 'CHANGE_FINISH_VALUE/COUNTER_COMPONENT',
    SET_CONDITION_OF_WORK = 'CHANGE_CONDITION_OF_WORK/COUNTER_COMPONENT',
    SET_AUTOPLAY_OPTION = 'SET_AUTOPLAY_OPTION/COUNTER_COMPONENT',
}

type SetStartValueType = ReturnType<typeof setStartValueAC>
export const setStartValueAC = (startValue: number) => {
    return {
        type: ACTIONS_TYPE.SET_START_VALUE,
        startValue,
    } as const
}
type SetFinishValueType = ReturnType<typeof setFinishValueAC>
export const setFinishValueAC = (finishValue: number) => {
    return {
        type: ACTIONS_TYPE.SET_FINISH_VALUE,
        finishValue,
    } as const
}
type SetCurrentValueType = ReturnType<typeof setCurrentValueAC>
export const setCurrentValueAC = (currentValue: number) => {
    return {
        type: ACTIONS_TYPE.SET_CURRENT_VALUE,
        currentValue,
    } as const
}
type SetAutoPlayOptionType = ReturnType<typeof setAutoPlayOptionAC>
export const setAutoPlayOptionAC = (autoPlayOption: boolean) => {
    return {
        type: ACTIONS_TYPE.SET_AUTOPLAY_OPTION,
        autoPlayOption,
    } as const
}
type SetConditionOfWorkType = ReturnType<typeof setConditionOfWorkAC>
export const setConditionOfWorkAC = (conditionOfWork: string) => {
    return {
        type: ACTIONS_TYPE.SET_CONDITION_OF_WORK,
        conditionOfWork,
    } as const
}
type IncreaseCurrentValueType = ReturnType<typeof increaseCurrentValueAC>
export const increaseCurrentValueAC = () => {
    return {
        type: ACTIONS_TYPE.INCREASE_CURRENT_VALUE,
    } as const
}
type DecreaseCurrentValueType = ReturnType<typeof decreaseCurrentValueAC>
export const decreaseCurrentValueAC = () => {
    return {
        type: ACTIONS_TYPE.DECREASE_CURRENT_VALUE,
    } as const
}
type SetupSettingType = {
    type: ACTIONS_TYPE.GENERAL_SETTINGS,
    payload: {
        startValue: number,
        finishValue: number,
        autoPlayOption: boolean,
        conditionOfWork: string
    }
}
export const setupSettingAC = (startValue: number, finishValue: number, autoPlayOption: boolean, conditionOfWork: string): SetupSettingType => {
    return {
        type: ACTIONS_TYPE.GENERAL_SETTINGS,
        payload: {
            startValue,
            finishValue,
            autoPlayOption,
            conditionOfWork,
        }
    }
}
export type ActionCounterType =
    SetupSettingType
    | SetStartValueType
    | SetFinishValueType
    | SetCurrentValueType
    | SetAutoPlayOptionType
    | SetConditionOfWorkType
    | IncreaseCurrentValueType
    | DecreaseCurrentValueType
    ;
