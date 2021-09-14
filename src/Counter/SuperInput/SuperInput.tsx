import React, {ChangeEvent, useState} from "react";
import s from './SuperInput.module.css'

type SuperInputPropsType = {
    value:number
    callback: (value:number) => void
    error: boolean
    setError: (value:boolean) => void
};
export const SuperInput: React.FC<SuperInputPropsType> = (
    {
        value,
        callback,
        error,
        setError
    }) => {
    const [tempValue, setTempValue] = useState(value);
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setTempValue(Number(e.currentTarget.value));
    }
    const onBlurHandler = () => {
        callback(tempValue);
    }
    const finallyClass = error ? `${s.error} ${s.input}`: s.input;
    return (
        <>
            <input
                className={finallyClass}
                type={'number'}
                onChange={onChangeHandler}
                value={tempValue}
                onBlur={onBlurHandler}
            />
        </>
    )
}