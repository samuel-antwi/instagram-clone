import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { getDefaultUser } from '../../data';

const MessageModal = ({ closeModal }) => {
  return (
    <Styles>
      <Modal
        style={{
          content: {
            width: 400,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        ariaHideApp={false}
        isOpen
        onRequestClose={closeModal}>
        <UserSearch closeModal={closeModal} />
      </Modal>
    </Styles>
  );
};

export default MessageModal;

const UserSearch = ({ closeModal }) => {
  const [input, setInput] = useState('');
  const [selectedUser, setUser] = useState('');

  useEffect(() => {
    setUser(input);
  }, [input]);

  return (
    <UserSearchStyles>
      <div>
        <div className='flex place-items-center justify-between mb-3'>
          <AiOutlineClose
            onClick={closeModal}
            size='1.2rem'
            className='cursor-pointer'
          />
          <h1>New Message</h1>
          <button
            disabled={!input.trim()}
            className={
              !input.trim()
                ? 'text-blue-300 font-bold'
                : 'text-blue-600 font-bold'
            }>
            Next
          </button>
        </div>
        <hr />
        <div className='grid grid-cols-12 p-3'>
          <label className='col-span-2'>To:</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='col-span-10 focus:outline-none text-sm'
            type='text'
            placeholder='Searching...'
          />
        </div>
        <hr />
        <h1 className='py-4'>Suggested</h1>
        <div className='pt-5'>
          {Array.from({ length: 5 }, () => getDefaultUser()).map((user) => (
            <div className='mb-3' key={user.id}>
              <div className='flex  justify-between'>
                {/* <UserCard avatar={50} /> */}
                <label htmlFor={user.id} className='flex items-center'>
                  <img
                    className='w-12 rounded-full'
                    src={user.profile_image}
                    alt='avatar'
                  />
                  <span className='text-sm ml-3'>
                    <p>{user.username}</p>
                    <p className='text-xs text-gray-600'>{user.name}</p>
                  </span>
                </label>
                <input
                  onChange={(e) => setInput(e.target.value)}
                  className='mt-2'
                  type='checkbox'
                  id={user.id}
                  value={selectedUser}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserSearchStyles>
  );
};

const UserSearchStyles = styled.div``;

const Styles = styled.div`
  opacity: rgba(0, 0, 0, 0.7);
`;
