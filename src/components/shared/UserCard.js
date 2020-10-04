import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const UserCard = ({ avatarWidth, avatarHeight, postId }) => {
  const { me } = useContext(UserContext);
  const { username, name, profile_image } = me;

  return (
    <React.Fragment>
      <div className='flex items-center'>
        <Link to={`/${username}`}>
          <img
            style={{
              width: avatarWidth,
              height: avatarHeight,
              objectFit: 'cover',
            }}
            className=' mr-4 rounded-full'
            src={profile_image}
            alt='User avatar'
          />
        </Link>
        <div>
          <Link className='block font-medium text-gray-800' to={`/${username}`}>
            <span className='flex items-center'>
              {username}
              {username && (
                <img
                  className='rounded-full w-4 ml-2'
                  src='https://s3-us-west-2.amazonaws.com/jumpermedia.co/uploads/2018/07/instagram-verified-symbol-768x768-1-300x300.png'
                  alt='star'
                />
              )}
            </span>
          </Link>
          <span className='block text-gray-500 text-sm'>{name}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserCard;
