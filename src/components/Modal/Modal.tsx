import React, { useContext } from 'react';
import { Button, ButtonType } from '../Button/Button';
import styles from './Modal.module.scss';
import cx from 'classnames';
import { LanguageContext } from '../../Providers/LanguageProvider';

export type ModalPropsType = {
  readonly children: React.ReactNode;
  readonly onClose: () => void;
  readonly onAccept?: () => void;
};

export const Modal: React.FC<ModalPropsType> = (props) => {
  const { onAccept, onClose } = props;

  const { constants: langConstants } = useContext(LanguageContext);
  const { modalRemoveTasksButtonTitle } = langConstants;

  let children = props.children;

  if (!children) {
    children = <p>This is a example modal</p>;
  }

  return (
    <div className={styles.modalDialog}>
      <div className={cx(styles.displayFlex, styles.flexCol, styles.justifyCenter, styles.itemsCenter)}>
        {children}
        {onAccept && (
          <Button type={ButtonType.action} onClick={onAccept}>
            {modalRemoveTasksButtonTitle}
          </Button>
        )}
        <Button onClick={onClose} type={ButtonType.close} />
      </div>
    </div>
  );
};
