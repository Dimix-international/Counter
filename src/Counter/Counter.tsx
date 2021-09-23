import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './Counter.module.css';
import {Area} from "./Area/Area";
import {Button} from "./Button/Button";
import {ModalWindow} from './ModalWindow/ModalWindow';

export type ConditionOfWorkType = { id: number, title: string }

export const Counter = () => {
    const getStartValueFromLocalStorage = (): number => {
        let startValueAsString = localStorage.getItem('startValueOfCounter');
        let s = startValueAsString && JSON.parse(startValueAsString);
        if (s) {
            return Number(s);
        }
        return 0
    }
    const getFinishValueFromLocalStorage = (): number => {
        let finishValueAsString = localStorage.getItem('finishValueOfCounter')
        let f = finishValueAsString && JSON.parse(finishValueAsString);
        if (f) {
            return Number(f);
        }
        return 5
    }
    const [startValue, setStartValue] = useState(getStartValueFromLocalStorage);
    const [finishValue, setFinishValue] = useState(getFinishValueFromLocalStorage);
    let [currentValue, setCurrentValue] = useState(startValue);
    const [modeModal, setModeModal] = useState(false);
    const [autoPlayOption, setAutoPlayOption] = useState(false)

    const [intervalIdForTimer, setIntervalIdForTimer] = useState<number>(0)

    const optionOfWork: Array<ConditionOfWorkType> = [
        {id: 1, title: 'increase'},
        {id: 2, title: 'decrease'}
    ]
    const [conditionOfWork, setConditionOfWork] = useState(optionOfWork[0].title)

    const setValueWhenOccurChangeInSettings = useCallback(() => {
        setStartValue(startValue)
        setFinishValue(finishValue);
        if (conditionOfWork === 'increase') {
            setCurrentValue(startValue);
        } else {
            setCurrentValue(finishValue);
        }
    },[startValue, finishValue, conditionOfWork])
    useEffect(() => {
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
    }, [autoPlayOption, setValueWhenOccurChangeInSettings]);
    //убрали режим скрол когда открываем модальное окно)
    useEffect(() => {
        if(modeModal) {
            document.body.classList.add(s.body_lock)
        } else{
            document.body.className = ''
        }
    },[modeModal])
    const changerCurrentValueIncrease = (currentValue: number) => {
        return currentValue + 1;
    }
    const changerCurrentValueDecrease = (currentValue: number) => {
        return currentValue - 1;
    }

    const changeValue = () => {
        if (autoPlayOption) {
            let intervalId: number = window.setInterval(() => {
                if (conditionOfWork === 'decrease') {
                    if (currentValue > startValue) {
                        setCurrentValue(value => value - 1);
                        currentValue = currentValue - 1;
                    } else {
                        clearInterval(intervalId)
                    }
                } else {
                    if (currentValue < finishValue) {
                        setCurrentValue(changerCurrentValueIncrease);
                        currentValue = currentValue + 1;
                    } else {
                        clearInterval(intervalId)
                    }
                }
            }, 1000)
            console.log(intervalId)
            setIntervalIdForTimer(intervalId);
        } else {
            if (conditionOfWork === 'decrease') {
                setCurrentValue(changerCurrentValueDecrease);
            } else {
                setCurrentValue(changerCurrentValueIncrease);
            }
        }
    }
    const resetValue = useCallback(() => {
        if (autoPlayOption) {
            clearInterval(intervalIdForTimer);
        }
        if (conditionOfWork === 'decrease') {
            setCurrentValue(finishValue);
        } else {
            setCurrentValue(startValue)
        }
    }, [conditionOfWork, intervalIdForTimer, autoPlayOption, startValue, finishValue])

    const toggleModeModal = useCallback(() => {
        setModeModal(!modeModal)
    }, [modeModal])

    const disableButtonWhenWorkingAutoplay = useMemo(() => {
        return currentValue !== finishValue && currentValue !== startValue
    },[currentValue,finishValue,startValue ])

    const disableActionButton = useMemo(() => {
        if (autoPlayOption) {
            if (conditionOfWork === 'increase') {
                if (currentValue === finishValue) return true
                return disableButtonWhenWorkingAutoplay;
            } else {
                if (currentValue === startValue) return true
                return disableButtonWhenWorkingAutoplay;
            }
        } else {
            if (conditionOfWork === 'increase') {
                return currentValue === finishValue
            } else {
                return currentValue === startValue
            }
        }

    },[autoPlayOption,conditionOfWork,currentValue,startValue,finishValue, disableButtonWhenWorkingAutoplay]);

    const disableResetButton = useMemo(() => {
        if (autoPlayOption) {
            if (conditionOfWork === 'increase') {
                if (currentValue === startValue) return true
                else return false
            } else {
                if (currentValue === finishValue) return true
                else return false
            }
        } else {
            if (conditionOfWork === 'increase') {
                return currentValue === startValue
            } else {
                return currentValue === finishValue
            }
        }
    }, [autoPlayOption, conditionOfWork, currentValue, startValue, finishValue])

    const disableSettingsButton = useMemo(() => {
        if (autoPlayOption) {
            return disableButtonWhenWorkingAutoplay;
        }
        return false
    },[autoPlayOption, disableButtonWhenWorkingAutoplay])

    const finishValueForArea = useMemo(() => {
        if (conditionOfWork === 'increase') {
            return finishValue
        } else {
            return startValue
        }
    },[conditionOfWork,finishValue,startValue ])

    return (
        <div className={s.counter}>
            <Area
                maxValue={finishValueForArea}
                classMaxValue={s.red}
                value={currentValue}
            />
            <div className={s.buttons}>
                <Button
                    clName={s.action}
                    disabled={disableActionButton}
                    title={conditionOfWork}
                    callback={changeValue}
                    autoPlayOption={autoPlayOption}
                />
                <Button
                    clName={s.reset}
                    disabled={disableResetButton}
                    title={'reset'}
                    callback={resetValue}
                />
                <Button
                    clName={s.settings}
                    title={'settings'}
                    callback={toggleModeModal}
                    disabled={disableSettingsButton}
                />
            </div>
            {modeModal && <ModalWindow
                modeModal={modeModal}
                setModal={toggleModeModal}
                startValue={startValue}
                setStartValue={setStartValue}
                finishValue={finishValue}
                setFinishValue={setFinishValue}
                optionOfWork={optionOfWork}
                conditionOfWork={conditionOfWork}
                setConditionOfWork={setConditionOfWork}
                autoPlayOption={autoPlayOption}
                setAutoPlayOption={setAutoPlayOption}
            />}
        </div>
    )
}