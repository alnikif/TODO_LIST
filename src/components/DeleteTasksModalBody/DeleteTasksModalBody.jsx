import styles from './DeleteTasksModalBody.module.scss';

export const DeleteTasksModalBody = ({ title, selectedTasks }) => {
    return(
        <>
          <p className={styles.modalText}>{title}</p>
          <div>
            {selectedTasks.map(({ id, title }) => (
              <div key={id}>{title}</div>
            ))}
          </div>
        </>
    )
}
