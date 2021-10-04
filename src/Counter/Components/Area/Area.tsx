import React from 'react';
import s from "./Area.module.css";


export type AreaPropsType = {
    maxValue: number
    classMaxValue?: string
    value: number
}
export const Area: React.FC<AreaPropsType> = React.memo(props => {
    const {
        maxValue,
        classMaxValue,
        value,
    } = props;

    let finalClass = value === maxValue ? `${s.area} ${classMaxValue}` : `${s.area}`;
    return (
        <div className={finalClass}>
            {value}
        </div>
    )
})