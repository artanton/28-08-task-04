import { useAuth } from "../../Hooks";
import { Greating, HomePageContainer } from "./HomePageStyled";


  
  export default function Home() {
    const {user} = useAuth();
    return (
      <HomePageContainer>
        <Greating>
          Hello {user.name}!

        </Greating>
        <Greating>
          Welcome to ToDo List App.
        </Greating>
      </HomePageContainer>
    );
  }
  