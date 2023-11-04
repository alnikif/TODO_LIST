import { Button } from '../Button/Button';
import styles from './Modal.module.scss';
import cx from 'classnames';

export const Modal = (props) => {
  let { children, onClose } = props;

  if (!children) {
    children = <p>This is a example modal</p>;
  }

  return (
    <div className={styles.modalDialog}>
      <div className={cx(
        styles.displayFlex,
        styles.flexCol,
        styles.justifyCenter,
        styles.itemsCenter
      )}>
        {children}
        <Button onClick={onClose} tittle='Close' />
      </div>
    </div>
  );
};
