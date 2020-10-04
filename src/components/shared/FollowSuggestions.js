import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { LoadingBigIcon } from './LoadingScreen';
import { getDefaultUser } from '../../data';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';
import styled from 'styled-components';

const FollowSuggestions = ({ slides = 3, title = 'Suggestions For You' }) => {
  const [loading] = useState(false);

  const settings = {
    arrows: true,
    swipe: true,
    swipeToSlide: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: 3,
    touchThreshold: 1000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 5,
          arrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };
  return (
    <Styles>
      <div className='flex justify-between items-center mb-5 mx-3'>
        <h1 className='ml-3 text-gray-600 font-semibold col-span-1'>{title}</h1>
        <Link className='text-blue-600 font-bold' to='/'>
          See All
        </Link>
      </div>
      {loading ? (
        <LoadingBigIcon />
      ) : (
        <Slider {...settings}>
          {Array.from({ length: 8 }, () => getDefaultUser()).map((user) => (
            <FollowSuggestionsItem
              key={user.id}
              user={user}
              slides={slides}
              title={title}
            />
          ))}
        </Slider>
      )}
    </Styles>
  );
};

const Styles = styled.div`
  .slick-next:before {
    color: rgba(38, 38, 38);
  }
  .slick-prev:before {
    color: rgba(38, 38, 38);
  }
`;

const FollowSuggestionsItem = ({ user }) => {
  const { name, profile_image, username } = user;
  return (
    <div className=' border  border-gray-500 shadow text-center p-5 mb-10 mx-3 rounded'>
      <Link to={`/${username}`}>
        <img
          className='w-16 rounded-full mx-auto mb-2'
          src={profile_image}
          alt={`${username}'s profile`}
        />
      </Link>
      <h3 className='font-semibold text-gray-700 text-sm md:text-base'>
        {username}
      </h3>
      <h3 className='text-gray-600 mb-3 text-sm md:text-base'>{name}</h3>
      <FollowButton />
    </div>
  );
};

export default FollowSuggestions;
