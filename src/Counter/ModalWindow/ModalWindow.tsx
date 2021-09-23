import React, {KeyboardEvent, useCallback, useState} from 'react';
import s from './ModalWindow.module.css'
import {SuperInput} from "../SuperInput/SuperInput";
import {Button} from "../Button/Button";
import {ConditionOfWorkType} from "../Counter";
import {SuperSelect} from "../SuperSelect/SuperSelect";
import {AutoPlay} from "../AutoPlay/AutoPlay";

type ModalWindowPropsType = {
    modeModal: boolean
    setModal: () => void
    startValue: number
    setStartValue: (value: number) => void
    finishValue: number
    setFinishValue: (value: number) => void
    optionOfWork: Array<ConditionOfWorkType>
    conditionOfWork: string
    setConditionOfWork: (value: string) => void
    autoPlayOption:boolean
    setAutoPlayOption:(value:boolean) => void
}
export const ModalWindow = React.memo((props: ModalWindowPropsType) => {
    const [start, setStart] = useState(props.startValue);
    const [finish, setFinish] = useState(props.finishValue);
    const [error, setError] = useState(false);

    const [mode, setMode] = useState(props.conditionOfWork);
    const[autoPlay, setAutoPlay] = useState(props.autoPlayOption)

    const onKeyPressCloseModal = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Escape' && closeModal();
    const closeModal = () => {
        props.setModal();
    }
    const setData = useCallback(() => {
        if (start < 0 || start === finish || start > finish) {
            setError(true);
            return
        }
        setError(false);
        props.setStartValue(start);
        props.setFinishValue(finish);
        props.setConditionOfWork(mode);
        props.setModal();
        props.setAutoPlayOption(autoPlay);
    },[start,finish,mode,autoPlay, props ])
    return (
        <div tabIndex={0} onKeyUp={onKeyPressCloseModal} className={`${s.modal}`}>
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
                            callback={setStart}
                            error={error}
                            setError={setError}
                        />
                        <div className={s.data__title}>End number</div>
                        <SuperInput
                            value={finish}
                            callback={setFinish}
                            error={error}
                            setError={setError}
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
                            data={props.optionOfWork}
                            startMode={mode}
                            callback={setMode}
                        />
                    </div>
                    <Button clName={s.btn__accept} title={'Accept'} callback={setData} disabled={error === true}/>
                </div>
            </div>
        </div>
    )
})