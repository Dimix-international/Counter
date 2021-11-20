import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import s from './Counter.module.css';
import {Area} from "./Components/Area/Area";
import {Button} from "./Components/Button/Button";
import {ModalWindowContainer} from "./Components/ModalWindow/ModalWindowContainer";
import {CounterContext} from "./counterContext";

type CounterPropsType = {
    changeValue: () => void
    resetValue: () => void
}
export const Counter: React.FC<CounterPropsType> = React.memo(({changeValue, resetValue}) => {

        const {
            startValue,
            finishValue,
            currentValue,
            autoPlayOption,
            conditionOfWork,
        } = useContext(CounterContext)

        const [modeModal, setModeModal] = useState(false); //открытие/закрытие модального окна

        const toggleModeModal = useCallback(() => {
            setModeModal(!modeModal)
        }, [modeModal])
        //блокируем скролл всей страницы, когда открыто модальное окно
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
                    return currentValue === finishValue || disableButtonWhenWorkingAutoplay
                } else {
                    return currentValue === startValue || disableButtonWhenWorkingAutoplay
                }
            } else {
                if (conditionOfWork === 'increase') {
                    return currentValue === finishValue
                } else {
                    return currentValue === startValue
                }
            }
        }, [autoPlayOption, conditionOfWork, currentValue, startValue, finishValue, disableButtonWhenWorkingAutoplay]);

        const disableSettingsButton = useMemo(() => {
            if (!autoPlayOption) return false;
            return disableButtonWhenWorkingAutoplay;

        }, [autoPlayOption, disableButtonWhenWorkingAutoplay])

        const disableResetButton = useMemo(() => {
            if (conditionOfWork === 'increase') {
                return currentValue === startValue;
            } else {
                return currentValue === finishValue
            }
        }, [conditionOfWork, currentValue, startValue, finishValue])


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
                {
                    modeModal && <ModalWindowContainer
                        setModal={() => setModeModal(!modeModal)}
                        toggleModeModal={toggleModeModal}
                    />
                }
            </div>
        )
    }
)