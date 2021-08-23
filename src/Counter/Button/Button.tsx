import React from 'react';
import s from './Button.module.css'

type ButtonTypeProps = {
    disabled: boolean
    title: string
    callback: () => void
}
export const Button: React.FC<ButtonTypeProps> = ({disabled, title, callback}) => {
    const changeValue = () => {
        callback()
    }
    return (
        <button className={s.btn} disabled={disabled} onClick={changeValue}>{title}</button>
    )
}