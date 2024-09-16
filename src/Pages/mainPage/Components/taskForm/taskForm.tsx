import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
} from './taskFormStyled';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../../redux/tasks/operators';
import { ITask } from '../../../../helper/Task.types';
import { FC } from 'react';
import { AppDispatch } from '../../../../redux/store';
// import Notiflix from 'notiflix';

interface TaskFormProp extends Partial<ITask> {
  onClose: () => void;
}

const taskSchema = Yup.object().shape({
  text: Yup.string()
    // .matches(/^[^!]*$/, 'The task cannot contain the "!" character.')
    .required('Required'),
});

export const TaskForm: FC<TaskFormProp> = ({ parentId, subLevel, onClose }) => {
  const dispatchTask = useDispatch<AppDispatch>();

  const onAdd = (
    values: { text: string; date: string },
    actions: FormikHelpers<{ text: string; date: string }>
  ) => {
    // if (values.text.includes('!')) {
    //   Notiflix.Notify.failure('The task field cannot contain "!" character.');
    //   return;
    // }
    if (!parentId) {
      parentId = '0';
      subLevel = 0;
    } else {
      subLevel = (subLevel ?? 0) + 1;
    }

    const newTask = {
      text: values.text,
      date: new Date().toISOString(),
      parentId: parentId,
      subLevel: subLevel,
    };

    dispatchTask(addTask(newTask));
    actions.resetForm();
    if (onClose) {
      onClose();
    }
  };
  return (
    <Formik
      initialValues={{
        text: '',
        date: new Date().toString(),
      }}
      validationSchema={taskSchema}
      onSubmit={onAdd}
    >
      <FormStyled>
        <FieldGroup>
          <FieldStyled
            name="text"
            type="text"
            placeholder="Insert your task here"
          />
          <ErrorMessageStyled name="text" component="span" />
        </FieldGroup>

        <Button type="submit">Add Task</Button>
      </FormStyled>
    </Formik>
  );
};
