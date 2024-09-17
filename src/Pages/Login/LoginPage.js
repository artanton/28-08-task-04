import { Helmet } from 'react-helmet-async';

import { LoginForm } from './components/LogInForm';
import { Header, Link, TextBlock } from '../Register/RegisterPageStyled';
import {useSelector} from 'react-redux';
import { selectErrorMessage } from '../../redux/auth/selectors';

export default function Login() {
  const errorMessage = useSelector(selectErrorMessage)
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header>Sign in</Header>
      <LoginForm />
      <TextBlock>
        <p>
          <Link href="/28-08-task-04/register">Create an Account</Link>
        </p>
      </TextBlock>
      {errorMessage==="Email is not verified" &&"Sannd verification code again"}
    </div>
  );
}
