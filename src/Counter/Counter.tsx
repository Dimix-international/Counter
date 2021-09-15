import React, {useEffect, useState} from 'react';
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
    const [startValue, setStartValue] = useState(getStartValueFromLocalStorage());
    const [finishValue, setFinishValue] = useState(getFinishValueFromLocalStorage());
    const [currentValue, setCurrentValue] = useState(startValue);
    const [modeModal, setModeModal] = useState(false);
    const [autoPlayOption, setAutoPlayOption] = useState(false)


    /*const [startAutoPlay, setStartAutoPlay] = useState(false)*/


    const optionOfWork: Array<ConditionOfWorkType> = [
        {id: 1, title: 'increase'},
        {id: 2, title: 'decrease'}
    ]
    const [conditionOfWork, setConditionOfWork] = useState(optionOfWork[0].title)

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
        setStartValue(startValue)
        localStorage.setItem('startValueOfCounter', JSON.stringify(startValue))
    }, [startValue]);
    //---finish--
    useEffect(() => {
        setFinishValue(finishValue)
        localStorage.setItem('finishValueOfCounter', JSON.stringify(finishValue));
    }, [finishValue]);
    //---conditionOfWork--
    useEffect(() => {
        localStorage.setItem('modeCounter', JSON.stringify(conditionOfWork));

        if (conditionOfWork === 'increase' || conditionOfWork === '') {
            setCurrentValue(startValue);
        } else {
            setCurrentValue(finishValue);
        }
    }, [conditionOfWork]);
    //---autoplay--
    useEffect(() => {
        localStorage.setItem('autoPlayValue', JSON.stringify(autoPlayOption));
    }, [autoPlayOption]);


    /*    useEffect(() => {
            let id: any = ''
            if (startAutoPlay) {
                id = setTimeout(() => {
                    if (conditionOfWork === 'decrease') {
                        if (currentValue > startValue) {
                            setCurrentValue(value => value - 1);
                        }
                        else {
                            setStartAutoPlay(false);
                        }
                    } else {
                        if (currentValue < finishValue) {
                            setCurrentValue(value => value + 1);
                        }
                        else {
                            setStartAutoPlay(false);
                        }
                    }
                }, 1000)
            }
            return () => {
                clearTimeout(id)
            }


        }, [currentValue])*/

    const changeValue = () => {
        /*if (autoPlayOption) {
            setStartAutoPlay(true)
        }*/
        if (autoPlayOption) {
            let tempValue: any = currentValue;
            let intervalId = setInterval(() => {
                if (conditionOfWork === 'decrease') {

                    if (tempValue > startValue) {
                        setCurrentValue(value => value - 1);
                        tempValue = tempValue - 1;
                        disableActionButton();
                        disableSettingsButton();
                        disableResetButton();
                    } else {
                        clearInterval(intervalId)
                    }
                } else {
                    if (tempValue < finishValue) {
                        setCurrentValue(value => value + 1);
                        tempValue = tempValue + 1;
                        disableActionButton();
                        disableSettingsButton();
                        disableResetButton();
                    } else {
                        clearInterval(intervalId)
                    }
                }
            }, 1000)
            console.log('play')

            return
        } else {
            if (conditionOfWork === 'decrease') {
                setCurrentValue(currentValue - 1);
            } else {
                setCurrentValue(currentValue + 1);
            }
        }
    }
    const resetValue = () => {
        if (conditionOfWork === 'decrease') {
            setCurrentValue(finishValue);
        } else {
            setCurrentValue(startValue)
        }
    }
    const toggleModeModal = () => {
        setModeModal(!modeModal)
    }
    const disableButtonWhenWorkingAutoplay = () => {
        return currentValue !== finishValue && currentValue !== startValue
    }
    const disableActionButton = () => {
        if (autoPlayOption) {
            if (conditionOfWork === 'increase') {
                if(currentValue === finishValue) return true
                return disableButtonWhenWorkingAutoplay();
            } else {
                if(currentValue === startValue) return true
                return disableButtonWhenWorkingAutoplay();
            }
        } else {
            if (conditionOfWork === '') {
                return true
            } else if (conditionOfWork === 'increase') {
                return currentValue === finishValue
            } else {
                return currentValue === startValue
            }
        }

    }
    const disableResetButton = () => {
        if (autoPlayOption) {
            if (conditionOfWork === 'increase') {
                if (currentValue === startValue) return true
                return disableButtonWhenWorkingAutoplay();
            } else {
                if (currentValue === finishValue) return true
                return disableButtonWhenWorkingAutoplay();
            }
        }
        if (conditionOfWork === '') {
            return true
        } else if (conditionOfWork === 'increase') {
            return currentValue === startValue
        } else {
            return currentValue === finishValue
        }
    }
    const disableSettingsButton = () => {
        if (autoPlayOption) {
            return disableButtonWhenWorkingAutoplay();
        }
        return false
    }

    const finishValueForArea = () => {
        if (conditionOfWork === 'increase') {
            return finishValue
        } else {
            return startValue
        }
    }
    return (
        <div className={s.counter}>
            <Area
                maxValue={finishValueForArea()}
                classMaxValue={s.red}
                value={currentValue}
            />
            <div className={s.buttons}>
                <Button
                    clName={s.action}
                    disabled={disableActionButton()}
                    title={conditionOfWork}
                    callback={changeValue}
                    autoPlayOption={autoPlayOption}
                />
                <Button
                    clName={s.reset}
                    disabled={disableResetButton()}
                    title={'reset'}
                    callback={resetValue}
                />
                <Button
                    clName={s.settings}
                    title={'settings'}
                    callback={toggleModeModal}
                    disabled={disableSettingsButton()}
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