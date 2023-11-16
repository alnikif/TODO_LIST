import React, { useContext } from 'react';
import styles from './SliderCheckbox.module.scss';
import { LanguageContext } from '../../Providers/LanguageProvider';

export type SliderCheckboxPropsType = {
  readonly isDone: boolean;
  readonly onChange: () => void;
};

export const SliderCheckbox: React.FC<SliderCheckboxPropsType> = ({ isDone, onChange }) => {
  const { constants: langConstants } = useContext(LanguageContext);
  const { sliderCheckboxTitle } = langConstants;
  return (
    <label className={styles.sliderContainer}>
      <input type="checkbox" className={styles.inptCheckbox} checked={isDone} onChange={onChange} />
      <div className={styles.slider}>{sliderCheckboxTitle}</div>
    </label>
  );
};
