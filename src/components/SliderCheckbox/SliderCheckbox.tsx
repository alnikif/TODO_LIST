import React from "react";
import styles from './SliderCheckbox.module.scss';

export type SliderCheckboxPropsType = {
    isDone: boolean,
    onChange: () => void,
};

export const SliderCheckbox: React.FC<SliderCheckboxPropsType> = ({isDone, onChange}) => (
    <label className={styles.sliderContainer}>
        <input type="checkbox" className={styles.inptCheckbox} checked={isDone} onChange={onChange} />
        <div className={styles.slider}>done</div>
    </label>
);
