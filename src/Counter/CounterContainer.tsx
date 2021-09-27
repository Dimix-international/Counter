import {Counter} from "./Counter";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Redux/store";
import {Dispatch} from "redux";
import {decreaseCurrentValueAC, GlobalCounterType, increaseCurrentValueAC, setCurrentValueAC} from "./Redux/actions";
import {useCallback, useEffect, useState} from "react";


export const CounterContainer = () => {
    const {
        startValue,
        finishValue,
        currentValue,
        conditionOfWork,
        autoPlayOption
    } = useSelector<RootReducerType, any>(state => state.counter);

    let dispatch = useDispatch<Dispatch<GlobalCounterType>>();

    const [intervalIdForTimer, setIntervalIdForTimer] = useState<number>(0)
    const [autoplayMode, setAutoPlayMode] = useState(false); //для запуска useEffect
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
}