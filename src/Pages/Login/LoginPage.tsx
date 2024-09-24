import { Helmet } from 'react-helmet-async';

import { LoginForm } from './components/LogInForm';
import { Header, Link, TextBlock } from '../Register/RegisterPageStyled';
import {useSelector, useDispatch} from 'react-redux';
import { selectErrorMessage } from '../../redux/auth/selectors';
import { resendVerify } from '../../redux/auth/operators';
import { Button } from '../Register/RegisterPageStyled';
import { AppDispatch } from '../../redux/store';

export default function Login() {
  const errorMessage = useSelector(selectErrorMessage)
  const dispatch = useDispatch<AppDispatch>();
const onSubmit=()=>dispatch(resendVerify());
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header>Sign in</Header>
      <LoginForm />
      {errorMessage !=='Email is not verified' ? (
       <TextBlock>
       <p>
         <Link href="/28-08-task-04/register">Create an Account</Link>
       </p>
     </TextBlock>
      ) : (
        <TextBlock>
          <p style={{color:"red"}}>E-mail is NOT vetified</p>
          <p style={{color:"red", marginBottom:20}}>Resend verification code </p>
          <p>
            <Button type='submit' onClick={onSubmit} >Send</Button>
          </p>
        </TextBlock>
        
      )}
      
    </>
  );
}
