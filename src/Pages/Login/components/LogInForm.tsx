import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
  IconButton
} from '../../Register/components/RegisterFormStyled';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

import { login } from '../../../redux/auth/operators';
import { useState } from 'react';
import { IoEye, IoEyeOffOutline } from 'react-icons/io5';

const userSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Incorrect email format')
    .required('Required'),

  password: Yup.string()
    .min(6, 'Password has to be at least 6 charts')
    .required('Required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const swapPassword = () => {
    setShowPassword(!showPassword);
  };

  interface LogValues {
    email: string;
    password: string;
  }

  const handleSubmit = (
    values: {email: string, password: string},
    actions: FormikHelpers<LogValues>
  ) => {
    dispatch(
      login({
        email:values.email.toLowerCase(),
        password: values.password,
      })
    );

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      <FormStyled>
        <FieldGroup>
          E-mail
          <FieldStyled name="email" type="string" placeholder="some@mail.com" />
          <ErrorMessageStyled name="email" component="span" />
        </FieldGroup>

        <FieldGroup>
          Password
          <FieldStyled name="password" type={showPassword ? 'text' : 'password'} placeholder="123456" />
          <IconButton type="button" onClick={swapPassword}>
            {showPassword ? <IoEye /> : <IoEyeOffOutline />}
          </IconButton>
          <ErrorMessageStyled name="password" component="span" />
        </FieldGroup>


        <Button type="submit">Sign In </Button>
      </FormStyled>
    </Formik>
  );
};
