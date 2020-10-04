import React, { useState } from 'react';
import { getDefaultPost } from '../../data';
import { LoadingBigIcon } from '../shared/LoadingScreen';
import GridPost from '../shared/GridPost';

const ExploreGrid = () => {
  const [loading] = useState(false);
  return (
    <>
      <div className='px-3 md:px-0'>
        <h1 className='font-bold text-lg mb-4 text-gray-600'>Explore</h1>
        {loading ? (
          <LoadingBigIcon />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {Array.from({ length: 20 }, () => getDefaultPost()).map((post) => (
              <GridPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreGrid;
