import React, {useState} from "react";
import s from './AutoPlay.module.css'

type AutoPlayPropsType = {
    startValueAutoPlay: boolean
    callback: (value: boolean) => void
}
export const AutoPlay: React.FC<AutoPlayPropsType> = React.memo(props => {
    const {
        startValueAutoPlay,
        callback,
    } = props;

    const [active, setActive] = useState(startValueAutoPlay);
    const [advise, setAdvise] = useState(false);

    const finalClass = active ? `${s.play} ${s.active}` : s.play;
    const onClickHandler = () => {
        callback(!active);
        setActive(!active);
    }
    const showAdvise = () => {
        setAdvise(true)
    }
    const closeAdvise = () => {
        setAdvise(false)
    }
    return (
        <div
            className={s.container}
            onMouseLeave={closeAdvise}>
            <div
                className={finalClass}
                onClick={onClickHandler}
                onMouseEnter={showAdvise}
            >
            </div>
            {advise &&
            <div>
                <div className={s.advise}>
                    autoplay
                </div>
            </div>
            }
        </div>
    )
})