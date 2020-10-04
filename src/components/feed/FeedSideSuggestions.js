import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FollowButton from '../shared/FollowButton';
import { getDefaultUser } from '../../data';

import { LoadingBigIcon } from '../shared/LoadingScreen';

function FeedSideSuggestions() {
  const [side] = useState(true);
  const [loading] = useState(false);
  return (
    <React.Fragment>
      <div className='mt-5'>
        <div className='flex items-center justify-between'>
          <h1 className='text-gray-500 font-semibold'>Suggestions For You</h1>
          <Link className='text-gray-700' to='/'>
            See All
          </Link>
        </div>
        {loading ? (
          <LoadingBigIcon width={5} height={5} />
        ) : (
          Array.from({ length: 5 }, () => getDefaultUser()).map((user) => (
            <React.Fragment key={user.id}>
              <div className='flex items-center justify-between mt-5 '>
                <div>
                  <div className='flex items-center'>
                    <Link to={`/${user.username}`}>
                      <img
                        className='w-12 rounded-full'
                        src={user.profile_image}
                        alt='User avatar'
                      />
                    </Link>
                    <span className='ml-3'>
                      <Link
                        to={`/${user.username}`}
                        className='text-gray-800 font-medium text-sm'>
                        {user.username}
                      </Link>
                      <p className='text-gray-600 text-xs'>Follows you</p>
                    </span>
                  </div>
                </div>
                <div className='ml-20'>
                  <FollowButton side={side} />
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </React.Fragment>
  );
}

export default FeedSideSuggestions;
