import React, {useState} from 'react';
import s from './Counter.module.css';
import {Area} from "./Area/Area";
import {Button} from "./Button/Button";


export const Counter = () => {
    const maxValue = 5;
    const startValue = 0;

    const [value, setValue] = useState<number>(startValue);

    const addValue = (value: number) => {
        if(value <= maxValue) {
            setValue(value + 1);
            return;
        }
    }
    const resetValue = () => {
        setValue(startValue);
    }
    const classMaxValue = s.red;
    return (
        <div className={s.counter}>
            <Area
                maxValue={maxValue}
                classMaxValue={classMaxValue}
                value={value}
            />
            <div className={s.buttons}>
                <Button
                    disabled={value === maxValue}
                    title={'inc'}
                    callback={() => addValue(value)}
                />
                <Button
                    disabled={value === startValue}
                    title={'reset'}
                    callback={resetValue}
                />
            </div>
        </div>
    )
}