import React, { useState } from 'react';

const FollowButton = ({ side }) => {
  const [isFollowing, setFollowing] = useState(false);

  const toggleFollowing = () => {
    setFollowing((prevFollowing) => !prevFollowing);
  };
  return (
    <React.Fragment>
      {side ? (
        <button
          onClick={toggleFollowing}
          className='text-blue-500 text-xs font-semibold focus:outline-none hover:text-blue-700'>
          {isFollowing ? (
            <span className='text-gray-900'>Following</span>
          ) : (
            ' Follow'
          )}
        </button>
      ) : (
        <button
          onClick={toggleFollowing}
          className='text-white bg-blue-500 rounded py-1 px-5 w-full focus:outline-none'>
          {isFollowing ? 'Following' : ' Follow'}
        </button>
      )}
    </React.Fragment>
  );
};

export default FollowButton;
