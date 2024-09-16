
import { FC } from 'react';
import { IaddSubTaskModal } from '../../../../../helper/Task.types';
import { TaskForm } from '../../taskForm/taskForm';



export const AddSubTaskModal:FC<IaddSubTaskModal> = ({ _id, onClose, subLevel, }) => {
 

  return (
    <div>
      <h2
        style={{
          padding: 10,
        }}
      >
        Add SubTask
      </h2>

      <TaskForm parentId ={ _id} onClose={onClose} subLevel={subLevel} />
    </div>
  );
};
