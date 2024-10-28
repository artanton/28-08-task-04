import { Notify } from 'notiflix';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../../../redux/auth/operators';
import { useAuth } from '../../../../Hooks';
import * as yup from 'yup';
import {IUser } from '../../../../helper/Auth.types'
import {
  Avatar, 
  FormContainer,
  HiddenFileInput,
  SubmitButton 
} from './avatarUploadStyled';
import { Formik, Form, ErrorMessage} from 'formik';
import { AppDispatch } from '../../../../redux/store';

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = 'https://recursive-todo-api-1.onrender.com'

export const AvatarUpload = () => {


  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth()as { user: IUser };
  
  let prevAvatar="";
  const isGravatar = user.avatarURL?user.avatarURL.split('/').includes("gravatar.com"):false;

  if(isGravatar){prevAvatar=`${user.avatarURL}`}else{prevAvatar=`${baseURL}/${user.avatarURL}`};

//   console.log('prevAvatar',prevAvatar);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(prevAvatar);

// console.log('previewUrl',previewUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
    const newAvatar = e.target.files[0];
    if (newAvatar) {
      setImageFile(newAvatar);
      setPreviewUrl(URL.createObjectURL(newAvatar));}
    }
  };

  const handleSubmit = async () => {
      if (!imageFile) {
      Notify.info('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('avatarURL', imageFile);

    dispatch(updateAvatar(formData));
    
    
  };

  const avatarSchema = yup
    .object()
    .shape({
      avatarURL: yup
        .string()
        .matches(/\.(jpg|png|jpeg)$/, 'Only .jpeg, .jpg, and .png are allowed'),
    });

  const initialValues = {
    avatarURL: '',
  };

  return (
    
      <Formik
        initialValues={initialValues}
        validationSchema={avatarSchema}
        onSubmit={handleSubmit}
      >
        <FormContainer>


        <Form>
          <label>
            {previewUrl && (
              <div>
                <Avatar src={previewUrl} alt="Avatar" width="200" />
              </div>
            )}

            <HiddenFileInput
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <ErrorMessage
            name="avatarURL"
            component=' div'
          />

          <SubmitButton type="submit"> Update Photo</SubmitButton>
        </Form>
        </FormContainer>
      </Formik>

    
  );
};


    //   {/* <form onSubmit={handleSubmit}>
    //     <div>
    //       <input
    //         type="file"
    //         id="imageUpload"
    //         accept="image/*"
    //         onChange={handleImageChange}
    //       />
    //       <UploadButton htmlFor="imageUpload">
    //         <ButtonIcon />
    //       </UploadButton>
    //     </div>
    //     {previewUrl && (
    //       <div>
    //         <Avatar src={previewUrl} alt="Avatar" width="200" />
    //       </div>
    //     )}
    //     <SubmitButton type="submit">Upload</SubmitButton>
    //   </form> */}