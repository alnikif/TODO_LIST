import styles from './SliderCheckbox.module.scss';

export const SliderCheckbox = ({isDone, onChange}) => (
    <label className={styles.sliderContainer}>
        <input type="checkbox" className={styles.inptCheckbox} checked={isDone} onChange={onChange} />
        <div className={styles.slider}>done</div>
    </label>
);
