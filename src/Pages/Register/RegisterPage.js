import { RegisterForm } from './components/RegisterForm';
import { Helmet } from 'react-helmet-async';
import { Header, TextBlock, Link } from './RegisterPageStyled';
import { useSelector } from 'react-redux';
import { selectErrorMessage } from '../../redux/auth/selectors';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Hooks";

export default function Register() {
  const errorMessage = useSelector(selectErrorMessage);

  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <Header>Sign Up</Header>
      <RegisterForm />

      {errorMessage !=='Email in use' ? (
        <TextBlock>
          <p>Already have an account?</p>
          <p>
            <Link href="/28-08-task-04/login">Sign in</Link>
          </p>
        </TextBlock>
      ) : (
        <TextBlock>
          <p style={{color:"red"}}>E-mail is already in use.</p>
          <p style={{color:"red"}}>Try to Sign in please. </p>
          <p>
            <Link href="/28-08-task-04/login">Sign in</Link>
          </p>
        </TextBlock>
        
      )}
    </>
  );
}
