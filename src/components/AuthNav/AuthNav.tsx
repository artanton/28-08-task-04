import { MenuLink } from "./AuthNavStyled"

export const AuthNav =()=>{
    return(
        <div>
            <MenuLink to='/register'>
                Register
            </MenuLink >
            <MenuLink to='/login'>
                Login
            </MenuLink>
        </div>
    )
}


