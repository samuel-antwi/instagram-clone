import React from 'react';
import { Dialog } from '@material-ui/core';

const UsersOptionDialog = ({ handleCloseUserOptionDialog }) => {
  const dialogStyle = {
    content: {
      width: '20rem',
      padding: '20px',
      textAlign: 'center',
    },
  };
  return (
    <Dialog open onClose={handleCloseUserOptionDialog}>
      <div style={dialogStyle.content}>
        <button className='text-red-700 p-2 block text-center w-full focus:outline-none'>
          Block this user
        </button>
        <hr />
        <button className='text-red-700 p-2 block text-center w-full focus:outline-none'>
          Resstrict
        </button>
        <hr />
        <button className='text-red-700 p-2 block text-center w-full focus:outline-none'>
          Report user
        </button>
        <hr />
        <button
          onClick={handleCloseUserOptionDialog}
          className=' focus:outline-none p-2'>
          Cancel
        </button>
      </div>
    </Dialog>
  );
};

export default UsersOptionDialog;
