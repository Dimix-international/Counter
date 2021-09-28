import {Counter} from "./Counter";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Redux/store";
import {decreaseCurrentValueAC, increaseCurrentValueAC, setCurrentValueAC} from "./Redux/actions";
import React, {useCallback, useEffect, useState} from "react";
import {Dispatch} from "redux";


export const CounterContainer = React.memo(() => {
    const startValue = useSelector<RootReducerType, number>(state => state.counter.startValue)
    const finishValue = useSelector<RootReducerType, number>(state => state.counter.finishValue)
    const currentValue = useSelector<RootReducerType, number>(state => state.counter.currentValue)
    const conditionOfWork = useSelector<RootReducerType, string>(state => state.counter.conditionOfWork)
    const autoPlayOption = useSelector<RootReducerType, boolean>(state => state.counter.autoPlayOption)

    const [intervalIdForTimer, setIntervalIdForTimer] = useState(0)
    const [autoplayMode, setAutoPlayMode] = useState(false); //для запуска useEffect


    let dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        if (autoplayMode) {
            let intervalId: number = window.setInterval(() => {
                if (conditionOfWork === 'decrease') {
                    if (currentValue > startValue) {
                        dispatch(decreaseCurrentValueAC());
                    } else {
                        clearInterval(intervalId)
                        setAutoPlayMode(false);
                    }
                } else {
                    if (currentValue < finishValue) {
                        dispatch(increaseCurrentValueAC());
                    } else {
                        clearInterval(intervalId);
                        setAutoPlayMode(false);
                    }
                }
            }, 1000)
            setIntervalIdForTimer(intervalId);
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [autoPlayOption, autoplayMode, currentValue, startValue, finishValue, conditionOfWork, dispatch])

    useEffect(() => {
        dispatch(setCurrentValueAC(conditionOfWork === 'decrease' ? finishValue : startValue))
    }, [startValue, finishValue, conditionOfWork, dispatch])

    const changeValue = useCallback(() => {
        if (autoPlayOption) {
            setAutoPlayMode(true)
        } else {
            if (conditionOfWork === 'decrease') {
                dispatch(decreaseCurrentValueAC())
            } else {
                dispatch(increaseCurrentValueAC())
            }
        }
    }, [autoPlayOption, conditionOfWork, dispatch])

    const resetValue = useCallback(() => {
        if (autoPlayOption) {
            clearInterval(intervalIdForTimer);
            setAutoPlayMode(false)
        }
        if (conditionOfWork === 'decrease') {
            dispatch(setCurrentValueAC(finishValue))
        } else {
            dispatch(setCurrentValueAC(startValue))
        }
    }, [conditionOfWork, intervalIdForTimer, autoPlayOption, startValue, finishValue, dispatch])

    return (
        <Counter
            startValue={startValue}
            finishValue={finishValue}
            currentValue={currentValue}
            autoPlayOption={autoPlayOption}
            conditionOfWork={conditionOfWork}
            changeValue={changeValue}
            resetValue={resetValue}
        />
    )
})