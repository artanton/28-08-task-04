import { RegisterForm } from "./components/RegisterForm";
import { Helmet } from 'react-helmet-async';
import { Header, TextBlock, Link } from "./RegisterPageStyled";
import {useSelector} from 'react-redux';
import { selectErrorMessage } from "../../redux/auth/selectors";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../Hooks";






export default function Register() {
 const errorMessage = useSelector(selectErrorMessage)

 
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
      
      {errorMessage === "Email in use" && "Sannd verification code again"}
    </div>
    
    
  );
}
