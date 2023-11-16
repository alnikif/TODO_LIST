import React, { useContext } from 'react';
import cx from 'classnames';
import { Button, ButtonType } from '../Button/Button';
import styles from './TaskForm.module.scss';
import { LanguageContext } from '../../Providers/LanguageProvider';

type TaskFormPropsType = {
  readonly formName: string;
  readonly title: string;
  readonly description: string;
  readonly onResetForm?: () => void;
  readonly onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onChangeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TaskForm: React.FC<TaskFormPropsType> = (props) => {
  const { constants: langConstants } = useContext(LanguageContext);
  const { modalFormAddButtonTitle, modalFormInputTitle, modalFormInputDescription } = langConstants;
  const { formName, title, description, onResetForm, onChangeTitle, onChangeDescription, onSubmit } = props;
  return (
    <form name={formName} className={cx(styles.displayFlex, styles.flexCol, styles.justifyCenter, styles.itemsCenter)}>
      <label htmlFor={formName} className={styles.inptTittle}>
        {modalFormInputTitle}
      </label>
      <input type="text" id="title" className={styles.inptTxt} value={title} onChange={onChangeTitle} />
      <label htmlFor="description" className={styles.inptTitle}>
        {modalFormInputDescription}
      </label>
      <input type="text" id="description" className={styles.inptTxt} value={description} onChange={onChangeDescription} />
      <Button onClick={onSubmit} type={title.length && ButtonType.action}>
        {modalFormAddButtonTitle}
      </Button>
    </form>
  );
};
