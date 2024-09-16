import { useDispatch } from 'react-redux';

import { deleteTask, fetchTasks } from '../../../../../redux/tasks/operators';

import { ModalButton } from './modalStyledWindow';
import { FC } from 'react';
import { IdeleteTaskModal } from '../../../../../helper/Task.types';
import { AppDispatch } from '../../../../../redux/store';

export const DeleteConfirmationModal: FC<IdeleteTaskModal> = ({
  _id,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async (): Promise<void> => {
    try {
      await dispatch(deleteTask(_id)).unwrap();

      dispatch(fetchTasks());
    } catch (error) {
      console.error('Error deleting task:', error);
    }

    onClose();
  };

  return (
    <div>
      <p>Are you sure you want to delete this task?</p>
      <div>
        <ModalButton onClick={handleDelete}>Yes</ModalButton>
        <ModalButton onClick={onClose}>No</ModalButton>
      </div>
    </div>
  );
};
