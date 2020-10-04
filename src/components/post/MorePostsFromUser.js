import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getDefaultPost } from '../../data';
import styled from 'styled-components';
import { LoadingBigIcon } from '../shared/LoadingScreen';
import { UserContext } from '../../App';

const MorePostsFromUser = () => {
  const { me } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { username } = me;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div className='pt-10'>
      <div className=' flex items-center mb-4'>
        <h1 className='mr-1 text-gray-500 font-bold '>More post from</h1>
        <Link className='font-bold text-gray-800' to={`/${username}`}>
          {username}
        </Link>
      </div>
      {loading ? (
        <LoadingBigIcon />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 '>
          {Array.from({ length: 6 }, () => getDefaultPost()).map((post) => (
            <MorePostGrid key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

const MorePostGrid = ({ post }) => {
  return (
    <MorePostGridStyles className='col-span-1'>
      <Link to={`/post/${post.id}`}>
        <img className='morepost-image' src={post.media} alt='Post cover' />
      </Link>
    </MorePostGridStyles>
  );
};

const MorePostGridStyles = styled.div`
  .morepost-image {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }
`;

export default MorePostsFromUser;
