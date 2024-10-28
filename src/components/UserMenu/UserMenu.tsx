import { useDispatch } from 'react-redux';
import { useAuth } from '../../Hooks/useAuth';
import { LogOutButton, LogOutMenu, Name, UserAvatar } from './UserMenuStyled';
import { logout } from '../../redux/auth/operators';
import { FC, useState } from 'react';
import { Modal } from '../../Pages/mainPage/Components/modal/modalWindow';
import { UserSettings } from './component/userSettings/userSettings';
import { AppDispatch } from '../../redux/store';
import { IUser } from '../../helper/Auth.types';


const baseURL = `${process.env.REACT_APP_API_URL}`
// const baseURL = 'https://recursive-todo-api-1.onrender.com'

export const UserMenu: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth()as { user: IUser };
  // console.log(store.getState());
  const [showModal, setShowModal] = useState(false);
  //   const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const closeModal = () => {
      setShowModal(false);
    };
    const openModal = () => {
      setShowModal(true);
    };
    
    const isDefaultAvatar = user.avatarURL?user.avatarURL.split('/').includes('gravatar.com'):false;
    
    
    const openUserModal = () => {
       
      <UserSettings/>
      openModal();
    };

  return (
    <LogOutMenu>
      <Name>{user.name}</Name>
      <span>
        {isDefaultAvatar ? (
          <UserAvatar src={`${user.avatarURL}`} alt="userPhoto" onClick = {openUserModal} />
        ) : (
          <UserAvatar src={`${baseURL}/${user.avatarURL}`} alt="userPhoto" onClick = {openUserModal}  />
        )}
      </span>
      <LogOutButton to = "/" type="button" onClick={() => dispatch(logout())}>
        Logout
      </LogOutButton>
      <Modal isOpen={showModal} onClose={closeModal}>
        <UserSettings />
      </Modal>
    </LogOutMenu>
  );
};

