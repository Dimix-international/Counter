import {Counter} from "./Counter";
import {useDispatch, useSelector} from "react-redux";
import {rootReducer, RootReducerType} from "./Redux/store";
import {
    decreaseCurrentValueAC,
    increaseCurrentValueAC,
    setCurrentValueAC
} from "./Redux/actions";
import React, {useCallback, useEffect, useState} from "react";
import {Dispatch} from "redux";
import {speedCounterWhenAutoplay} from "./utils/speedCounterWhenAutoplay";
import {InitialStateType} from "./Redux/counter_reducer";
import {CounterContext} from "./counterContext";

export const CounterContainer = React.memo(() => {
    const {
        startValue,
        finishValue,
        currentValue,
        conditionOfWork,
        autoPlayOption,
        speedAutoplayOption,
    } = useSelector<RootReducerType, InitialStateType>(state => state.counter)

    const [intervalIdForTimer, setIntervalIdForTimer] = useState(0)
    const [autoplayMode, setAutoPlayMode] = useState(false); //для запуска useEffect
    const dispatch = useDispatch<Dispatch>();

    let speedPlayingAutoplay: number = speedCounterWhenAutoplay(speedAutoplayOption);

    useEffect(() => {
        if (autoplayMode) {
            //вынести в отдел функцию
            let intervalId: number = window.setInterval(() => {
                if (conditionOfWork === 'increase') {
                    if (currentValue < finishValue) {
                        dispatch(increaseCurrentValueAC());
                    } else {
                        clearInterval(intervalId);
                        setAutoPlayMode(false);
                    }
                } else {
                    if (currentValue > startValue) {
                        dispatch(decreaseCurrentValueAC());
                    } else {
                        clearInterval(intervalId)
                        setAutoPlayMode(false);
                    }
                }
            }, speedPlayingAutoplay)
            setIntervalIdForTimer(intervalId);
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [autoPlayOption, autoplayMode, currentValue, startValue, finishValue, conditionOfWork, speedPlayingAutoplay, dispatch])

    useEffect(() => {
        dispatch(setCurrentValueAC(conditionOfWork === 'increase' ? startValue : finishValue))
    }, [startValue, finishValue, conditionOfWork, dispatch])

    const changeValue = useCallback(() => {
        if (autoPlayOption) {
            setAutoPlayMode(true)
        } else {
            if (conditionOfWork === 'increase') {
                dispatch(increaseCurrentValueAC())
            } else {
                dispatch(decreaseCurrentValueAC())
            }
        }
    }, [autoPlayOption, conditionOfWork, dispatch])

    const resetValue = useCallback(() => {
        if (autoPlayOption) {
            clearInterval(intervalIdForTimer);
            setAutoPlayMode(false)
        }
        if (conditionOfWork === 'increase') {
            dispatch(setCurrentValueAC(startValue))
        } else {
            dispatch(setCurrentValueAC(finishValue))
        }
    }, [conditionOfWork, intervalIdForTimer, autoPlayOption, startValue, finishValue, dispatch])

    return (
        <CounterContext.Provider value={{
            startValue,
            finishValue,
            currentValue,
            autoPlayOption,
            speedAutoplayOption,
            conditionOfWork,
        }}>
            <Counter
            changeValue={changeValue}
            resetValue={resetValue}
        />
        </CounterContext.Provider>
    )
})