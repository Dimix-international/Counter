import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './Counter.module.css';
import {Area} from "./Area/Area";
import {Button} from "./Button/Button";
import {ModalWindowContainer} from "./ModalWindow/ModalWindowContainer";

export type ConditionOfWorkType = { id: number, title: string }

type CounterPropsType = {
    startValue:number
    finishValue:number
    currentValue:number
    autoPlayOption:boolean
    conditionOfWork:string
    changeValue: () => void
    resetValue:() => void
}
export const Counter:React.FC<CounterPropsType> = React.memo((props) => {
    const{
        startValue,
        finishValue,
        currentValue,
        autoPlayOption,
        conditionOfWork,
        changeValue,
        resetValue,
    } = props;
    const [modeModal, setModeModal] = useState(false); //открытие/закрытие модального окна
    const toggleModeModal = useCallback(() => {
        setModeModal(!modeModal)
    }, [modeModal])
    useEffect(() => {
        if (modeModal) {
            document.body.classList.add(s.body_lock)
        } else {
            document.body.className = ''
        }
    }, [modeModal])
    const disableButtonWhenWorkingAutoplay = useMemo(() => {
        return currentValue !== finishValue && currentValue !== startValue
    }, [currentValue, finishValue, startValue])

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

    }, [autoPlayOption, conditionOfWork, currentValue, startValue, finishValue, disableButtonWhenWorkingAutoplay]);

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
    }, [autoPlayOption, disableButtonWhenWorkingAutoplay])

    const finishValueForArea = useMemo(() => {
        if (conditionOfWork === 'increase') {
            return finishValue
        } else {
            return startValue
        }
    }, [conditionOfWork, finishValue, startValue])

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
            {modeModal && <ModalWindowContainer
                modeModal={modeModal}
                setModal={toggleModeModal}
                startValue={startValue}
                finishValue={finishValue}
                autoPlayOption={autoPlayOption}
                conditionOfWork={conditionOfWork}
            />}
        </div>
    )
})