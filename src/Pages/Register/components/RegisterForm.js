import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
} from './RegisterFormStyled';
import { useDispatch } from 'react-redux';

import { register } from '../../../redux/auth/operators';
import { useNavigate } from 'react-router-dom';


const userSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Z][a-z]{1,} [A-Z][a-z]{1,}$/,
      'Insert Name and Surname please'
    )
    .required('Required'),

  email: Yup.string().matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    'Incorrect email format'
  ).required('Required'),

  password: Yup.string()
    .min(6, 'Password has to be at least 6 charts')
    .required('Required'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      
    
   await dispatch(
      register({
        name: values.name,
        email:values.email.toLowerCase(),
        password: values.password,
      })
    ).unwrap();
    navigate(`/login`)
  } catch (error) {
    console.log(error.response?.data?.message);
      
  }finally

   { actions.resetForm();}
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      <FormStyled>
        <FieldGroup>
          Username
          <FieldStyled name="name" type="string" placeholder="John Smith" />
          <ErrorMessageStyled name="name" component="span" />
        </FieldGroup>

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

        <Button type="submit">Create an Account </Button>
      </FormStyled>
    </Formik>
  );
};
