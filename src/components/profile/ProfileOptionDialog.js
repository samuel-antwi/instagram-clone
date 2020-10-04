import React, { useState, useContext } from 'react';
import { Dialog, Zoom, DialogTitle } from '@material-ui/core';
import { AuthContext } from '../../auth';
import { withRouter, useHistory } from 'react-router-dom';

const ProfileOptionDialog = ({ handleCloseOptionDialog }) => {
  const { signOut } = useContext(AuthContext);
  const [showLogOutMessage, setLogOutMessage] = useState(false);

  const history = useHistory();

  const handleLogOutClick = () => {
    setLogOutMessage(true);
    setTimeout(() => {
      signOut();
    }, 1000);
  };

  const handlePasswordChange = () => {
    history.push('/accounts/password/change');
  };

  return (
    <Dialog onClose={handleCloseOptionDialog} open TransitionComponent={Zoom}>
      {showLogOutMessage ? (
        <DialogTitle>
          <h1>Logging out...</h1>
          <p className='text-gray-700 text-base'>
            You need to log back in to continue using Instagram
          </p>
        </DialogTitle>
      ) : (
        <div className='divide-y divide-gray-400' style={{ width: '20rem' }}>
          <div onClick={() => history.push('/accounts/password/change')}>
            <OptionItem text='Change Password' />
          </div>
          <OptionItem text='Nametag' />
          <OptionItem text='Apps and website' />
          <OptionItem text='Notification' />
          <OptionItem text='privacy and security' />
          <OptionItem text='Login Activity' />
          <OptionItem text='Emails from Instagram' />
          <OptionItem text='Report a problem' />
          <div onClik={handleLogOutClick}>
            <OptionItem text='Log Out' />
          </div>
          <div onClick={handleCloseOptionDialog}>
            <OptionItem text='Cancel' />
          </div>
        </div>
      )}
    </Dialog>
  );
};

const OptionItem = ({ text, onClik }) => {
  return (
    <>
      <button
        onClick={onClik}
        className='flex w-full p-2 justify-center cursor-pointer text-gray-800 hover:bg-gray-200 focus:outline-none'>
        {text}
      </button>
    </>
  );
};

export default withRouter(ProfileOptionDialog);
