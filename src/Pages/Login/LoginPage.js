import { Helmet } from 'react-helmet-async';

import { LoginForm } from './components/LogInForm';
import { Header, Link, TextBlock } from '../Register/RegisterPageStyled';

export default function Login() {
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
    </div>
  );
}
