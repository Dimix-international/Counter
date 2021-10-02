import React, {ChangeEvent, useState} from "react";
import s from './SuperRange.module.css'

type SuperInputPropsType = {
    value: number
    callback: (value: number) => void
};
export const SuperRange: React.FC<SuperInputPropsType> = React.memo(props => {
    const {
        value,
        callback,
    } = props
    const [tempValue, setTempValue] = useState(value);
    const onChangeHandler  = (e:ChangeEvent<HTMLInputElement>) => {
        callback(Number(e.currentTarget.value));
        setTempValue(Number(e.currentTarget.value))
    }
    return (
        <>
            <input
                className={s.input}
                type={'range'}
                min={1}
                max={5}
                step={1}
                value={tempValue}
                onChange={onChangeHandler}
            />
        </>
    )
})