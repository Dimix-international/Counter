import React from 'react';
import s from "./Area.module.css";


type AreaPropsType = {
    maxValue: number
    classMaxValue: string
    value: number
}
export const Area:React.FC<AreaPropsType> = React.memo(({maxValue,classMaxValue,value,}) => {

    let finalClass = value === maxValue ? `${s.area} ${classMaxValue}` : `${s.area}`;
    return (
        <div className={finalClass}>
            {value}
        </div>
    )
})