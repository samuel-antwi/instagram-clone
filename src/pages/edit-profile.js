import React, { useState, useContext } from 'react';
import Layout from '../components/shared/Layout';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_EDIT_USERPROFILE } from '../graphql/queries';
import LoadingScreen from '../components/shared/LoadingScreen';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/es/lib/isEmail';
import isUrl from 'validator/es/lib/isURL';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { EDIT_USER, EDIT_USER_AVATAR } from '../graphql/mutation';
import { AuthContext } from '../auth';
import { Dialog, Zoom } from '@material-ui/core';
import handleImageUpload from '../utils/handleImageUpload';

const EditProfilePage = () => {
  const { currentUserId } = useContext(UserContext);
  const variables = { id: currentUserId };
  const { data, loading } = useQuery(GET_EDIT_USERPROFILE, { variables });
  const history = useHistory();
  const path = history.location.pathname;
  const edit = Boolean(path.includes('edit'));
  const passwordChange = Boolean(path.includes('password'));

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <EditProfileStyles>
        <div className=' edit-wrapper grid grid-cols-12 border border-gray-500 mx-4 md:mx-0 '>
          <div className=' hidden md:block col-span-3 border-r border-gray-500'>
            <SideNav edit={edit} passwordChange={passwordChange} />
          </div>
          <div className='col-span-9'>
            {edit && <UserDetails user={data.users_by_pk} path={path} />}
            {passwordChange && <PasswordChange user={data.users_by_pk} />}
          </div>
        </div>
      </EditProfileStyles>
    </Layout>
  );
};

// Side nav buttons
const SideNav = () => {
  return (
    <React.Fragment>
      <GetTabs option='Edit Profile' pathName='/accounts/edit' />
      <GetTabs option='Change Password' pathName='/accounts/password/change' />
      <GetTabs option='Apps and Websites' pathName='/accounts/manage_access' />
    </React.Fragment>
  );
};

const GetTabs = ({ option, pathName }) => {
  const history = useHistory();

  const path = () => {
    return history.push(pathName);
  };

  const currentPath = Boolean(history.location.pathname === pathName);

  return (
    <button
      className={`flex w-full focus:outline-none py-3 px-4 hover:bg-gray-200 ${
        currentPath && 'border-l-2 border-black font-semibold bg-gray-200'
      }`}
      onClick={() => path(pathName)}>
      {option}
    </button>
  );
};

// Get all the form input fields
const UserFormItem = ({
  error,
  defaultValue,
  handleChange,
  inputref,
  name,
  description,
  isInput = true,
}) => {
  return (
    <div className='md:grid grid-cols-12'>
      <label className=' mb-2 col-span-2'>{description}</label>
      <div className='col-span-10'>
        {isInput ? (
          <>
            <input
              className='border border-gray-500 px-3 rounded mb-2 text-gray-800 py-1'
              onChange={handleChange}
              name={name}
              defaultValue={defaultValue}
              type='text'
              ref={inputref}
            />
            <span className='text-red-600 mb-2 block'>
              {error?.type === name && error.message}
            </span>
          </>
        ) : (
          <textarea
            className='border border-gray-500  px-3 rounded mb-3 text-gray-800'
            onChange={handleChange}
            name={name}
            defaultValue={defaultValue}
            ref={inputref}
            type='text'
          />
        )}
      </div>
    </div>
  );
};

const DEFAULT_ERROR = { type: '', message: '' };

// User details
const UserDetails = ({ user }) => {
  const { updateUserEmail } = useContext(AuthContext);
  const [editUser] = useMutation(EDIT_USER);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
  });
  const {
    username,
    name,
    profile_image,
    website,
    email,
    bio,
    phone_number,
    gender,
  } = user;
  const [profilePic, setProfilePic] = useState(user.profile_image);
  const [error, setError] = useState(DEFAULT_ERROR);
  const [successMessage, setSuccessMessage] = useState(false);

  const closeSuccessMessage = () => {
    setSuccessMessage(false);
  };

  const handleUpdateProfilePhoto = async (e) => {
    const url = await handleImageUpload(e.target.files[0]);
    const variables = { id: user.id, profileImage: url };
    await editUserAvatar({ variables });
    setProfilePic(url);
  };

  // Handle edit user form submission
  const onSubmit = async (data) => {
    try {
      setError(DEFAULT_ERROR);
      const variables = { ...data, id: user.id };
      await updateUserEmail(data.email);
      await editUser({ variables });
      setSuccessMessage(true);
    } catch (error) {
      handleError(error);
    }
  };

  // function to handle error
  const handleError = (error) => {
    if (error.message.includes('users_username_key')) {
      setError({ type: 'username', message: 'This username is already taken' });
    } else if (error.code.includes('auth')) {
      setError({ type: 'email', message: error.message });
    }
  };

  return (
    <UserDetailStyle>
      {successMessage && (
        <EditProfileSuccessMessage closeSuccessMessage={closeSuccessMessage} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='p-5'>
        <div className='flex items-center md:ml-20 mb-3'>
          <img
            style={{ width: 50, height: 50 }}
            className='rounded-full'
            src={profile_image}
            alt='user'
          />
          <span className='ml-3 mt-1'>
            <p>{username}</p>
            <label htmlFor='image'>
              <p className='text-blue-600 cursor-pointer text-sm font-medium'>
                Change Profile Photo
              </p>
              <input
                style={{ display: 'none' }}
                accept='images/*'
                id='image'
                onChange={handleUpdateProfilePhoto}
                type='file'
              />
            </label>
          </span>
        </div>
        <div className='mb-4'>
          <UserFormItem
            inputref={register({
              required: true,
              minLength: 5,
              maxLength: 50,
            })}
            isInput
            name='name'
            description='Name'
            defaultValue={name}
          />
          <small className='text-gray-600 block ml-0'>
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name. You can only
            change your name twice within 14 days.
          </small>
        </div>
        <div className='mb-4'>
          <UserFormItem
            error={error}
            inputref={register({
              required: true,
              pattern: /^[a-zA-Z0-9_.]*$/,
              minLength: 5,
              maxLength: 20,
            })}
            isInput
            name='username'
            description='Username'
            defaultValue={username}
          />
          <small className='text-gray-600 block ml-0'>
            In most cases, you'll be able to change your username back to
            i_am_samuelantwi for another 14 days
          </small>
        </div>
        <div className='mb-4'>
          <UserFormItem
            inputref={register({
              validate: (input) =>
                Boolean(input)
                  ? isUrl(input, {
                      protocols: ['http', 'https'],
                      require_protocol: true,
                    })
                  : true,
            })}
            isInput
            name='website'
            description='Website'
            defaultValue={website}
          />
        </div>
        <UserFormItem
          errors={errors}
          formState={formState}
          inputref={register({
            maxLength: 120,
          })}
          isInput={false}
          name='bio'
          description='Bio'
          defaultValue={bio}
        />
        <div className='mb-4'>
          <div className='text-gray-600 block ml-0 personal-info mb-2'>
            <h1 className='mb-1'>Personal Information</h1>
            <p>
              Provide your personal information, even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile.
            </p>
          </div>
          <UserFormItem
            error={error}
            inputref={register({
              required: true,
              validate: (input) => isEmail(input),
            })}
            name='email'
            description='Email'
            defaultValue={email}
          />
        </div>
        <div className='mb-4'>
          <UserFormItem
            inputref={register({
              validate: (input) =>
                Boolean(input) ? isMobilePhone(input) : true,
            })}
            name='phone_number'
            description='Phone Number'
            defaultValue={phone_number}
          />
        </div>
        <div className='mb-4'>
          <UserFormItem
            inputref={register({
              required: false,
            })}
            name='gender'
            description='Gender'
            defaultValue={gender}
          />
        </div>
        <div className='md:grid grid-cols-12 mb-4'>
          <label className='col-span-2'></label>
          <button
            type='submit'
            className='col-span-10 bg-blue-500 text-white rounded py-1 w-24 focus:outline-none'>
            {formState.isSubmitting ? 'Loading' : ' Submit'}
          </button>
        </div>
      </form>
    </UserDetailStyle>
  );
};

// Edit profile success message
const EditProfileSuccessMessage = ({ closeSuccessMessage }) => {
  return (
    <Dialog onClose={closeSuccessMessage} open TransitionComponent={Zoom}>
      <div className='p-5 '>
        <p className='mt-5 text-gray-100 font-semibold bg-black p-2 rounded'>
          Profile updated successfully!
        </p>
        <button
          onClick={closeSuccessMessage}
          className='focus:outline-none border rounded py-1 px-5 mt-5 border-gray-500'>
          Close
        </button>
      </div>
    </Dialog>
  );
};

// Password change component
const PasswordChange = ({ user }) => {
  const { profile_image, username } = user;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const disabled = Boolean(
    !oldPassword.trim() || !newPassword.trim() || !confirm.trim()
  );

  return (
    <PasswordChangeStyles>
      <div className='p-10'>
        <span className='flex items-center mb-5 md:ml-20'>
          <img
            className='w-10 rounded-full mr-4'
            src={profile_image}
            alt='user'
          />
          <h1 className='md:text-2xl text-gray-800'>{username}</h1>
        </span>
        <form action=''>
          <div className='md:grid grid-cols-12 mb-4'>
            <label className=' mb-2 col-span-3 font-semibold'>
              Old Password
            </label>
            <div className='col-span-9'>
              <input
                className='border border-gray-500 px-3 rounded mb-2 text-gray-800 py-1 bg-gray-200 focus:outline-none'
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                type='password'
              />
            </div>
          </div>
          <div className='md:grid grid-cols-12 mb-4'>
            <label className=' mb-2 col-span-3 font-semibold'>
              New Password
            </label>
            <div className='col-span-9'>
              <input
                className='border border-gray-500 px-3 rounded mb-2 text-gray-800 py-1 bg-gray-200 focus:outline-none'
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type='password'
              />
            </div>
          </div>
          <div className='md:grid grid-cols-12 mb-4'>
            <label className=' mb-2 col-span-3 font-semibold'>
              Confirm New Pasword
            </label>
            <div className='col-span-9'>
              <input
                className='border border-gray-500 px-3 rounded mb-2 text-gray-800 py-1 bg-gray-200 focus:outline-none'
                onChange={(e) => setConfirm(e.target.value)}
                value={confirm}
                type='password'
              />
            </div>
          </div>
          <div className='md:grid grid-cols-12 mb-4'>
            <label className='col-span-3'></label>
            <button
              disabled={disabled}
              type='submit'
              className={` ${!disabled && 'bg-blue-500 '} ${
                disabled && 'bg-blue-200 cursor-default'
              } col-span-9  text-white rounded py-1 px-2 `}>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </PasswordChangeStyles>
  );
};

export default EditProfilePage;

// Components styles

// Edit  profile style
const EditProfileStyles = styled.div`
  .edit-wrapper {
    height: auto;
  }
  @media (max-width: 768px) {
    .edit-wrapper {
      height: auto;
    }
  }
`;

// User details styles
const UserDetailStyle = styled.div`
  .file-selector {
    height: 0;
    width: 0;
    opacity: 0;
  }
  input,
  textarea {
    width: 20rem;
  }
  small {
    max-width: 20rem;
    font-size: 12px;
    margin-left: 6.5rem;
  }

  .personal-info {
    margin-left: 6.5rem;
    p {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    .personal-info,
    small {
      margin-left: 0px;
    }
  }
`;

// Password change style
const PasswordChangeStyles = styled.div`
  input {
    width: 25rem;
  }
  button {
    width: 10rem;
  }

  @media (max-width: 768px) {
    input {
      width: 17rem;
    }
  }
`;
