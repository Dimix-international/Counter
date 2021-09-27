import React, {ChangeEvent, useState} from "react";
import s from './SuperInput.module.css'

type SuperInputPropsType = {
    value: number
    callback: (e: ChangeEvent<HTMLInputElement>) => void
    error: boolean
    setError: (value: boolean) => void
    dataName?:string
};
export const SuperInput: React.FC<SuperInputPropsType> = React.memo(props => {
    const {
        value,
        callback,
        error,
        setError,
    } = props; //что не опишем можно вызвать написав props. ...имя свойства
    const [tempValue, setTempValue] = useState(value);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value) || value === null) return; //проверка на введенное значение
        setError(false);
        setTempValue(Number(value));
        callback(e);
    }
    /*const onBlurHandler = () => {
        callback(tempValue);
    }*/
    const finallyClass = error ? `${s.error} ${s.input}` : s.input;
    return (
        <>
            <input
                className={finallyClass}
                type={'text'}
                onChange={onChangeHandler}
                value={tempValue}
                data-name={props.dataName}
                //onBlur={onBlurHandler}
            />
        </>
    )
})