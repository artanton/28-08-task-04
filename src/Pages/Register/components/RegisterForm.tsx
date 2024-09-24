import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
  IconButton,
} from './RegisterFormStyled';
import { useDispatch } from 'react-redux';

import { register } from '../../../redux/auth/operators';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


import { IoEye, IoEyeOffOutline } from 'react-icons/io5';
import { AppDispatch } from '../../../redux/store';

interface RegValues {
  name: string;
  email: string;
  password: string;
}

const userSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Z][a-z]{1,} [A-Z][a-z]{1,}$/,
      'Insert Name and Surname please'
    )
    .required('Required'),

  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Incorrect email format')
    .required('Required'),

  password: Yup.string()
    .min(6, 'Password has to be at least 6 charts')
    .required('Required'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const swapPassword = () => {
    setShowPassword(!showPassword);
  };

  

  const handleSubmit = async (
    values: RegValues,
    actions: FormikHelpers<RegValues>
  ) => {
    const registerData = {
      name: values.name,
      email: values.email.toLowerCase(),
      password: values.password,
    };
    try {
      await dispatch( register(registerData) ).unwrap();
      navigate(`/login`);
   
      
      
    } catch (error) {
      console.error('Failed to register:', error);
    }finally{
      actions.resetForm();
    }

    
    
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
          <FieldStyled
            name="email"
            type="string"
            placeholder="some@mail.com"
          />
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

        <Button type="submit">Create an Account </Button>
      </FormStyled>
    </Formik>
  );
};
