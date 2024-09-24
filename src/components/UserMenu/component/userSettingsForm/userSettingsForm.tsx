import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
  IconButton,
} from './userSettingsFormStyled';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';

import { updatePassword } from '../../../../redux/auth/operators';

import { useState } from 'react';

import { IoEye, IoEyeOffOutline } from 'react-icons/io5';

interface ChangePassValues {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const userUpdateSchema = Yup.object().shape({
  oldPassword: Yup.string()
  .min(6, 'At least 6 charts required')
    .required('Required'),

  newPassword: Yup.string()
    .min(6, 'At least 6 charts required')
    .required('Required'),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
});

export const UserSettingsForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showActualPassword, setActualShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatShowPassword] = useState(false);

  const swapActualPassword = () => {
    setActualShowPassword(!showActualPassword);
  };
  const swapNewPassword = () => {
    setNewShowPassword(!showNewPassword);
  };
  const swapRepeatPassword = () => {
    setRepeatShowPassword(!showRepeatPassword);
  };

  const handleSubmit = (
    values:ChangePassValues, 
    actions:FormikHelpers<ChangePassValues>
  ) => {
     dispatch(
      updatePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      }}
      validationSchema={userUpdateSchema}
      onSubmit={handleSubmit}
    >
      <FormStyled>
        <FieldGroup>
          Actual password
          <FieldStyled
            name="oldPassword"
            type={showActualPassword ? 'text' : 'password'}
            placeholder="123456"
          />
          <IconButton type="button" onClick={swapActualPassword}>
            {showActualPassword ? <IoEye /> : <IoEyeOffOutline />}
          </IconButton>
          <ErrorMessageStyled name="oldPassword" component="span" />
        </FieldGroup>

        <FieldGroup>
          New password
          <FieldStyled
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="123456"
          />
          <IconButton type="button" onClick={swapNewPassword}>
            {showNewPassword ? <IoEye /> : <IoEyeOffOutline />}
          </IconButton>
          <ErrorMessageStyled name="newPassword" component="span" />
        </FieldGroup>

        <FieldGroup>
          Repeat new password
          <FieldStyled
            name="repeatPassword"
            type={showRepeatPassword ? 'text' : 'password'}
            placeholder="123456"
          />
          <IconButton type="button" onClick={swapRepeatPassword}>
            {showRepeatPassword ? <IoEye /> : <IoEyeOffOutline />}
          </IconButton>
          <ErrorMessageStyled name="repeatPassword" component="span" />
        </FieldGroup>

        <Button type="submit">Update Password </Button>
      </FormStyled>
    </Formik>
  );
};
