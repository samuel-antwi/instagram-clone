import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import { GearIcon, MoreIcon } from '../../icons';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { BiUserCheck } from 'react-icons/bi';
import FollowButton from './FollowButton';
import ProfileOptionDialog from '../profile/ProfileOptionDialog';
import UsersOptionDialog from '../profile/UsersOptionDialog';
import { UserContext } from '../../App';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_PROFILE } from '../../graphql/queries';

const UserProfile = ({ following = true, size = 150, isFollower = false }) => {
  const { currentUserId } = useContext(UserContext);
  const { username } = useParams();
  const variables = { username };
  const { data, loading } = useQuery(GET_USER_PROFILE, { variables });
  const [openOptionDialog, setOpenOptionDialog] = useState(false);
  const [usersOptionDialog, setUsersOptionDialog] = useState(false);

  // Closes Authenticated user option dialog
  const handleCloseOptionDialog = () => {
    setOpenOptionDialog(false);
  };

  // Opens authenticated user option dialog
  const handleProfileSettingDialog = () => {
    setOpenOptionDialog(true);
  };

  // Closes follower option dialog on the user account
  const handleCloseUserOptionDialog = () => {
    setUsersOptionDialog(false);
  };

  // Opens follower option dialog on the user account
  const handleOpenUsersOptionDialog = () => {
    setUsersOptionDialog(true);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  const [users] = data.users;
  const isOwner = users.id === currentUserId;

  return (
    <>
      {/* Large screen */}
      <div style={{ maxWidth: 700 }} className=' hidden md:block mx-auto'>
        <div className='grid grid-cols-3 mx-4'>
          <ProfilePicture className='col-span-1' users={users} size={size} />
          <div className='col-span-2'>
            <UsernameSection
              handleProfileSettingDialog={handleProfileSettingDialog}
              users={users}
              isFollower={isFollower}
              isOwner={isOwner}
              following={following}
            />
            <FollowCountSection users={users} />
            <ProfileNameSection users={users} />
          </div>
        </div>
      </div>
      {/* Mobile screen */}
      {/* <div className='md:hidden mx-5 '>
        <div className='flex'>
          <ProfilePicture users={users} size={77} />
          <UsernameSection
            className='col-span-2'
            users={users}
            isFollower={isFollower}
            isOwner={isOwner}
            following={following}
          />
        </div>
        {isOwner && (
          <>
            <button className='border border-gray-500 py-1 w-full my-2 rounded'>
              Edit Profile
            </button>
          </>
        )}
        <ProfileNameSection users={users} />
      </div> */}

      {openOptionDialog && (
        <ProfileOptionDialog
          handleCloseOptionDialog={handleCloseOptionDialog}
        />
      )}
      {usersOptionDialog && (
        <UsersOptionDialog
          handleCloseUserOptionDialog={handleCloseUserOptionDialog}
        />
      )}
    </>
  );
};

// Profile picture
const ProfilePicture = ({ size, users }) => {
  return (
    <React.Fragment>
      <img
        style={{ width: size, height: size }}
        className='rounded-full'
        src={users.profile_image}
        alt='user'
      />
    </React.Fragment>
  );
};

// username
const UsernameSection = ({
  users,
  isFollower,
  isOwner,
  following,
  handleProfileSettingDialog,
}) => {
  const history = useHistory();

  return (
    <div className='flex items-center'>
      <p className='text-3xl text-gray-700 mx-5 md:mx-0'>{users.username}</p>
      {isOwner ? (
        <button
          onClick={() => history.push('/accounts/edit')}
          className=' hidden  md:block border  border-gray-500 py-1 px-5 rounded mx-5 focus:outline-none'>
          Edit Profile
        </button>
      ) : (
        <>
          <ProfileButton
            isFollower={isFollower}
            isOwner={isOwner}
            following={following}
          />
          {!isOwner && (
            <div className='border border-gray-500 py-2 mr-2 cursor-pointer px-4 rounded'>
              <AiFillCaretDown />
            </div>
          )}
        </>
      )}
      {isOwner ? (
        <GearIcon
          onClick={handleProfileSettingDialog}
          className='cursor-pointer'
        />
      ) : (
        <ProfileMoreIcon />
      )}
    </div>
  );
};

const FollowCountSection = ({ users }) => {
  console.log(users);
  return (
    <React.Fragment>
      <div className='flex items-center my-4'>
        <span className='flex items-center'>
          <p className='font-semibold mr-1'>{users.posts.length}</p>
          <p className='text-gray-800'>posts</p>
        </span>
        <span className='flex items-center mx-8'>
          <p className='font-semibold mr-1'>{users.followers.length}</p>
          <p className='text-gray-800'>followers</p>
        </span>
        <span className='flex items-center '>
          <p className='font-semibold mr-1'>{users.following.length}</p>
          <p className='text-gray-800'>following</p>
        </span>
      </div>
    </React.Fragment>
  );
};

// profile name section
const ProfileNameSection = ({ users }) => {
  return <p className='text-lg'>{users.name}</p>;
};

// profile dynamic buttons
const ProfileButton = ({ isFollower, following }) => {
  const buttonOption = () => {
    if (isFollower && !following) {
      return (
        <button className='bg-blue-600 border rounded focus:outline-none py-1 px-5'>
          Follow back
        </button>
      );
    } else if (following && isFollower) {
      return (
        <button className=' border border-gray-500 rounded focus:outline-none py-1 px-5'>
          Message
        </button>
      );
    } else if (!isFollower && !following) {
      return (
        <button className='bg-blue-600 border rounded focus:outline-none py-1 text-white px-5'>
          Follow
        </button>
      );
    } else {
      return (
        <button className=' border border-gray-500 rounded focus:outline-none py-1 px-5'>
          Following
        </button>
      );
    }
  };

  return <div className='mx-3'>{buttonOption()}</div>;
};

// More Icon Button
const ProfileMoreIcon = ({ handleOpenUsersOptionDialog }) => {
  return (
    <MoreIcon
      className='cursor-pointer'
      onClick={handleOpenUsersOptionDialog}
    />
  );
};

export default UserProfile;
