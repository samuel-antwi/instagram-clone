import React, { useRef } from 'react';
import styled from 'styled-components';
import { defaultNotifications } from '../../data';
import FollowButton from '../shared/FollowButton';
import { withRouter, useHistory } from 'react-router-dom';
import useOutsideClick from '@rooks/use-outside-click';

const NotificationList = ({ handleList }) => {
  const history = useHistory();
  const listContainerRef = useRef();

  useOutsideClick(listContainerRef, handleList);

  return (
    <React.Fragment>
      <NotificationStyles ref={listContainerRef}>
        <div className=' notification-card bg-white border shadow-md rounded-md'>
          {defaultNotifications.map((notification) => {
            const isLike = notification.type === 'like';
            const isFollow = notification.type === 'follow';
            return (
              <div key={notification.id}>
                <hr />
                <div className='grid grid-cols-12 items-center p-4 cursor-pointer'>
                  <div className='col-span-10'>
                    <div
                      onClick={() =>
                        history.push(`/${notification.user.username}`)
                      }
                      className='flex items-center'>
                      <img
                        className='w-8 rounded-full'
                        src={notification.user.profile_image}
                        alt='avatar'
                      />
                      <div className='ml-2'>
                        <span className='mr-1 text-sm md:text-base'>
                          {notification.user.username}
                        </span>
                        <span className='text-gray-700 text-sm md:text-base'>
                          {isLike && 'liked your photo.'}
                        </span>
                        <span className='text-gray-500 ml-1 text-sm md:text-base'>
                          6h
                        </span>
                        <h2 className='text-gray-500 text-xs md:text-base'>
                          {isFollow && 'Started following you'}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 justify-self-end'>
                    {isFollow && <FollowButton />}
                    {isLike && (
                      <img
                        className='w-12 rounded-full'
                        src={notification.user.profile_image}
                        alt='avatar'
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </NotificationStyles>
    </React.Fragment>
  );
};

export default withRouter(NotificationList);

const NotificationStyles = styled.div`
  position: absolute;
  top: 50px;
  right: 18rem;

  .notification-card {
    max-width: 32rem;
  }

  @media (max-width: 768px) {
    right: 0;
  }
`;
