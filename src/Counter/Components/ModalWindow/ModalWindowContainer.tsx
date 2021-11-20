import React, {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useContext,
    useState
} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {setupSettingAC} from "../../Redux/actions";
import {RootReducerType} from "../../Redux/store";
import {OptionsOfWorkType} from "../../Redux/counter_reducer";
import {ModalWindow} from "./ModalWindow";
import {CounterContext} from "../../counterContext";


export type ModalWindowContainerPropsType = {
    setModal: () => void
    toggleModeModal: () => void
}


export const ModalWindowContainer: React.FC<ModalWindowContainerPropsType> = React.memo(({setModal, toggleModeModal}) => {

    const {
        startValue,
        finishValue,
        autoPlayOption,
        speedAutoplayOption,
        conditionOfWork
    } = useContext(CounterContext)

    const [start, setStart] = useState(startValue);
    const [finish, setFinish] = useState(finishValue);
    const [autoPlay, setAutoPlay] = useState(autoPlayOption);
    const [speed, setSpeed] = useState(speedAutoplayOption)
    const [condition, setCondition] = useState(conditionOfWork);
    const [error, setError] = useState(false);

    const optionOfWork = useSelector<RootReducerType, Array<OptionsOfWorkType>>(state => state.counter.optionsOfWork);

    const dispatch = useDispatch<Dispatch>();


    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let element = e.currentTarget;
        if (e.currentTarget.dataset.name) {
            const trigger: string = e.currentTarget.dataset.name;
            if (trigger === 'startValue') {
                setStart(Number(element.value))
            } else {
                setFinish(Number(element.value))
            }
        }
    }, [])

    const closeModal = useCallback(() => {
        setModal();
    }, [setModal])

    const setData = useCallback(() => {
        if (start < 0 || start === finish || start > finish) {
            setError(true);
            return
        }
        setError(false);
        dispatch(setupSettingAC(start, finish, autoPlay, condition, speed));
        setModal();
    }, [start, finish, condition, autoPlay, dispatch, setModal, speed])

    const onKeyPress = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case 'Escape':
                closeModal()
                break;
            case 'Enter':
                setData();
                break;
            default:
                return
        }
    }, [closeModal, setData])

    return (
        <ModalWindow
            onKeyPress={onKeyPress}
            closeModal={closeModal}
            start={start}
            finish={finish}
            onChangeValue={onChangeValue}
            error={error}
            setError={setError}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
            speed={speed}
            setSpeed={setSpeed}
            optionOfWork={optionOfWork}
            conditionOfWork={condition}
            setConditionOfWork={setCondition}
            setData={setData}
        />
    )
})