import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsGrid3X3 } from 'react-icons/bs';
import { defaultCurrentUser } from '../../data';
import { RiFileUserLine } from 'react-icons/ri';

const ProfileTabs = ({ isOwner = true }) => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div className='border-t border-gray-500 flex items-center justify-around'>
      <div
        style={{
          borderTop:
            path === `/${defaultCurrentUser.username}`
              ? '0.5px solid black'
              : null,
        }}
        className='py-3 flex items-center '>
        <Link
          to={`/${defaultCurrentUser.username}`}
          className='flex items-center'>
          <span>POSTS</span>
          <BsGrid3X3 className='ml-2 text-gray-700' size='1rem' />
        </Link>
      </div>
      <div
        style={{
          borderTop:
            path === `/${defaultCurrentUser.username}/channel`
              ? '0.5px solid black'
              : null,
        }}
        className='py-3 flex items-center '>
        <Link
          to={`/${defaultCurrentUser.username}/channel`}
          className='flex items-center'>
          <span>IGTV</span>
          <img
            className='text-gray-500 w-6'
            src='https://img.icons8.com/ios/2x/igtv.png'
            alt='IGTV'
          />
        </Link>
      </div>
      {isOwner ? (
        <div
          style={{
            borderTop:
              path === `/${defaultCurrentUser.username}/saved`
                ? '0.5px solid black'
                : null,
          }}
          className='py-3 flex items-center '>
          <Link
            to={`/${defaultCurrentUser.username}/saved`}
            className='flex items-center'>
            <span> SAVED</span>
            {/* <SaveIcon className='ml-2 w-8' /> */}
            <img
              className='w-5 text-gray-500'
              src='https://cdn141.picsart.com/328472098003211.png?type=webp&to=min&r=640'
              alt=''
            />
          </Link>
        </div>
      ) : (
        <div
          style={{
            borderTop:
              path === `/${defaultCurrentUser.username}/tagged`
                ? '0.5px solid black'
                : null,
          }}
          className='py-3 flex items-center '>
          <Link
            to={`/${defaultCurrentUser.username}/tagged`}
            className='flex items-center'>
            <span> TAGGED</span>
            <RiFileUserLine size='1.4rem' className='ml-2' />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileTabs;
