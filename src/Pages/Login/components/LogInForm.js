import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
} from '../../Register/components/RegisterFormStyled';
import { useDispatch } from 'react-redux';

import { login } from '../../../redux/auth/operators';

const userSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Incorrect email format')
    .required('Required'),

  password: Yup.string()
    .min(6, 'Password has to be at least 6 charts')
    .required('Required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
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
          <FieldStyled name="password" type="string" placeholder="123456" />
          <ErrorMessageStyled name="password" component="span" />
        </FieldGroup>

        <Button type="submit">Sign In </Button>
      </FormStyled>
    </Formik>
  );
};
