
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
    autoplayMode:boolean
    optionsOfWork:Array<OptionsOfWorkType>
    conditionOfWork:string
}
const initialState:InitialStateType = {
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
export const counterReducer = (state:InitialStateType = initialState, action:any):InitialStateType => {
    switch (action.type){
        default:
            return state
    }
}