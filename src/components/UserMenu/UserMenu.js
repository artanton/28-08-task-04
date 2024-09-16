import {useDispatch} from 'react-redux';
import { useAuth } from '../../Hooks/useAuth';
import {LogOutButton, LogOutMenu, Name, UserAvatar } from './UserMenuStyled';
import { logout } from '../../redux/auth/operators';


export const UserMenu =()=>{
    const dispatch = useDispatch();
    const {user} = useAuth();

    return (
        <LogOutMenu>
            <Name>{user.name}</Name><span> <UserAvatar src={user.avatarURL} alt="userPhoto" /></span>
            <LogOutButton type='button' onClick={()=>dispatch(logout())}>Logout</LogOutButton>
        </LogOutMenu>

    )

}