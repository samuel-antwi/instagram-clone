import React from 'react';
import Layout from '../components/shared/Layout';
import { AllPosts } from './profile';
import ProfileTabs from '../components/profile/ProfileTabs';
import UserProfile from '../components/shared/UserProfile';

const Tagged = () => {
  return (
    <Layout>
      <div className='mb-10'>
        <UserProfile />
      </div>
      <ProfileTabs />
      <AllPosts />
    </Layout>
  );
};

export default Tagged;
