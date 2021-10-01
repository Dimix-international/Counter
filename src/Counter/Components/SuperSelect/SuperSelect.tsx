import React, {useState, useEffect} from "react";
import s from './SuperSelect.module.css'
import {OptionsOfWorkType} from "../../Redux/counter_reducer";

type SuperSelectPropsType = {
    data: Array<OptionsOfWorkType>
    startMode: string
    callback: (value: string) => void
}
export const SuperSelect: React.FC<SuperSelectPropsType> = React.memo(props => {
    const {
        data,
        callback,
        startMode,
    } = props;
    const [hoverElementID, setHoverElementID] = useState(startMode);
    const [active, setActive] = useState(false);

    const selectedItem = data.find(d => d.title === startMode);
    const hoveredItem = data.find(e => e.title === hoverElementID);

    const toggleActiveOfSelect = () => {
        setActive(!active);
    }
    const turnOffSelect = () => {
        setActive(false);
    }
    const onClickHandler = (title: string) => {
        callback(title);
        setActive(false)
    }
    useEffect(() => {
        setHoverElementID(startMode)
    }, [startMode]);


    const finalClassSelect = active ? `${s.select} ${s.active}` : s.select;
    const finalClassSelectTitle = active ? `${s.title} ${s.item} ${s.active}` : `${s.title} ${s.item}`;
    return (
        <div
            tabIndex={1}
            className={finalClassSelect}
            onClick={toggleActiveOfSelect}
            onBlur={turnOffSelect}
        >
            <div className={finalClassSelectTitle}>{selectedItem && selectedItem.title}</div>
            {active &&
            <div className={s.body}>
                {data.map(d => {
                    return (
                        <div
                            key={d.id}
                            className={d === hoveredItem ? `${s.item} ${s.hover}` : s.item}
                            onClick={() => onClickHandler(d.title)}
                            onMouseEnter={() => setHoverElementID(d.title)}
                        >
                            {d.title}
                        </div>
                    )
                })}</div>}
        </div>
    )
})