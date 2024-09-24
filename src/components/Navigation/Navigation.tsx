import { useAuth } from "../../Hooks/useAuth"
import { MenuLink } from "./NavigationStyled";

export const Navigation=()=>{
    const {isLoggedIn, user}=useAuth();
    return (
        <nav>
            <MenuLink to ='/'>
            Home
            </MenuLink>
            {isLoggedIn&& user.verify&&(
                <MenuLink to="/tasks">
                    Tasks
                </MenuLink>
            )}
        </nav>
    )
}