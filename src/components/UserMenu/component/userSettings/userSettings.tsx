import { AvatarUpload } from '../avaUpload/avatarUpload';
import { UserSettingsForm } from '../userSettingsForm/userSettingsForm';
import { SettingsContainer } from './userSettingsStyled';

export const UserSettings = () => {
  return (
    <SettingsContainer>
      <AvatarUpload />

      <UserSettingsForm />
    </SettingsContainer>
  );
};
