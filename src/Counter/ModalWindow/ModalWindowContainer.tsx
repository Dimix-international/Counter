import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {GlobalCounterType, setupSettingAC} from "../Redux/actions";
import {RootReducerType} from "../Redux/store";
import {OptionsOfWorkType} from "../Redux/counter_reducer";
import {ModalWindow} from "./ModalWindow";


type ModalWindowContainerPropsType = {
    modeModal: boolean
    setModal: () => void
    startValue: number
    finishValue: number
    autoPlayOption: boolean
    conditionOfWork: string
}
export const ModalWindowContainer = React.memo((props: ModalWindowContainerPropsType) => {
    const [start, setStart] = useState(props.startValue);
    const [finish, setFinish] = useState(props.finishValue);
    const [autoPlay, setAutoPlay] = useState(props.autoPlayOption);
    const [conditionOfWork, setConditionOfWork] = useState(props.conditionOfWork);
    const [error, setError] = useState(false);

    const optionOfWork = useSelector<RootReducerType, Array<OptionsOfWorkType>>(state => state.counter.optionsOfWork);
    let dispatch = useDispatch<Dispatch<GlobalCounterType>>();

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        let element = e.currentTarget;
        if (e.currentTarget.dataset.name) {
            const trigger: string = e.currentTarget.dataset.name;
            if (trigger === 'startValue') {
                setStart(Number(element.value))
            } else {
                setFinish(Number(element.value))
            }
        }
    }
    const onKeyPressCloseModal = (e: KeyboardEvent<HTMLDivElement>) => e.key === 'Escape' && closeModal();

    const closeModal = useCallback(() => {
        props.setModal();
    }, [props])

    const setData = useCallback(() => {
        if (start < 0 || start === finish || start > finish) {
            setError(true);
            return
        }
        setError(false);
        dispatch(setupSettingAC(start, finish, autoPlay, conditionOfWork));
        props.setModal();
    }, [start, finish, conditionOfWork, autoPlay, dispatch, props])
    return (
        <ModalWindow
            onKeyPressCloseModal={onKeyPressCloseModal}
            closeModal={closeModal}
            start={start}
            finish={finish}
            onChangeValue={onChangeValue}
            error={error}
            setError={setError}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
            optionOfWork={optionOfWork}
            conditionOfWork={conditionOfWork}
            setConditionOfWork={setConditionOfWork}
            setData={setData}
        />
    )
})