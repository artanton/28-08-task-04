import { useAuth } from "../../Hooks";
// import { regenerateTokens } from "../../redux/auth/operators";
import { Greating, HomePageContainer } from "./HomePageStyled";
// import {useDispatch} from 'react-redux';

  
  export default function Home() {
    const {user} = useAuth();
    // const dispatch = useDispatch()
    // const regen =async()=>{
    //   try {
    //     await dispatch(regenerateTokens());
    //   } catch (error) {
    //     console.log(error);
    //   } }
    return (
      <HomePageContainer>
        {/* <button onClick={regen}>regenerate</button> */}
        <Greating>
          Hello {user.name}!

        </Greating>
        <Greating>
          Welcome to ToDo List App.
        </Greating>
      </HomePageContainer>
    );
  }
  