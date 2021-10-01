import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './ModalWindow.module.css'
import {SuperInput} from "../SuperInput/SuperInput";
import {Button} from "../Button/Button";
import {SuperSelect} from "../SuperSelect/SuperSelect";
import {AutoPlay} from "../AutoPlay/AutoPlay";
import {OptionsOfWorkType} from "../../Redux/counter_reducer";

type ModalWindowPropsType = {
    onKeyPress: (e: KeyboardEvent<HTMLDivElement>) => void
    closeModal: () => void
    start: number
    finish: number
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
    error: boolean
    setError: (value: boolean) => void
    autoPlay: boolean
    setAutoPlay: (value: boolean) => void
    optionOfWork: Array<OptionsOfWorkType>
    conditionOfWork: string
    setConditionOfWork: (value: string) => void
    setData: () => void
}
export const ModalWindow: React.FC<ModalWindowPropsType> = React.memo((props: ModalWindowPropsType) => {
    const {
        onKeyPress,
        closeModal,
        start,
        finish,
        onChangeValue,
        error,
        setError,
        autoPlay,
        setAutoPlay,
        optionOfWork,
        conditionOfWork,
        setConditionOfWork,
        setData,
    } = props;
    const closeModalWindow = () => {
        closeModal();
    }
    return (
        <div tabIndex={0} onKeyUp={onKeyPress} className={`${s.modal}`}>
            <div className={s.dialog}>
                <div className={s.header}>
                    <div className={s.header__content}>
                        <div className={s.title}>Settings</div>
                        <div className={s.close} onClick={closeModal}>&times;</div>
                    </div>
                </div>
                <div className={s.body}>
                    <div className={s.data}>
                        <div className={s.data__title}>Start number</div>
                        <SuperInput
                            value={start}
                            callback={onChangeValue}
                            error={error}
                            setError={setError}
                            dataName={'startValue'}
                        />
                        <div className={s.data__title}>End number</div>
                        <SuperInput
                            value={finish}
                            callback={onChangeValue}
                            error={error}
                            setError={setError}
                            dataName={'finishValue'}
                        />
                    </div>
                    <div className={s.mode}>
                        <div className={s.mode__title}>
                            <div>Choose mode</div>
                            <AutoPlay
                                startValueAutoPlay={autoPlay}
                                callback={setAutoPlay}
                            />
                        </div>
                        <SuperSelect
                            data={optionOfWork}
                            startMode={conditionOfWork}
                            callback={setConditionOfWork}
                        />
                    </div>
                    <Button
                        clName={s.btn__accept}
                        title={'Accept'}
                        callback={setData}
                        disabled={error}
                    />
                </div>
            </div>
            <div onClick={closeModalWindow} className={s.background}> </div>
        </div>
    )
})