import React from 'react';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import ProfileTabs from '../components/profile/ProfileTabs';
import UserProfile from '../components/shared/UserProfile';

const SavedPhotos = () => {
  return (
    <Layout>
      <SavedPhotosStyles>
        <div className='mb-10'>
          <UserProfile />
        </div>
        <ProfileTabs />
      </SavedPhotosStyles>
    </Layout>
  );
};

export default SavedPhotos;

const SavedPhotosStyles = styled.div``;
