import React from 'react';
import Layout from '../components/shared/Layout';
import ProfileTabs from '../components/profile/ProfileTabs';
import { getDefaultPost } from '../data';
import { Link } from 'react-router-dom';
import UserProfile from '../components/shared/UserProfile';

const ProfilePage = ({ post_length = 10 }) => {
  return (
    <div className='relative'>
      <Layout>
        <div className='mb-10'>
          <UserProfile />
        </div>
        <ProfileTabs />
        <AllPosts post_length={post_length} />
      </Layout>
    </div>
  );
};

export const AllPosts = ({ post_length }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {Array.from({ length: post_length ? 9 : 6 }, () => getDefaultPost()).map(
        (post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <img
              style={{ height: '18rem', width: '100%', objectFit: 'cover' }}
              src={post.media}
              alt='user post'
            />
          </Link>
        )
      )}
    </div>
  );
};

export default ProfilePage;
