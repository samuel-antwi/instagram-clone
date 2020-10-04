import React, { useState, lazy, Suspense } from 'react';
import Layout from '../components/shared/Layout';
import SEO from '../components/shared/Seo';
import { getDefaultPost } from '../data';
import UserCard from '../components/shared/UserCard';
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions';
import LoadingScreen, {
  LoadingBigIcon,
} from '../components/shared/LoadingScreen';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
import Navbar from '../components/shared/Navbar';
import { useSubscription, useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ALL_POST } from '../graphql/queries';

const FeedPost = lazy(() => import('../components/feed/FeedPost'));

const FeedPage = ({ user, postId }) => {
  const { data, loading } = useQuery(GET_ALL_POST);
  const [isEndofFeed] = useState(true);
  const avatarWidth = 60;
  const avatarHeight = 60;

  if (loading) {
    return <LoadingScreen />;
  }

  const settings = {
    swipeToSlide: true,
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    touchThreshold: 1000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 5,
          arrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          arrows: false,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      {data && (
        <FeedPageStyles>
          <Layout>
            <SEO title='Feed' />
            <div className='grid grid-cols-3 gap-10 '>
              <div className='col-span-3 lg:col-span-2'>
                <Slider
                  {...settings}
                  className='border border-gray-500 p-5 mb-5 '>
                  {data.posts.map((post) => (
                    <RecentVideos key={post.id} post={post} />
                  ))}
                </Slider>
                {data.posts.map((post, index) => (
                  <Suspense key={post.id} fallback={<FeedPostSkeleton />}>
                    <FeedPost post={post} index={index} />
                  </Suspense>
                ))}
              </div>
              <div className='col-span-1 hidden lg:block '>
                <div className='fixed'>
                  {/* <Link to={`/${user.username}`}>
                <img
                  style={{ width: 60, height: 60 }}
                  className='rounded-full'
                  src={user.profile_image}
                  alt='user'
                />
              </Link> */}
                  <UserCard
                    user={user}
                    avatarWidth={avatarWidth}
                    avatarHeight={avatarHeight}
                  />
                  <FeedSideSuggestions />
                </div>
              </div>
            </div>
            {!isEndofFeed && <LoadingBigIcon />}
          </Layout>
        </FeedPageStyles>
      )}
    </React.Fragment>
  );
};

const RecentVideos = ({ post }) => {
  const { user } = post;

  const textElipsis = (text) => {
    if (text?.length > 10) {
      return text.substring(0, 10) + '...';
    } else {
      return text;
    }
  };
  return (
    <UseRecenetVideoStyles>
      <Link to={`/${user.username}`}>
        <img
          style={{ width: 70, height: 70 }}
          className='w-16  mx-auto rounded-full mb-1 '
          src={user.profile_image}
          alt={`${user.username}'s profile`}
        />
      </Link>
      <p className='text-center text-xs'>{textElipsis(user.username)}</p>
    </UseRecenetVideoStyles>
  );
};

export default FeedPage;

const FeedPageStyles = styled.div`
  .slick-next:before {
    color: rgba(38, 38, 38);
  }
  .slick-prev:before {
    color: rgba(38, 38, 38);
  }
  .slick-slider {
    z-index: 1;
  }
`;

const UseRecenetVideoStyles = styled.div`
  img {
    border: 2px solid #fe8347;
    padding: 2px;
  }
`;
