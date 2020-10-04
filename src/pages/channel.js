import React from 'react';
import Layout from '../components/shared/Layout';
import ProfileTabs from '../components/profile/ProfileTabs';
import UserProfile from '../components/shared/UserProfile';

const Channel = () => {
  return (
    <Layout>
      <div className='mb-10'>
        <UserProfile />
      </div>
      <ProfileTabs />
    </Layout>
  );
};

export default Channel;
