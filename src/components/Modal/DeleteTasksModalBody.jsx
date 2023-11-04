export const DeleteTasksModalBody = ({onRemoveCompletedTasks}) => {
    return(
        <div>
            <p> Are you shuare ?</p>
           <button onClick={onRemoveCompletedTasks}>Agree</button>
        </div>
    )
}