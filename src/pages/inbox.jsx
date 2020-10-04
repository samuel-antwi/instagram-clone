import React, { useState } from 'react';
import Layout from '../components/shared/Layout';
import styled from 'styled-components';
import { getDefaultUser } from '../data';
import { NewMessageIcon, ShareIcon } from '../icons';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import MessageModal from '../components/messages/MessageModal';

const Inbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Layout>
      <InboxStyles className='border border-gray-500'>
        <div className='grid grid-cols-12'>
          <div className=' col-span-12 md:col-span-4 border-r border-gray-500 '>
            <div className=' border-b border-gray-500 py-3'>
              <div className='flex items-center justify-between px-3'>
                <Link className='md:hidden' to='/'>
                  <BsChevronLeft size='1.2rem' />
                </Link>
                <h1>Direct</h1>
                <NewMessageIcon
                  onClick={openModal}
                  className='text-gray-700 cursor-pointer'
                  size='2rem'
                />
              </div>
            </div>
            {Array.from({ length: 8 }, () => getDefaultUser()).map((user) => (
              <Messages key={user.id} user={user} />
            ))}
          </div>
          <div className='hidden md:block  col-span-8'>
            <div className='flex items-center justify-center flex-col content '>
              <div className='border border-gray-700 rounded-full p-5 mb-4'>
                <ShareIcon />
              </div>
              <h1 className='font-md text-2xl text-gray-900'>Your Messages</h1>
              <p className='text-gray-600'>
                Send private photos and messages to a friend or group.
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className='p-1 bg-blue-500 rounded text-yellow-100 font-md mt-5 focus:outline-none'>
                Send Message
              </button>
            </div>
          </div>
        </div>
        {isOpen && <MessageModal closeModal={closeModal} />}
      </InboxStyles>
    </Layout>
  );
};

const Messages = ({ user }) => {
  const elipsis = (text) => {
    if (text?.length > 10) {
      return text.substring(0, 25) + '...';
    } else {
      return text;
    }
  };
  return (
    <React.Fragment>
      <div className='py-3 pl-3  hover:bg-gray-200'>
        <div className='flex items-center cursor-pointer'>
          <img
            className='w-16 rounded-full mr-2'
            src={user.profile_image}
            alt='User'
          />
          <div className='text-sm'>
            <p className='text-gray-900'>{user.username}</p>
            <p className='text-gray-600'>
              {elipsis('Hello there, hope everything is fine?')}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inbox;

const InboxStyles = styled.div`
  .content {
    height: 40rem;
  }
`;
