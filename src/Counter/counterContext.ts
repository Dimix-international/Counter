import {createContext} from "react";

export type CounterContextType = {
    startValue: number
    finishValue: number
    currentValue: number
    autoPlayOption: boolean
    speedAutoplayOption:number
    conditionOfWork: string
}
export const CounterContext = createContext({} as CounterContextType);