import { useDispatch } from 'react-redux';
import { updateTask } from '../../../../../redux/tasks/operators';
import { ModalButton, TextInput } from './editModalStyled';
import { FC, useState } from 'react';
import { IeditTaskModal } from '../../../../../helper/Task.types';
import { AppDispatch } from '../../../../../redux/store';

export const EditTaskModal: FC<IeditTaskModal> = ({
  _id,
  text: initialText,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState(initialText);

  const handleUpdate = () => {
    dispatch(updateTask({ _id, text }));
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <p>Edit task please</p>

      <form>
        <TextInput
          name="text"
          rows={3}
          value={text}
          onChange={handleChange}
          placeholder="Insert edited task here"
        />
      </form>
      <ModalButton type="button" onClick={handleUpdate}>
        Edit
      </ModalButton>
    </div>
  );
};
