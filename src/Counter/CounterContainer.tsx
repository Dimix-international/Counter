import {Counter} from "./Counter";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Redux/store";
import {Dispatch} from "redux";
import {decreaseCurrentValueAC, GlobalCounterType, increaseCurrentValueAC, setCurrentValueAC} from "./Redux/actions";
import {useCallback, useEffect, useState} from "react";


export const CounterContainer = () => {
    const startValue = useSelector<RootReducerType, number>(state => state.counter.startValue);
    const finishValue = useSelector<RootReducerType, number>(state => state.counter.finishValue);
    const currentValue = useSelector<RootReducerType, number>(state => state.counter.currentValue);
    const autoPlayOption = useSelector<RootReducerType, boolean>(state => state.counter.autoPlayOption);
    const conditionOfWork = useSelector<RootReducerType, string>(state => state.counter.conditionOfWork);

    let dispatch = useDispatch<Dispatch<GlobalCounterType>>();

    const [intervalIdForTimer, setIntervalIdForTimer] = useState<number>(0)
    const [autoplayMode, setAutoPlayMode] = useState(false); //для запуска useEffect

    /*    useEffect(() => {
            //---conditionOfWork--
            let conditionAsString = localStorage.getItem('modeCounter')
            conditionAsString && setConditionOfWork(JSON.parse(conditionAsString));
            //---autoplay--
            let autoPlayValueAsString = localStorage.getItem('autoPlayValue')
            autoPlayValueAsString && setAutoPlayOption(JSON.parse(autoPlayValueAsString));

        }, []);
        //---start--
        useEffect(() => {
            setValueWhenOccurChangeInSettings();
            localStorage.setItem('startValueOfCounter', JSON.stringify(startValue))
        }, [startValue, finishValue, setValueWhenOccurChangeInSettings]);
        //---finish--
        useEffect(() => {
            setValueWhenOccurChangeInSettings();
            localStorage.setItem('finishValueOfCounter', JSON.stringify(finishValue));
        }, [finishValue, startValue, setValueWhenOccurChangeInSettings]);
        //---conditionOfWork--
        useEffect(() => {
            setValueWhenOccurChangeInSettings();
            localStorage.setItem('modeCounter', JSON.stringify(conditionOfWork));
        }, [conditionOfWork, setValueWhenOccurChangeInSettings]);
        //---autoplay--
        useEffect(() => {
            setValueWhenOccurChangeInSettings();
            localStorage.setItem('autoPlayValue', JSON.stringify(autoPlayOption));
        }, [autoPlayOption, setValueWhenOccurChangeInSettings]);*/
    //убрали режим скрол когда открываем модальное окно)

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
    }, [autoPlayOption,autoplayMode,currentValue,startValue,finishValue,conditionOfWork,dispatch ])

    const changeValue = useCallback(() => {
        if (autoPlayOption) {
            setAutoPlayMode(true)
        }else {
            if (conditionOfWork === 'decrease') {
                dispatch(decreaseCurrentValueAC())
            } else {
                dispatch(increaseCurrentValueAC())
            }
        }
    },[autoPlayOption,conditionOfWork,dispatch])
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
    }, [conditionOfWork, intervalIdForTimer, autoPlayOption, startValue, finishValue,dispatch])

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