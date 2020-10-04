import React from 'react';
import styled from 'styled-components';
import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const GridPost = ({ post }) => {
  const { media, likes, comments } = post;

  const history = useHistory();

  const handleOpenExploreModal = () => {
    history.push({
      pathname: `/post/${post.id}`,
      state: { modal: true },
    });
  };

  return (
    <Styles onClick={handleOpenExploreModal}>
      <div className='col-span-1 relative explore-wrapper'>
        <div className='absolute overlay'>
          <div className='flex items-center justify-around w-64 mx-auto text-white '>
            <span className='flex items-center'>
              <FaHeart size='1.5rem' className='mr-2 mt-1 text-white z-10' />
              <p className='font-bold text-lg z-10'>{likes}</p>
            </span>
            <span className='flex items-center'>
              <FaCommentAlt
                size='1.5rem'
                className='mr-2 mt-1 text-white z-10'
              />
              <p className='font-bold text-lg z-10'>{comments.length}</p>
            </span>
          </div>
        </div>
        <div className='bg-black'>
          <img className='cursor-pointer' src={media} alt='Post Cover' />
        </div>
      </div>
    </Styles>
  );
};

export default GridPost;

const Styles = styled.div`
  .explore-wrapper:hover .overlay {
    display: block;
  }

  img:hover {
    opacity: 0.6;
  }

  .overlay {
    top: 50%;
    right: 25%;
    display: none;
  }
`;
