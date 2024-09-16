import { RegisterForm } from "./components/RegisterForm";
import { Helmet } from 'react-helmet-async';
import { Header, TextBlock, Link } from "./RegisterPageStyled";




export default function Register() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <Header>Sign Up</Header>
      <RegisterForm />
      <TextBlock>
        <p>
        Already have an account?
        </p>
        <p>
           <Link href="/28-08-task-04/login">Sign in</Link> 
        </p>
      </TextBlock>
    </div>
  );
}
