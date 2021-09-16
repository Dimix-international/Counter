import React from 'react';
import s from './Button.module.css'

type ButtonTypeProps = {
    clName?:string
    disabled?: boolean
    title: string
    callback: () => void
    autoPlayOption?: boolean
}
export const Button: React.FC<ButtonTypeProps> = React.memo((
    {clName, disabled, title, callback, autoPlayOption}
) => {

    const changeValue = () => {
        callback()
    }
    const finalClass = clName ? `${s.btn} ${clName}` : s.btn;
    return (
        <button className={finalClass} disabled={disabled} onClick={changeValue}>
            {title}
            {autoPlayOption && <span className={s.play}></span>}
        </button>
    )
})